import { MapId } from '../constants/gameData/maps/mapsRecord';
import { QuestName } from '../constants/gameData/questsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { TimeOfDay } from '../functions/getTimeOfDay';
import { BattleTeamConfig } from '../hooks/useGetBattleTeam';
import { Inventory } from './Inventory';
import { ApricornType, ItemType } from './Item';
import { OwnedPokemon } from './OwnedPokemon';
import { RoutesType } from './Routing';
import {
	CharacterLocationData,
	CharacterOrientation,
	SaveFile,
} from './SaveFile';
import { WeatherType } from './Weather';

export const OCCUPANT_TYPES = [
	'ITEM',
	'HIDDEN_ITEM',
	'PC',
	'MERCHANT',
	'NURSE',
	'TRAINER',
	'BUSH',
	'ROCK',
	'NPC',
	'PORTAL',
	'SIGN',
	'HONEY_TREE',
	'HALLOWED_TOWER',
	'STRANGE_TREE',
	'ON_STEP_PORTAL',
	'BULLETIN_BOARD',
	'OBSTACLE',
	'COMBEE_HIVE',
	'POKEMON',
	'POKEMONSTATUE',
	'ACTIVEPOKEMONSTATUE',
	'LEDGE',
	'SWARM_RADAR',
	'ROCKET_RADIO',
	'ZIGZAGOON_FORAGER',
	'DUGTRIO_EXPLORER',
	'ROUTER_NPC',
	'STORAGE_CHEST',
	'APRICORN_TREE',
	'EMPTY_APRICORN_TREE',
	'BERRY_LURE',
	'SNORLAX',
	'TELEPORTER_NPC',
	'CLIMBING_STEPS',
] as const;
export type OccupantType = (typeof OCCUPANT_TYPES)[number];
export interface BaseOccupant {
	type: OccupantType;
	id: string;
	x: number;
	y: number;
	conditionFunction: (saveFile: SaveFile) => boolean;
}
export interface OverworldItem extends BaseOccupant {
	type: 'ITEM';
	item: ItemType;
	amount: number;
}
export interface OverworldHiddenItem extends BaseOccupant {
	type: 'HIDDEN_ITEM';
	item: ItemType;
	amount: number;
}
export interface OverworldPC extends BaseOccupant {
	type: 'PC';
}
export interface OverworldMerchant extends BaseOccupant {
	type: 'MERCHANT';
	orientation: CharacterOrientation;
	inventory: Partial<Inventory>;
	dialogue: string[];
	sprite: string;
}
export interface RouterNpc extends BaseOccupant {
	type: 'ROUTER_NPC';
	orientation: CharacterOrientation;
	dialogue: string[];
	sprite: string;
	to: RoutesType;
}
export interface TeleporterNpc extends BaseOccupant {
	type: 'TELEPORTER_NPC';
	orientation: CharacterOrientation;
	dialogue: string[];
	sprite: string;
	to: CharacterLocationData;
}
export interface OverworldNurse extends BaseOccupant {
	type: 'NURSE';
	orientation: CharacterOrientation;
	dialogue: string[];
	sprite: '115';
}
export interface OverworldNpc extends BaseOccupant {
	type: 'NPC';
	orientation: CharacterOrientation;
	unhandledMessage: string[];
	handledMessage?: string[];
	sprite: string;
	movement?: { path: CharacterOrientation[]; currentStep: number };
	gifts?: Partial<Inventory>;
	quest?: QuestName;
}
export interface OverworldSign extends BaseOccupant {
	type: 'SIGN';
	approachDirection: CharacterOrientation;
	dialogue: string[];
	quest?: QuestName;
}
export interface OverworldBush extends BaseOccupant {
	type: 'BUSH';
}
export interface OverworldRock extends BaseOccupant {
	type: 'ROCK';
}
export interface OverworldClimbingSteps extends BaseOccupant {
	type: 'CLIMBING_STEPS';
}
export interface OverworldHoneyTree extends BaseOccupant {
	type: 'HONEY_TREE';
}
export interface OverworldHallowedTower extends BaseOccupant {
	type: 'HALLOWED_TOWER';
}
export interface SwarmRadar extends BaseOccupant {
	type: 'SWARM_RADAR';
}
export interface RocketRadio extends BaseOccupant {
	type: 'ROCKET_RADIO';
}
export interface OverworldTrainer extends BaseOccupant {
	type: 'TRAINER';
	orientation: CharacterOrientation;
	unhandledMessage: string[];
	handledMessage?: string[];
	sprite: string;
	team: (s: SaveFile) => OwnedPokemon[];
	challengeFieldRank?: number;
	battleTeamConfig: BattleTeamConfig;
	profilePicture?: string;
	spriteGeneration?: 1;
}
export interface Portal extends BaseOccupant {
	type: 'PORTAL';
	sprite: string;
	portal: CharacterLocationData;
	small?: boolean;
}
export interface OnStepPortal extends BaseOccupant {
	type: 'ON_STEP_PORTAL';
	portal: CharacterLocationData;
	sprite?: string;
}
export interface OverworldBulletinBoard extends BaseOccupant {
	type: 'BULLETIN_BOARD';
	approachDirection: CharacterOrientation;
	dialogue: string[];
}
export interface Obstacle extends BaseOccupant {
	type: 'OBSTACLE';
	src: string;
}
export interface CombeeHive extends BaseOccupant {
	type: 'COMBEE_HIVE';
}
export interface OverworldPokemon extends BaseOccupant {
	type: 'POKEMON';
	dexId: number;
	dialogue: string[];
	orientation: CharacterOrientation;
	encounter?: OverworldEncounter;
}
export interface PokemonStatue extends BaseOccupant {
	type: 'POKEMONSTATUE';
	dexId: number;
	dialogue: string[];
	orientation: CharacterOrientation;
}
export interface ActivePokemonStatue extends BaseOccupant {
	type: 'ACTIVEPOKEMONSTATUE';
	dexId: number;
	dialogue: string[];
	orientation: CharacterOrientation;
}
export interface OverworldSnorlax extends BaseOccupant {
	type: 'SNORLAX';
	orientation: CharacterOrientation;
}
export interface OverworldStrangeTree extends BaseOccupant {
	type: 'STRANGE_TREE';
	orientation: CharacterOrientation;
}
export interface ZigzagoonForager extends BaseOccupant {
	type: 'ZIGZAGOON_FORAGER';
	dexId: number;
	orientation: CharacterOrientation;
}
export interface DugtrioExplorer extends BaseOccupant {
	type: 'DUGTRIO_EXPLORER';
	dexId: number;
	orientation: CharacterOrientation;
}

