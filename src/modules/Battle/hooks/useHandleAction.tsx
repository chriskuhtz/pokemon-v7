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
			//CHECKS
			const attack = attacker.moveQueue[0];
			if (attack.type !== 'BattleAttack') {
				throw new Error('cant handle this yet');
			}
			const target = pokemon.find((p) => p.id === attack.targetId);
			if (!target) {
				throw new Error('could not find target');
			}
			//TODO: handle self targeting
			if (target.id === attacker.id) {
				console.warn('attacking yourself much', attacker.data.name);
			}

			//MESSAGES
			addMessage(
				`${attacker.data.name} used ${attack.name} against ${target.data.name}`
			);

			//UPDATES

			//updated Attacker
			let updatedAttacker = { ...attacker };
			//1. update moveQueue
			updatedAttacker = { ...updatedAttacker, moveQueue: [] };
			//2. reduce pp
			updatedAttacker = reduceMovePP(updatedAttacker, attack.name);

			//updated Target
			let updatedTarget = { ...target };
			//1. apply damage
			updatedTarget = {
				...updatedTarget,
				damage:
					updatedTarget.damage +
					calculateDamage(updatedAttacker, target, attack, undefined, true),
			};

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
