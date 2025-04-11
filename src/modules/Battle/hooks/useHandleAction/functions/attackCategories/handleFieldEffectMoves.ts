import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { BattleFieldEffect } from '../../../../BattleField';

export const handleFieldEffectMoves = ({
	attacker,
	pokemon,
	move,
	addBattleFieldEffect,
	target,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	move: BattleAttack;
	addBattleFieldEffect: (x: BattleFieldEffect) => void;
	target: BattlePokemon;
}): BattlePokemon[] => {
	//MIST, LIGHT-SCREEN, REFLECT
	if (['mist', 'light-screen', 'reflect'].includes(move.name)) {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: attacker.ownerId,
			duration: 5,
		});
	}
	if (move.name === 'spikes') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 9000,
		});
	}
	if (move.name === 'safeguard') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 5,
		});
	}
	return pokemon.map((p) => {
		if (p.id === attacker.id) {
			return attacker;
		}
		if (p.id === target.id) {
			return target;
		}
		return p;
	});
};
