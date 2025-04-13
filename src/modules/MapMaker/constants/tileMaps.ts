export interface TileMap {
	height: number;
	width: number;
	src: string;
	gap: number;
}
const masterSheet: TileMap = {
	src: "url('/tilesets/masterSheet.png')",
	height: 133,
	width: 88,
	gap: 0,
};
const palletTown: TileMap = {
	src: "url('/tilesets/palletTown.png')",
	height: 20,
	width: 24,
	gap: 0,
};
const route1base: TileMap = {
	src: "url('/tilesets/route1base.png')",
	height: 7,
	width: 24,
	gap: 0,
};
const slateport: TileMap = {
	src: "url('/tilesets/slateport.png')",
	height: 8,
	width: 40,
	gap: 0,
};
const waterAndSand: TileMap = {
	src: "url('/tilesets/waterAndSand.png')",
	height: 9,
	width: 15,
	gap: 0,
};
const hills: TileMap = {
	src: "url('/tilesets/hills.png')",
	height: 9,
	width: 12,
	gap: 0,
};

export const tileMapsRecord: Record<string, TileMap> = {
	'/tilesets/masterSheet.png': masterSheet,
	'/tilesets/palletTown.png': palletTown,
	'/tilesets/route1base.png': route1base,
	'/tilesets/slateport.png': slateport,
	'/tilesets/waterAndSand.png': waterAndSand,
	'/tilesets/hills.png': hills,
};
