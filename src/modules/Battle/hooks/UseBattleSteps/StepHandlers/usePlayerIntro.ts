import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { BattleStep } from '../../../types/BattleStep';

export const usePlayerIntro = (
	battleStep: BattleStep,
	followBattleStepPath: () => void
) => {
	useEffect(() => {
		if (battleStep !== 'PLAYER_INTRO') {
			return;
		}
		const t = setTimeout(() => {
			followBattleStepPath();
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, followBattleStepPath]);
};
