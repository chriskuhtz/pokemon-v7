import { useCallback, useContext } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';

export const useStartEncounter = () => {
	const { navigateAwayFromOverworldReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	return useCallback(
		(stepsTaken: number) => {
			addMessage({
				message: 'Wild Pokemon appeared!',
				onRemoval: () => navigateAwayFromOverworldReducer('BATTLE', stepsTaken),
				needsNoConfirmation: true,
			});
		},
		[addMessage, navigateAwayFromOverworldReducer]
	);
};
