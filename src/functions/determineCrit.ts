import { AbilityName } from '../constants/checkLists/abilityCheckList';

export const determineCrit = (
	critRate: number,
	targetAbility: AbilityName
): boolean => {
	if (targetAbility === 'battle-armor' || targetAbility === 'shell-armor') {
		return false;
	}
	if (critRate > 2) {
		return true;
	}
	if (critRate === 2) {
		return 1 / 2 > Math.random();
	}
	if (critRate === 1) {
		return 1 / 8 > Math.random();
	}
	return 1 / 24 > Math.random();
};
