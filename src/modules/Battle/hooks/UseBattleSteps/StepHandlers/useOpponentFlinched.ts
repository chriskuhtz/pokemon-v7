import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { endTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentFlinched = ({
	battleStep,
	setNextPlayerMove,
	setNextOpponentMove,
	startPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_FLINCHED') {
			return;
		}
		const t = setTimeout(() => {
			startPath(endTurnPath);
			setNextPlayerMove(undefined);
			setNextOpponentMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setNextOpponentMove, setNextPlayerMove, startPath]);
};
