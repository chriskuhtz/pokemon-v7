import { BattleAttack } from '../../interfaces/BattleActions';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { BattleFieldEffect } from '../../modules/Battle/BattleField';
import { calculateModifiedStat } from '../calculateModifiedStat';

export const getStatFactor = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack,
	battleFieldEffects: BattleFieldEffect[],
	critFactor: number
): number => {
	const damageClass = attack.data.damage_class.name;
	const atk = () => {
		if (attack.name === 'body-press') {
			return calculateModifiedStat(
				'defense',
				attacker,
				battleFieldEffects.some(
					(e) => e.type === 'flower-gift' && e.ownerId === attacker.ownerId
				)
			);
		}
		if (attack.name === 'foul-play') {
			return calculateModifiedStat(
				'attack',
				target,
				battleFieldEffects.some(
					(e) => e.type === 'flower-gift' && e.ownerId === target.ownerId
				)
			);
		}
		if (damageClass === 'physical') {
			return calculateModifiedStat(
				'attack',
				attacker,
				battleFieldEffects.some(
					(e) => e.type === 'flower-gift' && e.ownerId === attacker.ownerId
				)
			);
		}
		return calculateModifiedStat(
			'special-attack',
			attacker,
			battleFieldEffects.some(
				(e) => e.type === 'flower-gift' && e.ownerId === attacker.ownerId
			)
		);
	};

	//Crits ignore boosted defense
	const ignoreBoost = () => {
		return (
			critFactor === 2 ||
			attacker.ability === 'unaware' ||
			attack.name === 'chip-away' ||
			attack.name === 'sacred-sword' ||
			attack.name === 'darkest-lariat'
		);
	};

	const def = () => {
		if (
			damageClass === 'physical' ||
			attack.name === 'psyshock' ||
			attack.name === 'psystrike' ||
			attack.name === 'secret-sword'
		) {
			return calculateModifiedStat(
				'defense',
				target,
				battleFieldEffects.some(
					(e) => e.type === 'flower-gift' && e.ownerId === target.ownerId
				),
				ignoreBoost()
			);
		}
		return calculateModifiedStat(
			'special-defense',
			target,
			battleFieldEffects.some(
				(e) => e.type === 'flower-gift' && e.ownerId === target.ownerId
			),
			ignoreBoost()
		);
	};

	return atk() / def();
};
