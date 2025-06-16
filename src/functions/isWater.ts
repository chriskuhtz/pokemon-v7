import { MapId, mapsRecord } from '../constants/maps/mapsRecord';

export const isWater = (x: number, y: number, mapId: MapId): boolean =>
	!!mapsRecord[mapId].tileMap.waterLayer[y][x];
