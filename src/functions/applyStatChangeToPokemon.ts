import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { getMiddleOfThree } from './getMiddleOfThree';

export const applyStatChangeToPokemon = (
	pokemon: BattlePokemon,
	stat: Stat,
	modifier: number,
	selfInflicted: boolean,
	battleFieldEffects: BattleFieldEffect[],
	addMessage?: (x: string) => void,
	suffix?: string
) => {
	if (modifier > 6 || modifier < -6 || stat === 'hp' || modifier === 0) {
		console.error('invalid modifier', stat, modifier);
		return pokemon;
	}
	const existingStat = pokemon.statBoosts[stat];

	const guardSpecced = pokemon.secondaryAilments.some(
		(a) => a.type === 'guard-spec'
	);
	const misted = battleFieldEffects.some(
		(b) => b.type === 'mist' && b.ownerId === pokemon.ownerId
	);

	if (!selfInflicted && (guardSpecced || misted) && modifier < 0) {
		if (addMessage) {
			addMessage(
				`${pokemon.data.name}'s ${
					misted ? 'mist' : 'guard spec'
				} prevents stat reduction`
			);
		}

		return pokemon;
	}
	if (
		!selfInflicted &&
		['white-smoke', 'clear-body'].includes(pokemon.ability) &&
		modifier < 0
	) {
		if (addMessage) {
			addMessage(
				`${pokemon.data.name} prevents stat reduction with ${pokemon.ability}`
			);
		}

		return pokemon;
	}

	if (existingStat >= 6 && modifier > 0) {
		if (addMessage) {
			addMessage(`${pokemon.data.name}'s ${stat} can't go any higher`);
		}

		return pokemon;
	}
	if (existingStat <= -6 && modifier < 0) {
		if (addMessage) {
			addMessage(`${pokemon.data.name}'s ${stat} can't go any lower`);
		}

		return pokemon;
	}
	const modifiedStat = existingStat + modifier;
	const limitedStat = getMiddleOfThree([-6, modifiedStat, 6]);

	if (addMessage) {
		addMessage(
			`${pokemon.data.name}'s ${stat} was ${
				modifier > 0 ? 'raised' : 'lowered'
			} by ${modifier} ${[1, -1].includes(modifier) ? 'stage' : 'stages'} ${
				suffix ? 'by ' + suffix : ''
			}`
		);
	}

	return {
		...pokemon,
		statBoosts: { ...pokemon.statBoosts, [stat]: limitedStat },
	};
};
