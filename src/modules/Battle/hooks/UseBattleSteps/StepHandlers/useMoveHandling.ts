import { useEffect } from 'react';
import { determineMoveOrder } from '../../../../../functions/determineMoveOrder';
import {
	opponentIsFasterPath,
	playerIsFasterPath,
} from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useMoveHandling = ({
	battleStep,

	opponent,
	player,
	setBeginsThisTurn,
	followBattleStepPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'MOVE_HANDLING') {
			return;
		}

		if (!opponent || !player) {
			throw new Error('invalid state');
		}

		const first = determineMoveOrder(player, opponent, player.moveQueue[0]);

		setBeginsThisTurn(first);
		if (first === player.id) {
			followBattleStepPath(playerIsFasterPath);
		} else {
			followBattleStepPath(opponentIsFasterPath);
		}
	}, [battleStep, followBattleStepPath, opponent, player, setBeginsThisTurn]);
};
