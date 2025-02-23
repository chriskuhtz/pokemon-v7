import { OccupantName } from '../constants/checkLists/occupantsRecord';
import { Occupant } from '../interfaces/OverworldMap';

export const getNextFieldOccupant = (
	mapId: string,
	collectedItems: OccupantName[],
	focusedField: { x: number; y: number },
	statefulOccupantsRecord: Partial<Record<OccupantName, Occupant>>
): [OccupantName, Occupant] | undefined => {
	return Object.entries(statefulOccupantsRecord).find(
		([id, occ]) =>
			occ.x === focusedField.x &&
			occ.y === focusedField.y &&
			occ.map === mapId &&
			!collectedItems.find((c) => c === id)
	) as [OccupantName, Occupant] | undefined;
};
