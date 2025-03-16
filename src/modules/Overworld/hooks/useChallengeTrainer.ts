import { useCallback, useContext } from 'react';
import {
	makeRandomTrainer,
	trainers,
} from '../../../functions/makeRandomTrainer';
import { SaveFileContext } from '../../../hooks/useSaveFile';

export const useChallengeTrainer = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	return useCallback(
		(id?: string) => {
			const trainer = trainers.find((t) => t.id === id) ?? makeRandomTrainer();
			patchSaveFileReducer({
				meta: {
					...saveFile.meta,
					activeTab: 'BATTLE',
					currentChallenger: trainer,
				},
			});
		},
		[patchSaveFileReducer, saveFile]
	);
};
