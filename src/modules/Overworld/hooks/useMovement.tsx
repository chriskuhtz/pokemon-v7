import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fps } from "../../../constants/baseConstants";
import { getNextForwardFoot } from "../../../functions/getNextForwardFoot";
import { startBlocker } from "../../../functions/TimedEvent";
import { updatePosition } from "../../../functions/updatePosition";
import { LocationContext } from "../../../hooks/LocationProvider";
import { GameDataContext } from "../../../hooks/useGameData";
import { MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { ScreenTransitionContext } from "../../../hooks/useScreenTransitionEffects";
import {
  Occupant,
  OnStepDialogue,
  OnStepPortal,
  OnStepRouter,
} from "../../../interfaces/Occupant";
import { CharacterOrientation } from "../../../interfaces/SaveFile";
import { baseEncounterRate } from "../constants/constants";
import { useStartEncounter } from "./useStartEncounter";

export const useMovement = (
  currentOccupants: Occupant[],
  stepsTaken: number,
  setStepsTaken: (x: number) => void,
) => {
  const [encounterChance, setEncounterChance] =
    useState<number>(baseEncounterRate);
  const [nextInput, setNextInput] = useState<CharacterOrientation>();
  const { location, setLocation, map } = useContext(LocationContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const gameData = useContext(GameDataContext);
  const { addMultipleMessages, latestMessage } =
    useContext(MessageQueueContext);
  const { transition, activateTransition } = useContext(
    ScreenTransitionContext,
  );

  const addInput = useCallback(
    (input: CharacterOrientation | undefined) => {
      if (nextInput) {
        return;
      }
      setNextInput(input);
    },
    [nextInput],
  );

  const canSwim = gameData.overworldActions.swimming.possible(saveFile);
  const canRockClimb =
    gameData.overworldActions.rockClimbing.possible(saveFile);
  const isFlying = !!saveFile.flying;

  const steptOnPortal: OnStepPortal | undefined = useMemo(
    () =>
      currentOccupants.find(
        (o) =>
          o.type === "ON_STEP_PORTAL" &&
          o.conditionFunction &&
          o.conditionFunction(saveFile) === true &&
          o.x === location.x &&
          o.y === location.y,
      ) as OnStepPortal | undefined,
    [currentOccupants, location.x, location.y, saveFile],
  );
  const steptOnDialogue: OnStepDialogue | undefined = useMemo(
    () =>
      currentOccupants.find(
        (o) =>
          o.type === "ON_STEP_DIALOGUE" &&
          o.conditionFunction &&
          o.conditionFunction(saveFile) === true &&
          o.x === location.x &&
          o.y === location.y,
      ) as OnStepDialogue | undefined,
    [currentOccupants, location.x, location.y, saveFile],
  );
  const steptOnRouter: OnStepRouter | undefined = useMemo(
    () =>
      currentOccupants.find(
        (o) =>
          o.type === "ON_STEP_ROUTER" &&
          o.conditionFunction &&
          o.conditionFunction(saveFile) === true &&
          o.x === location.x &&
          o.y === location.y,
      ) as OnStepRouter | undefined,
    [currentOccupants, location.x, location.y, saveFile],
  );
  const shouldStartEncounterWithTerrain = useMemo(():
    | "WATER"
    | "GROUND"
    | undefined => {
    if (map.peaceful) {
      return;
    }
    if (isFlying) {
      return;
    }
    if (
      map.tileMap.encounterLayer.at(location.y) &&
      map.tileMap.encounterLayer.at(location.y)?.at(location.x) &&
      encounterChance > Math.random()
    ) {
      return "GROUND";
    }
    if (
      map.tileMap.waterLayer.at(location.y) &&
      map.tileMap.waterLayer.at(location.y)?.at(location.x) &&
      canSwim &&
      encounterChance > Math.random()
    ) {
      return "WATER";
    }
  }, [
    canSwim,
    encounterChance,
    isFlying,
    location,
    map.peaceful,
    map.tileMap.encounterLayer,
    map.tileMap.waterLayer,
  ]);

  const startEncounter = useStartEncounter();

  useEffect(() => {
    const engine = setTimeout(() => {
      //stop movement if in dialogue or transition
      if (latestMessage && saveFile.meta.activeTab === "OVERWORLD") {
        setNextInput(undefined);
        patchSaveFileReducer({
          meta: {
            ...saveFile.meta,
            currentChallenger: undefined,
          },
        });
      } else if (transition) {
        setNextInput(undefined);
      }
      //reset player feet if there is no more input
      else if (
        !nextInput &&
        !["CENTER1", "CENTER2"].includes(location.forwardFoot)
      ) {
        setLocation({
          ...location,
          forwardFoot: getNextForwardFoot(location.forwardFoot),
        });
      }
      //handle portals
      else if (steptOnPortal && !transition) {
        activateTransition({
          effect: "rows",
          onRemoval: () => {
            setLocation(steptOnPortal.portal);
            setEncounterChance(baseEncounterRate);
          },
        });
      }
      //handle dialogues
      else if (steptOnDialogue) {
        addMultipleMessages(
          steptOnDialogue.dialogue.map((d) => ({
            message: d,
          })),
        );
        patchSaveFileReducer({
          ...startBlocker(saveFile, steptOnDialogue.id, -1),
        });
        setNextInput(undefined);
        setEncounterChance(baseEncounterRate);
        return;
      }
      //handle routers
      else if (steptOnRouter) {
        patchSaveFileReducer({
          ...saveFile,
          meta: { ...saveFile.meta, activeTab: steptOnRouter.route },
        });
        setNextInput(undefined);
        setEncounterChance(baseEncounterRate);
        return;
      }
      //maybe start encounter
      else if (shouldStartEncounterWithTerrain) {
        setEncounterChance(baseEncounterRate);
        startEncounter(stepsTaken, shouldStartEncounterWithTerrain);
      }
      //rotate or walk player
      else if (nextInput && nextInput !== location.orientation) {
        //rotate if standing
        if (location.forwardFoot === "CENTER1") {
          setLocation({
            ...location,
            orientation: nextInput,
            forwardFoot: getNextForwardFoot(location.forwardFoot),
          });
        }
        //walk corner without stopping
        else {
          setStepsTaken(stepsTaken + 1);
          setEncounterChance((cur) => cur + 0.01);
          setLocation({
            ...location,
            ...updatePosition(
              location,
              nextInput,
              map,
              currentOccupants,
              canSwim,
              isFlying,
              canRockClimb,
            ),
            orientation: nextInput,
            forwardFoot: getNextForwardFoot(location.forwardFoot),
          });
        }
      }
      //walk player
      else if (nextInput && nextInput === location.orientation) {
        setStepsTaken(stepsTaken + 1);
        setEncounterChance((cur) => cur + 0.01);
        setLocation({
          ...location,
          ...updatePosition(
            location,
            nextInput,
            map,
            currentOccupants,
            canSwim,
            isFlying,
            canRockClimb,
          ),
          forwardFoot: getNextForwardFoot(location.forwardFoot),
        });
      }
      //remove input after handling
      setNextInput(undefined);
    }, fps);
    return () => clearTimeout(engine);
  }, [
    activateTransition,
    addMultipleMessages,
    canRockClimb,
    canSwim,
    currentOccupants,
    shouldStartEncounterWithTerrain,
    isFlying,
    latestMessage,
    location,
    map,
    nextInput,
    patchSaveFileReducer,
    saveFile,
    setLocation,
    setStepsTaken,
    startEncounter,
    stepsTaken,
    steptOnDialogue,
    steptOnPortal,
    steptOnRouter,
    transition,
  ]);

  return addInput;
};
