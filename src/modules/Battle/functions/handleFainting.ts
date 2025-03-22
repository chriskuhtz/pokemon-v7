import { isKO } from '../../../functions/isKo';
import { Message } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const checkAndHandleFainting = (
	p: BattlePokemon,
	addMessage: (x: Message) => void
): BattlePokemon => {
	if (!isKO(p)) {
		return p;
	}
	addMessage({ message: `${p.data.name} fainted` });

	return { ...p, status: 'FAINTED', moveQueue: [], roundsInBattle: 0 };
};
