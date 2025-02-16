export const getOverworldDistance = (
	target: { y: number; x: number },
	position: { y: number; x: number }
) => {
	const xDistance = target.x - position.x;
	const yDistance = target.y - position.y;

	return Math.abs(xDistance) + Math.abs(yDistance);
};
