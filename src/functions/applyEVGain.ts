import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	EvBoostItemType,
	EvBoostTable,
	HappinessChangeTable,
} from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { Stat, StatObject } from '../interfaces/StatObject';
import { applyHappinessChange } from './applyHappinessChange';
import { getMiddleOfThree } from './getMiddleOfThree';

export function applyEVBoostItem<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: EvBoostItemType
): T {
	console.log(pokemon, {
		...applyHappinessChange(pokemon, HappinessChangeTable[item] ?? 0),
		effortValues: applyEVGain(
			pokemon.effortValues,
			EvBoostTable[item].stat,
			EvBoostTable[item].change
		),
	});
	return {
		...applyHappinessChange(pokemon, HappinessChangeTable[item] ?? 0),
		effortValues: applyEVGain(
			pokemon.effortValues,
			EvBoostTable[item].stat,
			EvBoostTable[item].change
		),
	};
}
//TODO: what else gives you evs
export const applyEVGain = (
	initialEvs: StatObject,
	stat: Stat,
	change: number
): StatObject => {
	const initial = initialEvs[stat];
	const update = getMiddleOfThree([0, initial + change, 255]);

	return { ...initialEvs, [stat]: update };
};
