import { useCallback, useContext } from 'react';
import { makeChallengerPokemon } from '../functions/makeChallengerPokemon';
import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory } from '../interfaces/Inventory';
import { OverworldPokemon } from '../interfaces/Occupant';
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
					id: occ.id,
					inventory: EmptyInventory,
					team: [
						makeChallengerPokemon({
							name: occ.encounter.name,
							xp: occ.encounter.maxXp,
						}),
					],
				};

				addMultipleMessages([
					...occ.dialogue.map((d) => ({ message: d })),
					{
						message: 'The wild pokemon attacks',
						onRemoval: () => {
							patchSaveFileReducer({
								mileStones: { ...saveFile.mileStones, hasWokenASnorlax: true },
								meta: { currentChallenger: challenger, activeTab: 'BATTLE' },
							});
						},
					},
				]);
			}
		},
		[addMultipleMessages, patchSaveFileReducer, saveFile.mileStones]
	);

	return interact;
};
