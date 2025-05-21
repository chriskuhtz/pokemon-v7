import { Message } from '../hooks/useMessageQueue';
import {
	AilmentType,
	isPrimaryAilment,
	isSecondaryAilment,
	PrimaryAilment,
	SecondaryAilment,
} from '../interfaces/Ailment';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleTerrain';
import { applyPrimaryAilmentToPokemon } from './applyPrimaryAilmentToPokemon';
import { applySecondaryAilmentToPokemon } from './applySecondaryAilmentToPokemon';
import { getRandomEntry } from './filterTargets';
import { getHeldItem } from './getHeldItem';

export const getAilmentName = (
	attack: BattleAttack
): AilmentType | undefined => {
	if (attack.name === 'toxic') {
		return 'toxic';
	}
	if (attack.name === 'tri-attack') {
		return getRandomEntry(['paralysis', 'freeze', 'burn']);
	}

	if (
		isPrimaryAilment({ type: attack.data.meta.ailment.name }) ||
		isSecondaryAilment({ type: attack.data.meta.ailment.name })
	) {
		return attack.data.meta.ailment.name as AilmentType;
	}

	return undefined;
};

export const applyAttackAilmentsToPokemon = (
	target: BattlePokemon,
	applicator: BattlePokemon,
	attack: BattleAttack,
	addMessage: (x: Message) => void,
	battleWeather: WeatherType | undefined,
	battleFieldEffects: BattleFieldEffect[],
	safeGuarded: boolean,
	terrain: BattleTerrain | undefined
): { updatedTarget: BattlePokemon; updatedApplicator: BattlePokemon } => {
	if (
		applicator.ability === 'sheer-force' &&
		attack.data.meta.category.name === 'damage+ailment'
	) {
		//sheer force prevents positive side effects
		return { updatedTarget: target, updatedApplicator: applicator };
	}
	if (
		//shield dust prevents all side effects
		target.ability === 'shield-dust' &&
		attack.data.damage_class.name !== 'status'
	) {
		return { updatedTarget: target, updatedApplicator: applicator };
	}
	if (
		//good as gold prevents all side effects
		target.ability === 'good-as-gold' &&
		attack.data.damage_class.name === 'status'
	) {
		addMessage({
			message: `${target.name} prevents status conditions with good as gold`,
		});
		return { updatedTarget: target, updatedApplicator: applicator };
	}
	if (
		//covert cloak prevents all side effects
		getHeldItem(target) === 'covert-cloak' &&
		attack.data.damage_class.name !== 'status'
	) {
		return { updatedTarget: target, updatedApplicator: applicator };
	}
	const random = Math.random() * 100;
	const ailment = getAilmentName(attack);
	const sereneGraceFactor = applicator.ability === 'serene-grace' ? 2 : 1;
	const chance =
		attack.data.damage_class.name === 'status'
			? 100
			: attack.data.meta.ailment_chance * sereneGraceFactor;

	if (safeGuarded) {
		addMessage({ message: 'Target is protected by safeguard' });
		return { updatedTarget: target, updatedApplicator: applicator };
	}
	if (ailment && random < chance) {
		if (isPrimaryAilment({ type: ailment })) {
			return applyPrimaryAilmentToPokemon(
				target,
				applicator,
				ailment as PrimaryAilment['type'],
				addMessage,
				battleWeather,
				battleFieldEffects,
				terrain
			);
		}

		if (isSecondaryAilment({ type: ailment })) {
			return {
				updatedTarget: applySecondaryAilmentToPokemon({
					pokemon: target,
					ailment: ailment as SecondaryAilment['type'],
					addMessage,
					applicator: applicator,
				}),
				updatedApplicator: applicator,
			};
		}
	}

	return { updatedTarget: target, updatedApplicator: applicator };
};
