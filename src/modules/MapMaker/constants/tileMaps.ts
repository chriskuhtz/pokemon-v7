export interface TileSet {
	height: number;
	width: number;
	src: string;
	gap: number;
}
const masterSheet: TileSet = {
	src: "url('/tilesets/masterSheet.png')",
	height: 133,
	width: 88,
	gap: 0,
};
const palletTown: TileSet = {
	src: "url('/tilesets/palletTown.png')",
	height: 20,
	width: 24,
	gap: 0,
};
const route1base: TileSet = {
	src: "url('/tilesets/route1base.png')",
	height: 7,
	width: 24,
	gap: 0,
};
const slateport: TileSet = {
	src: "url('/tilesets/slateport.png')",
	height: 8,
	width: 40,
	gap: 0,
};
const waterAndSand: TileSet = {
	src: "url('/tilesets/waterAndSand.png')",
	height: 9,
	width: 15,
	gap: 0,
};
const hills: TileSet = {
	src: "url('/tilesets/hills.png')",
	height: 9,
	width: 12,
	gap: 0,
};

const hillsWithWaterfall: TileSet = {
	src: "url('/tilesets/hillsWithWaterfall.png')",
	height: 9,
	width: 12,
	gap: 0,
};
const cave: TileSet = {
	src: "url('/tilesets/cave.png')",
	height: 9,
	width: 15,
	gap: 0,
};
const snow: TileSet = {
	src: "url('/tilesets/snow.png')",
	height: 7,
	width: 8,
	gap: 0,
};

export const tileMapsRecord: Record<string, TileSet> = {
	'/tilesets/masterSheet.png': masterSheet,
	'/tilesets/palletTown.png': palletTown,
	'/tilesets/route1base.png': route1base,
	'/tilesets/slateport.png': slateport,
	'/tilesets/waterAndSand.png': waterAndSand,
	'/tilesets/hills.png': hills,
	'/tilesets/hillsWithWaterfall.png': hillsWithWaterfall,
	'/tilesets/cave.png': cave,
	'/tilesets/snow.png': snow,
};
