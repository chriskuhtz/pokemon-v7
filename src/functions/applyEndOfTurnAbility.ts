import { Message } from '../hooks/useMessageQueue';
import { RAIN_DISH_FACTOR, SHED_SKIN_CHANCE } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { getMiddleOfThree } from './getMiddleOfThree';

export const applyEndOfTurnAbility = ({
	initialPokemon,
	pokemon,
	addMessage,
	weather,
}: {
	initialPokemon?: BattlePokemon;
	pokemon: BattlePokemon;
	addMessage: (x: Message) => void;
	weather?: WeatherType;
}): BattlePokemon => {
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
	if (
		pokemon.ability === 'unburden' &&
		!pokemon.heldItemName &&
		initialPokemon?.heldItemName
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
	if (pokemon.ability === 'unburden' && pokemon.heldItemName) {
		return {
			...pokemon,
			secondaryAilments: pokemon.secondaryAilments.filter(
				(ail) => ail.type !== 'unburdened'
			),
		};
	}
	return pokemon;
};
