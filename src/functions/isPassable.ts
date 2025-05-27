import { MapId, mapsRecord } from "../constants/maps/mapsRecord";
import { Occupant, OverworldMap } from "../interfaces/OverworldMap";

export const getMapDimensions = (
  map: OverworldMap
): { width: number; height: number } => {
  return {
    width: map.tileMap.baseLayer[0].length,
    height: map.tileMap.baseLayer.length,
  };
};

export const isWaterFall = (
  map: OverworldMap,
  location: { x: number; y: number }
) => {
  return (
    (map.tilesetUrl === "/tilesets/hillsWithWaterfall.png" &&
      map.tileMap.waterLayer[location.y][location.x]?.xOffset === -112 &&
      map.tileMap.waterLayer[location.y][location.x]?.yOffset === -96) ||
    (map.tilesetUrl === "/tilesets/newMasterSheet.png" &&
      map.tileMap.waterLayer[location.y][location.x]?.xOffset === -16 &&
      map.tileMap.waterLayer[location.y][location.x]?.yOffset === -368)
  );
};

const devmode = !!window.localStorage.getItem("devmode");

export const isPassable = (
  field: { x: number; y: number },
  map: OverworldMap,
  currentOccupants: Occupant[],
  canSwim: boolean,
  flying: boolean
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
  if (devmode || flying) {
    return true;
  }
  const nextFieldObstacle = map.tileMap.obstacleLayer[field.y][field.x];

  if (nextFieldObstacle) {
    return false;
  }

  const nextFieldOccupant = currentOccupants.find(
    (c) =>
      c.x === field.x &&
      c.y === field.y &&
      c.type !== "HIDDEN_ITEM" &&
      c.type !== "ON_STEP_PORTAL"
  );

  if (nextFieldOccupant) {
    return false;
  }

  const nextFieldWater = isWater(field.x, field.y, map.id);
  if (nextFieldWater) {
    return canSwim;
  }

  return true;
};

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

export const isWater = (x: number, y: number, mapId: MapId): boolean =>
  !!mapsRecord[mapId].tileMap.waterLayer[y][x];
