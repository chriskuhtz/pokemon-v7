import { useCallback, useContext } from "react";
import { v4 } from "uuid";
import { battleSpriteSize } from "../constants/baseConstants";
import { allBst } from "../constants/baseStatRecord";
import { eggsByType } from "../constants/eggPossibilities";
import { ArrayHelpers } from "../functions/ArrayHelpers";
import { startBlocker } from "../functions/TimedEvent";
import { OverworldEgg } from "../interfaces/Occupant";
import { PokemonEgg } from "../interfaces/SaveFile";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const usePickUpEgg = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMultipleMessages } = useContext(MessageQueueContext);

  return useCallback(
    (egg: OverworldEgg) => {
      const pokemon = ArrayHelpers.getRandomEntry(eggsByType[egg.pokemonType]);
      const requiredSteps = allBst[pokemon] * 5;

      const fullEgg: PokemonEgg = {
        id: v4(),
        pokemon,
        type: egg.pokemonType,
        requiredSteps,
        steps: 0,
      };

      addMultipleMessages([
        {
          icon: (
            <img
              src={`./eggs/${egg.pokemonType}-egg.png`}
              height={battleSpriteSize}
            />
          ),
          message: `Its a ${egg.pokemonType} Pokemon Egg`,
        },
        { message: "The Nest seems abandoned" },
        { message: "I will care for it" },
      ]);
      patchSaveFileReducer({
        ...startBlocker(saveFile, egg.id, -1),
        eggs: [...(saveFile.eggs ?? []), fullEgg],
        mileStones: {
          ...saveFile.mileStones,
          foundEggTypes: [
            ...(saveFile.mileStones.foundEggTypes ?? []),
            egg.pokemonType,
          ],
        },
      });
    },
    [addMultipleMessages, patchSaveFileReducer, saveFile],
  );
};
