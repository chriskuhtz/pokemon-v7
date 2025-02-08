import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { BattleStepHandler } from '../useBattleSteps';

export const usePlayerIntro = ({
	battleStep,
	setBattleStep,
}: BattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'PLAYER_INTRO') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('OPPONENT_EMERGE');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
};
