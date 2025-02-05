import { BattlePokemon } from '../interfaces/BattlePokemon';

export const isKO = (p: BattlePokemon) => {
	return p.stats.hp - p.damage <= 0;
};
