import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleParalyzed = (
	attacker: BattlePokemon,

	addMessage: (x: string) => void
) => {
	addMessage(`${attacker.data.name} is fully paralyzed `);

	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//Dont reduce pp, didnt attack
	return updatedAttacker;
};
