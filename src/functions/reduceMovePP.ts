import { BattlePokemon } from '../interfaces/BattlePokemon';

export const reduceMovePP = (
	user: BattlePokemon,
	moveName: string
): BattlePokemon => {
	return {
		...user,
		firstMove: {
			...user.firstMove,
			usedPP:
				user.firstMove.usedPP + (moveName === user.firstMove.name ? 1 : 0),
		},
		secondMove: user.secondMove
			? {
					...user.secondMove,
					usedPP:
						user.secondMove?.usedPP +
						(moveName === user.secondMove?.name ? 1 : 0),
			  }
			: undefined,
		thirdMove: user.thirdMove
			? {
					...user.thirdMove,
					usedPP:
						user.thirdMove?.usedPP +
						(moveName === user.thirdMove?.name ? 1 : 0),
			  }
			: undefined,
		fourthMove: user.fourthMove
			? {
					...user.fourthMove,
					usedPP:
						user.fourthMove?.usedPP +
						(moveName === user.fourthMove?.name ? 1 : 0),
			  }
			: undefined,
	};
};
