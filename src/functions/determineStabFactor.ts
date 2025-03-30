import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getTypeNames } from './getTypeNames';

export const determineStabFactor = (
	attacker: BattlePokemon,
	attack: BattleAttack
): number => {
	const attackerTypes = getTypeNames(attacker);
	if (attackerTypes.includes(attack.data.type.name)) {
		return attacker.ability === 'adaptability' ? 2 : 1.5;
	}

	return 1;
};
