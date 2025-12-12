export interface TileMap {
	baseLayer: TileIdentifier[][];
	encounterLayer: (TileIdentifier | null)[][];
	decorationLayer: (TileIdentifier | null)[][];
	obstacleLayer: (TileIdentifier | null)[][];
	foregroundLayer: (TileIdentifier | null)[][];
	waterLayer: (TileIdentifier | null)[][];
}
export interface TileIdentifier {
	yOffset: number;
	xOffset: number;
}
