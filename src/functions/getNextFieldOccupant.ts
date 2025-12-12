import { Occupant } from '../interfaces/Occupant';

export const getNextFieldOccupant = (
	focusedField: { x: number; y: number },
	statefulOccupantsRecord: Occupant[]
): Occupant | undefined => {
	return statefulOccupantsRecord.find(
		(occ) => occ.x === focusedField.x && occ.y === focusedField.y
	);
};
