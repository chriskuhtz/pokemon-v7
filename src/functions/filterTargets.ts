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
import { getOpponentPokemon } from './getOpponentPokemon';
import { getPlayerId } from './getPlayerId';
import { getPlayerPokemon } from './getPlayerPokemon';

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
	if (isMove(chosenAction) && lockInMoves.includes(chosenAction)) {
		return preFiltered.filter(
			(t) => t.status === 'ONFIELD' && t.id !== user?.id
		);
	}
	if (isMove(chosenAction)) {
		return preFiltered.filter((t) => t.status === 'ONFIELD');
	}
	return targets;
};

export const getRandomIndex = (arrayLength: number): number => {
	return Math.floor(Math.random() * arrayLength);
};

export const getRandomTargetId = (x: FilterTargetsPayload): string => {
	const possibleTargets = filterTargets(x);

	return possibleTargets[getRandomIndex(possibleTargets.length)].id;
};
