import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { endTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerFlinched = ({
	battleStep,
	setNextOpponentMove,
	setNextPlayerMove,
	startPath,
}: ExtendedBattleStepHandler) => {
	//"PLAYER_FLINCHED"
	useEffect(() => {
		if (battleStep !== 'PLAYER_FLINCHED') {
			return;
		}
		const t = setTimeout(() => {
			startPath(endTurnPath);
			setNextOpponentMove(undefined);
			setNextPlayerMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setNextOpponentMove, setNextPlayerMove, startPath]);
};
