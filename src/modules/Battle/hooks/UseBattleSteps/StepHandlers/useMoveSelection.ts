import { useEffect } from 'react';
import { beginTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useMoveSelection = ({
	battleStep,
	followBattleStepPath,
	player,
	opponent,
	battleWeather,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (!player || !opponent) {
			return;
		}
		if (battleStep === 'MOVE_SELECTION' && player.moveQueue.length > 0) {
			followBattleStepPath(beginTurnPath);
		}
	}, [battleStep, battleWeather, followBattleStepPath, opponent, player]);
};
