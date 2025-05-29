import { Occupant, OverworldMap } from '../interfaces/OverworldMap';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../interfaces/SaveFile';
import { getNextLocation } from './getNextLocation';
import { isPassable, isWaterFall } from './isPassable';

export const updatePosition = (
	playerLocation: CharacterLocationData,
	nextInput: CharacterOrientation,
	map: OverworldMap,
	addStep: () => void,
	currentOccupants: Occupant[],
	canSwim: boolean,
	flying: boolean,
	canClimb: boolean
): { x: number; y: number } => {
	const nextLocation = getNextLocation(playerLocation, nextInput);

	const waterfall = isWaterFall(map, nextLocation);

	if (waterfall && !flying) {
		if (nextInput === 'DOWN') {
			addStep();
			return nextLocation;
		} else return playerLocation;
	}
	if (
		isPassable(nextLocation, map, currentOccupants, canSwim, flying, canClimb)
	) {
		addStep();
		return nextLocation;
	}

	return playerLocation;
};
