import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { ohkoMoves } from '../constants/ohkoMoves';

export const determineCrit = (
	moveName: string,
	critRate: number,
	targetAbility: AbilityName,
	attackerAbilty: AbilityName,
	attackerFocused: boolean
): boolean => {
	const boostedCritRate =
		critRate +
		(attackerFocused ? 2 : 0) +
		(attackerAbilty === 'super-luck' ? 1 : 0);
	if (ohkoMoves.includes(moveName)) {
		return false;
	}
	if (targetAbility === 'battle-armor' || targetAbility === 'shell-armor') {
		return false;
	}
	if (boostedCritRate > 2) {
		return true;
	}
	if (boostedCritRate === 2) {
		return 1 / 2 > Math.random();
	}
	if (boostedCritRate === 1) {
		return 1 / 8 > Math.random();
	}
	return 1 / 24 > Math.random();
};
