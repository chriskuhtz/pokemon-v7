import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from './calculateDamage';

export const determineWeather = (
	pokemon: BattlePokemon
): WeatherType | undefined => {
	if (pokemon.ability === 'drizzle') {
		return 'rain';
	}
};
