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
      map.tileMap.decorationLayer[location.y][location.x]?.yOffset === -416) ||
    (map.tilesetUrl === "/tilesets/newMasterSheet.png" &&
      map.tileMap.decorationLayer[location.y][location.x]?.xOffset === -80 &&
      map.tileMap.decorationLayer[location.y][location.x]?.yOffset === -160) ||
    (map.tilesetUrl === "/tilesets/newMasterSheet.png" &&
      map.tileMap.decorationLayer[location.y][location.x]?.xOffset === -0 &&
      map.tileMap.decorationLayer[location.y][location.x]?.yOffset === -224) ||
    (map.tilesetUrl === "/tilesets/newMasterSheet.png" &&
      map.tileMap.decorationLayer[location.y][location.x]?.xOffset === -32 &&
      map.tileMap.decorationLayer[location.y][location.x]?.yOffset === -160) ||
    (map.tilesetUrl === "/tilesets/newMasterSheet.png" &&
      map.tileMap.decorationLayer[location.y][location.x]?.xOffset === -128 &&
      map.tileMap.decorationLayer[location.y][location.x]?.yOffset === -160)
  );
};
