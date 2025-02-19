import { Occupant } from '../interfaces/OverworldMap';

export const getNextFieldOccupant = (
	mapId: string,
	collectedItems: number[],
	focusedField: { x: number; y: number },
	statefulOccupantsRecord: Record<number, Occupant>
) => {
	return Object.entries(statefulOccupantsRecord).find(
		([id, occ]) =>
			occ.x === focusedField.x &&
			occ.y === focusedField.y &&
			occ.map === mapId &&
			!collectedItems.find((c) => c === parseInt(id))
	);
};
