import { tileMap } from '../shared/OverworldMap';

export const generateBackground = ({
	height,
	width,
	withBorder,
	randomEncounterTiles,
	randomObstacleTiles,
	borderGates,
}: {
	height: number;
	width: number;
	withBorder: boolean;
	randomEncounterTiles: boolean;
	randomObstacleTiles?: boolean;
	borderGates?: { x: number; y: number }[];
}): number[][] => {
	const res = Array.from({ length: height }).map((_, h) =>
		Array.from({ length: width }).map((_, w) => {
			if (
				withBorder &&
				(h === 0 || w === 0 || h === height - 1 || w === width - 1)
			) {
				if (borderGates?.some((b) => b.y === h && b.x === w)) {
					return tileMap.empty;
				}
				return tileMap.border;
			}
			if (randomEncounterTiles && Math.random() > 0.3) {
				return tileMap.encounter;
			}
			if (randomObstacleTiles && Math.random() > 0.7) {
				return tileMap.obstacle;
			}

			return tileMap.empty;
		})
	);

	return res;
};
