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
}) => {
	const damage = calculateDamage(attacker, target, attack);
	setAttacker({
		...attacker,
		firstMove: {
			...attacker.firstMove,
			usedPP: attacker.firstMove.usedPP + 1,
		},
	});
	setTarget({ ...target, damage: target.damage + damage });
};
