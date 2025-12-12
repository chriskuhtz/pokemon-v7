import { CharacterOrientation } from '../interfaces/SaveFile';
import { ArrayHelpers } from './ArrayHelpers';

export const getNextClockWiseDirection = (
	input: CharacterOrientation
): CharacterOrientation => {
	if (input === 'LEFT') return 'UP';
	if (input === 'UP') return 'RIGHT';
	if (input === 'RIGHT') return 'DOWN';

	return 'LEFT';
};

export const getRandomOrientation = (): CharacterOrientation => {
	return ArrayHelpers.getRandomEntry(['DOWN', 'LEFT', 'RIGHT', 'UP']);
};
