import { useCallback } from 'react';
import { calculateDamage } from '../../../functions/calculateDamage';
import { reduceMovePP } from '../../../functions/reduceMovePP';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const useHandleAction = (
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: string) => void
) => {
	return useCallback(
		(attacker: BattlePokemon) => {
			console.log('handle Action for', attacker);
			const attack = attacker.moveQueue[0];
			if (attack.type !== 'BattleAttack') {
				throw new Error('cant handle this yet');
			}
			addMessage('Check 1: is an attack');

			const target = pokemon.find((p) => p.id === attack.targetId);

			if (!target) {
				throw new Error('could not find target');
			}
			addMessage('Check 2: target exists');
			//TODO: handle self targeting
			if (target.id === attacker.id) {
				console.warn('attacking yourself much', attacker.data.name);
			}

			//updated Attacker
			let updatedAttacker = { ...attacker };
			//1. update moveQueue
			updatedAttacker = { ...updatedAttacker, moveQueue: [] };
			//2. reduce pp
			updatedAttacker = reduceMovePP(updatedAttacker, attack.name);
			addMessage('Check 3: updating attacker');
			//updated Target
			let updatedTarget = { ...target };
			//1. apply damage
			updatedTarget = {
				...updatedTarget,
				damage:
					updatedTarget.damage +
					calculateDamage(updatedAttacker, target, attack, undefined, true),
			};
			addMessage('Check 4: applying damage');

			setPokemon((pokemon) =>
				pokemon.map((p) => {
					if (p.id === updatedAttacker.id) {
						return updatedAttacker;
					}
					if (p.id === updatedTarget.id) {
						return updatedTarget;
					}
					return p;
				})
			);
		},
		[addMessage, pokemon, setPokemon]
	);
};
