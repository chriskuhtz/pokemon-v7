import { Message } from '../hooks/useMessageQueue';
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
import { getRandomIndex } from './filterTargets';
import { getMovesArray } from './getMovesArray';

export const applyAttackAilmentsToPokemon = (
	target: BattlePokemon,
	applicator: BattlePokemon,
	attack: BattleAttack,
	addMessage: (x: Message) => void
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
	const sereneGraceFactor = applicator.ability === 'serene-grace' ? 2 : 1;
	const chance =
		attack.data.damage_class.name === 'status'
			? 100
			: attack.data.meta.ailment_chance * sereneGraceFactor;

	if (random < chance) {
		if (isPrimaryAilment({ type: ailment })) {
			return applyPrimaryAilmentToPokemon(
				target,
				applicator,
				ailment as PrimaryAilment['type'],
				addMessage
			);
		}
		if (ailment === 'disable') {
			const moves = getMovesArray(target, false);
			const randomMoveName = moves[getRandomIndex(moves.length)].name;
			if (moves.length === 1) {
				addMessage({ message: `cant disable ${target.data.name}'s only move` });
				return { updatedApplicator: applicator, updatedTarget: target };
			}
			return {
				updatedTarget: applySecondaryAilmentToPokemon(
					target,
					ailment as SecondaryAilment['type'],
					addMessage,
					undefined,
					randomMoveName
				),
				updatedApplicator: applicator,
			};
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
