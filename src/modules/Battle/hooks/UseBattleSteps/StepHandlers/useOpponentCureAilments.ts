import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { opponentTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

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
		const defrosted =
			opponent.primaryAilment?.type === 'freeze' && Math.random() < 0.1;
		if (!opponent.primaryAilment || !defrosted) {
			followBattleStepPath(opponentTurnPath);
			return;
		}

		const t = setTimeout(() => {
			dispatchToast(`${opponent.data.name} was defrosted`);
			setOpponent({ ...opponent, primaryAilment: undefined });
			followBattleStepPath(opponentTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, followBattleStepPath, opponent, setOpponent]);
};
