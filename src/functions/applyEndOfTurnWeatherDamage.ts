import {
	HAIL_DAMAGE_FACTOR,
	SANDSTORM_DAMAGE_FACTOR,
} from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { getTypeNames } from './getTypeNames';

export const applyEndOfTurnWeatherDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void,
	weather: WeatherType | undefined
): BattlePokemon => {
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
		addMessage(`${pokemon.data.name} takes damage from the hail`);
		return {
			...pokemon,
			damage:
				pokemon.damage + Math.round(pokemon.stats.hp * HAIL_DAMAGE_FACTOR),
		};
	}
	return pokemon;
};
