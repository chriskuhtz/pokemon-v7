import { useCallback, useContext } from "react";
import { PokemonSprite } from "../components/PokemonSprite/PokemonSprite";
import { getTeamSize } from "../functions/getTeamSize";
import { receiveNewPokemonFunction } from "../functions/receiveNewPokemonFunction";
import { startBlocker } from "../functions/TimedEvent";
import { OverworldPokeball } from "../interfaces/Occupant";
import { GameDataContext } from "./useGameData";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useInteractWithOverworldPokeball = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMultipleMessages } = useContext(MessageQueueContext);
  const gameData = useContext(GameDataContext);

  return useCallback(
    (occ: OverworldPokeball) => {
      addMultipleMessages([
        ...occ.dialogue.map((d) => ({
          message: d,
        })),
        {
          message: `Received a ${occ.pokemon.name}`,
          onRemoval: () =>
            patchSaveFileReducer({
              ...startBlocker(saveFile, occ.id, -1),
              pokemon: receiveNewPokemonFunction(
                { ...occ.pokemon, ownerId: saveFile.playerId },
                saveFile.pokemon,
                getTeamSize(saveFile, gameData),
              ),
            }),
          icon: <PokemonSprite name={occ.pokemon.name} />,
        },
      ]);
    },
    [addMultipleMessages, gameData, patchSaveFileReducer, saveFile],
  );
};
