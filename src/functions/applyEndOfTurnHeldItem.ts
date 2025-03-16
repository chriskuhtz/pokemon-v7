import { BattlePokemon } from '../interfaces/BattlePokemon';
import { hasHeldEffect, HPHealTable } from '../interfaces/Item';
import { applyItemToPokemon } from './applyItemToPokemon';

export const applyEndOfTurnHeldItem = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (!pokemon.heldItemName || !hasHeldEffect(pokemon.heldItemName)) {
		return pokemon;
	}
	if (
		HPHealTable[pokemon.heldItemName] &&
		pokemon.damage / pokemon.stats.hp > 0.5
	) {
		addMessage(
			`${pokemon.data.name} healed itself with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
			heldItemName: undefined,
		};
	}
	return pokemon;
};
