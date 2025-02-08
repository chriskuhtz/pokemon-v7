import { useEffect } from 'react';
import { determineMoveOrder } from '../../../../../functions/determineMoveOrder';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useMoveHandling = ({
	battleStep,
	nextOpponentMove,
	opponent,
	player,
	setBattleStep,
	nextPlayerMove,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep === 'MOVE_HANDLING') {
			if (!opponent || !player || !nextOpponentMove || !nextPlayerMove) {
				setBattleStep('ERROR');
				return;
			}

			const first = determineMoveOrder(player, opponent, nextPlayerMove);

			if (first === player.id) {
				setBattleStep('EXECUTE_PLAYER_MOVE');
			} else setBattleStep('EXECUTE_OPPONENT_MOVE');
		}
	}, [
		battleStep,
		nextOpponentMove,
		nextPlayerMove,
		opponent,
		player,
		setBattleStep,
	]);
};
