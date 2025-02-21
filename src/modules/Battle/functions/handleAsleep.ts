import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleAsleep = (
	attacker: BattlePokemon,
	addMessage: (x: string) => void
) => {
	addMessage(`${attacker.data.name} is deeply asleep `);

	//UPDATES

	//updated Attacker
	let updatedAttacker: BattlePokemon = {
		...attacker,
		primaryAilment: {
			type: 'sleep',
			duration: (attacker.primaryAilment?.duration ?? 1) - 1,
		},
	};
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//Dont reduce pp, didnt attack

	return updatedAttacker;
};
