import { OverworldMap } from '../interfaces/OverworldMap';
import { hasForeground } from './hasForeground';
import { isPassable } from './isPassable';

export const getRandomPosition = (
	map: OverworldMap
): { x: number; y: number } => {
	const y = Math.floor(Math.random() * map.tileMap.baseLayer.length);
	const x = Math.floor(Math.random() * map.tileMap.baseLayer[0].length);

	if (
		hasForeground({ x, y }, map) ||
		!isPassable({
			nextLocation: { x, y },
			playerLocation: {
				x,
				y,
				orientation: 'DOWN',
				mapId: map.id,
				forwardFoot: 'CENTER1',
			},
			map,
			currentOccupants: map.occupants,
			canSwim: false,
			flying: false,
			canClimb: false,
		})
	) {
		return getRandomPosition(map);
	}
	return { y, x };
};
