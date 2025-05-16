import { MoveName } from '../constants/checkLists/movesCheckList';

export const getChargeUpMessage = (
	userName: string,
	moveName: MoveName
): string => {
	if (moveName === 'fly') {
		return `${userName} flew up high `;
	}
	if (moveName === 'shadow-force') {
		return `${userName} vanished into the shadows `;
	}
	if (moveName === 'dig') {
		return `${userName} dug underground `;
	}
	if (moveName === 'solar-beam') {
		return `${userName} is taking in sunlight`;
	}
	if (moveName === 'skull-bash') {
		return `${userName} tucked in its head`;
	}
	return ` ${userName} is charging up ${moveName}`;
};
