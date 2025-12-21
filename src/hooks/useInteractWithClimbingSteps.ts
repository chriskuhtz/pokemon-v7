import { useCallback, useContext } from 'react';
import { GameDataContext } from './useGameData';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useInteractWithClimbingSteps = () => {
	const { addMultipleMessages } = useContext(MessageQueueContext);

	const { saveFile } = useContext(SaveFileContext);
	const gameData = useContext(GameDataContext);

	return useCallback(() => {
		if (!gameData.overworldActions.rockClimbing.possible(saveFile)) {
			addMultipleMessages(
				gameData.overworldActions.rockClimbing.failDialogue.map((d) => ({
					message: d,
				}))
			);
			return;
		}
	}, [addMultipleMessages, gameData.overworldActions.rockClimbing, saveFile]);
};
