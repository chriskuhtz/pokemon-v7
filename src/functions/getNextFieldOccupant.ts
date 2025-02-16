import { occupantsRecord } from '../constants/occupantsRecord';

export const getNextFieldOccupant = (
	mapId: string,
	collectedItems: number[],
	focusedField: { x: number; y: number }
) => {
	return Object.entries(occupantsRecord).find(
		([id, occ]) =>
			occ.x === focusedField.x &&
			occ.y === focusedField.y &&
			occ.map === mapId &&
			!collectedItems.find((c) => c === parseInt(id))
	);
};
