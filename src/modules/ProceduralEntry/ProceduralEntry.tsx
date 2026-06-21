import { useContext } from "react";
import { BsBackpack4 } from "react-icons/bs";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { calculateLevelData } from "../../functions/calculateLevelData";
import {
  getTotalInventoryAmount,
  isBagOverloaded,
} from "../../functions/getBagLimit";
import { generateStrangeDimension } from "../../functions/procedural";
import { LocationContext } from "../../hooks/LocationProvider";
import { GameDataContext } from "../../hooks/useGameData";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { EmptyInventory, joinInventories } from "../../interfaces/Inventory";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";

const proceduralMapId = "procedural";

export const ProceduralEntry = (): JSX.Element => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { setLocation } = useContext(LocationContext);
  const navigate = useNavigate();
  const gameData = useContext(GameDataContext);

  const bagIsEmpty = getTotalInventoryAmount(saveFile.bag) === 0;
  const team = saveFile.pokemon.filter((p) => p.onTeam);
  const pokemonAreValid =
    team.length === 1 &&
    team.every((p) => {
      const { level } = calculateLevelData(p.xp, p.growthRate);
      return level === 5;
    });

  const storeAllItems = () => {
    patchSaveFileReducer({
      storage: joinInventories(saveFile.storage, saveFile.bag),
      bag: EmptyInventory,
    });
  };
  const choosePokemon = (id: string) => {
    patchSaveFileReducer({
      pokemon: saveFile.pokemon.map((p) => {
        if (p.id === id) {
          return { ...p, xp: 125 };
        }
        return { ...p, onTeam: false };
      }),
    });
  };

  const enterStrangeDimension = () => {
    const generatedMap = generateStrangeDimension(
      30,
      30,
      gameData.startingLocation,
      5,
    );

    window.localStorage.setItem(proceduralMapId, JSON.stringify(generatedMap));
    patchSaveFileReducer({
      strangeDimensionLevel: 5,
    });
    setLocation({
      x: 0,
      y: 0,
      orientation: "DOWN",
      mapId: proceduralMapId,
      map: generatedMap,
      forwardFoot: "CENTER1",
    });
    navigate("PROCEDURAL_ENTRY", "OVERWORLD");
  };
  return (
    <InGamePage
      headline="Enter the strange dimension"
      goBack={() => navigate("PROCEDURAL_ENTRY", "OVERWORLD")}
    >
      <Stack alignItems="stretch" mode="column">
        {!bagIsEmpty && (
          <Card
            icon={<BsBackpack4 />}
            content={<strong>You may not bring any items</strong>}
            actionElements={[
              <button onClick={() => storeAllItems()}>Store all Items</button>,
            ]}
          />
        )}
        {!pokemonAreValid && (
          <Card
            icon={<BsBackpack4 />}
            content={<strong>You may only bring one level 5 Pokemon</strong>}
            actionElements={team.map((t) => {
              return (
                <button onClick={() => choosePokemon(t.id)}>
                  Set {t.name} to level 5 and store the others
                </button>
              );
            })}
          />
        )}
        <button
          disabled={!bagIsEmpty || !pokemonAreValid}
          onClick={enterStrangeDimension}
        >
          Enter the strange dimension
        </button>
      </Stack>
    </InGamePage>
  );
};

export const ProceduralContinue = (): JSX.Element => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { setLocation, resetLocation } = useContext(LocationContext);
  const navigate = useNavigate();
  const gameData = useContext(GameDataContext);

  const bagIsOverloaded = isBagOverloaded(saveFile, gameData);

  const continueDeeper = () => {
    const newLevel = (saveFile.strangeDimensionLevel ?? 5) + 1;
    const generatedMap = generateStrangeDimension(
      30,
      30,
      gameData.startingLocation,
      newLevel,
    );
    patchSaveFileReducer({
      strangeDimensionLevel: newLevel,
      mileStones: {
        ...saveFile.mileStones,
        strangeDimensionHighScore: Math.max(
          saveFile.mileStones.strangeDimensionHighScore ?? 0,
          newLevel,
        ),
      },
    });
    window.localStorage.setItem(proceduralMapId, JSON.stringify(generatedMap));
    setLocation({
      x: 0,
      y: 0,
      orientation: "DOWN",
      mapId: proceduralMapId,
      map: generatedMap,
      forwardFoot: "CENTER1",
    });
    navigate("PROCEDURAL_ENTRY", "OVERWORLD");
  };
  const returnToCamp = () => {
    patchSaveFileReducer({
      strangeDimensionLevel: undefined,
    });
    window.localStorage.removeItem(proceduralMapId);
    resetLocation();
    navigate("PROCEDURAL_ENTRY", "OVERWORLD");
  };
  return (
    <InGamePage
      headline="Enter the strange dimension"
      goBack={() => navigate("PROCEDURAL_CONTINUE", "OVERWORLD")}
    >
      <Stack alignItems="stretch" mode="column">
        {bagIsOverloaded && (
          <Card
            icon={<BsBackpack4 />}
            content={<strong>You are carrying too many items</strong>}
            actionElements={[]}
          />
        )}

        <button disabled={bagIsOverloaded} onClick={continueDeeper}>
          Continue deeper into the strangeness
        </button>
        <button disabled={bagIsOverloaded} onClick={returnToCamp}>
          Return to camp
        </button>
      </Stack>
    </InGamePage>
  );
};
