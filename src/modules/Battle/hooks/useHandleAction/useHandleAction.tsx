import { useCallback } from 'react';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { BattleMessage } from '../../BattleField';
import { handleAttack } from './functions/handleAttack';

export const useHandleAction = (
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: BattleMessage) => void
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
				addMessage({
					message: `You throw a ${move.ball} at ${target.data.name}`,
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return { ...p, moveQueue: [] };
						}
						if (p.id === target.id) {
							addMessage({
								message: `${target.data.name} was caught`,
							});
							return { ...p, moveQueue: [], status: 'CAUGHT' };
						}

						return p;
					})
				);
				return;
			}

			if (move.type === 'BattleAttack') {
				handleAttack({
					attacker,
					pokemon,
					setPokemon,
					addMessage: (x: string) => addMessage({ message: x }),
					move,
				});
				return;
			}
		},
		[addMessage, pokemon, setPokemon]
	);
};
