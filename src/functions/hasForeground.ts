import { OverworldMap } from '../interfaces/OverworldMap';
import { getMapDimensions } from './getMapDimensions';

export const hasForeground = (
	field: { x: number; y: number },
	map: OverworldMap
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

	return !!map.tileMap.foregroundLayer[field.y][field.x];
};
