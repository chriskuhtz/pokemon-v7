import { useCallback, useContext, useMemo } from "react";
import { ONE_HOUR } from "../constants/baseConstants";
import { mapsRecord } from "../constants/gameData/maps/mapsRecord";
import { barryId } from "../constants/gameData/maps/occupants/barry";
import { challengeFieldOccupants } from "../constants/gameData/maps/occupants/challengeField";
import { cynthiaId } from "../constants/gameData/maps/occupants/cynthia";
import { hughId } from "../constants/gameData/maps/occupants/hugh";
import { lanceId } from "../constants/gameData/maps/occupants/lance";
import { nId } from "../constants/gameData/maps/occupants/n";
import { redId } from "../constants/gameData/maps/occupants/red";
import { silverId } from "../constants/gameData/maps/occupants/silver";
import { addPokemonToDex } from "../functions/addPokemonToDex";
import { ArrayHelpers } from "../functions/ArrayHelpers";
import { calculateLevelData } from "../functions/calculateLevelData";
import { determineLoot } from "../functions/determineLoot";
import { fullyHealPokemon } from "../functions/fullyHealPokemon";
import { getHeldItem } from "../functions/getHeldItem";
import { getHighestXpOnTeam } from "../functions/getHighestXpOnTeam";
import { getTeamSize } from "../functions/getTeamSize";
import { isKO } from "../functions/isKo";
import { reduceBattlePokemonToOwnedPokemon } from "../functions/reduceBattlePokemonToOwnedPokemon";
import {
  getCurrentBlocker,
  getCurrentSwarm,
  removeTroubleMakers,
  startBlocker,
} from "../functions/TimedEvent";
import { BattlePokemon } from "../interfaces/BattlePokemon";
import {
  EmptyInventory,
  Inventory,
  joinInventories,
} from "../interfaces/Inventory";
import { isKeyItem, pickupTable } from "../interfaces/Item";
import { OwnedPokemon } from "../interfaces/OwnedPokemon";
import { CatchStreak } from "../interfaces/SaveFile";
import { LocationContext } from "./LocationProvider";
import { GameDataContext } from "./useGameData";
import { useReset } from "./useReset";
import { SaveFileContext } from "./useSaveFile";

export interface LeaveBattlePayload {
  caughtPokemon: BattlePokemon[];
  updatedInventory: Inventory;
  scatteredCoins: number;
  team: BattlePokemon[];
  outcome: "WIN" | "LOSS" | "DRAW";
  defeatedPokemon: BattlePokemon[];
  defeatedChallengerId?: string;
  lootPossible: boolean;
}
export const useLeaveBattle = () => {
  const handleLoss = useHandleLoss();
  const handleWin = useHandleWin();
  const handleDraw = useHandleDraw();

  return useCallback(
    (payload: LeaveBattlePayload) => {
      if (payload.outcome === "LOSS") {
        handleLoss();
      }
      if (payload.outcome === "DRAW") {
        handleDraw();
      } else {
        handleWin(payload);
      }
    },
    [handleDraw, handleLoss, handleWin],
  );
};

const useHandleLoss = () => {
  const { location, resetLocation } = useContext(LocationContext);
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const reset = useReset();

  return useCallback(() => {
    const resetTime = () => {
      if (
        saveFile.settings?.rogueLike ||
        saveFile.settings?.releaseFaintedPokemon
      ) {
        return (
          //dont reset on challenge field and camp
          location.mapId !== "camp" &&
          location.mapId !== "challengeField" &&
          location.mapId !== "randomField"
        );
      }
      return false;
    };
    if (resetTime()) {
      reset();
      return;
    } else {
      let updatedBag: Inventory = saveFile.bag;

      if (location.mapId === "camp") {
        updatedBag = saveFile.bag;
      } else {
        const lossChance = saveFile.trait === "explorer" ? 0.5 : 0.75;
        updatedBag = joinInventories(
          EmptyInventory,
          Object.fromEntries(
            Object.entries(saveFile.bag).filter(
              ([item]) => isKeyItem(item) || Math.random() > lossChance,
            ),
          ),
        );
      }

      resetLocation();
      patchSaveFileReducer({
        ...removeTroubleMakers(saveFile, "ESCAPED"),
        meta: { activeTab: "OVERWORLD", currentChallenger: undefined },
        pokemon: saveFile.pokemon.map((p) => {
          if (p.onTeam) {
            return fullyHealPokemon(p);
          }
          return p;
        }),
        bag: updatedBag,
      });
      return;
    }
  }, [location, patchSaveFileReducer, reset, saveFile, resetLocation]);
};

