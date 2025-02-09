import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentCureAilments = ({
	battleStep,
	setBattleStep,
	opponent,
	setOpponent,
	dispatchToast,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_CURE_AILMENTS' || !opponent) {
			return;
		}
		const defrosted =
			opponent.primaryAilment?.type === 'freeze' && Math.random() < 0.1;
		if (!opponent.primaryAilment || !defrosted) {
			setBattleStep('EXECUTE_OPPONENT_MOVE');
			return;
		}

		const t = setTimeout(() => {
			dispatchToast(`${opponent.data.name} was defrosted`);
			setOpponent({ ...opponent, primaryAilment: undefined });
			setBattleStep('EXECUTE_OPPONENT_MOVE');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, opponent, setBattleStep, setOpponent]);
};
