import { Message } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleFainting = (
	p: BattlePokemon,
	addMessage: (x: Message) => void
): BattlePokemon => {
	addMessage({ message: `${p.data.name} fainted` });

	return { ...p, status: 'FAINTED', moveQueue: [], roundsInBattle: 0 };
};
