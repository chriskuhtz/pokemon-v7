export interface TileMap {
	height: number;
	width: number;
	src: string;
	gap: number;
}
export const tileMaps: Record<string, TileMap> = {
	masterSheet: {
		src: "url('/tilesets/masterSheet.png')",
		height: 133,
		width: 88,
		gap: 0,
	},
};
