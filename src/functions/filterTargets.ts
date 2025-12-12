import { thrashingMoves } from '../constants/groupedMoves';
import { isMove } from '../constants/movesCheckList';
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
import { getPlayerPokemon } from './getPlayerPokemon';
import { isKO } from './isKo';
import { isSelfTargeting } from './isSelfTargeting';

export interface FilterTargetsPayload {
	targets: BattlePokemon[];
	user: BattlePokemon;
	chosenAction: ActionType;
	onlyOpponents: boolean;
	playerId: string;
}
export const filterTargets = ({
	targets,
	user,
	chosenAction,
	onlyOpponents,
	playerId,
}: FilterTargetsPayload): BattlePokemon[] => {
	const preFiltered = targets.filter(
		(t) => !onlyOpponents || (onlyOpponents && t.ownerId !== user.ownerId)
	);
	if (isHealingItem(chosenAction) || isPPRestorationItem(chosenAction)) {
		if (user?.ownerId === playerId) {
			return getPlayerPokemon(preFiltered, playerId).filter((t) =>
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

		if (thrashingMoves.includes(chosenAction)) {
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
