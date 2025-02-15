import { MoveName } from '../constants/checkLists/movesCheckList';
import { crashDamageMoves } from '../constants/crashDamageMoves';
import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const applyCrashDamage = (
	p: BattlePokemon,
	attack: MoveName,
	dispatchToast: AddToastFunction
) => {
	if (!crashDamageMoves.includes(attack)) {
		return p;
	} else {
		dispatchToast(`${p.data.name} crashed and damaged itself`);

		return { ...p, damage: p.damage + Math.floor(p.stats.hp / 2) };
	}
};
