import { useEffect } from 'react';
import { determineMoveOrder } from '../../../../../functions/determineMoveOrder';
import {
	opponentIsFasterPath,
	playerIsFasterPath,
} from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useMoveHandling = ({
	battleStep,
	nextOpponentMove,
	opponent,
	player,
	nextPlayerMove,
	setBeginsThisTurn,
	followBattleStepPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep === 'MOVE_HANDLING') {
			if (!opponent || !player || !nextOpponentMove || !nextPlayerMove) {
				throw new Error('invalid state');
			}

			const first = determineMoveOrder(player, opponent, nextPlayerMove);

			setBeginsThisTurn(first);
			if (first === player.id) {
				followBattleStepPath(playerIsFasterPath);
			} else {
				followBattleStepPath(opponentIsFasterPath);
			}
		}
	}, [
		battleStep,
		followBattleStepPath,
		nextOpponentMove,
		nextPlayerMove,
		opponent,
		player,
		setBeginsThisTurn,
	]);
};
