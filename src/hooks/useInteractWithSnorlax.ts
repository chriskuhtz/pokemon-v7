import { useCallback, useContext } from 'react';
import { ONE_DAY } from '../constants/gameData/gameData';
import {
	OPPO_ID,
	makeChallengerPokemon,
} from '../functions/makeChallengerPokemon';
import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory } from '../interfaces/Inventory';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';
import { OverworldSnorlax } from '../interfaces/Occupant';

export const useInteractWithSnorlax = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	const interact = useCallback(
		(occ: OverworldSnorlax) => {
			if (saveFile.bag['poke-flute'] <= 0) {
				addMultipleMessages([
					{ message: 'Snorlax is sleeping deeply', needsNoConfirmation: true },
					{ message: 'Maybe a song could wake it', needsNoConfirmation: true },
				]);
				return;
			} else {
				const challenger: Challenger = {
					type: 'WILD',
					id: OPPO_ID,
					inventory: EmptyInventory,
					team: [
						makeChallengerPokemon({
							name: 'snorlax',
							xp: 64000,
						}),
					],
				};
				const now = new Date().getTime();

				addMultipleMessages([
					{ message: 'You play the pokeflute' },
					{ message: 'Snorlax wakes up grumpily ...' },
					{
						message: 'and attacks',
						onRemoval: () => {
							patchSaveFileReducer({
								mileStones: { ...saveFile.mileStones, hasWokenASnorlax: true },
								meta: { currentChallenger: challenger, activeTab: 'BATTLE' },
								handledOccupants: [
									...saveFile.handledOccupants,
									{ id: occ.id, resetAt: now + ONE_DAY },
								],
							});
						},
					},
				]);
			}
		},
		[
			addMultipleMessages,
			patchSaveFileReducer,
			saveFile.bag,
			saveFile.handledOccupants,
			saveFile.mileStones,
		]
	);

	return interact;
};
