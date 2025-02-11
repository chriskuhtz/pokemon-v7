/**
 *
 *
 * TILEMAP:
 * 0 = empty field
 * 1 = encounter possible
 * 2 = blocked field
 */

import { Inventory } from './Inventory';
import { ItemType } from './Item';
import { CharacterOrientation, MapId } from './SaveFile';
import { WeatherType } from './Weather';

export interface OverworldItem {
	type: 'ITEM';
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
export type Occupant =
	| OverworldItem
	| OverworldPC
	| OverworldMerchant
	| OverworldNurse;

export interface OverworldEncounter {
	dexId: number;
	xp: number;
}
export interface OverworldMap {
	id: string;
	backgroundTile: { x: number; y: number };
	possibleEncounters: OverworldEncounter[];
	width: number;
	height: number;
	tileMap: (0 | 1 | 2)[][];
	occupants: number[];
	weather?: WeatherType;
}
