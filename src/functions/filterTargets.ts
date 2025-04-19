import { isMove } from '../constants/checkLists/movesCheckList';
import { lockInMoves } from '../constants/forceSwitchMoves';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	isHealingItem,
	isPPRestorationItem,
	isPokeball,
} from '../interfaces/Item';
import { ActionType } from '../modules/Battle/BattleField';
import { canBenefitFromItem } from './canBenefitFromItem';
import { getMovesArray } from './getMovesArray';
import { getOpponentPokemon } from './getOpponentPokemon';
import { getPlayerId } from './getPlayerId';
import { getPlayerPokemon } from './getPlayerPokemon';
import { isKO } from './isKo';
import { isSelfTargeting } from './isSelfTargeting';

export interface FilterTargetsPayload {
	targets: BattlePokemon[];
	user: BattlePokemon;
	chosenAction: ActionType;
	onlyOpponents: boolean;
}
export const filterTargets = ({
	targets,
	user,
	chosenAction,
	onlyOpponents,
}: FilterTargetsPayload): BattlePokemon[] => {
	const preFiltered = targets.filter(
		(t) => !onlyOpponents || (onlyOpponents && t.ownerId !== user.ownerId)
	);
	if (isHealingItem(chosenAction) || isPPRestorationItem(chosenAction)) {
		if (user?.ownerId === getPlayerId()) {
			return getPlayerPokemon(preFiltered).filter((t) =>
				canBenefitFromItem(t, chosenAction)
			);
		}
		return getOpponentPokemon(preFiltered).filter((t) =>
			canBenefitFromItem(t, chosenAction)
		);
	}
	if (isPokeball(chosenAction)) {
		return getOpponentPokemon(preFiltered).filter(
			(t) => t.status === 'ONFIELD'
		);
	}

	if (isMove(chosenAction)) {
		const move = getMovesArray(user).find((m) => m.name === chosenAction);
		if (move && isSelfTargeting(move.data)) {
			return [user];
		}

		if (lockInMoves.includes(chosenAction)) {
			return preFiltered.filter(
				(t) => t.status === 'ONFIELD' && t.id !== user.id
			);
		}

		return preFiltered.filter(
			(t) => t.status === 'ONFIELD' && t.id !== user.id
		);
	}
	if (chosenAction === 'SWITCH') {
		const allMoveQueues = targets.flatMap((t) => t.moveQueue);
		return targets.filter(
			(t) =>
				t.ownerId === user.ownerId &&
				t.status === 'BENCH' &&
				!isKO(t) &&
				allMoveQueues.every(
					(move) =>
						move.type !== 'Switch' ||
						(move.type === 'Switch' && move.targetId !== t.id)
				)
		);
	}

	return targets;
};

export const getRandomIndex = (arrayLength: number): number => {
	return Math.floor(Math.random() * arrayLength);
};
export function getRandomEntry<T>(array: T[]) {
	return array[getRandomIndex(array.length)];
}
export function getEntryWithOverflow<T>(array: T[], index: number) {
	const modulo = index % array.length;
	const reducedIndex = index - modulo * array.length;
	return array[reducedIndex];
}

export const getRandomTarget = (x: FilterTargetsPayload): BattlePokemon => {
	const possibleTargets = filterTargets(x);

	return getRandomEntry(possibleTargets);
};
