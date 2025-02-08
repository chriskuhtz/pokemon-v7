import { useEffect } from 'react';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useMoveSelection = ({
	battleStep,
	setBattleStep,
	nextPlayerMove,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep === 'MOVE_SELECTION' && nextPlayerMove) {
			setBattleStep('OPPONENT_MOVE_SELECTION');
		}
	}, [battleStep, nextPlayerMove, setBattleStep]);
};
