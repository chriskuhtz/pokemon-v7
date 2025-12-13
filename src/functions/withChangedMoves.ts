import { MoveName } from '../constants/movesCheckList';
import { OwnedPokemon, OwnedPokemonMove } from '../interfaces/OwnedPokemon';
import { getMovesArray } from './getMovesArray';

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

export const withActivatedMove = (
	pokemon: OwnedPokemon,
	newMove: MoveName
): OwnedPokemon => {
	const currentMoves = getMovesArray(pokemon);

	const previousInfo = pokemon.deactivatedMoves?.find(
		(m) => m.name === newMove
	);

	if (currentMoves.length === 4) {
		return pokemon;
	}
	if (currentMoves.length === 3) {
		return {
			...pokemon,
			fourthMove: { name: newMove, usedPP: previousInfo?.usedPP ?? 0 },
		};
	}
	if (currentMoves.length === 2) {
		return {
			...pokemon,
			thirdMove: { name: newMove, usedPP: previousInfo?.usedPP ?? 0 },
		};
	}
	return {
		...pokemon,
		secondMove: { name: newMove, usedPP: previousInfo?.usedPP ?? 0 },
	};
};

export const withDeActivatedMove = (
	pokemon: OwnedPokemon,
	moveToDeactivate: OwnedPokemonMove
): OwnedPokemon => {
	return {
		...pokemon,
		secondMove:
			pokemon.secondMove?.name === moveToDeactivate.name
				? undefined
				: pokemon.secondMove,
		thirdMove:
			pokemon.thirdMove?.name === moveToDeactivate.name
				? undefined
				: pokemon.thirdMove,
		fourthMove:
			pokemon.fourthMove?.name === moveToDeactivate.name
				? undefined
				: pokemon.fourthMove,
		deactivatedMoves: [
			...(pokemon.deactivatedMoves ?? []).filter(
				(m) => m.name !== moveToDeactivate.name
			),
			moveToDeactivate,
		],
	};
};
