import { useCallback } from 'react';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { handleAttack } from './functions/handleAttack';

export const useHandleAction = (
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: string) => void
) => {
	return useCallback(
		(attacker: BattlePokemon) => {
			//CHECKS
			const move = attacker.moveQueue[0];
			if (!['BattleAttack', 'CatchProcessInfo'].includes(move.type)) {
				throw new Error('cant handle this yet');
			}

			if (move.type === 'CatchProcessInfo') {
				const target = pokemon.find(
					(p) => p.id === move.targetId && p.status === 'ONFIELD'
				);
				if (!target) {
					throw new Error('ther is no target to catch');
				}
				addMessage(`You throw a ${move.ball} at ${target.data.name}`);
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return { ...p, moveQueue: [] };
						}
						if (p.id === target.id) {
							addMessage(`${target.data.name} was caught`);
							return { ...p, moveQueue: [], status: 'CAUGHT' };
						}

						return p;
					})
				);
				return;
			}

			if (move.type === 'BattleAttack') {
				handleAttack({ attacker, pokemon, setPokemon, addMessage, move });
				return;
			}
		},
		[addMessage, pokemon, setPokemon]
	);
};
