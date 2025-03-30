import { BattleMove, BattlePokemon } from '../interfaces/BattlePokemon';
import { getMovesArray } from './getMovesArray';

export const handleMimicOrSketch = (
	pokemon: BattlePokemon,
	moveToCopy: BattleMove,
	type: 'mimic' | 'sketch'
): BattlePokemon => {
	const mimicSlot = getMovesArray(pokemon).findIndex((m) => m.name === type);

	if (mimicSlot < 0) {
		throw new Error('How can he mimic');
	}

	const updated = { ...pokemon };
	if (type === 'mimic') {
		updated.putMimicbacktoSlot = mimicSlot;
	}

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
