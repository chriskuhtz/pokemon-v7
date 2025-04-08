import { useCallback, useContext } from 'react';
import { getTimeOfDay } from '../functions/getTimeOfDay';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../functions/makeChallengerPokemon';
import { EmptyInventory, joinInventories } from '../interfaces/Inventory';
import { getRandomNature } from '../interfaces/Natures';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useHallowedTower = () => {
	const { putSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(() => {
		if (saveFile.bag['odd-keystone'] < 1) {
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
						bag: joinInventories(saveFile.bag, { 'odd-keystone': 1 }, true),
						meta: {
							activeTab: 'BATTLE',
							currentChallenger: {
								type: 'WILD',
								id: OPPO_ID,
								inventory: EmptyInventory,
								team: [
									makeChallengerPokemon({
										nature: getRandomNature(),
										name: 'spiritomb',
										xp: 8000,
										caughtOnMap: saveFile.location.mapId,
									}),
								],
							},
						},
					});
				},
			},
		]);
	}, [addMultipleMessages, putSaveFileReducer, saveFile]);
};
