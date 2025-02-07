import { useEffect } from 'react';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useMoveSelection = ({
	battleStep,
	setBattleStep,
	nextPlayerMove,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep === 'MOVE_SELECTION' && nextPlayerMove) {
			setBattleStep('HANDLE_OPPONENT_ABILITY');
		}
	}, [battleStep, nextPlayerMove, setBattleStep]);
};
