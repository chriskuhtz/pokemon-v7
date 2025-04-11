import { applyCrashDamage } from '../../../functions/applyCrashDamage';
import { MissReason } from '../../../functions/determineMiss';
import { Message } from '../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleMiss = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	pokemon: BattlePokemon[],
	setPokemon: (x: BattlePokemon[]) => void,
	addMessage: (x: Message) => void,
	reason?: MissReason
) => {
	if (reason === 'PROTECTED') {
		addMessage({ message: 'The Target protected itself' });
	}
	if (reason === 'SOUNDPROOF') {
		addMessage({ message: 'The Target has soundproof' });
	}
	if (reason === 'TARGET_NOT_ASLEEP') {
		addMessage({ message: 'But The Target is awake' });
	}
	if (reason === 'SOUNDPROOF') {
		addMessage({ message: `But ${attacker.name} is not asleep` });
	} else addMessage({ message: 'It Missed' });

	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };

	setPokemon(
		pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return applyCrashDamage(updatedAttacker, attack.name, addMessage);
			}
			return p;
		})
	);
};
