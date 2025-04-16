import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	EvBoostItemType,
	EvBoostTable,
	HappinessChangeTable,
	ItemType,
} from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { Stat, StatObject } from '../interfaces/StatObject';
import { applyHappinessChange } from './applyHappinessChange';
import { getMiddleOfThree } from './getMiddleOfThree';

export function applyEVBoostItem<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: EvBoostItemType
): T {
	return {
		...applyHappinessChange(pokemon, HappinessChangeTable[item] ?? 0),
		effortValues: applyEVGain(
			pokemon.effortValues,
			EvBoostTable[item].stat,
			EvBoostTable[item].change
		),
	};
}
export const applyEVGain = (
	initialEvs: StatObject,
	stat: Stat,
	change: number,
	heldItem?: ItemType
): StatObject => {
	let actualChange = change;
	if (heldItem === 'macho-brace') {
		actualChange *= 2;
	}
	if (heldItem === 'power-bracer' && stat === 'attack') {
		actualChange *= 4;
	}
	if (heldItem === 'power-belt' && stat === 'defense') {
		actualChange *= 4;
	}
	if (heldItem === 'power-lens' && stat === 'special-attack') {
		actualChange *= 4;
	}
	if (heldItem === 'power-band' && stat === 'special-defense') {
		actualChange *= 4;
	}
	if (heldItem === 'power-anklet' && stat === 'speed') {
		actualChange *= 4;
	}
	if (heldItem === 'power-weight' && stat === 'hp') {
		actualChange *= 4;
	}

	const initial = initialEvs[stat];
	const update = getMiddleOfThree([0, initial + actualChange, 255]);

	return { ...initialEvs, [stat]: update };
};
