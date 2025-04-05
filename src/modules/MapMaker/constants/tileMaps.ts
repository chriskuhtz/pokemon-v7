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

export const tileMapsRecord: Record<string, TileMap> = {
	'/tilesets/masterSheet.png': masterSheet,
	'/tilesets/palletTown.png': palletTown,
};
