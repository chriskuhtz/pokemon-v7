import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { getMiddleOfThree } from './getMiddleOfThree';

// https://bulbapedia.bulbagarden.net/wiki/Friendship

export const applyHappinessChange = (
	pokemon: OwnedPokemon,
	change: number
): OwnedPokemon => {
	const ballSummand = pokemon.ball === 'luxury-ball' && change > 0 ? 1 : 0;
	const updatedHappiness = pokemon.happiness + change + ballSummand;
	const res = getMiddleOfThree([0, updatedHappiness, 255]);

	return { ...pokemon, happiness: res };
};
