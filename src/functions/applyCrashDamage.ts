import { MoveName } from '../constants/checkLists/movesCheckList';
import { crashDamageMoves } from '../constants/crashDamageMoves';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { isKO } from './isKo';

export const applyCrashDamage = (
	p: BattlePokemon,
	attack: MoveName,
	addMessage: (x: string) => void
) => {
	if (!crashDamageMoves.includes(attack)) {
		return p;
	} else {
		addMessage(`${p.data.name} crashed and damaged itself`);

		let update = { ...p, damage: p.damage + Math.floor(p.stats.hp / 2) };

		if (isKO(update)) {
			update = { ...update, status: 'FAINTED' };
		}
		return update;
	}
};
