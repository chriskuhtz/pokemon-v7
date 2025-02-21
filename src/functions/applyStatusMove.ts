import { AddToastFunction } from '../hooks/useToasts';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';

export const applyAttackStatChanges = (
	pokemon: BattlePokemon,
	attack: BattleAttack,
	dispatchToast: AddToastFunction,
	selfInflicted: boolean
): BattlePokemon => {
	let updatedMon = { ...pokemon };

	attack.data.stat_changes.forEach((s) => {
		updatedMon = applyStatChangeToPokemon(
			updatedMon,
			s.stat.name,
			s.change,
			selfInflicted,
			dispatchToast
		);
	});

	return updatedMon;
};
