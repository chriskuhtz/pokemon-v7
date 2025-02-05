/**
 *
 *
 * TILEMAP:
 * 0 = empty field
 * 1 = encounter possible
 * 2 = blocked field
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
