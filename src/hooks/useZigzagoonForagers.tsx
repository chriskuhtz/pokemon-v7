import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { getRandomEntry } from '../functions/filterTargets';
import { joinInventories } from '../interfaces/Inventory';
import { pickupTable } from '../interfaces/Item';
import { Occupant } from '../interfaces/OverworldMap';
import { SpriteEnum } from '../interfaces/SpriteEnum';
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
				zigzagoonReadyAt: Math.random() > 0.75 ? now + ONE_HOUR / 4 : undefined,
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
export const zigzagoonForagers: Occupant[] = [
	{
		type: 'NPC',
		unhandledMessage: [
			'My zigzagoon loves moomoo milk',
			'if you give him some',
			'He will zoom off',
			'and come back with an item',
			'I dont ask where he finds them',
		],
		gifts: { 'moomoo-milk': 3 },
		x: 14,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.bugCatcher,
		id: 'zigzagoon trainer',
		conditionFunction: (s) => s.campUpgrades['invite zigzagoon foragers'],
	},
	{
		type: 'ZIGZAGOON_FORAGER',
		dexId: 263,
		x: 13,
		y: 1,
		orientation: 'DOWN',
		id: 'ziggie',
		conditionFunction: (s) => s.campUpgrades['invite zigzagoon foragers'],
	},
];
