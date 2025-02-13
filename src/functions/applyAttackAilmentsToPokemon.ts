import { AddToastFunction } from '../hooks/useToasts';
import { isPrimaryAilment, PrimaryAilment } from '../interfaces/Ailment';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyPrimaryAilmentToPokemon } from './applyPrimaryAilmentToPokemon';

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
		return applyPrimaryAilmentToPokemon(
			pokemon,
			ailment as PrimaryAilment['type'],
			dispatchToast
		);
	}

	return pokemon;
};
