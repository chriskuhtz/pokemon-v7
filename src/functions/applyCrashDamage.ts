import { crashDamageMoves } from '../constants/groupedMoves';
import { MoveName } from '../constants/movesCheckList';
import { Message } from '../hooks/useMessageQueue';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { isKO } from './isKo';

export const applyCrashDamage = (
	p: BattlePokemon,
	attack: MoveName,
	addMessage: (x: Message) => void
) => {
	if (!crashDamageMoves.includes(attack)) {
		return p;
	} else {
		addMessage({ message: `${p.data.name} crashed and damaged itself` });

		let update = { ...p, damage: p.damage + Math.floor(p.stats.hp / 2) };

		if (isKO(update)) {
			update = { ...update, status: 'FAINTED' };
		}
		return update;
	}
};
