import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateDamage } from './calculateDamage';
import { reduceMovePP } from './reduceMovePP';

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

	const updatedAttacker = reduceMovePP(attacker, attack.name);
	const updatedTarget = { ...target, damage: target.damage + damage };
	setAttacker(updatedAttacker);
	setTarget(updatedTarget);

	return { updatedAttacker, updatedTarget };
};
