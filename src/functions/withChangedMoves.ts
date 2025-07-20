import { MoveName } from '../constants/movesCheckList';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const withChangedMoves = (
	pokemon: OwnedPokemon,
	newMoveNames: MoveName[]
): OwnedPokemon => {
	return {
		...pokemon,
		firstMove: {
			name: newMoveNames[0],
			usedPP: 0,
		},
		secondMove:
			newMoveNames.length > 1
				? {
						name: newMoveNames[1],
						usedPP: 0,
				  }
				: undefined,

		thirdMove:
			newMoveNames.length > 2
				? {
						name: newMoveNames[2],
						usedPP: 0,
				  }
				: undefined,

		fourthMove:
			newMoveNames.length > 3
				? {
						name: newMoveNames[3],
						usedPP: 0,
				  }
				: undefined,
	};
};
