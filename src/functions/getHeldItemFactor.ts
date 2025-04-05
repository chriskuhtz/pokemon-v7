import { PokemonName } from '../constants/pokemonNames';
import { ItemType, typeBoostItemTable } from '../interfaces/Item';
import { PokemonType } from '../interfaces/PokemonType';

export const getHeldItemFactor = (
	attackerName: PokemonName,
	attackType: PokemonType,
	heldItem?: ItemType
): number => {
	if (!heldItem) {
		return 1;
	}
	if (typeBoostItemTable[attackType] === heldItem) {
		return 1.2;
	}
	if (
		heldItem === 'adamant-orb' &&
		(attackerName === 'dialga' || attackerName === 'dialga-origin') &&
		(attackType === 'steel' || attackType === 'dragon')
	) {
		return 1.2;
	}
	if (
		heldItem === 'lustrous-orb' &&
		(attackerName === 'palkia' || attackerName === 'palkia-origin') &&
		(attackType === 'water' || attackType === 'dragon')
	) {
		return 1.2;
	}
	return 1;
};
