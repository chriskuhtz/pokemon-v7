import { useEffect } from 'react';
import { beginTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useMoveSelection = ({
	battleStep,

	nextPlayerMove,
	followBattleStepPath,
	chargedUpPlayerMove,
	setChargedUpPlayerMove,
	setNextPlayerMove,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep === 'MOVE_SELECTION' && nextPlayerMove) {
			followBattleStepPath(beginTurnPath);
		}
		if (battleStep === 'MOVE_SELECTION' && chargedUpPlayerMove) {
			setNextPlayerMove(chargedUpPlayerMove);
			setChargedUpPlayerMove(undefined);
			followBattleStepPath(beginTurnPath);
		}
	}, [
		battleStep,
		chargedUpPlayerMove,
		followBattleStepPath,
		nextPlayerMove,
		setChargedUpPlayerMove,
		setNextPlayerMove,
	]);
};
