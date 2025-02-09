import { AddToastFunction } from '../hooks/useToasts';
import { isPrimaryAilment, PrimaryAilment } from '../interfaces/Ailment';
import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyAilmentToPokemon } from './applyAilmentToPokemon';

export const applyAttackAilmentsToPokemon = (
	pokemon: BattlePokemon,
	attack: BattleAttack,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	const random = Math.random() * 100;
	const ailment = attack.data.meta.ailment.name;

	if (random < attack.data.meta.ailment_chance) {
		if (!isPrimaryAilment({ type: ailment })) {
			return pokemon;
		}
		return applyAilmentToPokemon(
			pokemon,
			ailment as PrimaryAilment['type'],
			dispatchToast
		);
	}

	return pokemon;
};
