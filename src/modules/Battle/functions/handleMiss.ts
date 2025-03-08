import { applyCrashDamage } from '../../../functions/applyCrashDamage';
import { changeMovePP } from '../../../functions/changeMovePP';
import { MissReason } from '../../../functions/determineMiss';
import { Message } from '../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleMiss = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: Message) => void,
	reason?: MissReason
) => {
	if (reason === 'SOUNDPROOF') {
		addMessage({ message: 'The Target has soundproof' });
	} else addMessage({ message: 'It Missed' });

	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//2. reduce pp
	updatedAttacker = changeMovePP(updatedAttacker, attack.name, -1);

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return applyCrashDamage(updatedAttacker, attack.name, addMessage);
			}
			return p;
		})
	);
};
