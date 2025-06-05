import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';

export const handleFieldEffectMoves = ({
	attacker,
	pokemon,
	move,
	addBattleFieldEffect,
	target,
	weather,
	addMessage,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	move: BattleAttack;
	addBattleFieldEffect: (x: BattleFieldEffect) => void;
	target: BattlePokemon;
	weather: WeatherType | undefined;
	addMessage: (message: Message) => void;
}): BattlePokemon[] => {
	//MIST, LIGHT-SCREEN, REFLECT
	if (['mist', 'light-screen', 'reflect'].includes(move.name)) {
		const duration = getHeldItem(attacker) === 'light-clay' ? 8 : 5;
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: attacker.ownerId,
			duration,
		});
	}
	if (move.name === 'spikes') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 9000,
		});
	}
	if (move.name === 'toxic-spikes') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 9000,
		});
	}
	if (move.name === 'sticky-web') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 9000,
		});
	}
	if (move.name === 'tailwind') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 3,
		});
	}
	if (move.name === 'safeguard') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 5,
		});
	}
	if (move.name === 'aurora-veil') {
		if (weather !== 'hail') {
			addMessage({ message: 'it failed' });
		} else
			addBattleFieldEffect({
				type: move.name as BattleFieldEffect['type'],
				ownerId: target.ownerId,
				duration: 5,
			});
	}
	if (move.name === 'lucky-chant') {
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
