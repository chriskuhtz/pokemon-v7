import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export function changeMovePP<T extends BattlePokemon | OwnedPokemon>(
	user: T,
	moveName: string,
	amount: number
): T {
	return {
		...user,
		firstMove: {
			...user.firstMove,
			usedPP:
				user.firstMove.usedPP - (moveName === user.firstMove.name ? amount : 0),
		},
		secondMove: user.secondMove
			? {
					...user.secondMove,
					usedPP:
						user.secondMove?.usedPP -
						(moveName === user.secondMove?.name ? amount : 0),
			  }
			: undefined,
		thirdMove: user.thirdMove
			? {
					...user.thirdMove,
					usedPP:
						user.thirdMove?.usedPP -
						(moveName === user.thirdMove?.name ? amount : 0),
			  }
			: undefined,
		fourthMove: user.fourthMove
			? {
					...user.fourthMove,
					usedPP:
						user.fourthMove?.usedPP -
						(moveName === user.fourthMove?.name ? amount : 0),
			  }
			: undefined,
	};
}
