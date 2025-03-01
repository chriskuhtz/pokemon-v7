export interface TileMap {
	height: number;
	width: number;
	src: string;
	gap: number;
}
export const tileMaps: Record<string, TileMap> = {
	fireRedBase: {
		src: "url('/tilesets/fireRedBase.png')",
		height: 47,
		width: 28,
		gap: 1,
	},
};
