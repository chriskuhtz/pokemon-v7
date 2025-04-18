import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getHeldItem } from './getHeldItem';
import { getMiddleOfThree } from './getMiddleOfThree';

export const applyDrainOrRecoil = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	move: BattleAttack,
	damage: number,
	addMessage: (x: Message) => void
): BattlePokemon => {
	//Recoil is just negative drain
	const updatedAttacker = { ...attacker };

	const baseDrain = move.data.meta.drain;

	if (baseDrain === 0 || damage === 0) {
		return updatedAttacker;
	}
	//Recoil
	if (baseDrain < 0) {
		//no recoil with rock head
		if (updatedAttacker.ability === 'rock-head') {
			return updatedAttacker;
		} else {
			const recoil = damage * (baseDrain / 100) * -1;
			const totalRecoil = getMiddleOfThree([0, recoil, attacker.stats.hp]);

			addMessage({
				message: `${updatedAttacker.data.name} took ${totalRecoil} HP recoil damage`,
			});
			return {
				...updatedAttacker,
				damage: updatedAttacker.damage + totalRecoil,
			};
		}
	}
	//Drain
	if (baseDrain > 0) {
		const bigRootFactor = getHeldItem(updatedAttacker) === 'big-root' ? 1.3 : 1;
		const drain = damage * (baseDrain / 100) * bigRootFactor;

		if (target.ability === 'liquid-ooze') {
			const totalDrain = getMiddleOfThree([
				0,
				drain,
				attacker.stats.hp - attacker.damage,
			]);
			addMessage({
				message: `${updatedAttacker.data.name} took ${totalDrain} HP damage from liquid ooze`,
			});
			return {
				...updatedAttacker,
				damage: updatedAttacker.damage + totalDrain,
			};
		} else {
			const totalDrain = getMiddleOfThree([0, drain, attacker.damage]);
			if (totalDrain !== 0) {
				addMessage({
					message: `${updatedAttacker.data.name} restored ${totalDrain} HP`,
				});
			}

			return {
				...updatedAttacker,
				damage: Math.max(0, updatedAttacker.damage - totalDrain),
			};
		}
	}

	return updatedAttacker;
};
