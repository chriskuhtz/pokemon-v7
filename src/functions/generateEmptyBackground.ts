export const generateEmptyBackground = (
	height: number,
	width: number,
	withBorder = false
): number[][] => {
	const res = Array.from({ length: height }).map((_, h) =>
		Array.from({ length: width }).map((_, w) => {
			if (
				withBorder &&
				(h === 0 || w === 0 || h === height - 1 || w === width - 1)
			) {
				return 3;
			}

			return 0;
		})
	);

	return res;
};
