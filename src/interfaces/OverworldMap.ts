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
}
export type Occupant = OverworldItem | OverworldPC | OverworldMerchant;

export interface OverworldMap {
	backgroundTile: { x: number; y: number };
	width: number;
	height: number;
	tileMap: (0 | 1 | 2)[][];
	occupants: number[];
}
