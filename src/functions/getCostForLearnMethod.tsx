import { MoveName } from '../constants/movesCheckList';
import { ItemType, moveUnlockPayments } from '../interfaces/Item';
import { LearnMethod } from '../interfaces/PokemonData';

export const getCostForLearnMethod = (
	moveName: MoveName,
	learnMethod: LearnMethod
): ItemType => {
	if (learnMethod === 'level-up') {
		return 'berry-juice';
	}
	return (
		[
			...moveUnlockPayments,
			...moveUnlockPayments,
			...moveUnlockPayments,
			...moveUnlockPayments,
			...moveUnlockPayments,
			...moveUnlockPayments,
		].at(moveName.length) ?? 'berry-juice'
	);
};
