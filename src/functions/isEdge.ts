import { OverworldMap } from "../interfaces/OverworldMap";

export const isEdge = (
  map: OverworldMap,
  location: { x: number; y: number }
) => {
  return (
    (map.tilesetUrl === "/tilesets/newMasterSheet.png" &&
      map.tileMap.decorationLayer[location.y][location.x]?.xOffset === -16 &&
      map.tileMap.decorationLayer[location.y][location.x]?.yOffset === -400) ||
    (map.tilesetUrl === "/tilesets/newMasterSheet.png" &&
      map.tileMap.decorationLayer[location.y][location.x]?.xOffset === -64 &&
      map.tileMap.decorationLayer[location.y][location.x]?.yOffset === -416)
  );
};
