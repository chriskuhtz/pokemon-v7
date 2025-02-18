import { useCallback } from 'react';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const useHandleAction = (
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>
) => {
	return useCallback(
		(attacker: BattlePokemon) => {
			console.log('handle Action for', attacker);
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

			//EMPTY THE MOVEQUEUE
			const updatedAttacker = { ...attacker, moveQueue: [] };
			const updatedTarget = { ...target, damage: target.damage + 5 };

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
		[pokemon, setPokemon]
	);
};
