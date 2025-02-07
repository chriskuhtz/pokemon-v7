import { BattlePokemon } from '../interfaces/BattlePokemon';
import { determineWeather } from './determineWeather';
export const determineWeatherMessage = (pokemon: BattlePokemon) => {
	const weather = determineWeather(pokemon);

	if (!weather) {
		return;
	}
	if (weather === 'rain') {
		return `${pokemon.data.name} made it rain with drizzle`;
	}
};
