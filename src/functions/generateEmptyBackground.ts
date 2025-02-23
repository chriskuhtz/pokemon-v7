export const generateBackground = ({
	height,
	width,
	withBorder,
	randomEncounterTiles,
	borderGates,
}: {
	height: number;
	width: number;
	withBorder: boolean;
	randomEncounterTiles: boolean;
	borderGates?: { x: number; y: number }[];
}): number[][] => {
	const res = Array.from({ length: height }).map((_, h) =>
		Array.from({ length: width }).map((_, w) => {
			if (
				withBorder &&
				(h === 0 || w === 0 || h === height - 1 || w === width - 1)
			) {
				if (borderGates?.some((b) => b.y === h && b.x === w)) {
					return 0;
				}
				return 3;
			}
			if (randomEncounterTiles && Math.random() > 0.3) {
				return 1;
			}

			return 0;
		})
	);

	return res;
};
