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
				throw new Error('invalid state');
				return;
			}

			const first = determineMoveOrder(player, opponent, nextPlayerMove);

			if (first === player.id) {
				setBattleStep('PLAYER_CURE_AILMENTS');
			} else {
				setBattleStep('OPPONENT_CURE_AILMENTS');
			}
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
