export const calculateModifiedStat = (
	unmodified: number,
	modifier: number
): number => {
	if (modifier > 0) {
		return unmodified + modifier * unmodified * 0.5;
	}
	if (modifier < 0) {
		return unmodified - modifier * unmodified * 0.125;
	}
	return unmodified;
};
