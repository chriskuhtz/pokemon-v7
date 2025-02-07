import { BattleAttack } from '../interfaces/BattleAttack';

/**
 *
 * @param attack
 * @returns true if it misses
 */
export const determineMiss = (attack: BattleAttack): boolean => {
	return Math.random() * 100 > attack.data.accuracy;
};
