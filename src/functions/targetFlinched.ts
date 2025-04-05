import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getHeldItem } from './getHeldItem';

export const targetFlinched = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack
): boolean => {
	const stenchFactor = attacker.ability === 'stench' ? 10 : 0;
	const kingsRockFactor = getHeldItem(attacker) === 'kings-rock' ? 10 : 0;

	if (target.ability === 'inner-focus') {
		return false;
	}

	let flinch_chance = attack.data.meta.flinch_chance;

	if (attacker.ability === 'sheer-force') {
		//sheer force prevents positive side effects
		flinch_chance = 0;
	}

	const modified = (flinch_chance + stenchFactor + kingsRockFactor) / 100;

	return Math.random() < modified;
};
