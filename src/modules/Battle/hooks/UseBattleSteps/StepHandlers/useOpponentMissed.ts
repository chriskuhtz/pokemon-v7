import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { endTurnPath, playerTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentMissed = ({
	battleStep,

	setNextOpponentMove,
	nextPlayerMove,
	startPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_MISSED') {
			return;
		}
		const t = setTimeout(() => {
			setNextOpponentMove(undefined);
			if (nextPlayerMove) {
				startPath(playerTurnPath);
			} else startPath(endTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextPlayerMove, setNextOpponentMove, startPath]);
};
