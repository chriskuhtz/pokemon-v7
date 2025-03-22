import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { getRandomEntry } from '../functions/filterTargets';
import { joinInventories } from '../interfaces/Inventory';
import { pickupTable } from '../interfaces/Item';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useZigzagoonForagers = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages, addMessage } = useContext(MessageQueueContext);

	const trade = useCallback(() => {
		if (saveFile.inventory['moomoo-milk'] <= 0) {
			addMultipleMessages([
				{ message: 'Zigzagoon looks ready to forage' },
				{ message: 'But You dont have any moomoo milk' },
			]);
			return;
		}

		const now = new Date().getTime();

		if (!saveFile.zigzagoonReadyAt || now > saveFile.zigzagoonReadyAt) {
			const foragedItem = getRandomEntry(pickupTable);
			const amount = getRandomEntry([1, 2, 3, 4, 5]);
			addMultipleMessages([
				{ message: 'Zig Zig' },
				{ message: `You give Zigzagoon some moomoo-milk` },
				{ message: 'Zigzagoon runs off sniffing' },
				{ message: `And returns with ${amount} ${foragedItem}` },
			]);
			patchSaveFileReducer({
				inventory: joinInventories(saveFile.inventory, {
					[foragedItem]: amount,
					'moomoo-milk': -1,
				}),
				zigzagoonReadyAt: now + (Math.random() * ONE_HOUR) / 2,
			});
		} else {
			addMessage({ message: 'Zigzagoon seems to need a little break' });
		}
	}, [
		addMessage,
		addMultipleMessages,
		patchSaveFileReducer,
		saveFile.inventory,
		saveFile.zigzagoonReadyAt,
	]);

	return trade;
};
