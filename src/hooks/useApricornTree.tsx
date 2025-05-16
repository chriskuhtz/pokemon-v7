import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { getMiddleOfThree } from '../functions/getMiddleOfThree';
import { joinInventories } from '../interfaces/Inventory';
import { ApricornTree } from '../interfaces/OverworldMap';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useApricornTree = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	return useCallback(
		(tree: ApricornTree) => {
			const amount = getMiddleOfThree([1, Math.floor(Math.random() * 5), 5]);
			const now = new Date().getTime();
			addMessage({ message: `Harvested ${amount} ${tree.apricorn}` });
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, { [tree.apricorn]: amount }),
				handledOccupants: [
					...saveFile.handledOccupants,
					{ id: tree.id, resetAt: now + ONE_HOUR * 2 },
				],
			});
		},
		[addMessage, patchSaveFileReducer, saveFile.bag, saveFile.handledOccupants]
	);
};
