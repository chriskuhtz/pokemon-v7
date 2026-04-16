import { useContext, useCallback } from "react";
import { PokemonSprite } from "../components/PokemonSprite/PokemonSprite";
import { getTeamSize } from "../functions/getTeamSize";
import { receiveNewPokemonFunction } from "../functions/receiveNewPokemonFunction";
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
              ...saveFile,
              pokemon: receiveNewPokemonFunction(
                { ...occ.pokemon, ownerId: saveFile.playerId },
                saveFile.pokemon,
                getTeamSize(saveFile, gameData),
              ),
              handledOccupants: [
                ...saveFile.handledOccupants,
                { id: occ.id, resetAt: -1 },
              ],
            }),
          icon: <PokemonSprite name={occ.pokemon.name} />,
        },
      ]);
    },
    [addMultipleMessages, gameData, patchSaveFileReducer, saveFile],
  );
};
