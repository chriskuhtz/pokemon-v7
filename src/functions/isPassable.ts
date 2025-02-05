import { OverworldMap } from '../interfaces/OverworldMap';

export const isPassable = (
	field: { x: number; y: number },
	map: OverworldMap
): boolean => {
	const nextField = map.tileMap[field.y][field.x];

	if (nextField >= 2) {
		return false;
	}

	if (field.y >= map.height) {
		return false;
	}
	if (field.y < 0) {
		return false;
	}
	if (field.x < 0) {
		return false;
	}
	if (field.x >= map.width) {
		return false;
	}
	return true;
};
