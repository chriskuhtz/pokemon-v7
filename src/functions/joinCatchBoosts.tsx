import { PokemonType, pokemonTypes } from '../interfaces/PokemonType';
import { CatchBoosts } from '../interfaces/SaveFile';

export const joinCatchBoosts = (
	existing: CatchBoosts,
	update: Partial<CatchBoosts>
): CatchBoosts => {
	const joined = { ...existing };

	Object.entries(update).forEach((updateEntry) => {
		const key = updateEntry[0] as PokemonType;
		const value = updateEntry[1];

		if (key) {
			//amount cant fall under 0
			joined[key] = Math.max(joined[key] + value, 0);
		}
	});

	return joined;
};

export const EmptyCatchBoosts = Object.fromEntries(
	[...pokemonTypes].map((t) => [t, 0])
) as CatchBoosts;
