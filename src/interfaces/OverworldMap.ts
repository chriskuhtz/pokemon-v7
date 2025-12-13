import { MapId } from '../constants/gameData/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { TimeOfDay } from '../functions/getTimeOfDay';
import { Occupant } from './Occupant';
import { TileMap } from './TileMap';
import { WeatherType } from './Weather';

export type EncounterRarity = 'common' | 'medium' | 'rare' | 'ultra-rare';

export interface OverworldEncounter {
	name: PokemonName;
	minXp: number;
	maxXp: number;
	rarity: EncounterRarity;
}
export interface OverworldMap {
	id: MapId;
	tileMap: TileMap;
	occupants: Occupant[];
	weather?: WeatherType;
	timeOfDayShadersMap: Record<TimeOfDay, string>;
	tilesetUrl: string;
	area: 'CAVE' | 'OPEN' | 'BUILDING';
	foggy?: boolean;
	dark?: boolean;
	peaceful?: boolean;
	questMenuAvailable: boolean;
}
