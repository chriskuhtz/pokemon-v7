import { useCallback, useContext, useMemo } from "react";
import { calculateLevelData } from "../../../functions/calculateLevelData";
import { determineWildPokemon } from "../../../functions/determineWildPokemon";
import { getRandomPokemonName } from "../../../functions/getRandomPokemonId";
import { isOwnedPokemonKO } from "../../../functions/isKo";
import { OPPO_ID } from "../../../functions/makeChallengerPokemon";
import { getCurrentRepel } from "../../../functions/TimedEvent";
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
        saveFile,
        mapId: location.mapId,
        waterEncounter: type === "WATER",
        shinyFactor,
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
      gameData.internalDex,
      gameData.defaultBattleSize,
      currentRepel?.repelType,
      activateTransition,
      navigateAwayFromOverworldReducer,
    ],
  );
};
