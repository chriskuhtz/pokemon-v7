import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { BattleStepHandler } from '../useBattleSteps';

export const useOpponentIntro = ({
	battleStep,
	setBattleStep,
}: BattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_INTRO') {
			return;
		}

		const t = setTimeout(() => setBattleStep('PLAYER_INTRO'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
};
