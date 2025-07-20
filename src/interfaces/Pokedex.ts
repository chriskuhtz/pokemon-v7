import { MapId } from '../constants/gameData/maps/mapsRecord';
import { TimeOfDay } from '../functions/getTimeOfDay';
import { PokemonType } from './PokemonType';
import { StatObject } from './StatObject';

export type SwarmType =
	| 'WEAK'
	| 'STRONG'
	| 'PAST_DISTORTION'
	| 'SPACE_DISTORTION'
	| 'FUTURE_DISTORTION';

export type EncounterOption = {
	route: MapId;
	timeOfDay: TimeOfDay | 'ALL_DAY';
	minXp: number;
	maxXp: number;
	rarity: 'common' | 'medium' | 'rare' | 'ultra-rare';
	area: 'LAND' | 'WATER';
};
export type InternalDexEntry = {
	dexId: number;
	rampager?: boolean;
	swarm?: SwarmType;
	berryLureMapId?: MapId;
	types: PokemonType[];
	honey?: boolean;
	underRock?: boolean;
	encounterOptions: EncounterOption[];
	evs: Partial<StatObject>;
};
