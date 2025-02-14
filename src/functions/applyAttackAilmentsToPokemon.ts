import { AddToastFunction } from '../hooks/useToasts';
import {
	isPrimaryAilment,
	isSecondaryAilment,
	PrimaryAilment,
	SecondaryAilment,
} from '../interfaces/Ailment';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyPrimaryAilmentToPokemon } from './applyPrimaryAilmentToPokemon';
import { applySecondaryAilmentToPokemon } from './applySecondaryAilmentToPokemon';

export const applyAttackAilmentsToPokemon = (
	pokemon: BattlePokemon,
	attack: BattleAttack,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	const random = Math.random() * 100;
	const ailment = attack.data.meta.ailment.name;

	if (random < attack.data.meta.ailment_chance) {
		if (isPrimaryAilment({ type: ailment })) {
			return applyPrimaryAilmentToPokemon(
				pokemon,
				ailment as PrimaryAilment['type'],
				dispatchToast
			);
		}
		if (isSecondaryAilment({ type: ailment })) {
			return applySecondaryAilmentToPokemon(
				pokemon,
				ailment as SecondaryAilment['type'],
				dispatchToast
			);
		}
	}

	return pokemon;
};
