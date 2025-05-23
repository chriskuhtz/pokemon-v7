import { BattlePokemon } from '../interfaces/BattlePokemon';

export const handleCheekPouch = (
	input: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (
		input.ability !== 'cheek-pouch' ||
		!input.consumedBerry ||
		input.cheekPouched
	) {
		return input;
	}
	addMessage(`${input.name} heals itself with cheek pouch`);
	const healAmount = Math.floor(input.stats.hp * 0.33);
	return {
		...input,
		cheekPouched: true,
		damage: Math.max(0, input.damage - healAmount),
	};
};
