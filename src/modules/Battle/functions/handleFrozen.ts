import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleFrozen = (
	attacker: BattlePokemon,
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: string) => void
) => {
	addMessage(`${attacker.data.name} is fully frozen `);

	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//Dont reduce pp, didnt attack

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			return p;
		})
	);
};
