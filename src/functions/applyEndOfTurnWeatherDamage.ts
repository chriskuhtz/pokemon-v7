import {
	DRY_SKIN_DAMAGE_FACTOR,
	HAIL_DAMAGE_FACTOR,
	ICE_BODY_HEAL_FACTOR,
	SANDSTORM_DAMAGE_FACTOR,
	SOLAR_POWER_DAMAGE_FACTOR,
} from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getTypeNames } from './getTypeNames';

export const applyEndOfTurnWeatherDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void,
	weather: WeatherType | undefined
): BattlePokemon => {
	if (pokemon.ability === 'magic-guard') {
		addMessage(`${pokemon.name} prevents damage with magic-guard`);
		return pokemon;
	}
	if (weather === 'sandstorm') {
		if (
			getTypeNames(pokemon).some((t) =>
				['ground', 'steel', 'rock'].includes(t)
			) ||
			['sand-veil'].includes(pokemon.ability)
		) {
			return pokemon;
		}
		addMessage(`${pokemon.data.name} takes damage from the sandstorm`);
		return {
			...pokemon,
			damage:
				pokemon.damage + Math.round(pokemon.stats.hp * SANDSTORM_DAMAGE_FACTOR),
		};
	}
	if (weather === 'hail') {
		if (
			getTypeNames(pokemon).some((t) => ['ice'].includes(t)) ||
			['snow-cloak'].includes(pokemon.ability)
		) {
			return pokemon;
		}
		if (pokemon.ability === 'ice-body') {
			addMessage(`${pokemon.data.name} recovered hp from the hail`);
			return {
				...pokemon,
				damage: getMiddleOfThree([
					0,
					pokemon.damage - Math.round(pokemon.stats.hp * ICE_BODY_HEAL_FACTOR),
					pokemon.stats.hp,
				]),
			};
		}
		addMessage(`${pokemon.data.name} takes damage from the hail`);
		return {
			...pokemon,
			damage:
				pokemon.damage + Math.round(pokemon.stats.hp * HAIL_DAMAGE_FACTOR),
		};
	}
	if (weather === 'sun' && pokemon.ability === 'dry-skin') {
		addMessage(`${pokemon.data.name}'s dry skin is damaged by the sun `);
		return {
			...pokemon,
			damage:
				pokemon.damage + Math.round(pokemon.stats.hp * DRY_SKIN_DAMAGE_FACTOR),
		};
	}
	if (weather === 'sun' && pokemon.ability === 'solar-power') {
		addMessage(
			`${pokemon.data.name} is channeling solar power to increase its special attack, but its too much`
		);
		return {
			...pokemon,
			damage:
				pokemon.damage +
				Math.round(pokemon.stats.hp * SOLAR_POWER_DAMAGE_FACTOR),
		};
	}
	if (weather === 'rain' && pokemon.ability === 'dry-skin') {
		addMessage(`${pokemon.data.name}'s dry skin recovered in the rain`);
		return {
			...pokemon,
			damage: getMiddleOfThree([
				0,
				pokemon.damage - Math.round(pokemon.stats.hp * DRY_SKIN_DAMAGE_FACTOR),
				pokemon.stats.hp,
			]),
		};
	}

	return pokemon;
};
