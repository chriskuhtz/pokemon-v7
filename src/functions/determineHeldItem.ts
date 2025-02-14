import { ItemType, itemTypes } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const determineHeldItem = (modifier: number): ItemType | undefined => {
	if (Math.random() > 1 * modifier) {
		return;
	}
	const itemIndex = Math.floor(Math.random() * itemTypes.length);
	return itemTypes[itemIndex];
};

export const getHeldItemRateModifier = (pokemon: OwnedPokemon): 1.2 | 1 =>
	pokemon.ability === 'compound-eyes' ? 1.2 : 1;
