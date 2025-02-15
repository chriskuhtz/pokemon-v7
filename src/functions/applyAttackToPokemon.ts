import { contactMoves } from '../constants/contactMoves';
import { AddToastFunction } from '../hooks/useToasts';
import { STATIC_CHANCE } from '../interfaces/Ailment';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { applyAttackAilmentsToPokemon } from './applyAttackAilmentsToPokemon';
import { applyPrimaryAilmentToPokemon } from './applyPrimaryAilmentToPokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { calculateDamage } from './calculateDamage';
import { changeBattlePokemonType } from './changeBattlePokemonType';
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
	if (attack.data.target.name === 'user') {
		let updatedMon = { ...attacker };

		attack.data.stat_changes.forEach((s) => {
			updatedMon = applyStatChangeToPokemon(
				updatedMon,
				s.stat.name,
				s.change,
				dispatchToast
			);
		});
		const res = reduceMovePP(updatedMon, attack.name);
		setAttacker(res);
		return { updatedAttacker: res, updatedTarget: target };
	}
	const damage = calculateDamage(
		attacker,
		target,
		attack,
		weather,
		dispatchToast,
		targetIsFlying
	);

	if (target.ability === 'flash-fire' && attack.data.type.name === 'fire') {
		dispatchToast(
			`${target.data.name} raised its power with ${target.ability}`
		);
		updatedTarget.flashFired = true;
	}

	let updatedAttacker =
		(attack.multiHits ?? 0) > 1
			? attacker
			: reduceMovePP(attacker, attack.name);

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
	if (damage > 0 && updatedTarget.ability === 'color-change') {
		updatedTarget = changeBattlePokemonType(
			updatedTarget,
			attack.data.type.name,
			dispatchToast
		);
	}

	setAttacker(updatedAttacker);
	setTarget(updatedTarget);

	return { updatedAttacker, updatedTarget };
};
