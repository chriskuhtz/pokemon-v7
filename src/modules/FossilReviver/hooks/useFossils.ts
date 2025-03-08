import { useCallback, useContext, useMemo } from 'react';
import { testPokemon } from '../../../constants/gameData';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import { FossilType, fossilTable, isFossil } from '../../../interfaces/Item';
import { getRandomNature } from '../../../interfaces/Natures';
import { v4 } from 'uuid';

export const useFossils = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, putSaveFileReducer } = useContext(SaveFileContext);

	const fossils = useMemo(
		() =>
			Object.entries(saveFile.inventory).filter(
				([item, amount]) => amount > 0 && isFossil(item)
			) as [FossilType, number][],
		[saveFile]
	);

	const revive = useCallback(
		(fossil: FossilType) => {
			addMessage({
				message: `Revived the ${fossil} `,
			});
			putSaveFileReducer({
				...saveFile,
				inventory: joinInventories(saveFile.inventory, { [fossil]: 1 }, true),
				pokemon: [
					...saveFile.pokemon,
					{
						...testPokemon,
						dexId: fossilTable[fossil],
						id: v4(),
						xp: 1000,
						nature: getRandomNature(),
						onTeam: saveFile.pokemon.filter((p) => p.onTeam).length < 6,
					},
				],
			});
		},
		[addMessage, putSaveFileReducer, saveFile]
	);

	return { fossils, revive };
};
