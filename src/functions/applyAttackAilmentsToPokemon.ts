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
	target: BattlePokemon,
	applicator: BattlePokemon,
	attack: BattleAttack,
	addMessage: (x: string) => void
): { updatedTarget: BattlePokemon; updatedApplicator: BattlePokemon } => {
	if (
		//shield dust prevents all side effects
		target.ability === 'shield-dust' &&
		attack.data.damage_class.name !== 'status'
	) {
		return { updatedTarget: target, updatedApplicator: applicator };
	}
	const random = Math.random() * 100;
	const ailment = attack.data.meta.ailment.name;
	const chance =
		attack.data.damage_class.name === 'status'
			? 100
			: attack.data.meta.ailment_chance;

	if (random < chance) {
		if (isPrimaryAilment({ type: ailment })) {
			return applyPrimaryAilmentToPokemon(
				target,
				applicator,
				ailment as PrimaryAilment['type'],
				addMessage
			);
		}
		if (isSecondaryAilment({ type: ailment })) {
			return {
				updatedTarget: applySecondaryAilmentToPokemon(
					target,
					ailment as SecondaryAilment['type'],
					addMessage
				),
				updatedApplicator: applicator,
			};
		}
	}

	return { updatedTarget: target, updatedApplicator: applicator };
};
