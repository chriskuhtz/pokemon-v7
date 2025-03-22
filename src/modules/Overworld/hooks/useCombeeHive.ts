import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../../../constants/gameData';
import { getMiddleOfThree } from '../../../functions/getMiddleOfThree';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';

export const useCombeeHive = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	return useCallback(() => {
		const now = new Date().getTime();
		if (!saveFile.honeyReadyAt || now > saveFile.honeyReadyAt) {
			const honeyAmounts = getMiddleOfThree([
				1,
				5,
				Math.floor(Math.random() * 6),
			]);
			addMessage({
				message: `Gathered ${honeyAmounts} Portions of honey from the hive  `,
			});

			patchSaveFileReducer({
				inventory: joinInventories(saveFile.inventory, { honey: honeyAmounts }),
				honeyReadyAt: now + Math.random() * ONE_HOUR,
			});
		} else {
			addMessage({
				message: 'The Combee are busy producing new honey',
				needsNoConfirmation: true,
			});
		}
	}, [
		addMessage,
		patchSaveFileReducer,
		saveFile.honeyReadyAt,
		saveFile.inventory,
	]);
};
