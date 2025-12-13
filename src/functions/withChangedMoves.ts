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
	const moves = [
		...currentMoves,
		{ name: newMove, usedPP: previousInfo?.usedPP ?? 0 },
	];

	return mapMovesArrayToPokemon(pokemon, moves);
};

export const withDeActivatedMove = (
	pokemon: OwnedPokemon,
	moveToDeactivate: OwnedPokemonMove
): OwnedPokemon => {
	const deacc = [
		...(pokemon.deactivatedMoves ?? []).filter(
			(m) => m.name !== moveToDeactivate.name
		),
		moveToDeactivate,
	];
	const currentMoves = getMovesArray(pokemon);

	return {
		...mapMovesArrayToPokemon(
			pokemon,
			currentMoves.filter((c) => c.name !== moveToDeactivate.name)
		),
		deactivatedMoves: deacc,
	};
};

export const mapMovesArrayToPokemon = (
	ownedPokemon: OwnedPokemon,
	moves: OwnedPokemonMove[]
): OwnedPokemon => {
	if (moves.length === 0) {
		throw new Error('Cannot map empty move array to pokemon');
	}
	return {
		...ownedPokemon,
		firstMove: moves.at(0)!,
		secondMove: moves.at(1),
		thirdMove: moves.at(2),
		fourthMove: moves.at(3),
	};
};
