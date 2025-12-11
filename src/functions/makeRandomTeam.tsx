import {
	highBstPokemon,
	lowBstPokemon,
	midBstPokemon,
	ultraHighBstPokemon,
} from '../constants/baseStatRecord';
import { PokemonName } from '../constants/pokemonNames';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { Stat } from '../interfaces/StatObject';
import { ArrayHelpers } from './ArrayHelpers';
import { getAllPokemonThatMaxThisEV } from './internalDex';
import { makeChallengerPokemon } from './makeChallengerPokemon';

export const makeRandomTeam = ({ xp }: { xp: number }): OwnedPokemon[] => {
	const res: PokemonName[] = [];

	if (xp >= 100 * 100 * 100) {
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
	} else if (xp >= 90 * 90 * 90) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
	} else if (xp >= 80 * 80 * 80) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
	} else if (xp >= 70 * 70 * 70) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
	} else if (xp >= 60 * 60 * 60) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(
				Object.keys(ultraHighBstPokemon)
			) as PokemonName
		);
	} else if (xp >= 50 * 50 * 50) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
	} else if (xp >= 40 * 40 * 40) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
	} else if (xp >= 30 * 30 * 30) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(highBstPokemon)) as PokemonName
		);
	} else if (xp >= 20 * 20 * 20) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
	} else if (xp >= 15 * 15 * 15) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(midBstPokemon)) as PokemonName
		);
	} else if (xp >= 10 * 10 * 10) {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
	} else {
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
		res.push(
			ArrayHelpers.getRandomEntry(Object.keys(lowBstPokemon)) as PokemonName
		);
	}

	return res.map((n) => makeChallengerPokemon({ name: n as PokemonName, xp }));
};

export const makeEVTeam = (stat: Stat): OwnedPokemon[] => {
	const options = getAllPokemonThatMaxThisEV(stat);
	const res: PokemonName[] = [
		ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
		ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
		ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
		ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
		ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
		ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
	];
	return res.map((n) =>
		makeChallengerPokemon({ name: n as PokemonName, xp: 125 })
	);
};
