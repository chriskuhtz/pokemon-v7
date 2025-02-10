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
	player,
	opponent,
	battleWeather,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (!player || !opponent) {
			return;
		}
		if (battleStep === 'MOVE_SELECTION' && nextPlayerMove) {
			followBattleStepPath(beginTurnPath);
		}
		if (battleStep === 'MOVE_SELECTION' && chargedUpPlayerMove) {
			setNextPlayerMove({
				...chargedUpPlayerMove,
			});
			setChargedUpPlayerMove(undefined);
			followBattleStepPath(beginTurnPath);
		}
	}, [
		battleStep,
		battleWeather,
		chargedUpPlayerMove,
		followBattleStepPath,
		nextPlayerMove,
		opponent,
		player,
		setChargedUpPlayerMove,
		setNextPlayerMove,
	]);
};
