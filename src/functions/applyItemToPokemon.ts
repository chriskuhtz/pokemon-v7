import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { HealingItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export function applyItemToPokemon<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: HealingItemType,
	addToast: AddToastFunction
): T {
	const updatedDamage = Math.max(pokemon.damage - 20, 0);
	if (item === 'potion') {
		addToast(`healed ${pokemon.damage - updatedDamage} HP`);
		return { ...pokemon, damage: updatedDamage };
	}

	return pokemon;
}
