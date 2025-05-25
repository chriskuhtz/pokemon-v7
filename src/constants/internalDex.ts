import { getRandomEntry } from '../functions/filterTargets';
import { PokemonType, pokemonTypes } from '../interfaces/PokemonType';
import { internalDex, SwarmType } from './internalDexData';
import { MapId } from './maps/mapsRecord';
import { PokemonName } from './pokemonNames';

export const byType: Record<PokemonType, PokemonName[]> = Object.fromEntries(
	[...pokemonTypes].map((type) => {
		const mons: PokemonName[] = Object.entries(internalDex)
			.filter(([, { types }]) => types.includes(type))
			.map(([name]) => name as PokemonName);

		return [type, mons];
	})
) as Record<PokemonType, PokemonName[]>;

export const getRampagers = () => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.rampager)
		.map(([key]) => key) as PokemonName[];
};
export const getHoneyEncounters = () => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.honey)
		.map(([key]) => key) as PokemonName[];
};
export const getUnderRockEncounters = () => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.underRock)
		.map(([key]) => key) as PokemonName[];
};
export const getSwarmOptions = (type: SwarmType) => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.swarm === type)
		.map(([key]) => key) as PokemonName[];
};

export const getRandomSwarmMon = (type: SwarmType): PokemonName => {
	return getRandomEntry(getSwarmOptions(type));
};

export const getBerryLureMon = (map: MapId, type: PokemonType) => {
	const options: PokemonName[] = Object.entries(internalDex)
		.filter(
			([, value]) => value.berryLureMapId === map && value.types.includes(type)
		)
		.map(([key]) => key as PokemonName);

	if (options.length === 0) {
		return;
	}
	return getRandomEntry(options);
};

const overUsed = Object.entries(internalDex)
	.filter(([, value]) => {
		return (
			[
				!!value.berryLureMapId,
				!!value.honey,
				!!value.rampager,
				!!value.swarm,
				!!value.underRock,
			].filter((v) => v).length > 1
		);
	})
	.map(([key]) => key);
console.log('overUsed Mons', overUsed);
// const neverUsed = Object.entries(internalDex)
// 	.filter(([, value]) => {
// 		return (
// 			[
// 				!!value.berryLureMapId,
// 				!!value.honey,
// 				!!value.rampager,
// 				!!value.swarm,
// 			].filter((v) => v).length === 0
// 		);
// 	})
// 	.map(([key]) => key);

// console.log('neverUsed Mons', neverUsed);

// console.log(
// 	Object.fromEntries(
// 		Object.entries(internalDex).map(([key, value]) => {
// 			return sledgeHammerPokemon.includes(key)
// 				? [key, { ...value, underRock: true }]
// 				: [key, value];
// 		})
// 	)
// );
