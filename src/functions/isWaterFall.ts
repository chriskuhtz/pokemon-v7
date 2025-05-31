import { OverworldMap } from "../interfaces/OverworldMap";

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
