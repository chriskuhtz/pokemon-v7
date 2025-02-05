import { OverworldMap } from '../../interfaces/OverworldMap';

export const testMap: OverworldMap = {
	backgroundTile: { x: 103, y: 1 },
	width: 10,
	height: 5,
	tileMap: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	],
	occupants: [0, 1],
};
