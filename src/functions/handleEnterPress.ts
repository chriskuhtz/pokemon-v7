import { Occupant } from '../interfaces/Occupant';
import { CharacterLocationData } from '../interfaces/SaveFile';
import { getNextFieldOccupant } from './getNextFieldOccupant';
import { getNextLocation } from './getNextLocation';

export const handleEnterPress = (
	playerLocation: CharacterLocationData,
	interactWith: (x: Occupant | undefined) => void,
	statefulOccupantsRecord: Occupant[]
) => {
	const focusedField = getNextLocation(
		playerLocation,
		playerLocation.orientation
	);

	interactWith(getNextFieldOccupant(focusedField, statefulOccupantsRecord));
};
