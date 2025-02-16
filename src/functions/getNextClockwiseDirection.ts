import { CharacterOrientation } from '../interfaces/SaveFile';

export const getNextClockWiseDirection = (
	input: CharacterOrientation
): CharacterOrientation => {
	if (input === 'LEFT') return 'UP';
	if (input === 'UP') return 'RIGHT';
	if (input === 'RIGHT') return 'DOWN';

	return 'LEFT';
};
