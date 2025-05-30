import { OverworldMap } from '../interfaces/OverworldMap';
import { hasForeground, isPassable } from './isPassable';

export const getRandomPosition = (
	map: OverworldMap
): { x: number; y: number } => {
	const y = Math.floor(Math.random() * map.tileMap.baseLayer.length);
	const x = Math.floor(Math.random() * map.tileMap.baseLayer[0].length);

	if (
		hasForeground({ x, y }, map) ||
		!isPassable({ x, y }, map, map.occupants, false, false, false)
	) {
		return getRandomPosition(map);
	}
	return { y, x };
};
