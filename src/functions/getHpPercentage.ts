import { BattlePokemon } from '../interfaces/BattlePokemon';

export const getHpPercentage = (b: BattlePokemon): number => {
	const current = b.stats.hp - b.damage;

	return current / b.stats.hp;
};
