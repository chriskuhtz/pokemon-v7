import { AbilityName } from '../constants/abilityCheckList';
import { BattleAttack } from '../interfaces/BattleActions';
import { WeatherType } from '../interfaces/Weather';

export const determineWeatherFactor = (
	attack: BattleAttack,
	weather: WeatherType | undefined,
	attackerAbility: AbilityName,
	opponentAbility: AbilityName
): number => {
	if (
		[attackerAbility, opponentAbility].includes('cloud-nine') ||
		[attackerAbility, opponentAbility].includes('air-lock')
	) {
		return 1;
	}
	if (weather === 'rain' && attack.data.type.name === 'water') {
		return 1.5;
	}
	if (weather === 'rain' && attack.data.type.name === 'fire') {
		return 0.5;
	}
	if (weather === 'sun' && attack.data.type.name === 'fire') {
		return 1.5;
	}
	if (weather === 'sun' && attack.data.type.name === 'water') {
		return 0.5;
	}
	return 1;
};
