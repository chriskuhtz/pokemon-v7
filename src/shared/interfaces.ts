export interface GameMap {
	baseLayer: TileIdentifier[][];
	decorationLayer: (TileIdentifier | undefined)[][];
	obstacleLayer: (TileIdentifier | undefined)[][];
}
export interface TileIdentifier {
	yOffset: number;
	xOffset: number;
}
