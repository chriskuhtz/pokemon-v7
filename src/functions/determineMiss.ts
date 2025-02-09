import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { BattleAttack } from '../interfaces/BattleAttack';
import { WeatherType } from '../interfaces/Weather';

/**
 *
 * @param attack
 * @returns true if it misses
 */
export const determineMiss = (
	attack: BattleAttack,
	targetAbility: AbilityName,
	weather?: WeatherType
): boolean => {
	const weatherFactor =
		weather === 'sandstorm' && targetAbility === 'sand-veil' ? 0.8 : 1;
	return Math.random() * 100 > attack.data.accuracy * weatherFactor;
};
