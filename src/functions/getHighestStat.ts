import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { Stat } from '../interfaces/StatObject';
import { getStats } from './getStats';

export const HIDDEN_STATS_FOR_TOTAL = ['accuracy', 'evasion', 'hp'];

export const getHighestStat = ({
	ownedPokemon,
	data,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
}): [Stat, number] => {
	return Object.entries(
		getStats(
			data.stats,
			ownedPokemon.xp,
			ownedPokemon.growthRate,
			ownedPokemon.nature,
			ownedPokemon.effortValues
		)
	)
		.filter(([stat]) => !HIDDEN_STATS_FOR_TOTAL.includes(stat))
		.sort((a, b) => b[1] - a[1])[0] as [Stat, number];
};
