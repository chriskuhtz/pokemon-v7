import { changeMovePP } from '../../../functions/changeMovePP';
import { Message } from '../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleNoTarget = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	pokemon: BattlePokemon[],
	setPokemon: (x: BattlePokemon[]) => void,
	addMessage: (x: Message) => void,
	underPressure: boolean
) => {
	addMessage({ message: `${attacker.data.name} used ${attack.name} ` });
	addMessage({ message: 'But there was no target' });
	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//2. reduce pp
	updatedAttacker = changeMovePP(
		updatedAttacker,
		attack.name,
		underPressure ? -2 : -1
	);

	setPokemon(
		pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			return p;
		})
	);
};
