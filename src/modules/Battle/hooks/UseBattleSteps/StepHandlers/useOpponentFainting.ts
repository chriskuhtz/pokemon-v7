import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { opponentFaintingPath } from '../../../types/BattleStep';
import { BattleStepHandler } from '../useBattleSteps';

export const useOpponentFainting = ({
	battleStep,
	followBattleStepPath,
}: BattleStepHandler) => {
	// 'OPPONENT_FAINTING' to 'BATTLE_WON'
	useEffect(() => {
		if (battleStep !== 'OPPONENT_FAINTING') {
			return;
		}
		const t = setTimeout(
			() => followBattleStepPath(opponentFaintingPath),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [battleStep, followBattleStepPath]);
};
