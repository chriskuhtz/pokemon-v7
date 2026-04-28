import { mapsRecord } from "../constants/gameData/maps/mapsRecord";
import { MapId } from "../interfaces/mapIds";

export const isWater = (x: number, y: number, mapId: MapId): boolean =>
  !!mapsRecord[mapId].tileMap.waterLayer[y][x];
