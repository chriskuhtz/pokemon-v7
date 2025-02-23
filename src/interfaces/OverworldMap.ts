/**
 *
 *
 * TILEMAP:
 * 0 = empty field
 * 1 = encounter possible
 * 2 = blocked field
 * 3 = border
 */

import { MapId } from '../constants/checkLists/mapsRecord';
import { OccupantName } from '../constants/checkLists/occupantsRecord';
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

export interface BaseOccupant {
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
	sprite: '113';
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
	backgroundTile: string;
	encounterTile?: string;
	borderTile?: string;
	possibleEncounters: Record<TimeOfDay, OverworldEncounter[]>;
	width: number;
	height: number;
	tileMap: number[][];
	occupants: OccupantName[];
	weather?: WeatherType;
}
