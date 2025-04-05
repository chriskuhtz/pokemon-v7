import { PokemonName } from '../constants/pokemonNames';
import { ItemType } from '../interfaces/Item';
import { Stat } from '../interfaces/StatObject';

export const calculateModifiedStat = (
	unmodified: number,
	modifier: number,
	statName: Stat,
	pokemonName: PokemonName,
	heldItem?: ItemType
): number => {
	let res = unmodified;
	if (modifier > 0) {
		res = unmodified + modifier * unmodified * 0.5;
	}
	if (modifier < 0) {
		res = unmodified + modifier * unmodified * 0.125;
	}

	if (
		heldItem === 'light-ball' &&
		pokemonName.includes('pikachu') &&
		statName === 'special-attack'
	) {
		res = res * 2;
	}
	if (
		heldItem === 'soul-dew' &&
		(pokemonName === 'latias' ||
			pokemonName === 'latios' ||
			pokemonName === 'latios-mega' ||
			pokemonName === 'latias-mega') &&
		(statName === 'special-attack' || statName === 'special-defense')
	) {
		res = res * 1.5;
	}

	return res;
};
