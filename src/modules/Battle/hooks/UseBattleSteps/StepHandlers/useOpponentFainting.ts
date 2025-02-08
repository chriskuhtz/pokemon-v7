import { useEffect } from 'react';
import { BattleStepHandler } from '../useBattleSteps';
import { animationTimer } from '../../../../../constants/gameData';

export const useOpponentFainting = ({
	battleStep,
	setBattleStep,
}: BattleStepHandler) => {
	// 'OPPONENT_FAINTING' to 'BATTLE_WON'
	useEffect(() => {
		if (battleStep !== 'OPPONENT_FAINTING') {
			return;
		}
		const t = setTimeout(() => setBattleStep('BATTLE_WON'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
};
