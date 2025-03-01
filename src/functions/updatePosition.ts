import { OverworldMap } from '../interfaces/OverworldMap';
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
	addStep: () => void
): { x: number; y: number } => {
	const nextLocation = getNextLocation(playerLocation, nextInput);

	if (isPassable(nextLocation, map)) {
		addStep();
		return nextLocation;
	}
	return playerLocation;
};
