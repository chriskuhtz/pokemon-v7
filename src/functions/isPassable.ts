import { Occupant, OverworldMap } from '../interfaces/OverworldMap';

export const getMapDimensions = (
	map: OverworldMap
): { width: number; height: number } => {
	return {
		width: map.tileMap.baseLayer[0].length,
		height: map.tileMap.baseLayer.length,
	};
};

export const isPassable = (
	field: { x: number; y: number },
	map: OverworldMap,
	currentOccupants: Occupant[]
): boolean => {
	const { width, height } = getMapDimensions(map);
	if (field.y >= height) {
		return false;
	}
	if (field.y < 0) {
		return false;
	}
	if (field.x < 0) {
		return false;
	}
	if (field.x >= width) {
		return false;
	}
	const nextFieldObstacle = map.tileMap.obstacleLayer[field.y][field.x];

	if (nextFieldObstacle) {
		return false;
	}

	const nextFieldOccupant = currentOccupants.find(
		(c) => c.x === field.x && c.y === field.y && c.type !== 'HIDDEN_ITEM'
	);

	if (nextFieldOccupant) {
		return false;
	}

	return true;
};
