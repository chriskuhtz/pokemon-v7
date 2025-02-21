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
	addMessage: (x: string) => void
): BattlePokemon => {
	if (
		//shield dust prevents all side effects
		pokemon.ability === 'shield-dust' &&
		attack.data.damage_class.name !== 'status'
	) {
		return pokemon;
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
				pokemon,
				ailment as PrimaryAilment['type'],
				addMessage
			);
		}
		if (isSecondaryAilment({ type: ailment })) {
			return applySecondaryAilmentToPokemon(
				pokemon,
				ailment as SecondaryAilment['type'],
				addMessage
			);
		}
	}

	return pokemon;
};
