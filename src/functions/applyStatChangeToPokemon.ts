import { Message } from '../hooks/useMessageQueue';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getTypeNames } from './getTypeNames';

export const applyStatChangeToPokemon = (
	pokemon: BattlePokemon,
	stat: Stat,
	initialModifier: number,
	selfInflicted: boolean,
	battleFieldEffects: BattleFieldEffect[],
	addMessage?: (x: Message) => void,
	suffix?: string
) => {
	if (
		initialModifier > 6 ||
		initialModifier < -6 ||
		stat === 'hp' ||
		initialModifier === 0
	) {
		console.error('invalid modifier', stat, initialModifier);
		return pokemon;
	}
	const simpleFactor = pokemon.ability === 'simple' ? 2 : 1;
	const contraryFactor = pokemon.ability === 'contrary' ? -1 : 1;

	const modifier = initialModifier * simpleFactor * contraryFactor;

	const existingStat = pokemon.statBoosts[stat];

	const guardSpecced = pokemon.secondaryAilments.some(
		(a) => a.type === 'guard-spec'
	);
	const flowerVeiled =
		getTypeNames(pokemon).includes('grass') &&
		battleFieldEffects.some(
			(b) => b.ownerId === pokemon.ownerId && b.type === 'flower-veil'
		);
	const misted = battleFieldEffects.some(
		(b) => b.type === 'mist' && b.ownerId === pokemon.ownerId
	);

	if (
		!selfInflicted &&
		(guardSpecced || misted || flowerVeiled) &&
		modifier < 0
	) {
		if (addMessage) {
			addMessage({
				message: `${pokemon.data.name} stats cant be lowered`,
			});
		}

		return pokemon;
	}
	if (
		!selfInflicted &&
		['white-smoke', 'clear-body'].includes(pokemon.ability) &&
		modifier < 0
	) {
		if (addMessage) {
			addMessage({
				message: `${pokemon.data.name} prevents stat reduction with ${pokemon.ability}`,
			});
		}

		return pokemon;
	}
	if (
		!selfInflicted &&
		pokemon.ability === 'big-pecks' &&
		stat === 'defense' &&
		modifier < 0
	) {
		if (addMessage) {
			addMessage({
				message: `${pokemon.data.name} prevents stat reduction with ${pokemon.ability}`,
			});
		}

		return pokemon;
	}
	if (pokemon.ability === 'keen-eye' && stat === 'accuracy' && modifier < 1) {
		if (addMessage) {
			addMessage({
				message: `${pokemon.data.name} prevents accuracy reduction with ${pokemon.ability}`,
			});
		}

		return pokemon;
	}
	if (pokemon.ability === 'hyper-cutter' && stat === 'attack' && modifier < 1) {
		if (addMessage) {
			addMessage({
				message: `${pokemon.data.name} prevents attackreduction with ${pokemon.ability}`,
			});
		}

		return pokemon;
	}

	if (existingStat >= 6 && modifier > 0) {
		if (addMessage) {
			addMessage({
				message: `${pokemon.data.name}'s ${stat} can't go any higher`,
			});
		}

		return pokemon;
	}
	if (existingStat <= -6 && modifier < 0) {
		if (addMessage) {
			addMessage({
				message: `${pokemon.data.name}'s ${stat} can't go any lower`,
			});
		}

		return pokemon;
	}
	const modifiedStat = existingStat + modifier;
	const limitedStat = getMiddleOfThree([-6, modifiedStat, 6]);

	if (addMessage) {
		addMessage({
			message: `${pokemon.data.name}'s ${stat} was ${
				modifier > 0 ? 'raised' : 'lowered'
			} by ${modifier} ${[1, -1].includes(modifier) ? 'stage' : 'stages'} ${
				suffix ? 'by ' + suffix : ''
			}`,
		});
	}

	if (
		pokemon.ability === 'defiant' &&
		modifier < 0 &&
		pokemon.statBoosts.attack < 6
	) {
		applyStatChangeToPokemon(
			{
				...pokemon,
				statBoosts: { ...pokemon.statBoosts, [stat]: limitedStat },
			},
			'attack',
			2,
			true,
			battleFieldEffects,
			addMessage,
			'with defiant'
		);
	}

	return {
		...pokemon,
		statBoosts: { ...pokemon.statBoosts, [stat]: limitedStat },
	};
};
