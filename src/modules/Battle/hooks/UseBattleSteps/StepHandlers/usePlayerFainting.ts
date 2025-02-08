import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { BattleStepHandler } from '../useBattleSteps';

export const usePlayerFainting = ({
	battleStep,
	setBattleStep,
}: BattleStepHandler) => {
	// 'PLAYER_FAINTING' to 'BATTLE_LOST'
	useEffect(() => {
		if (battleStep !== 'PLAYER_FAINTING') {
			return;
		}
		const t = setTimeout(() => setBattleStep('BATTLE_LOST'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
};
