import { useContext, useCallback } from 'react';
import {
	OPPO_ID,
	makeChallengerPokemon,
} from '../functions/makeChallengerPokemon';
import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory } from '../interfaces/Inventory';
import { OverworldPokemon } from '../interfaces/OverworldMap';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useStaticEncounter = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	const interact = useCallback(
		(occ: OverworldPokemon) => {
			if (!occ.encounter) {
				return;
			} else {
				const challenger: Challenger = {
					type: 'WILD',
					id: OPPO_ID,
					inventory: EmptyInventory,
					team: [
						makeChallengerPokemon({
							name: occ.encounter.name,
							xp: occ.encounter.maxXp,
						}),
					],
				};

				addMultipleMessages([
					{
						message: 'The wild pokemon attacks',
						onRemoval: () => {
							patchSaveFileReducer({
								mileStones: { ...saveFile.mileStones, hasWokenASnorlax: true },
								meta: { currentChallenger: challenger, activeTab: 'BATTLE' },
								handledOccupants: [
									...saveFile.handledOccupants,
									{ id: occ.id, resetAt: -1 },
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
			saveFile.handledOccupants,
			saveFile.mileStones,
		]
	);

	return interact;
};
