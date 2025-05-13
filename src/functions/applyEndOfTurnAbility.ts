import { Message } from '../hooks/useMessageQueue';
import {
	HEALER_CHANCE,
	RAIN_DISH_FACTOR,
	SHED_SKIN_CHANCE,
} from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getRandomBoostableStat } from '../interfaces/StatObject';
import { WeatherType } from '../interfaces/Weather';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleTerrain';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { getHeldItem } from './getHeldItem';
import { getMiddleOfThree } from './getMiddleOfThree';

export const applyEndOfTurnAbility = ({
	initialPokemon,
	pokemon,
	addMessage,
	weather,
	allyIsHealer,
}: {
	initialPokemon?: BattlePokemon;
	pokemon: BattlePokemon;
	addMessage: (x: Message) => void;
	weather?: WeatherType;
	allyIsHealer: boolean;
}): BattlePokemon => {
	if (pokemon.ability === 'moody') {
		const boostStat = getRandomBoostableStat();
		const debuffStat = getRandomBoostableStat([boostStat]);

		let moodyApplied = applyStatChangeToPokemon(
			pokemon,
			boostStat,
			2,
			true,
			[],
			addMessage,
			'moody'
		);
		moodyApplied = applyStatChangeToPokemon(
			moodyApplied,
			debuffStat,
			-1,
			true,
			[],
			addMessage,
			'moody'
		);
		return moodyApplied;
	}
	if (pokemon.ability === 'speed-boost') {
		return applyStatChangeToPokemon(
			pokemon,
			'speed',
			1,
			true,
			[],
			addMessage,
			'by speed boost'
		);
	}
	if (
		pokemon.ability === 'limber' &&
		pokemon.primaryAilment?.type === 'paralysis'
	) {
		addMessage({
			message: `${pokemon.data.name} was cured of paralysis by limber`,
		});
		return { ...pokemon, primaryAilment: undefined };
	}
	if (pokemon.ability === 'rain-dish' && weather === 'rain') {
		addMessage({ message: `${pokemon.data.name} recovered hp with rain dish` });
		return {
			...pokemon,
			damage: getMiddleOfThree([
				0,
				pokemon.damage,
				pokemon.damage - pokemon.stats.hp * RAIN_DISH_FACTOR,
			]),
		};
	}
	if (
		pokemon.ability === 'shed-skin' &&
		pokemon.primaryAilment &&
		Math.random() < SHED_SKIN_CHANCE
	) {
		addMessage({
			message: `${pokemon.data.name} shed its skin to cure itself`,
		});
		return { ...pokemon, primaryAilment: undefined };
	}
	if (pokemon.ability === 'hydration' && pokemon.primaryAilment) {
		addMessage({
			message: `${pokemon.data.name} washed its status problems away`,
		});
		return { ...pokemon, primaryAilment: undefined };
	}
	if (
		pokemon.ability === 'unburden' &&
		initialPokemon &&
		!getHeldItem(pokemon) &&
		getHeldItem(initialPokemon)
	) {
		addMessage({
			message: `${pokemon.data.name} doubled its speed with unburden`,
		});
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: 'unburdened', duration: 9000 },
			],
		};
	}
	if (pokemon.ability === 'unburden' && getHeldItem(pokemon, false)) {
		return {
			...pokemon,
			secondaryAilments: pokemon.secondaryAilments.filter(
				(ail) => ail.type !== 'unburdened'
			),
		};
	}
	if (allyIsHealer && pokemon.primaryAilment && Math.random() < HEALER_CHANCE) {
		addMessage({
			message: `${pokemon.data.name} was healed by its partner`,
		});
		return {
			...pokemon,
			primaryAilment: undefined,
		};
	}
	if (
		pokemon.ability === 'harvest' &&
		pokemon.consumedBerry &&
		!pokemon.heldItemName
	) {
		if (Math.random() > 0.5 || weather === 'sun') {
			addMessage({
				message: `${pokemon.data.name} harvested a new ${pokemon.consumedBerry}`,
			});
			return { ...pokemon, heldItemName: pokemon.consumedBerry };
		}
	}
	return pokemon;
};

export const applyGrassyTerrainHeal = ({
	terrain,
	pokemon,
	addMessage,
}: {
	pokemon: BattlePokemon;
	addMessage: (x: Message) => void;
	terrain: BattleTerrain | undefined;
}): BattlePokemon => {
	if (terrain === 'grassy' && pokemon.damage) {
		addMessage({ message: `${pokemon.name} was healed by grassy terrain` });
		return {
			...pokemon,
			damage: Math.max(
				0,
				pokemon.damage - Math.floor((pokemon.stats.hp * 1) / 16)
			),
		};
	}
	return pokemon;
};
