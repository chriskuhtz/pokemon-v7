import { reduceMovePP } from '../../../functions/reduceMovePP';
import { BattleAttack } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleDampy = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: string) => void,
	dampy: { name: string }
) => {
	addMessage(`${attacker.data.name} used ${attack.name} `);
	addMessage(`${dampy.name} prevents self destructing moves with damp`);
	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//2. reduce pp
	updatedAttacker = reduceMovePP(updatedAttacker, attack.name);

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			return p;
		})
	);
};
