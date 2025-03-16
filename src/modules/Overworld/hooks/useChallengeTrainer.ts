import { useCallback, useContext } from 'react';
import { v4 } from 'uuid';
import { testOpponent } from '../../../constants/gameData';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Challenger } from '../../../interfaces/Challenger';
import { EmptyInventory } from '../../../interfaces/Inventory';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

export const makeChallengerPokemon = (
	data: Partial<Omit<OwnedPokemon, 'id'>>
): OwnedPokemon => {
	return { ...testOpponent, ...data, id: v4() };
};
const makeRandomTrainer = (): Challenger => {
	return {
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'caterpie', xp: 100 }),
			makeChallengerPokemon({ name: 'weedle', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Bug Catcher Bob', sprite: SpriteEnum.bugCatcher },
	};
};
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
