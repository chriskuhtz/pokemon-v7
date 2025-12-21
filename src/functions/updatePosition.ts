import { Occupant } from '../interfaces/Occupant';
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
	currentOccupants: Occupant[],
	canSwim: boolean,
	flying: boolean,
	canClimb: boolean
): { x: number; y: number } => {
	const nextLocation = getNextLocation(playerLocation, nextInput);

	if (
		isPassable({
			nextLocation,
			playerLocation,
			map,
			currentOccupants,
			canSwim,
			flying,
			canClimb,
		})
	) {
		console.log('passable');
		return nextLocation;
	}

	return playerLocation;
};
