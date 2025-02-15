import { AddToastFunction } from '../hooks/useToasts';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';

export const applyStatusMove = (
	pokemon: BattlePokemon,
	attack: BattleAttack,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	if (attack.data.damage_class.name !== 'status') {
		console.warn('why did you enter applyStatusMove for move', attack);
		return pokemon;
	}

	let updatedMon = { ...pokemon };

	attack.data.stat_changes.forEach((s) => {
		updatedMon = applyStatChangeToPokemon(
			updatedMon,
			s.stat.name,
			s.change,
			dispatchToast
		);
	});

	return updatedMon;
};
