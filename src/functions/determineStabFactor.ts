import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { hasType } from './hasType';

export const determineStabFactor = (
	attacker: BattlePokemon,
	attack: BattleAttack
): number => {
	if (hasType(attacker, attack.data.type.name)) {
		return attacker.ability === 'adaptability' ? 2 : 1.5;
	}

	return 1;
};
