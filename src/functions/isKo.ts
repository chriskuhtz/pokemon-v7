import { BattlePokemon } from '../modules/Battle/hooks/useBattlePokemon';

export const isKO = (p: BattlePokemon) => {
	return p.stats.hp - p.damage <= 0;
};