export interface ApricornTree extends BaseOccupant {
	type: 'APRICORN_TREE';
	apricorn: ApricornType;
	sprite: string;
}
export interface EmptyApricornTree extends BaseOccupant {
	type: 'EMPTY_APRICORN_TREE';
}
export interface Ledge extends BaseOccupant {
	type: 'LEDGE';
	sprite: string;
	passableFrom?: CharacterOrientation;
}
export interface StorageChest extends BaseOccupant {
	type: 'STORAGE_CHEST';
}
export interface OverworldBerryLure extends BaseOccupant {
	type: 'BERRY_LURE';
}

export type Occupant =
	| OverworldItem
	| OverworldHiddenItem
	| OverworldPC
	| OverworldMerchant
	| OverworldNurse
	| OverworldBush
	| OverworldNpc
	| OverworldTrainer
	| Portal
	| OverworldSign
	| OverworldHoneyTree
	| OnStepPortal
	| OverworldBulletinBoard
	| OverworldHallowedTower
	| Obstacle
	| CombeeHive
	| OverworldPokemon
	| PokemonStatue
	| ActivePokemonStatue
	| Ledge
	| ZigzagoonForager
	| DugtrioExplorer
	| RouterNpc
	| SwarmRadar
	| RocketRadio
	| OverworldRock
	| StorageChest
	| OverworldBerryLure
	| OverworldSnorlax
	| OverworldStrangeTree
	| ApricornTree
	| EmptyApricornTree
	| TeleporterNpc
	| OverworldClimbingSteps;

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
}

export interface TileMap {
	baseLayer: TileIdentifier[][];
	encounterLayer: (TileIdentifier | null)[][];
	decorationLayer: (TileIdentifier | null)[][];
	obstacleLayer: (TileIdentifier | null)[][];
	foregroundLayer: (TileIdentifier | null)[][];
	waterLayer: (TileIdentifier | null)[][];
}
export interface TileIdentifier {
	yOffset: number;
	xOffset: number;
}
