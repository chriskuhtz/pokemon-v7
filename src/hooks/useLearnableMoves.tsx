import { useContext, useMemo } from 'react';
import { handledMoves, MoveName } from '../constants/movesCheckList';
import { ArrayHelpers } from '../functions/ArrayHelpers';
import { calculateLevelData } from '../functions/calculateLevelData';
import { getCostForLearnMethod } from '../functions/getCostForLearnMethod';
import { moveIsTeachable } from '../functions/moveIsAvailable';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { LearnMethod, PokemonData } from '../interfaces/PokemonData';
import { SaveFileContext } from './useSaveFile';

const learnMethodOrder: Record<LearnMethod, number> = {
	'level-up': 1,
	egg: 2,
	tutor: 3,
	machine: 4,
	'form-change': 5,
	'light-ball-egg': 6,
	'stadium-surfing-pikachu': 7,
	'colosseum-shadow': 8,
	'xd-purification': 9,
	'colosseum-purification': 10,
	'xd-shadow': 11,
	'zygarde-cube': 12,
};
export interface LearnableMove {
	move: {
		name: string;
		url: string;
	};
	learnable: boolean;
	version_group_details: {
		level_learned_at: number;
		move_learn_method: {
			name: LearnMethod;
		};
	}[];
}
export const useLearnableMoves = (
	ownedPokemon: OwnedPokemon,
	data: PokemonData | undefined
): LearnableMove[] => {
	const { saveFile } = useContext(SaveFileContext);
	return useMemo(() => {
		if (!data) {
			return [];
		}
		return data.moves
			.filter((m) => handledMoves.includes(m.move.name as MoveName))
			.map((m) => {
				const payment = getCostForLearnMethod(
					m.move.name as MoveName,
					m.version_group_details[0].move_learn_method.name
				);
				const available = moveIsTeachable(
					m,
					calculateLevelData(ownedPokemon.xp, ownedPokemon.growthRate).level
				);

				const learnable = saveFile.bag[payment] > 0 && available;
				if (saveFile.settings?.randomLearnSets) {
					const index =
						handledMoves.findIndex((handled) => handled === m.move.name) +
						ownedPokemon.name.length * 5;
					const randomizedMove = ArrayHelpers.getEntryWithOverflow(
						[...handledMoves],
						index
					);

					return {
						...m,
						move: {
							...m.move,
							name: randomizedMove,
						},
						learnable,
					};
				}
				return { ...m, learnable };
			})
			.filter(
				(m) => !ownedPokemon.unlockedMoves.includes(m.move.name as MoveName)
			)
			.sort((a, b) => {
				if (ownedPokemon.unlockedMoves.includes(a.move.name as MoveName)) {
					return -1;
				}
				if (ownedPokemon.unlockedMoves.includes(b.move.name as MoveName)) {
					return 1;
				}

				if (
					a.version_group_details[0].move_learn_method.name === 'level-up' &&
					b.version_group_details[0].move_learn_method.name === 'level-up'
				) {
					return (
						a.version_group_details[0].level_learned_at -
						b.version_group_details[0].level_learned_at
					);
				}

				return (
					learnMethodOrder[a.version_group_details[0].move_learn_method.name] -
					learnMethodOrder[b.version_group_details[0].move_learn_method.name]
				);
			});
	}, [
		data,
		ownedPokemon.growthRate,
		ownedPokemon.name.length,
		ownedPokemon.unlockedMoves,
		ownedPokemon.xp,
		saveFile.bag,
		saveFile.settings?.randomLearnSets,
	]);
};
