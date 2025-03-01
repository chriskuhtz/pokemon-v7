import { MapId } from '../constants/checkLists/mapsRecord';
import { QuestName } from '../constants/checkLists/questsRecord';
import { TimeOfDay } from '../functions/getTimeOfDay';
import { Inventory } from './Inventory';
import { ItemType } from './Item';
import { OwnedPokemon } from './OwnedPokemon';
import {
	CharacterLocationData,
	CharacterOrientation,
	SaveFile,
} from './SaveFile';
import { WeatherType } from './Weather';

/**
 *
 *
 * TILEMAP:
 * 0 = empty field
 * 1 = encounter possible
 * 2 = blocked field
 * 3 = border
 * 4= obstacle
 */

export interface BaseOccupant {
	id: string;
	x: number;
	y: number;
	map: MapId;
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
export interface OverworldObstacle extends BaseOccupant {
	type: 'OBSTACLE';
	sprite: string;
	small?: boolean;
	gifts?: Partial<Inventory>;
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
	| OverworldObstacle
	| OverworldSign;

export interface OverworldEncounter {
	dexId: number;
	xp: number;
}
export interface OverworldMap {
	id: MapId;
	possibleEncounters: Record<TimeOfDay, OverworldEncounter[]>;
	tileMap: GameMap;
	occupants: Occupant[];
	weather?: WeatherType;
}

export interface GameMap {
	baseLayer: TileIdentifier[][];
	decorationLayer: (TileIdentifier | undefined)[][];
	obstacleLayer: (TileIdentifier | undefined)[][];
}
export interface TileIdentifier {
	yOffset: number;
	xOffset: number;
}
