import { useContext, useEffect } from "react";
import { getOpponentPokemon } from "../../../functions/getOpponentPokemon";
import { LocationContext } from "../../../hooks/LocationProvider";
import { GameDataContext } from "../../../hooks/useGameData";
import { MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { BattlePokemon } from "../../../interfaces/BattlePokemon";

export const useEndBattle = (
  battleWon: boolean,
  battleLost: boolean,
  leaveWithCurrentData: (
    outcome: "WIN" | "LOSS" | "DRAW",
    defeatedPokemon?: BattlePokemon[],
    leveledUpTeam?: BattlePokemon[],
  ) => void,
  pokemon: BattlePokemon[],
  team: BattlePokemon[],
  isTrainerBattle: boolean,
) => {
  const { saveFile } = useContext(SaveFileContext);
  const { settings } = saveFile;
  const { location } = useContext(LocationContext);
  const gameData = useContext(GameDataContext);
  const { losingMessages } = gameData;
  const { latestMessage, addMessage, addMultipleMessages } =
    useContext(MessageQueueContext);
  useEffect(() => {
    if (battleLost && !latestMessage) {
      const { rogueLike } = settings ?? {};
      console.log("effect battlelost");

      const message = () => {
        if (
          location.mapId === "camp" ||
          location.mapId === "challengeField" ||
          location.mapId === "randomField"
        ) {
          return losingMessages.training;
        }
        if (rogueLike) {
          return losingMessages.reset;
        }

        if (saveFile.trait === "explorer") {
          return losingMessages.explorer;
        }

        return losingMessages.wild;
      };
      addMessage({
        message: message(),
        onRemoval: () => leaveWithCurrentData("LOSS"),
      });
    }
    if (battleWon && !latestMessage) {
      console.log("effect battlewon");

      const defeatedPokemon = getOpponentPokemon(pokemon).filter(
        (p) => p.status === "FAINTED",
      );
      //   //REWARDS
      //   const { rewardedTeam, messages } = applyRewardsToTeam(
      //     team,
      //     defeatedPokemon,
      //     saveFile.trait === "competitor",
      //     isTrainerBattle,
      //     !!settings?.expShareActive,
      //     !!settings?.doubleXpRates,
      //   );

      addMultipleMessages(
        [
          // ...messages,
          {
            message: "You won the battle",
            onRemoval: () => leaveWithCurrentData("WIN", defeatedPokemon, team),
          },
        ].filter((m) => m !== undefined),
      );
    }
  }, [
    addMessage,
    addMultipleMessages,
    battleLost,
    battleWon,
    isTrainerBattle,
    latestMessage,
    leaveWithCurrentData,
    location.mapId,
    losingMessages.explorer,
    losingMessages.reset,
    losingMessages.training,
    losingMessages.wild,
    pokemon,
    saveFile.trait,
    settings,
    team,
  ]);
};
