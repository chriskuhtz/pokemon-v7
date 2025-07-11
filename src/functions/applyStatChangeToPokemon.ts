import { Message } from '../hooks/useMessageQueue';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { getHeldItem } from './getHeldItem';
import { getMiddleOfThree } from './getMiddleOfThree';
import { hasAilment } from './hasAilment';
import { hasType } from './hasType';

export const applyStatChangeToPokemon = (
	pokemon: BattlePokemon,
	stat: Stat,
	initialModifier: number,
	selfInflicted: boolean,
	battleFieldEffects: BattleFieldEffect[],
	addMessage?: (x: Message) => void,
	suffix?: string
): BattlePokemon => {
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

	const guardSpecced = hasAilment(pokemon, 'guard-spec');
	const flowerVeiled =
		hasType(pokemon, 'grass') &&
		battleFieldEffects.some(
			(b) => b.ownerId === pokemon.ownerId && b.type === 'flower-veil'
		);
	const misted = battleFieldEffects.some(
		(b) => b.type === 'mist' && b.ownerId === pokemon.ownerId
	);
	const clearAmuletted = getHeldItem(pokemon) === 'clear-amulet';

	if (
		!selfInflicted &&
		(guardSpecced || misted || flowerVeiled || clearAmuletted) &&
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
		['white-smoke', 'clear-body', 'full-metal-body'].includes(
			pokemon.ability
		) &&
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

	if (
		(pokemon.ability === 'keen-eye' || pokemon.ability === 'minds-eye') &&
		stat === 'accuracy' &&
		modifier < 1
	) {
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
				message: `${pokemon.data.name} prevents attack reduction with ${pokemon.ability}`,
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
		return applyStatChangeToPokemon(
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
	if (
		pokemon.ability === 'competitive' &&
		modifier < 0 &&
		pokemon.statBoosts['special-attack'] < 6
	) {
		return applyStatChangeToPokemon(
			{
				...pokemon,
				statBoosts: { ...pokemon.statBoosts, [stat]: limitedStat },
			},
			'special-attack',
			2,
			true,
			battleFieldEffects,
			addMessage,
			'with competitive'
		);
	}

	return {
		...pokemon,
		statBoosts: { ...pokemon.statBoosts, [stat]: limitedStat },
	};
};
