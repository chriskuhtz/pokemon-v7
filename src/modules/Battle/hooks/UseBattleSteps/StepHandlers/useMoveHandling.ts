import { useEffect } from 'react';
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
			//TODO: DECIDE SPEED HERE
			setBattleStep('EXECUTE_PLAYER_MOVE');
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
