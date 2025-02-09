import { OwnedPokemon } from '../interfaces/OwnedPokemon';

// https://bulbapedia.bulbagarden.net/wiki/Friendship

export const applyHappinessChange = (
	pokemon: OwnedPokemon,
	change: number
): OwnedPokemon => {
	const ballSummand = pokemon.ball === 'luxury-ball' && change > 0 ? 1 : 0;
	const updatedHappiness = pokemon.happiness + change + ballSummand;
	const res = [0, updatedHappiness, 255].sort()[1];

	return { ...pokemon, happiness: res };
};
