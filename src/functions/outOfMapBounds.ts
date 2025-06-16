import { OverworldMap } from '../interfaces/OverworldMap';
import { getMapDimensions } from './getMapDimensions';

export const outOfMapBounds = (
	field: { x: number; y: number },
	map: OverworldMap
): boolean => {
	const { width, height } = getMapDimensions(map);
	if (field.y >= height) {
		return true;
	}
	if (field.y < 0) {
		return true;
	}
	if (field.x < 0) {
		return true;
	}
	if (field.x >= width) {
		return true;
	}
	return false;
};
