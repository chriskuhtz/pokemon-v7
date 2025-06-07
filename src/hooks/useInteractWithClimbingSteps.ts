import { useContext, useCallback } from 'react';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useInteractWithClimbingSteps = () => {
	const { addMultipleMessages } = useContext(MessageQueueContext);

	const { saveFile } = useContext(SaveFileContext);

	return useCallback(() => {
		if (!saveFile.campUpgrades['rock climbing certification']) {
			addMultipleMessages([
				{ message: 'A certified rock climber would be allowed to climb here' },
				{ message: '... Bureaucracy' },
			]);
			return;
		}
	}, [addMultipleMessages, saveFile.campUpgrades]);
};
