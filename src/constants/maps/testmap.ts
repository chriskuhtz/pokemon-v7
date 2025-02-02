import { OverworldMap } from '../../interfaces/OverworldMap';

export const testMap: OverworldMap = {
	backgroundTile: { x: 103, y: 1 },
	width: 10,
	height: 2,
	tileMap: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
	occupants: [0, 1],
};
