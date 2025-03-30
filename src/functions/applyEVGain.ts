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
	const actualChange = heldItem === 'macho-brace' ? change * 2 : change;
	const initial = initialEvs[stat];
	const update = getMiddleOfThree([0, initial + actualChange, 255]);

	return { ...initialEvs, [stat]: update };
};