const useHandleDraw = () => {
  const { patchSaveFileReducer } = useContext(SaveFileContext);

  return useCallback(() => {
    patchSaveFileReducer({
      meta: { activeTab: "OVERWORLD", currentChallenger: undefined },
    });
  }, [patchSaveFileReducer]);
};

const useHandleWin = () => {
  const { location } = useContext(LocationContext);
  const gameData = useContext(GameDataContext);
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);

  const team = useMemo(
    () => saveFile.pokemon.filter((p) => p.onTeam),
    [saveFile],
  );

  return useCallback(
    (payload: LeaveBattlePayload) => {
      const {
        team: updatedTeam,
        updatedInventory,
        caughtPokemon,
        scatteredCoins,
        outcome,
        defeatedChallengerId,
      } = payload;
      const configCheckedTeam = updatedTeam.filter((p) => {
        //pokemon that faint on training field are not released
        if (
          saveFile.settings?.releaseFaintedPokemon &&
          isKO(p) &&
          location.mapId !== "camp"
        ) {
          return false;
        }

        return true;
      });

      const ownedTeam = configCheckedTeam.map((p) =>
        reduceBattlePokemonToOwnedPokemon(p),
      );
      //check pickup
      const pickUpCheckedTeam: OwnedPokemon[] = ownedTeam.map((p) => {
        if (p.ability === "pickup" && !getHeldItem(p) && Math.random() < 0.1) {
          return {
            ...p,
            heldItemName: ArrayHelpers.getRandomEntry(pickupTable),
          };
        }
        if (p.ability === "honey-gather" && !getHeldItem(p)) {
          const lvl = calculateLevelData(p.xp, p.growthRate).level;
          const chance = 0.05 + lvl * 0.0045;
          if (Math.random() < chance) {
            return { ...p, heldItemName: "honey" };
          }
        }

        return p;
      });

      const teamAndCaught = [
        ...pickUpCheckedTeam,
        ...caughtPokemon.map((c) => ({
          ...reduceBattlePokemonToOwnedPokemon(
            { ...c, ownerId: saveFile.playerId },
            c.ball === "heal-ball",
          ),
          caughtAtDate: new Date().getTime(),
          caughtOnMap: location.mapId,
        })),
      ].map((t, i) => ({ ...t, onTeam: i < getTeamSize(saveFile, gameData) }));

      const updatedPokemon = [
        ...teamAndCaught,
        ...saveFile.pokemon.filter((p) => !team.some((t) => t.id === p.id)),
      ];

      const alreadyDefeated =
        defeatedChallengerId &&
        getCurrentBlocker(saveFile, defeatedChallengerId);
      const gainedResearchPoints = () => {
        if (
          location.mapId === "challengeField" ||
          location.mapId === "randomField"
        ) {
          return 0;
        }
        if (outcome !== "WIN") {
          return 0;
        }
        if (!defeatedChallengerId) {
          return 0;
        }
        if (alreadyDefeated) {
          return 0;
        }

        return 1;
      };

      let updatedSwarmRecord = [...saveFile.mileStones.caughtFromSwarms];
      let updatedCatchStreak: CatchStreak | undefined = saveFile.catchStreak;

      const swarm = getCurrentSwarm(saveFile, undefined);

      caughtPokemon.forEach((c) => {
        if (swarm && c.name === swarm?.pokemon) {
          updatedSwarmRecord.push(c.name);
        }
        if (updatedCatchStreak && c.name !== updatedCatchStreak.pokemon) {
          updatedCatchStreak = {
            pokemon: c.name,
            mapId: location.mapId,
            streak: 1,
          };
        } else if (!updatedCatchStreak) {
          updatedCatchStreak = {
            pokemon: c.name,
            mapId: location.mapId,
            streak: 1,
          };
        } else if (
          updatedCatchStreak &&
          c.name === updatedCatchStreak.pokemon
        ) {
          updatedCatchStreak = {
            ...updatedCatchStreak,
            streak: updatedCatchStreak?.streak + 1,
          };
        }
      });
      updatedSwarmRecord = [...new Set(updatedSwarmRecord)];

      const pokedex = { ...saveFile.pokedex };
      caughtPokemon.forEach((p) =>
        addPokemonToDex(pokedex, p.name, p.caughtOnMap, true),
      );

      const challengeFieldRank = challengeFieldOccupants
        .filter((t) => t.type === "TRAINER")
        .find((c) => c.id === defeatedChallengerId)?.challengeFieldRank;
      const randomFieldRank = defeatedChallengerId?.includes(
        mapsRecord.randomField.id,
      )
        ? Number(defeatedChallengerId.split("_")[1])
        : undefined;

      const updatedMileStones = { ...saveFile.mileStones };

      if (challengeFieldRank !== undefined) {
        if (!updatedMileStones.challengeFieldRecord) {
          updatedMileStones.challengeFieldRecord = challengeFieldRank;
        }
        if (challengeFieldRank > updatedMileStones.challengeFieldRecord) {
          updatedMileStones.challengeFieldRecord = challengeFieldRank;
        }
      }
      if (randomFieldRank !== undefined) {
        if (!updatedMileStones.randomFieldRecord) {
          updatedMileStones.randomFieldRecord = randomFieldRank;
        }
        if (randomFieldRank > updatedMileStones.randomFieldRecord) {
          updatedMileStones.randomFieldRecord = randomFieldRank;
        }
      }
      const xp = getHighestXpOnTeam(updatedPokemon);
      if (defeatedChallengerId === barryId) {
        if (
          !updatedMileStones.barryDefeatedAt ||
          xp > updatedMileStones.barryDefeatedAt
        ) {
          updatedMileStones.barryDefeatedAt = xp;
        }
      }
      if (defeatedChallengerId === silverId) {
        if (
          !updatedMileStones.silverDefeatedAt ||
          xp > updatedMileStones.silverDefeatedAt
        ) {
          updatedMileStones.silverDefeatedAt = xp;
        }
      }
      if (defeatedChallengerId === cynthiaId) {
        if (
          !updatedMileStones.cynthiaDefeatedAt ||
          xp > updatedMileStones.cynthiaDefeatedAt
        ) {
          updatedMileStones.cynthiaDefeatedAt = xp;
        }
      }
      if (defeatedChallengerId === nId) {
        if (
          !updatedMileStones.nDefeatedAt ||
          xp > updatedMileStones.nDefeatedAt
        ) {
          updatedMileStones.nDefeatedAt = xp;
        }
      }
      if (defeatedChallengerId === redId) {
        if (
          !updatedMileStones.redDefeatedAt ||
          xp > updatedMileStones.redDefeatedAt
        ) {
          updatedMileStones.redDefeatedAt = xp;
        }
      }
      if (defeatedChallengerId === hughId) {
        if (
          !updatedMileStones.hughDefeatedAt ||
          xp > updatedMileStones.hughDefeatedAt
        ) {
          updatedMileStones.hughDefeatedAt = xp;
        }
      }
      if (defeatedChallengerId === lanceId) {
        if (
          !updatedMileStones.lanceDefeatedAt ||
          xp > updatedMileStones.lanceDefeatedAt
        ) {
          updatedMileStones.lanceDefeatedAt = xp;
        }
      }
      if (
        saveFile.importedChallenger &&
        defeatedChallengerId === saveFile.importedChallenger?.id
      ) {
        const challengerXp = getHighestXpOnTeam(
          saveFile.importedChallenger?.team,
        );
        if (
          !updatedMileStones.importedChallengerDefeatedAt ||
          challengerXp > updatedMileStones.importedChallengerDefeatedAt
        ) {
          updatedMileStones.importedChallengerDefeatedAt = challengerXp;
        }
      }
      updatedMileStones.caughtFromSwarms = updatedSwarmRecord;

      const resetTime = () => {
        //Todo: refactor this into the challenger config
        if (
          defeatedChallengerId &&
          [barryId, nId, cynthiaId, silverId, redId, hughId].includes(
            defeatedChallengerId,
          )
        ) {
          return ONE_HOUR;
        }

        return -1;
      };

      const loot = determineLoot({
        ...payload,
        isRogue: saveFile.trait === "rogue",
      });

      patchSaveFileReducer({
        ...(defeatedChallengerId
          ? startBlocker(saveFile, defeatedChallengerId, resetTime())
          : saveFile),
        bag: updatedInventory,
        money: saveFile.money + scatteredCoins,
        pokemon: updatedPokemon,
        meta: loot
          ? { activeTab: "LOOT", loot, currentChallenger: undefined }
          : { activeTab: "OVERWORLD", currentChallenger: undefined },
        researchPoints: saveFile.researchPoints + gainedResearchPoints(),
        mileStones: updatedMileStones,
        pokedex,
        catchStreak: updatedCatchStreak,
      });
    },
    [gameData, location.mapId, patchSaveFileReducer, saveFile, team],
  );
};
