import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerMissed = ({
	battleStep,
	setBattleStep,
	setNextPlayerMove,
}: ExtendedBattleStepHandler) => {
	//"PLAYER_MISSED"
	useEffect(() => {
		if (battleStep !== 'PLAYER_MISSED') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('EXECUTE_OPPONENT_MOVE');
			setNextPlayerMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep, setNextPlayerMove]);
};

export const useOpponentMissed = ({
	battleStep,
	setBattleStep,
	setNextOpponentMove,
}: ExtendedBattleStepHandler) => {
	//"OPPONENT_MISSED"
	useEffect(() => {
		if (battleStep !== 'OPPONENT_MISSED') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('HANDLE_PLAYER_ABILITY');
			setNextOpponentMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep, setNextOpponentMove]);
};
