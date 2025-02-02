/**
 *
 *
 * TILEMAP:
 * 0 = empty field
 * 1 = blocked field
 */

import { ItemType } from './Item';

export interface Occupant {
	type: 'ITEM';
	x: number;
	y: number;
	item: ItemType;
	amount: number;
}

export interface OverworldMap {
	backgroundTile: { x: number; y: number };
	width: number;
	height: number;
	tileMap: number[][];
	occupants: number[];
}
