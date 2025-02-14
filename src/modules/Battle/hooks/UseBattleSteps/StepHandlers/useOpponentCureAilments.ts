import { useEffect } from 'react';
import { opponentTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';
import { handleCureAilmentsStep } from './functions/handleCureAilmentsStep';

export const useOpponentCureAilments = ({
	battleStep,
	opponent,
	setOpponent,
	dispatchToast,
	followBattleStepPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_CURE_AILMENTS' || !opponent) {
			return;
		}
		const t = handleCureAilmentsStep(opponent, dispatchToast, setOpponent, () =>
			followBattleStepPath(opponentTurnPath)
		);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, followBattleStepPath, opponent, setOpponent]);
};
