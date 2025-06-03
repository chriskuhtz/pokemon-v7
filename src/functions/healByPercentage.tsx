import { BattlePokemon } from '../interfaces/BattlePokemon';

export const healByPercentage = (
	b: BattlePokemon,
	percentage: number
): BattlePokemon => {
	const healAmount = Math.floor((b.stats.hp * percentage) / 100);

	return { ...b, damage: Math.max(0, b.damage - healAmount) };
};
