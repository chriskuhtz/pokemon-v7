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

const devmode = !!window.localStorage.getItem("devmode");

export const isPassable = (
  field: { x: number; y: number },
  map: OverworldMap,
  currentOccupants: Occupant[],
  canSwim: boolean,
  flying: boolean,
  canClimb: boolean
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
  const nextFieldOccupant = currentOccupants.find(
    (c) =>
      c.x === field.x &&
      c.y === field.y &&
      c.type !== "HIDDEN_ITEM" &&
      c.type !== "ON_STEP_PORTAL"
  );

  if (nextFieldOccupant?.type === "CLIMBING_STEPS" && canClimb) {
    return true;
  }

  if (nextFieldOccupant) {
    return false;
  }

  const nextFieldObstacle = map.tileMap.obstacleLayer[field.y][field.x];

  if (nextFieldObstacle) {
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
