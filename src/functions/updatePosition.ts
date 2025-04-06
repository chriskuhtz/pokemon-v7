import { Occupant, OverworldMap } from '../interfaces/OverworldMap';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../interfaces/SaveFile';
import { getNextLocation } from './getNextLocation';
import { isPassable } from './isPassable';

export const updatePosition = (
	playerLocation: CharacterLocationData,
	nextInput: CharacterOrientation,
	map: OverworldMap,
	addStep: () => void,
	currentOccupants: Occupant[],
	canSwim: boolean
): { x: number; y: number } => {
	const nextLocation = getNextLocation(playerLocation, nextInput);

	if (isPassable(nextLocation, map, currentOccupants, canSwim)) {
		addStep();
		return nextLocation;
	}
	return playerLocation;
};
