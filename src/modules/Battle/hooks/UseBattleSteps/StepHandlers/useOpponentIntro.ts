import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { BattleStep } from '../../../types/BattleStep';

export const useOpponentIntro = (
	battleStep: BattleStep,
	followBattleStepPath: () => void
) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_INTRO') {
			return;
		}

		const t = setTimeout(() => followBattleStepPath(), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, followBattleStepPath]);
};
