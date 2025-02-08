import { CharacterOrientation } from '../interfaces/SaveFile';

export const getOppositeDirection = (
	input: CharacterOrientation
): CharacterOrientation => {
	if (input === 'LEFT') return 'RIGHT';
	if (input === 'RIGHT') return 'LEFT';
	if (input === 'DOWN') return 'UP';

	return 'DOWN';
};
