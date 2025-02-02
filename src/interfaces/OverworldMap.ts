/**
 *
 *
 * TILEMAP:
 * 0 = empty field
 * 1 = blocked field
 * 1.xxx = overworld item
 */

export interface OverworldMap {
	backgroundTile: { x: number; y: number };
	width: number;
	height: number;
	tileMap: number[][];
}
