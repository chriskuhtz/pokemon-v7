import { Occupant } from '../interfaces/OverworldMap';
import { CharacterLocationData } from '../interfaces/SaveFile';
import { getNextFieldOccupant } from './getNextFieldOccupant';
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

	interactWith(
		getNextFieldOccupant(playerLocation.mapId, collectedItems, focusedField)
	);
};
