import { useCallback, useContext } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { EmptyInventory } from '../../../interfaces/Inventory';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';

export const useInteractWithTrainer = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(
		(trainer: OverworldTrainer) => {
			addMultipleMessages(
				trainer.unhandledMessage.map((message, index) => ({
					message,
					onRemoval: () => {
						if (index === trainer.unhandledMessage.length - 1) {
							patchSaveFileReducer({
								meta: {
									...saveFile.meta,
									activeTab: 'BATTLE',
									currentChallenger: {
										battleTeamConfig: {
											assignGender: false,
											assignHeldItem: false,
											assignLearnsetMoves: false,
											assignNaturalAbility: false,
											generateIvs: true,
										},
										team: trainer.team,
										id: trainer.id,
										inventory: EmptyInventory,
										type: 'TRAINER',
										trainer: {
											name: trainer.name,
											sprite: trainer.sprite,
										},
									},
								},
							});
						}
					},
				}))
			);
		},
		[addMultipleMessages, patchSaveFileReducer, saveFile.meta]
	);
};
// addMessage({
// 	message: 'Wild Pokemon appeared!',
// 	onRemoval: () =>
// 		navigateAwayFromOverworldReducer('BATTLE', stepsTaken, encounter),
// 	needsNoConfirmation: true,
// });
