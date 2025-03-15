import { Message } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleAsleep = (
	attacker: BattlePokemon,
	addMessage: (x: Message) => void
) => {
	addMessage({ message: `${attacker.data.name} is deeply asleep ` });

	//UPDATES

	//updated Attacker
	const reducer = attacker.ability === 'early-bird' ? 2 : 1;
	let updatedAttacker: BattlePokemon = {
		...attacker,
		primaryAilment: {
			type: 'sleep',
			duration: (attacker.primaryAilment?.duration ?? 1) - reducer,
		},
	};
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//Dont reduce pp, didnt attack

	return updatedAttacker;
};
