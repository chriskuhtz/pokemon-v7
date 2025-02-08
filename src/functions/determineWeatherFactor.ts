import { BattleAttack } from '../interfaces/BattleAttack';

export const weatherTypes = ['rain'] as const;
export type WeatherType = (typeof weatherTypes)[number];

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
