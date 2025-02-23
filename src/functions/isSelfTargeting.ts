import { MoveDto } from '../interfaces/Move';

export const isSelfTargeting = (moveData: MoveDto) => {
	return moveData.target.name === 'user';
};
