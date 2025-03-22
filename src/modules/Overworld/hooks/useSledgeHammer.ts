import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../../../constants/gameData';
import { getRandomEntry } from '../../../functions/filterTargets';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import { undergroundTable } from '../../../interfaces/Item';
import { OverworldRock } from '../../../interfaces/OverworldMap';

export const useSledgeHammer = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(
		(rock: OverworldRock) => {
			if (saveFile.handledOccupants.some((occ) => occ.id === rock.id)) {
				return;
			}
			if (saveFile.campUpgrades['sledge hammer certification']) {
				const foundItem =
					Math.random() > 0.9 ? getRandomEntry(undergroundTable) : undefined;

				const updatedInventory = foundItem
					? joinInventories(saveFile.inventory, {
							[foundItem]: 1,
					  })
					: saveFile.inventory;
				addMultipleMessages([
					{
						message: 'You use your certified sledge hammer skills',
						onRemoval: () =>
							patchSaveFileReducer({
								handledOccupants: [
									...saveFile.handledOccupants,
									{ id: rock.id, resetAt: new Date().getTime() + ONE_HOUR },
								],
								inventory: updatedInventory,
							}),
					},
					{ message: `found 1 ${foundItem} in the rubble` },
				]);
			} else
				addMultipleMessages([
					{
						message: 'You need a sledge hammer certification to demolish rocks',
					},
					{ message: 'bureaucracy ...' },
				]);
			return;
		},
		[
			addMultipleMessages,
			patchSaveFileReducer,
			saveFile.campUpgrades,
			saveFile.handledOccupants,
			saveFile.inventory,
		]
	);
};
