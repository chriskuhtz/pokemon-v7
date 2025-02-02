import { itemsRecord } from '../constants/itemsRecord';
import { Occupant } from '../interfaces/OverworldMap';
import { CharacterLocationData } from '../interfaces/SaveFile';
import { getNextLocation } from './getNextLocation';

export const handleEnterPress = (
	playerLocation: CharacterLocationData,
	interactWith: (x: [string, Occupant] | undefined) => void
) => {
	const focusedField = getNextLocation(
		playerLocation,
		playerLocation.orientation
	);
	const nextFieldOccupant = Object.entries(itemsRecord).find(
		([, occ]) => occ.x === focusedField.x && occ.y === focusedField.y
	);

	interactWith(nextFieldOccupant);
};
