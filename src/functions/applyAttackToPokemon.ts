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
	const damagedTarget = { ...target, damage: target.damage + damage };

	const updatedTarget = applyAttackAilmentsToPokemon(
		damagedTarget,
		attack,
		dispatchToast
	);

	setAttacker(updatedAttacker);
	setTarget(updatedTarget);

	return { updatedAttacker, updatedTarget: damagedTarget };
};
