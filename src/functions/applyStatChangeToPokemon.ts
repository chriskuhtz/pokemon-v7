import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { getMiddleOfThree } from './getMiddleOfThree';

export const applyStatChangeToPokemon = (
	pokemon: BattlePokemon,
	stat: Stat,
	modifier: number,
	selfInflicted: boolean,
	dispatchToast?: (x: string) => void,
	toastSuffix?: string
) => {
	if (modifier > 6 || modifier < -6 || stat === 'hp' || modifier === 0) {
		console.error('invalid modifier', stat, modifier);
		return pokemon;
	}
	const existingStat = pokemon.statBoosts[stat];

	if (
		!selfInflicted &&
		pokemon.secondaryAilments.some((a) => a.type === 'guard-spec') &&
		modifier < 0
	) {
		if (dispatchToast) {
			dispatchToast(
				`${pokemon.data.name}'s guard spec prevents stat reduction`
			);
		}

		return pokemon;
	}
	if (
		!selfInflicted &&
		['white-smoke', 'clear-body'].includes(pokemon.ability) &&
		modifier < 0
	) {
		if (dispatchToast) {
			dispatchToast(
				`${pokemon.data.name} prevents stat reduction with ${pokemon.ability}`
			);
		}

		return pokemon;
	}

	if (existingStat >= 6 && modifier > 0) {
		if (dispatchToast) {
			dispatchToast(`${pokemon.data.name}'s ${stat} can't go any higher`);
		}

		return pokemon;
	}
	if (existingStat <= -6 && modifier < 0) {
		if (dispatchToast) {
			dispatchToast(`${pokemon.data.name}'s ${stat} can't go any lower`);
		}

		return pokemon;
	}
	const modifiedStat = existingStat + modifier;
	const limitedStat = getMiddleOfThree([-6, modifiedStat, 6]);

	if (dispatchToast) {
		dispatchToast(
			`${pokemon.data.name}'s ${stat} was ${
				modifier > 0 ? 'raised' : 'lowered'
			} by ${modifier} ${[1, -1].includes(modifier) ? 'stage' : 'stages'} ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
	}

	return {
		...pokemon,
		statBoosts: { ...pokemon.statBoosts, [stat]: limitedStat },
	};
};
