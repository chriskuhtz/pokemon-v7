import { useCallback, useContext, useMemo } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { joinInventories } from '../interfaces/Inventory';
import { BerryType, isBerry } from '../interfaces/Item';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useMiltankFarm = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const ready = useMemo(() => {
		const now = new Date().getTime();

		return !saveFile.miltankReadyAt || now > saveFile.miltankReadyAt;
	}, [saveFile.miltankReadyAt]);

	const trade = useCallback(
		(berry: BerryType) => {
			const now = new Date().getTime();

			addMessage({
				message: `Traded 1 ${berry} for 1 moomoo-milk`,
				needsNoConfirmation: true,
			});
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, {
					[berry]: -1,
					'moomoo-milk': 1,
				}),
				miltankReadyAt: Math.random() > 0.85 ? now + ONE_HOUR : undefined,
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
		ready,
	};
};
