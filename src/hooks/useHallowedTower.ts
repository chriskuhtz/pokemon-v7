import { useContext, useCallback } from 'react';
import { v4 } from 'uuid';
import { testOpponent } from '../constants/gameData';
import { getTimeOfDay } from '../functions/getTimeOfDay';
import { joinInventories } from '../interfaces/Inventory';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useHallowedTower = () => {
	const { putSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(() => {
		if (saveFile.inventory['odd-keystone'] < 1) {
			addMultipleMessages([
				{ message: 'The Keystone seems to be missing from this broken tower' },
				{ message: 'How Odd...' },
			]);
			return;
		}
		if (getTimeOfDay() !== 'NIGHT') {
			addMultipleMessages([
				{ message: 'You get the ominous feeling,' },
				{ message: 'that you should return at night' },
			]);
			return;
		}

		addMultipleMessages([
			{ message: 'You put the odd keystone back into its spot' },
			{ message: '... and hide nearby', needsNoConfirmation: true },
			{ message: '...waiting', needsNoConfirmation: true },
			{ message: '..waiting.', needsNoConfirmation: true },
			{ message: '.waiting..', needsNoConfirmation: true },
			{
				message: 'A wild Pokemon emerges from the ruin!',
				needsNoConfirmation: true,
				onRemoval: () => {
					//Start encounter
					putSaveFileReducer({
						...saveFile,
						inventory: joinInventories(
							saveFile.inventory,
							{ 'odd-keystone': 1 },
							true
						),
						meta: {
							activeTab: 'BATTLE',
							currentChallenger: {
								team: [
									{
										...testOpponent,
										dexId: 442,
										xp: 2000,
										id: v4(),
										caughtOnMap: saveFile.location.mapId,
									},
								],
							},
						},
					});
				},
			},
		]);
	}, [addMultipleMessages, putSaveFileReducer, saveFile]);
};
