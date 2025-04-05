import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getHeldItemInBattle } from './getHeldItem';

export const targetFlinched = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack
): boolean => {
	const stenchFactor = attacker.ability === 'stench' ? 10 : 0;
	const kingsRockFactor =
		getHeldItemInBattle(attacker) === 'kings-rock' ? 10 : 0;

	if (target.ability === 'inner-focus') {
		return false;
	}

	const { flinch_chance } = attack.data.meta;

	const modified = (flinch_chance + stenchFactor + kingsRockFactor) / 100;

	return Math.random() < modified;
};
