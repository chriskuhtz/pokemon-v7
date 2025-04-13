import { useCallback, useContext } from 'react';
import {
	makeRandomTrainer,
	trainers,
} from '../../../functions/makeRandomTrainer';
import { SaveFileContext } from '../../../hooks/useSaveFile';

export const useChallengeTrainer = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	return useCallback(
		({ id, tier }: { id?: string; tier?: 1 | 2 | 3 | 4 }) => {
			const trainer =
				trainers.find((t) => t.id === id) ?? makeRandomTrainer(saveFile, tier);
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
