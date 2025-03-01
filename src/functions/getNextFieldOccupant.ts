import { Occupant } from '../shared/OverworldMap';

export const getNextFieldOccupant = (
	mapId: string,
	collectedItems: string[],
	focusedField: { x: number; y: number },
	statefulOccupantsRecord: Occupant[]
): Occupant | undefined => {
	return statefulOccupantsRecord.find(
		(occ) =>
			occ.x === focusedField.x && occ.y === focusedField.y && occ.map === mapId
		//&&
		//!collectedItems.find((c) => c === occ.id)
	);
};
