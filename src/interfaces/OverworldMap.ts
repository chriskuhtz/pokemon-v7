/**
 *
 *
 * TILEMAP:
 * 0 = empty field
 * 1 = encounter possible
 * 2 = blocked field
 */

import { ItemType } from './Item';
import { MapId } from './SaveFile';

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
export type Occupant = OverworldItem | OverworldPC;

export interface OverworldMap {
	backgroundTile: { x: number; y: number };
	width: number;
	height: number;
	tileMap: (0 | 1 | 2)[][];
	occupants: number[];
}
