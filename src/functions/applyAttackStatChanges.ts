import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';

export const applyAttackStatChanges = (
	pokemon: BattlePokemon,
	attack: BattleAttack,
	dispatchToast: (x: string) => void,
	selfInflicted: boolean,
	battleFieldEffects: BattleFieldEffect[]
): BattlePokemon => {
	let updatedMon = { ...pokemon };

	attack.data.stat_changes.forEach((s) => {
		updatedMon = applyStatChangeToPokemon(
			updatedMon,
			s.stat.name,
			s.change,
			selfInflicted,
			battleFieldEffects,
			dispatchToast
		);
	});

	return updatedMon;
};
