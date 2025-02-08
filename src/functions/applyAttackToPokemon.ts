import { AddToastFunction } from '../hooks/useToasts';
import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateDamage } from './calculateDamage';
import { WeatherType } from './determineWeatherFactor';
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
	dispatchToast?: AddToastFunction;
}): { updatedAttacker: BattlePokemon; updatedTarget: BattlePokemon } => {
	const damage = calculateDamage(
		attacker,
		target,
		attack,
		weather,
		dispatchToast
	);

	const updatedAttacker =
		(attack.multiHits ?? 0) > 1
			? attacker
			: reduceMovePP(attacker, attack.name);
	const updatedTarget = { ...target, damage: target.damage + damage };
	setAttacker(updatedAttacker);
	setTarget(updatedTarget);

	return { updatedAttacker, updatedTarget };
};
