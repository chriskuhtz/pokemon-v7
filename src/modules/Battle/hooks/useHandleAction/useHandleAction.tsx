import { useCallback } from 'react';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../interfaces/Weather';
import { BattleMessage } from '../../BattleField';
import { handleAttack } from './functions/handleAttack';
import { handleCatch } from './functions/handleCatch';

export const useHandleAction = (
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: BattleMessage) => void,
	leave: (x: BattlePokemon[]) => void,
	battleWeather: WeatherType | undefined,
	addMultipleMessages: (x: BattleMessage[]) => void
) => {
	return useCallback(
		(attacker: BattlePokemon) => {
			//CHECKS
			const move = attacker.moveQueue[0];
			if (
				!['BattleAttack', 'CatchProcessInfo', 'RunAway'].includes(move.type)
			) {
				throw new Error('cant handle this yet');
			}
			if (move.type === 'RunAway') {
				addMessage({
					message: `You ran away`,
					onRemoval: () => leave(pokemon.filter((p) => p.status === 'CAUGHT')),
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return { ...p, moveQueue: [] };
						}

						return p;
					})
				);
				return;
			}

			if (move.type === 'CatchProcessInfo') {
				handleCatch(pokemon, attacker, setPokemon, move, addMultipleMessages);
			}

			if (move.type === 'BattleAttack') {
				handleAttack({
					attacker,
					pokemon,
					setPokemon,
					addMessage: (x: string) => addMessage({ message: x }),
					move,
					battleWeather,
				});
				return;
			}
		},
		[addMessage, addMultipleMessages, battleWeather, leave, pokemon, setPokemon]
	);
};
