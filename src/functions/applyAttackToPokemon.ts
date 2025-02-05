import {
	BattleAttack,
	BattlePokemon,
} from '../modules/Battle/hooks/useBattlePokemon';
import { calculateDamage } from './calculateDamage';

export const applyAttackToPokemon = ({
	attacker,
	setAttacker,
	target,
	setTarget,
	attack,
}: {
	attacker: BattlePokemon;
	setAttacker: (x: BattlePokemon) => void;
	target: BattlePokemon;
	setTarget: (x: BattlePokemon) => void;
	attack: BattleAttack;
}): { updatedAttacker: BattlePokemon; updatedTarget: BattlePokemon } => {
	const damage = calculateDamage(attacker, target, attack);

	const updatedAttacker = {
		...attacker,
		firstMove: {
			...attacker.firstMove,
			usedPP: attacker.firstMove.usedPP + 1,
		},
	};
	const updatedTarget = { ...target, damage: target.damage + damage };
	setAttacker(updatedAttacker);
	setTarget(updatedTarget);

	return { updatedAttacker, updatedTarget };
};
