export interface TileSet {
  height: number;
  width: number;
  src: string;
  gap: number;
}

const darkWoods: TileSet = {
  src: "url('/tilesets/DarkWoods.png')",
  height: 18,
  width: 8,
  gap: 0,
};
const newMasterSheet: TileSet = {
  src: "url('/tilesets/newMasterSheet.png')",
  height: 133,
  width: 88,
  gap: 0,
};
const pokemonLeague: TileSet = {
  src: "url('/tilesets/pokemonLeague.png')",
  height: 25,
  width: 27,
  gap: 0,
};

export const tileMapsRecord: Record<string, TileSet> = {
  "/tilesets/DarkWoods.png": darkWoods,
  "/tilesets/newMasterSheet.png": newMasterSheet,
  "/tilesets/pokemonLeague.png": pokemonLeague,
};
