import { OverworldMap } from '../interfaces/OverworldMap';

export const getMapDimensions = (
	map: OverworldMap
): { width: number; height: number } => {
	return {
		width: map.tileMap.baseLayer[0].length,
		height: map.tileMap.baseLayer.length,
	};
};
