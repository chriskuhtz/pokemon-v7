export const getSizeFactor = (height: number): number => {
	return Math.min(3, (15 + height) / 15);
};
