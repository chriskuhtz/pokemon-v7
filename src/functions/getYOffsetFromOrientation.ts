import { CharacterOrientation } from '../interfaces/SaveFile';

export const getYOffsetFromOrientation = (
	orientation: CharacterOrientation
) => {
	if (orientation === 'UP') {
		return -3 * 64;
	}
	if (orientation === 'RIGHT') {
		return -2 * 64;
	}
	if (orientation === 'LEFT') {
		return -64;
	}
	return 0;
};
