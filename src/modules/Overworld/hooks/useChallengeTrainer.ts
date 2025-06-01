import { useCallback, useContext } from 'react';
import { trainers } from '../../../constants/trainersRecord';
import { makeEVTeam } from '../../../functions/makeRandomTeam';
import { makeRandomTrainer } from '../../../functions/makeRandomTrainer';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Challenger } from '../../../interfaces/Challenger';
import { EmptyInventory } from '../../../interfaces/Inventory';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { Stat } from '../../../interfaces/StatObject';

export const useChallengeTrainer = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	return useCallback(
		({ id, tier }: { id?: string; tier?: 1 | 2 | 3 | 4 | 5 }) => {
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

export const useEvTraining = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	return useCallback(
		(stat: Stat) => {
			const trainer: Challenger = {
				team: makeEVTeam(stat),
				id: 'ev_trainer',
				type: 'TRAINER',
				inventory: EmptyInventory,
				trainer: { id: 'ev_trainer', sprite: SpriteEnum.ace2Female },
			};

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
