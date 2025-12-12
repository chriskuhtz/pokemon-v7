import { useCallback, useContext } from 'react';
import { SpriteIcon } from '../../../components/SpriteIcon/SpriteIcon';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { EmptyInventory } from '../../../interfaces/Inventory';
import { OverworldTrainer } from '../../../interfaces/Occupant';

export const useInteractWithTrainer = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(
		(trainer: OverworldTrainer) => {
			addMultipleMessages(
				trainer.unhandledMessage.map((message, index) => ({
					icon: <SpriteIcon sprite={trainer.sprite} />,
					message,
					onRemoval: () => {
						if (index === trainer.unhandledMessage.length - 1) {
							patchSaveFileReducer({
								meta: {
									...saveFile.meta,
									activeTab: 'BATTLE',
									currentChallenger: {
										battleTeamConfig: trainer.battleTeamConfig,
										team: trainer.team(saveFile),
										id: trainer.id,
										inventory: EmptyInventory,
										type: 'TRAINER',

										trainer: {
											id: trainer.id,
											sprite: trainer.sprite,
											profilePicture: trainer.profilePicture,
											spriteGeneration: trainer.spriteGeneration,
										},
									},
								},
							});
						}
					},
				}))
			);
		},
		[addMultipleMessages, patchSaveFileReducer, saveFile]
	);
};
