import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleFainting = (
	p: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	addMessage(`${p.data.name} fainted`);

	return { ...p, onField: false, moveQueue: [] };
};
