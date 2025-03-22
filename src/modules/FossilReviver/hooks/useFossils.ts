import { useCallback, useContext, useMemo } from 'react';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import { FossilType, fossilTable, isFossil } from '../../../interfaces/Item';
import { getRandomNature } from '../../../interfaces/Natures';

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
				message: `Revived the ${fossil} for 5 research points`,
			});
			putSaveFileReducer({
				...saveFile,
				inventory: joinInventories(saveFile.inventory, { [fossil]: 1 }, true),
				researchPoints: saveFile.researchPoints - 5,
				pokemon: [
					...saveFile.pokemon,
					makeChallengerPokemon({
						name: fossilTable[fossil],
						xp: 1000,
						nature: getRandomNature(),
						onTeam: saveFile.pokemon.filter((p) => p.onTeam).length < 6,
						ownerId: saveFile.playerId,
						weightModifier: Math.random(),
					}),
				],
			});
		},
		[addMessage, putSaveFileReducer, saveFile]
	);

	return { fossils, revive };
};
