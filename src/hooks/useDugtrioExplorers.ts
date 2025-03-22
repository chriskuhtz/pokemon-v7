import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { getRandomEntry } from '../functions/filterTargets';
import { joinInventories } from '../interfaces/Inventory';
import { undergroundTable } from '../interfaces/Item';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useDugtrioExplorers = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages, addMessage } = useContext(MessageQueueContext);

	const trade = useCallback(() => {
		if (saveFile.inventory['honey'] < 3) {
			addMultipleMessages([
				{ message: 'Dugtrio looks ready to dig around' },
				{ message: 'But You dont have enough honey for all three heads' },
			]);
			return;
		}
		const now = new Date().getTime();

		if (!saveFile.dugtrioReadyAt || now > saveFile.dugtrioReadyAt) {
			const foragedItem = getRandomEntry(undergroundTable);
			const amount = 1;
			addMultipleMessages([
				{ message: 'Trio Trio Trio' },
				{ message: `You give Dugtrio some honey` },
				{ message: 'Dugtrio vanishes underground' },
				{ message: `And returns with ${amount} ${foragedItem}` },
			]);
			patchSaveFileReducer({
				inventory: joinInventories(saveFile.inventory, {
					[foragedItem]: amount,
					honey: -3,
				}),
				dugtrioReadyAt: now + (Math.random() * ONE_HOUR) / 2,
			});
		} else {
			addMessage({ message: 'Dugtrio seems to need a little break' });
		}
	}, [
		addMessage,
		addMultipleMessages,
		patchSaveFileReducer,
		saveFile.dugtrioReadyAt,
		saveFile.inventory,
	]);

	return trade;
};
