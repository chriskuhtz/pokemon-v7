import { useCallback, useContext, useMemo } from "react";
import { calculateLevelData } from "../../../functions/calculateLevelData";
import { determineWildPokemon } from "../../../functions/determineWildPokemon";
import { getRandomPokemonName } from "../../../functions/getRandomPokemonId";
import { isOwnedPokemonKO } from "../../../functions/isKo";
import { OPPO_ID } from "../../../functions/makeChallengerPokemon";
import {
  getCurrentLure,
  getCurrentRepel,
  getCurrentSwarm,
} from "../../../functions/TimedEvent";
import { LocationContext } from "../../../hooks/LocationProvider";
import { GameDataContext } from "../../../hooks/useGameData";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { ScreenTransitionContext } from "../../../hooks/useScreenTransitionEffects";
import { Challenger } from "../../../interfaces/Challenger";
import { EmptyInventory } from "../../../interfaces/Inventory";

export const useStartEncounter = () => {
  const { navigateAwayFromOverworldReducer } = useContext(SaveFileContext);
  const { activateTransition } = useContext(ScreenTransitionContext);
  const { location } = useContext(LocationContext);
  const { saveFile } = useContext(SaveFileContext);
  const gameData = useContext(GameDataContext);

  const currentRepel = useMemo(() => getCurrentRepel(saveFile), [saveFile]);
  const swarm = getCurrentSwarm(saveFile, "WEAK");
  const strongSwarm = getCurrentSwarm(saveFile, "STRONG");
  const distortionSwarm =
    getCurrentSwarm(saveFile, "PAST_DISTORTION") ??
    getCurrentSwarm(saveFile, "FUTURE_DISTORTION") ??
    getCurrentSwarm(saveFile, "SPACE_DISTORTION");

  return useCallback(
    (stepsTaken: number, type: "WATER" | "GROUND") => {
      let shinyFactor = 1;

      if (saveFile.bag["shiny-charm"] > 1) {
        shinyFactor *= 4;
      }
      if (saveFile.trait === "collector") {
        shinyFactor *= 2;
      }
      const playerTeam = saveFile.pokemon.filter((p) => p.onTeam);
      const healthyPlayerTeam = playerTeam.filter(
        (p) => !isOwnedPokemonKO(p),
      ).length;

      const { team, battleTeamConfig } = determineWildPokemon({
        mapId: location.mapId,
        quests: saveFile.quests,
        waterEncounter: type === "WATER",
        shinyFactor,
        lure: getCurrentLure(saveFile)?.lureType,
        catchStreak: saveFile.catchStreak,
        currentSwarm: swarm,
        currentStrongSwarm: strongSwarm,
        currentDistortionSwarm: distortionSwarm,
        internalDex: gameData.internalDex,
        maxBattleSize: Math.min(
          ...[healthyPlayerTeam, gameData.defaultBattleSize],
        ),
      });

      let wildPokemon = [...team];

      if (saveFile.settings?.randomEncounters) {
        wildPokemon = wildPokemon.map((mon) => ({
          ...mon,
          name: getRandomPokemonName(),
        }));
      }

      const challenger: Challenger = {
        type: "WILD",
        id: OPPO_ID,
        inventory: EmptyInventory,
        team: wildPokemon,
        battleTeamConfig,
      };
      //repels

      if (
        currentRepel?.repelType === "repel" &&
        challenger.team.every(
          (t) => calculateLevelData(t.xp, "medium").level <= 20,
        )
      ) {
        return;
      }
      if (
        currentRepel?.repelType === "super-repel" &&
        challenger.team.every(
          (t) => calculateLevelData(t.xp, "medium").level <= 40,
        )
      ) {
        return;
      }
      if (
        currentRepel?.repelType === "max-repel" &&
        challenger.team.every(
          (t) => calculateLevelData(t.xp, "medium").level <= 60,
        )
      ) {
        return;
      }
      activateTransition({
        effect: "random_squares",
        onRemoval: () =>
          navigateAwayFromOverworldReducer(
            { activeTab: "BATTLE", currentChallenger: challenger },
            stepsTaken,
          ),
      });
    },
    [
      location.mapId,
      saveFile,
      swarm,
      strongSwarm,
      distortionSwarm,
      gameData.internalDex,
      gameData.defaultBattleSize,
      currentRepel?.repelType,
      activateTransition,
      navigateAwayFromOverworldReducer,
    ],
  );
};
