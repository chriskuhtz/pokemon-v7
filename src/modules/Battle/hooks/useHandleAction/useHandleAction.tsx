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
			if (!['BattleAttack'].includes(move.type)) {
				throw new Error('cant handle this yet');
			}

			if (move.type === 'BattleAttack') {
				handleAttack({ attacker, pokemon, setPokemon, addMessage, move });
			}
		},
		[addMessage, pokemon, setPokemon]
	);
};
