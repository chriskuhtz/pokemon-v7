import { contactMoves } from '../constants/contactMoves';
import { AddToastFunction } from '../hooks/useToasts';
import { STATIC_CHANCE } from '../interfaces/Ailment';
import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { applyAilmentToPokemon } from './applyAilmentToPokemon';
import { applyAttackAilmentsToPokemon } from './applyAttackAilmentsToPokemon';
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
}: {
	attacker: BattlePokemon;
	setAttacker: (x: BattlePokemon) => void;
	target: BattlePokemon;
	setTarget: (x: BattlePokemon) => void;
	attack: BattleAttack;
	weather: WeatherType | undefined;
	dispatchToast: AddToastFunction;
}): { updatedAttacker: BattlePokemon; updatedTarget: BattlePokemon } => {
	const damage = calculateDamage(
		attacker,
		target,
		attack,
		weather,
		dispatchToast
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
		updatedAttacker = applyAilmentToPokemon(
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
