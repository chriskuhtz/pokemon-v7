import { BattleMove, BattlePokemon } from '../interfaces/BattlePokemon';
import { getMovesArray } from './getMovesArray';

export const handleMimic = (
	pokemon: BattlePokemon,
	moveToCopy: BattleMove
): BattlePokemon => {
	const mimicSlot = getMovesArray(pokemon).findIndex((m) => m.name === 'mimic');

	if (mimicSlot < 0) {
		throw new Error('How can he mimic');
	}

	const updated = { ...pokemon };
	updated.putMimicbacktoSlot = mimicSlot;
	if (mimicSlot === 0) {
		updated.firstMove = moveToCopy;
	}
	if (mimicSlot === 1) {
		updated.secondMove = moveToCopy;
	}
	if (mimicSlot === 2) {
		updated.thirdMove = moveToCopy;
	}
	if (mimicSlot === 3) {
		updated.fourthMove = moveToCopy;
	}

	return updated;
};
