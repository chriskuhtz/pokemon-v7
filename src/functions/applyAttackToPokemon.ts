import { contactMoves } from '../constants/contactMoves';
import { AddToastFunction } from '../hooks/useToasts';
import { STATIC_CHANCE } from '../interfaces/Ailment';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { applyAttackAilmentsToPokemon } from './applyAttackAilmentsToPokemon';
import { applyPrimaryAilmentToPokemon } from './applyPrimaryAilmentToPokemon';
import { applyStatusMove } from './applyStatusMove';
import { calculateDamage } from './calculateDamage';
import { reduceMovePP } from './reduceMovePP';

export const applyAttackToPokemon = ({
	attacker,
	setAttacker,
	target,
	setTarget,
	attack,
	weather,
	dispatchToast,
	targetIsFlying,
}: {
	attacker: BattlePokemon;
	setAttacker: (x: BattlePokemon) => void;
	target: BattlePokemon;
	setTarget: (x: BattlePokemon) => void;
	attack: BattleAttack;
	weather: WeatherType | undefined;
	dispatchToast: AddToastFunction;
	targetIsFlying?: boolean;
}): { updatedAttacker: BattlePokemon; updatedTarget: BattlePokemon } => {
	let updatedTarget = { ...target };
	let updatedAttacker =
		(attack.multiHits ?? 0) > 1
			? attacker
			: reduceMovePP(attacker, attack.name);

	if (attack.data.damage_class.name === 'status') {
		if (attack.data.target.name === 'user') {
			const res = applyStatusMove(attacker, attack, dispatchToast);
			const pp = reduceMovePP(res, attack.name);
			setAttacker(pp);
			return { updatedAttacker: pp, updatedTarget: target };
		}
		if (attack.data.target.name === 'selected-pokemon') {
			const res = applyStatusMove(target, attack, dispatchToast);
			const pp = reduceMovePP(res, attack.name);
			setTarget(pp);
			return { updatedAttacker: attacker, updatedTarget: pp };
		}
	}
	const damage = calculateDamage(
		attacker,
		target,
		attack,
		weather,
		dispatchToast,
		targetIsFlying
	);

	const drain = attack.data.meta.drain;
	if (drain) {
		const drained = Math.round((damage * drain) / 100);
		updatedAttacker = {
			...updatedAttacker,
			damage: updatedAttacker.damage - drained,
		};
		if (drain > 0) {
			dispatchToast(`${updatedAttacker.data.name} restored ${drained} HP`);
		}
		if (drain < 0) {
			dispatchToast(
				`${updatedAttacker.data.name} took ${drained} HP recoil damage`
			);
		}
	}

	if (target.ability === 'flash-fire' && attack.data.type.name === 'fire') {
		dispatchToast(
			`${target.data.name} raised its power with ${target.ability}`
		);
		updatedTarget.flashFired = true;
	}

	if (
		target.ability === 'static' &&
		contactMoves.includes(attack.name) &&
		Math.random() < STATIC_CHANCE
	) {
		updatedAttacker = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			'paralysis',
			dispatchToast,
			`by ${target.data.name}'s static`
		);
	}
	updatedTarget = { ...updatedTarget, damage: target.damage + damage };

	updatedTarget = applyAttackAilmentsToPokemon(
		updatedTarget,
		attack,
		dispatchToast
	);

	setAttacker(updatedAttacker);
	setTarget(updatedTarget);

	return { updatedAttacker, updatedTarget };
};
