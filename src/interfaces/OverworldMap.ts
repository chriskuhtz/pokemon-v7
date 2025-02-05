/**
 *
 *
 * TILEMAP:
 * 0 = empty field
 * 1 = blocked field
 * 2 = encounter possible
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
	tileMap: (0 | 1 | 2)[][];
	occupants: number[];
}
