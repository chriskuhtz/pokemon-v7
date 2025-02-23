import { OccupantName } from '../constants/checkLists/occupantsRecord';
import { Occupant } from '../interfaces/OverworldMap';
import { CharacterLocationData } from '../interfaces/SaveFile';
import { getNextFieldOccupant } from './getNextFieldOccupant';
import { getNextLocation } from './getNextLocation';

export const handleEnterPress = (
	playerLocation: CharacterLocationData,
	collectedItems: OccupantName[],
	interactWith: (x: [OccupantName, Occupant] | undefined) => void,
	statefulOccupantsRecord: Partial<Record<OccupantName, Occupant>>
) => {
	const focusedField = getNextLocation(
		playerLocation,
		playerLocation.orientation
	);

	interactWith(
		getNextFieldOccupant(
			playerLocation.mapId,
			collectedItems,
			focusedField,
			statefulOccupantsRecord
		)
	);
};
