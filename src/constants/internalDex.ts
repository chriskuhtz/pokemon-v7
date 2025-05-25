import { getRandomEntry } from '../functions/filterTargets';
import { TimeOfDay } from '../functions/getTimeOfDay';
import {
	EncounterRarity,
	OverworldEncounter,
} from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonType, pokemonTypes } from '../interfaces/PokemonType';
import { internalDex, InternalDexEntry, SwarmType } from './internalDexData';
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

export const getAllEncountersFor = (
	mapId: MapId,
	config: {
		area?: 'WATER' | 'LAND';
		timeOfDay?: TimeOfDay;
		includeAllDay?: boolean;
		rarity?: EncounterRarity;
	}
): OverworldEncounter[] => {
	const { area, timeOfDay, rarity, includeAllDay } = config;
	const res: OverworldEncounter[] = [];
	Object.entries(internalDex).map(([key, value]) => {
		value.encounterOptions?.forEach((option) => {
			if (option.route !== mapId) {
				return;
			}
			if (
				timeOfDay &&
				option.timeOfDay !== timeOfDay &&
				!(includeAllDay && option.timeOfDay === 'ALL_DAY')
			) {
				return;
			}
			if (area && option.area !== area) {
				return;
			}
			if (rarity && option.rarity !== rarity) {
				return;
			}
			res.push({ name: key as PokemonName, ...option });
		});
	});

	return res;
};

export const getRandomEncounter = (
	mapId: MapId,
	config: {
		area?: 'WATER' | 'LAND';
		timeOfDay?: TimeOfDay;
	}
): Partial<OwnedPokemon> => {
	const options = getAllEncountersFor(mapId, config);
	const flatMapped = options.flatMap((p) => {
		if (p.rarity === 'common') {
			return [p, p, p, p, p, p];
		}
		if (p.rarity === 'medium') {
			return [p, p, p, p];
		}
		if (p.rarity === 'rare') {
			return [p, p, p];
		}
		return [p];
	});

	const chosen = getRandomEntry(flatMapped);
	const xp = Math.floor(
		chosen.maxXp - Math.random() * (chosen.maxXp - chosen.minXp)
	);
	return { ...chosen, xp };
};
export const isNotCatchable = (entry: InternalDexEntry) => {
	return (
		[
			!!entry.berryLureMapId,
			!!entry.honey,
			!!entry.rampager,
			!!entry.swarm,
			!!entry.underRock,
			!!(entry.encounterOptions.length > 0),
		].filter((v) => v).length === 0
	);
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
				...value.encounterOptions.map(() => true),
			].filter((v) => v).length > 1
		);
	})
	.map(([key]) => key);
console.log('Mons with more than one encounter option', overUsed);

// console.log(
// 	Object.fromEntries(
// 		Object.entries(internalDex).map(([key, value]) => {
// 			return sledgeHammerPokemon.includes(key)
// 				? [key, { ...value, underRock: true }]
// 				: [key, value];
// 		})
// 	)
// );

const onMultipleRoutes = Object.entries(internalDex)
	.filter(
		([, value]) => value.encounterOptions && value.encounterOptions?.length > 1
	)
	.map(([key]) => key);
console.log('on multiple routes', onMultipleRoutes);
