import { QuestName } from '../constants/checkLists/questsRecord';
import { EncounterMap } from '../constants/maps/encounters';
import { MapId } from '../constants/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { Inventory } from './Inventory';
import { ItemType } from './Item';
import { OwnedPokemon } from './OwnedPokemon';
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
	'NPC',
	'PORTAL',
	'SIGN',
	'HONEY_TREE',
	'HALLOWED_TOWER',
	'ON_STEP_PORTAL',
	'CAMP_MANAGER',
	'BULLETIN_BOARD',
	'APRICORN_SMITH',
	'OBSTACLE',
	'TRAINING_FIELD_MASTER',
	'BERRY_FARMER',
	'COMBEE_HIVE',
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
	approachDirection: CharacterOrientation;
}
export interface OverworldMerchant extends BaseOccupant {
	type: 'MERCHANT';
	orientation: CharacterOrientation;
	inventory: Partial<Inventory>;
	dialogue: string[];
	sprite: string;
}
export interface OverworldCampManager extends BaseOccupant {
	type: 'CAMP_MANAGER';
	orientation: CharacterOrientation;
	dialogue: string[];
	sprite: string;
}
export interface TrainingFieldMaster extends BaseOccupant {
	type: 'TRAINING_FIELD_MASTER';
	orientation: CharacterOrientation;
	dialogue: string[];
	sprite: string;
}
export interface BerryFarmer extends BaseOccupant {
	type: 'BERRY_FARMER';
	orientation: CharacterOrientation;
	dialogue: string[];
	sprite: string;
}

export interface OverworldApricornSmith extends BaseOccupant {
	type: 'APRICORN_SMITH';
	orientation: CharacterOrientation;
	dialogue: string[];
	sprite: string;
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
export interface OverworldHoneyTree extends BaseOccupant {
	type: 'HONEY_TREE';
}
export interface OverworldHallowedTower extends BaseOccupant {
	type: 'HALLOWED_TOWER';
}
export interface OverworldTrainer extends BaseOccupant {
	type: 'TRAINER';
	orientation: CharacterOrientation;
	unhandledMessage: string[];
	handledMessage?: string[];
	sprite: string;
	team: OwnedPokemon[];
	name: string;
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
	| OverworldCampManager
	| OverworldBulletinBoard
	| OverworldHallowedTower
	| OverworldApricornSmith
	| Obstacle
	| TrainingFieldMaster
	| BerryFarmer
	| CombeeHive;

export interface OverworldEncounter {
	name: PokemonName;
	xp: number;
	rarity: 'common' | 'medium' | 'rare' | 'ultra-rare';
}
export interface OverworldMap {
	id: MapId;
	possibleEncounters: EncounterMap;
	tileMap: GameMap;
	occupants: Occupant[];
	weather?: WeatherType;
}

export interface GameMap {
	baseLayer: TileIdentifier[][];
	encounterLayer: (TileIdentifier | null)[][];
	decorationLayer: (TileIdentifier | null)[][];
	obstacleLayer: (TileIdentifier | null)[][];
	foregroundLayer: (TileIdentifier | null)[][];
}
export interface TileIdentifier {
	yOffset: number;
	xOffset: number;
}
