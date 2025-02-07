export const determineCritFactor = (critRate: number): boolean => {
	return (3 * critRate) / 24 > Math.random();
};
