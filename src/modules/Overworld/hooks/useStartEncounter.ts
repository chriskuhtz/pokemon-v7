import { useCallback, useContext } from "react";
import { mapsRecord } from "../../../constants/gameData/maps/mapsRecord";
import { determineWildPokemon } from "../../../functions/determineWildPokemon";
import { getRandomPokemonName } from "../../../functions/getRandomPokemonId";
import { isOwnedPokemonKO } from "../../../functions/isKo";
import { OPPO_ID } from "../../../functions/makeChallengerPokemon";
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

  return useCallback(
    (stepsTaken: number, type: "WATER" | "GROUND") => {
      const map = mapsRecord[location.mapId];
      const shinyFactor = saveFile.bag["shiny-charm"] > 1 ? 4 : 1;

      const playerTeam = saveFile.pokemon.filter((p) => p.onTeam);
      const healthyPlayerTeam = playerTeam.filter(
        (p) => !isOwnedPokemonKO(p),
      ).length;

      const { team, battleTeamConfig } = determineWildPokemon({
        mapId: location.mapId,
        quests: saveFile.quests,
        waterEncounter: type === "WATER",
        shinyFactor,
        lure: saveFile.activatedLure,
        catchStreak: saveFile.catchStreak,
        currentSwarm: saveFile.currentSwarm,
        currentStrongSwarm: saveFile.currentStrongSwarm,
        currentDistortionSwarm: saveFile.currentDistortionSwarm,
        internalDex: gameData.internalDex,
        maxBattleSize: Math.min(
          ...[
            healthyPlayerTeam,
            map.encounterGroupLimit ?? gameData.defaultBattleSize,
          ],
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
      activateTransition,
      gameData.defaultBattleSize,
      gameData.internalDex,
      location.mapId,
      navigateAwayFromOverworldReducer,
      saveFile.activatedLure,
      saveFile.bag,
      saveFile.catchStreak,
      saveFile.currentDistortionSwarm,
      saveFile.currentStrongSwarm,
      saveFile.currentSwarm,
      saveFile.pokemon,
      saveFile.quests,
      saveFile.settings?.randomEncounters,
    ],
  );
};
