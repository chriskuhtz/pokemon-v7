import { baseInternalDex } from '../constants/baseInternalDex';
import { MapId } from '../constants/gameData/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { InternalDex } from '../interfaces/GameData';
import {
	EncounterRarity,
	OverworldEncounter,
} from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { InternalDexEntry, SwarmType } from '../interfaces/Pokedex';
import { PokemonType, pokemonTypes } from '../interfaces/PokemonType';
import { Stat } from '../interfaces/StatObject';
import { ArrayHelpers } from './ArrayHelpers';
import { TimeOfDay } from './getTimeOfDay';

export const byType: Record<PokemonType, PokemonName[]> = Object.fromEntries(
	[...pokemonTypes].map((type) => {
		const mons: PokemonName[] = Object.entries(baseInternalDex)
			.filter(([, { types }]) => types.includes(type))
			.map(([name]) => name as PokemonName);

		return [type, mons];
	})
) as Record<PokemonType, PokemonName[]>;

export const getRampagers = (internalDex: InternalDex) => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.rampager)
		.map(([key]) => key) as PokemonName[];
};
export const getHoneyEncounters = (internalDex: InternalDex) => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.honey)
		.map(([key]) => key) as PokemonName[];
};
export const getUnderRockEncounters = (internalDex: InternalDex) => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.underRock)
		.map(([key]) => key) as PokemonName[];
};
export const getSwarmOptions = (type: SwarmType, internalDex: InternalDex) => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.swarm === type)
		.map(([key]) => key) as PokemonName[];
};

export const getRandomSwarmMon = (
	type: SwarmType,
	internalDex: InternalDex
): PokemonName => {
	return ArrayHelpers.getRandomEntry(getSwarmOptions(type, internalDex));
};

export const getAllBerryLureMonForRoute = (
	map: MapId,
	internalDex: InternalDex
): PokemonName[] => {
	const options: PokemonName[] = Object.entries(internalDex)
		.filter(([, value]) => value.berryLureMapId === map)
		.map(([key]) => key as PokemonName);

	return options;
};

export const getBerryLureMon = (
	map: MapId,
	type: PokemonType,
	internalDex: InternalDex
) => {
	const options: PokemonName[] = Object.entries(internalDex)
		.filter(
			([, value]) => value.berryLureMapId === map && value.types.includes(type)
		)
		.map(([key]) => key as PokemonName);

	if (options.length === 0) {
		return;
	}
	return ArrayHelpers.getRandomEntry(options);
};

export const getAllEncountersFor = (
	mapId: MapId,
	config: {
		area?: 'WATER' | 'LAND';
		timeOfDay?: TimeOfDay;
		includeAllDay?: boolean;
		rarity?: EncounterRarity;
	},
	internalDex: InternalDex
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
	},
	internalDex: InternalDex
): Partial<OwnedPokemon> => {
	const options = getAllEncountersFor(
		mapId,
		{
			...config,
			includeAllDay: true,
		},
		internalDex
	);
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

	const chosen = ArrayHelpers.getRandomEntry(flatMapped);
	const xp = Math.floor(
		chosen.maxXp - Math.random() * (chosen.maxXp - chosen.minXp)
	);
	return { ...chosen, xp };
};

export const getAllPokemonThatMaxThisEV = (
	stat: Stat
): [PokemonName, InternalDexEntry][] => {
	return Object.entries(baseInternalDex).filter(
		([, value]) =>
			Object.keys(value.evs).includes(stat) &&
			value.evs[stat] === 3 &&
			Object.keys(value.evs).length === 1
	) as [PokemonName, InternalDexEntry][];
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
