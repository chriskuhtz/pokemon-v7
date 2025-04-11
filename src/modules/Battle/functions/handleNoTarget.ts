import { Message } from '../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleNoTarget = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	pokemon: BattlePokemon[],
	setPokemon: (x: BattlePokemon[]) => void,
	addMessage: (x: Message) => void
) => {
	addMessage({ message: `${attacker.data.name} used ${attack.name} ` });
	addMessage({ message: 'But there was no target' });
	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };

	setPokemon(
		pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			return p;
		})
	);
};
