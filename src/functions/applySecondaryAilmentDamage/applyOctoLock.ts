import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { applyStatChangeToPokemon } from '../applyStatChangeToPokemon';

export const applyOctoLock = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	let updated = { ...pokemon };
	updated = applyStatChangeToPokemon(
		updated,
		'defense',
		-1,
		false,
		[],
		(m) => addMessage(m.message),
		'octolock'
	);
	updated = applyStatChangeToPokemon(
		updated,
		'special-defense',
		-1,
		false,
		[],
		(m) => addMessage(m.message),
		'octolock'
	);
	return updated;
};
