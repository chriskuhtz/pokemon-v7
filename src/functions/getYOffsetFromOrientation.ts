import { baseSize } from '../constants/gameData';
import { CharacterOrientation } from '../interfaces/SaveFile';

export const getYOffsetFromOrientation = (
	orientation: CharacterOrientation
) => {
	if (orientation === 'UP') {
		return -3 * baseSize;
	}
	if (orientation === 'RIGHT') {
		return -2 * baseSize;
	}
	if (orientation === 'LEFT') {
		return -baseSize;
	}
	return 0;
};
