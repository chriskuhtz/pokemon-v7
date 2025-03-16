import { useCallback, useContext } from 'react';
import { makeRandomTrainer } from '../../../functions/makeRandomTrainer';
import { SaveFileContext } from '../../../hooks/useSaveFile';

export const useChallengeTrainer = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	return useCallback(() => {
		patchSaveFileReducer({
			meta: {
				...saveFile.meta,
				activeTab: 'BATTLE',
				currentChallenger: makeRandomTrainer(),
			},
		});
	}, [patchSaveFileReducer, saveFile]);
};
