import { occupantsRecord } from '../constants/occupantsRecord';
import { Occupant } from '../interfaces/OverworldMap';
import { CharacterLocationData } from '../interfaces/SaveFile';
import { getNextLocation } from './getNextLocation';

export const handleEnterPress = (
	playerLocation: CharacterLocationData,
	collectedItems: number[],
	interactWith: (x: [string, Occupant] | undefined) => void
) => {
	const focusedField = getNextLocation(
		playerLocation,
		playerLocation.orientation
	);
	const nextFieldOccupant = Object.entries(occupantsRecord).find(
		([id, occ]) =>
			occ.x === focusedField.x &&
			occ.y === focusedField.y &&
			!collectedItems.find((c) => c === parseInt(id))
	);

	interactWith(nextFieldOccupant);
};
