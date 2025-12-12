import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { SettingsObject } from '../interfaces/SettingsObject';
import { Stat } from '../interfaces/StatObject';
import { getStats } from './getStats';

export const HIDDEN_STATS_FOR_TOTAL = ['accuracy', 'evasion', 'hp'];

export const getHighestStat = ({
	ownedPokemon,
	data,
	settings,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	settings: SettingsObject | undefined;
}): [Stat, number] => {
	return Object.entries(
		getStats(
			data.stats,
			ownedPokemon.xp,
			ownedPokemon.growthRate,
			ownedPokemon.nature,
			ownedPokemon.effortValues,
			settings
		)
	)
		.filter(([stat]) => !HIDDEN_STATS_FOR_TOTAL.includes(stat))
		.sort((a, b) => b[1] - a[1])[0] as [Stat, number];
};
