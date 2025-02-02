import { OverworldMap } from '../interfaces/OverworldMap';

export const isValidOverWorldMap = (map: OverworldMap): boolean => {
	if (map.tileMap.length !== map.height) {
		return false;
	}
	if (map.tileMap.every((row) => row.length !== map.width)) {
		return false;
	}

	return true;
};
