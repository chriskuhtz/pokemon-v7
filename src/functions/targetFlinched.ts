import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const targetFlinched = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack
): boolean => {
	const stenchModifier = attacker.ability === 'stench' ? 0.1 : 0;

	if (target.ability === 'inner-focus') {
		return false;
	}

	const { flinch_chance } = attack.data.meta;
	const modified = flinch_chance + stenchModifier;

	return Math.random() < modified;
};
