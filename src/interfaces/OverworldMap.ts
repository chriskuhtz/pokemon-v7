/**
 *
 *
 * TILEMAP:
 * 0 = empty field
 * 1 = encounter possible
 * 2 = blocked field
 */

import { MapId } from '../constants/checkLists/mapsRecord';
import { QuestName } from '../constants/checkLists/questsRecord';
import { TimeOfDay } from '../functions/getTimeOfDay';
import { Inventory } from './Inventory';
import { ItemType } from './Item';
import { OwnedPokemon } from './OwnedPokemon';
import { CharacterLocationData, CharacterOrientation } from './SaveFile';
import { WeatherType } from './Weather';

export interface OverworldItem {
	type: 'ITEM';
	x: number;
	y: number;
	item: ItemType;
	amount: number;
	map: MapId;
}
export interface OverworldHiddenItem {
	type: 'HIDDEN_ITEM';
	x: number;
	y: number;
	item: ItemType;
	amount: number;
	map: MapId;
}
export interface OverworldPC {
	type: 'PC';
	x: number;
	y: number;
	map: MapId;
	approachDirection: CharacterOrientation;
}
export interface OverworldMerchant {
	type: 'MERCHANT';
	x: number;
	y: number;
	orientation: CharacterOrientation;
	map: MapId;
	inventory: Partial<Inventory>;
	dialogue: string[];
	sprite: '113';
}
export interface OverworldNurse {
	type: 'NURSE';
	x: number;
	y: number;
	orientation: CharacterOrientation;
	map: MapId;
	dialogue: string[];
	sprite: '115';
}
export interface OverworldNpc {
	type: 'NPC';
	x: number;
	y: number;
	orientation: CharacterOrientation;
	map: MapId;
	unhandledDialogue: string[];
	handledDialogue?: string[];
	sprite: string;
	movement?: { path: CharacterOrientation[]; currentStep: number };
	gifts?: Partial<Inventory>;
	quest?: QuestName;
	timeofDay?: TimeOfDay;
}
export interface OverworldBush {
	type: 'BUSH';
	x: number;
	y: number;
	map: MapId;
}
export interface OverworldObstacle {
	type: 'OBSTACLE';
	x: number;
	y: number;
	map: MapId;
	sprite: string;
}

export interface OverworldTrainer {
	type: 'TRAINER';
	x: number;
	y: number;
	orientation: CharacterOrientation;
	map: MapId;
	unhandledDialogue: string[];
	handledDialogue?: string[];
	sprite: string;
	team: OwnedPokemon[];
	name: string;
}

export interface Portal {
	type: 'PORTAL';
	x: number;
	y: number;
	sprite: string;
	portal: CharacterLocationData;
	map: MapId;
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
	| OverworldObstacle;

export interface OverworldEncounter {
	dexId: number;
	xp: number;
}
export interface OverworldMap {
	id: MapId;
	backgroundTile: string;
	encounterTile?: string;
	possibleEncounters: Record<TimeOfDay, OverworldEncounter[]>;
	width: number;
	height: number;
	tileMap: (0 | 1 | 2)[][];
	occupants: number[];
	weather?: WeatherType;
}
