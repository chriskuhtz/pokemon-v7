import { MoveName } from '../constants/checkLists/movesCheckList';

export const getChargeUpMessage = (
	userName: string,
	moveName: MoveName
): string => {
	if (moveName === 'fly') {
		return ` ${userName} flew up high ${moveName}`;
	}
	return ` ${userName} is charging up ${moveName}`;
};
