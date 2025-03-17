import { Message } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleInfatuated = (
	attacker: BattlePokemon,

	addMessage: (x: Message) => void
) => {
	addMessage({
		message: `${attacker.data.name} is infatuated and refuses to attack`,
	});

	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//Dont reduce pp, didnt attack
	return updatedAttacker;
};
