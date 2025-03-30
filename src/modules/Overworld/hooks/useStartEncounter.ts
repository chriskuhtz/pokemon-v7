import { useCallback, useContext } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Challenger } from '../../../interfaces/Challenger';

export const useStartEncounter = () => {
	const { navigateAwayFromOverworldReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	return useCallback(
		(stepsTaken: number, encounter: Challenger) => {
			addMessage({
				message: 'Wild Pokemon appeared!',
				onRemoval: () =>
					navigateAwayFromOverworldReducer('BATTLE', stepsTaken, encounter),
				needsNoConfirmation: true,
			});
		},
		[addMessage, navigateAwayFromOverworldReducer]
	);
};
