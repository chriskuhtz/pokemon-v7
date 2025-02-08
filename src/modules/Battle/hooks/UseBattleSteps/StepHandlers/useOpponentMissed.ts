import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentMissed = ({
	battleStep,
	setBattleStep,
	setNextOpponentMove,
	nextPlayerMove,
}: ExtendedBattleStepHandler) => {
	//"OPPONENT_MISSED"
	useEffect(() => {
		if (battleStep !== 'OPPONENT_MISSED') {
			return;
		}
		const t = setTimeout(() => {
			setNextOpponentMove(undefined);
			if (nextPlayerMove) {
				setBattleStep('EXECUTE_PLAYER_MOVE');
			} else setBattleStep('HANDLE_PLAYER_ABILITY');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextPlayerMove, setBattleStep, setNextOpponentMove]);
};
