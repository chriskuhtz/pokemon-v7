import { isMove } from '../constants/checkLists/movesCheckList';
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

export const filterTargets = (
	targets: BattlePokemon[],
	chosenAction?: ActionType,
	user?: BattlePokemon
): BattlePokemon[] => {
	if (isHealingItem(chosenAction) || isPPRestorationItem(chosenAction)) {
		if (user?.ownerId === getPlayerId()) {
			return getPlayerPokemon(targets).filter((t) =>
				canBenefitFromItem(t, chosenAction)
			);
		}
		return getOpponentPokemon(targets).filter((t) =>
			canBenefitFromItem(t, chosenAction)
		);
	}
	if (isPokeball(chosenAction)) {
		return getOpponentPokemon(targets).filter((t) => t.status === 'ONFIELD');
	}
	if (isMove(chosenAction)) {
		return targets.filter((t) => t.status === 'ONFIELD');
	}
	return targets;
};
