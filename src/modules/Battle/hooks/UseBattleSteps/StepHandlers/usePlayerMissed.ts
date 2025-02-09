import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerMissed = ({
	battleStep,
	setBattleStep,
	setNextPlayerMove,
	nextOpponentMove,
}: ExtendedBattleStepHandler) => {
	//"PLAYER_MISSED"
	useEffect(() => {
		if (battleStep !== 'PLAYER_MISSED') {
			return;
		}
		const t = setTimeout(() => {
			setNextPlayerMove(undefined);
			if (nextOpponentMove) {
				setBattleStep('EXECUTE_OPPONENT_MOVE');
			} else setBattleStep('HANDLE_PLAYER_ABILITY');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextOpponentMove, setBattleStep, setNextPlayerMove]);
};

export const usePlayerUnableToAttack = ({
	battleStep,
	setBattleStep,
	setNextPlayerMove,
	nextOpponentMove,
}: ExtendedBattleStepHandler) => {
	//"PLAYER_MISSED"
	useEffect(() => {
		if (battleStep !== 'PLAYER_UNABLE_TO_ATTACK') {
			return;
		}
		const t = setTimeout(() => {
			setNextPlayerMove(undefined);
			if (nextOpponentMove) {
				setBattleStep('EXECUTE_OPPONENT_MOVE');
			} else setBattleStep('HANDLE_PLAYER_ABILITY');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextOpponentMove, setBattleStep, setNextPlayerMove]);
};
