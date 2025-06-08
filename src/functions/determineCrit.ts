import { ohkoMoves } from '../constants/groupedMoves';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { getHeldItem } from './getHeldItem';
import { hasAilment } from './hasAilment';

export const determineCrit = (
	target: BattlePokemon,
	attacker: BattlePokemon,
	moveName: string,
	critRate: number,
	battleFieldEffects: BattleFieldEffect[]
): boolean => {
	const targetLuckyChanted = battleFieldEffects.some(
		(b) => b.ownerId === target.ownerId && b.type === 'lucky-chant'
	);
	if (targetLuckyChanted) {
		return false;
	}

	const attackerFocused = hasAilment(attacker, 'focused');

	const boostedCritRate =
		critRate +
		(attackerFocused ? 2 : 0) +
		(attacker.ability === 'super-luck' ? 1 : 0) +
		(getHeldItem(attacker) === 'scope-lens' ? 1 : 0) +
		(getHeldItem(attacker) === 'razor-claw' ? 1 : 0) +
		(attacker.name === 'chansey' && getHeldItem(attacker) === 'lucky-punch'
			? 2
			: 0) +
		((attacker.name === 'farfetchd' ||
			attacker.name === 'farfetchd-galar' ||
			attacker.name === 'sirfetchd') &&
		getHeldItem(attacker) === 'stick'
			? 2
			: 0);
	if (ohkoMoves.includes(moveName)) {
		return false;
	}
	if (target.ability === 'battle-armor' || target.ability === 'shell-armor') {
		return false;
	}
	if (
		attacker.ability === 'merciless' &&
		(target.primaryAilment?.type === 'poison' ||
			target.primaryAilment?.type === 'toxic')
	) {
		return true;
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
