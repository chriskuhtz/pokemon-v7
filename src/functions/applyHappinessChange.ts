import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { getHeldItem } from './getHeldItem';
import { getMiddleOfThree } from './getMiddleOfThree';

// https://bulbapedia.bulbagarden.net/wiki/Friendship

export function applyHappinessChange<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	change: number
): T {
	const ballSummand = pokemon.ball === 'luxury-ball' && change > 0 ? 1 : 0;
	const heldItemSummand =
		getHeldItem(pokemon, false) === 'soothe-bell' && change > 0 ? 1 : 0;
	const updatedHappiness =
		pokemon.happiness + change + ballSummand + heldItemSummand;
	const res = getMiddleOfThree([0, updatedHappiness, 255]);

	return { ...pokemon, happiness: res };
}
