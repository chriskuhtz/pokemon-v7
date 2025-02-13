import { AddToastFunction } from '../hooks/useToasts';
import { HealingItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const applyItemToPokemon = (
	pokemon: OwnedPokemon,
	item: HealingItemType,
	addToast: AddToastFunction
): OwnedPokemon => {
	const updatedDamage = Math.max(pokemon.damage - 20, 0);
	if (item === 'potion') {
		addToast(`refilled ${pokemon.damage - updatedDamage} HP`);
		return { ...pokemon, damage: updatedDamage };
	}

	return pokemon;
};
