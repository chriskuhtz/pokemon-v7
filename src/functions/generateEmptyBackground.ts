export const generateEmptyBackground = (
	height: number,
	width: number
): number[][] => {
	return Array.from({ length: height }).map(() =>
		Array.from({ length: width }).map(() => 0)
	);
};
