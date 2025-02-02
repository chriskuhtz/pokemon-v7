import {
	CharacterLocationData,
	CharacterOrientation,
} from '../interfaces/SaveFile';

export const getNextLocation = (
	playerLocation: CharacterLocationData,
	nextInput: CharacterOrientation
): CharacterLocationData => {
	if (nextInput === 'DOWN') {
		return { ...playerLocation, x: playerLocation.x, y: playerLocation.y + 1 };
	}
	if (nextInput === 'UP') {
		return { ...playerLocation, x: playerLocation.x, y: playerLocation.y - 1 };
	}
	if (nextInput === 'LEFT') {
		return { ...playerLocation, x: playerLocation.x - 1, y: playerLocation.y };
	}
	if (nextInput === 'RIGHT') {
		return { ...playerLocation, x: playerLocation.x + 1, y: playerLocation.y };
	}
	return playerLocation;
};
