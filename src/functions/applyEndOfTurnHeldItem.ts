import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyItemToPokemon } from './applyItemToPokemon';

export const applyEndOfTurnHeldItem = (
	pokemon: BattlePokemon,
	addMessage: AddToastFunction
): BattlePokemon => {
	if (
		pokemon.heldItemName === 'berry-juice' &&
		pokemon.damage / pokemon.stats.hp > 0.5
	) {
		addMessage(`${pokemon.data.name} healed itself with berry juice`);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
			heldItemName: undefined,
		};
	}
	return pokemon;
};
