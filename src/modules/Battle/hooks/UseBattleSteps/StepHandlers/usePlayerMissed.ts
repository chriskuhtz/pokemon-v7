import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { endTurnPath, opponentTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerMissed = ({
	battleStep,
	setNextPlayerMove,
	nextOpponentMove,
	startPath,
}: ExtendedBattleStepHandler) => {
	//"PLAYER_MISSED"
	useEffect(() => {
		if (battleStep !== 'PLAYER_MISSED') {
			return;
		}
		const t = setTimeout(() => {
			setNextPlayerMove(undefined);
			if (nextOpponentMove) {
				startPath(opponentTurnPath);
			} else startPath(endTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextOpponentMove, setNextPlayerMove, startPath]);
};
