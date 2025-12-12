import { useCallback, useContext } from 'react';
import { ONE_DAY } from '../constants/gameData/gameData';
import {
	OPPO_ID,
	makeChallengerPokemon,
} from '../functions/makeChallengerPokemon';
import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory } from '../interfaces/Inventory';
import { OverworldStrangeTree } from '../interfaces/Occupant';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useStrangeTree = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	const interact = useCallback(
		(occ: OverworldStrangeTree) => {
			if (saveFile.bag['sprayduck'] <= 0) {
				addMultipleMessages([
					{ message: 'This is a strange tree', needsNoConfirmation: true },
					{ message: 'Could it be a pokemon?', needsNoConfirmation: true },
				]);
				return;
			} else {
				const challenger: Challenger = {
					type: 'WILD',
					id: OPPO_ID,
					inventory: EmptyInventory,
					team: [
						makeChallengerPokemon({
							name: 'sudowoodo',
							xp: 64000,
						}),
					],
				};
				const now = new Date().getTime();

				addMultipleMessages([
					{ message: 'You water the tree with the sprayduck' },
					{
						message: 'The Tree attacks',
						onRemoval: () => {
							patchSaveFileReducer({
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
		]
	);

	return interact;
};
