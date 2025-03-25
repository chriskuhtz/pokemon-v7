import { useCallback, useContext, useMemo } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import {
	isFossil,
	isItem,
	isValuable,
	ItemType,
} from '../../../interfaces/Item';

export const useCurator = (): {
	trade: (tradeIn: ItemType) => void;
	possibleTradeIns: ItemType[];
} => {
	const { addMultipleMessages } = useContext(MessageQueueContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const possibleTradeIns = useMemo(() => {
		return Object.entries(saveFile.bag)
			.filter(([item, amount]) => {
				return amount > 0 && (isValuable(item) || isFossil(item));
			})
			.map(([item]) => item)
			.filter(isItem);
	}, [saveFile.bag]);

	const trade = useCallback(
		(tradeIn: ItemType) => {
			addMultipleMessages([
				{ message: `Received 1 Research Point for donating a ${tradeIn}` },
				{ message: 'Thanks for your contribution', needsNoConfirmation: true },
				{
					message: 'I will put in a good word with the university director',
					needsNoConfirmation: true,
				},
			]);
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, {
					[tradeIn]: -1,
				}),
				researchPoints: saveFile.researchPoints + 1,
			});
		},
		[
			addMultipleMessages,
			patchSaveFileReducer,
			saveFile.bag,
			saveFile.researchPoints,
		]
	);

	return { trade, possibleTradeIns };
};
