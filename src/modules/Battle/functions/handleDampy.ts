import { changeMovePP } from '../../../functions/changeMovePP';
import { Message } from '../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleDampy = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: Message) => void,
	dampy: { name: string },
	underPressure: boolean
) => {
	addMessage({ message: `${attacker.data.name} used ${attack.name} ` });
	addMessage({
		message: `${dampy.name} prevents self destructing moves with damp`,
	});
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

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			return p;
		})
	);
};
