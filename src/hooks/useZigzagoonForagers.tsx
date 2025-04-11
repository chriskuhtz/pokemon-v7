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
		const now = new Date().getTime();

		if (
			(!saveFile.zigzagoonReadyAt || now > saveFile.zigzagoonReadyAt) &&
			saveFile.bag['moomoo-milk'] > 0
		) {
			const foragedItem = getRandomEntry(pickupTable);
			const amount = 1; // getRandomEntry([1, 2, 3, 4, 5]);
			addMultipleMessages([
				{ message: 'Zig Zig' },
				{ message: `You give Zigzagoon some moomoo-milk` },
				{ message: 'Zigzagoon runs off sniffing' },
				{ message: `And returns with ${amount} ${foragedItem}` },
			]);
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, {
					[foragedItem]: amount,
					'moomoo-milk': -1,
				}),
				zigzagoonReadyAt: Math.random() > 0.75 ? now + ONE_HOUR / 4 : undefined,
			});
		} else if (saveFile.bag['moomoo-milk'] <= 0) {
			addMultipleMessages([
				{ message: 'Zigzagoon looks ready to forage' },
				{ message: 'But You dont have any moomoo milk' },
			]);
			return;
		} else {
			addMessage({ message: 'Zigzagoon seems to need a little break' });
		}
	}, [
		addMessage,
		addMultipleMessages,
		patchSaveFileReducer,
		saveFile.bag,
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
		x: 9,
		y: 11,
		orientation: 'DOWN',
		sprite: SpriteEnum.bugCatcher,
		id: 'zigzagoon trainer',
		conditionFunction: (s) => s.campUpgrades['invite zigzagoon foragers'],
	},
	{
		type: 'ZIGZAGOON_FORAGER',
		dexId: 263,
		x: 10,
		y: 11,
		orientation: 'DOWN',
		id: 'ziggie',
		conditionFunction: (s) => s.campUpgrades['invite zigzagoon foragers'],
	},
];
