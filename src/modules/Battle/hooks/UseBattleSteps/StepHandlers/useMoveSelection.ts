import { useEffect } from 'react';
import { beginTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useMoveSelection = ({
	battleStep,

	nextPlayerMove,
	followBattleStepPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep === 'MOVE_SELECTION' && nextPlayerMove) {
			followBattleStepPath(beginTurnPath);
		}
	}, [battleStep, followBattleStepPath, nextPlayerMove]);
};
