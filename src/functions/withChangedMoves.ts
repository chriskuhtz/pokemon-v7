import { OwnedPokemon, OwnedPokemonMove } from '../interfaces/OwnedPokemon';

export const withChangedMoves = (
	pokemon: OwnedPokemon,
	newMoves: OwnedPokemonMove[]
): OwnedPokemon => {
	return {
		...pokemon,
		firstMove: newMoves[0],
		secondMove: newMoves.length > 1 ? newMoves[1] : undefined,

		thirdMove: newMoves.length > 2 ? newMoves[2] : undefined,

		fourthMove: newMoves.length > 3 ? newMoves[3] : undefined,
	};
};
