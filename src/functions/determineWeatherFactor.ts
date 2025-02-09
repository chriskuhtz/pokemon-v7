import { BattleAttack } from '../interfaces/BattleAttack';
import { WeatherType } from '../interfaces/Weather';

export const determineWeatherFactor = (
	attack: BattleAttack,
	weather: WeatherType | undefined
): number => {
	if (weather === 'rain' && attack.data.type.name === 'water') {
		return 1.5;
	}
	if (weather === 'rain' && attack.data.type.name === 'fire') {
		return 0.5;
	}
	return 1;
};
