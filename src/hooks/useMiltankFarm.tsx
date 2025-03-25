import { useCallback, useContext, useMemo } from 'react';
import { joinInventories } from '../interfaces/Inventory';
import { BerryType, isBerry } from '../interfaces/Item';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useMiltankFarm = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const trade = useCallback(
		(berry: BerryType) => {
			addMessage({ message: `Traded 1 ${berry} for 1 moomoo-milk` });
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, {
					[berry]: -1,
					'moomoo-milk': 1,
				}),
			});
		},
		[addMessage, patchSaveFileReducer, saveFile.bag]
	);

	const tradeOptions: [BerryType, number][] = useMemo(
		() =>
			Object.entries(saveFile.bag).filter(
				([item, amount]) => amount > 0 && isBerry(item)
			) as [BerryType, number][],

		[saveFile.bag]
	);
	return {
		trade,
		tradeOptions,
	};
};
