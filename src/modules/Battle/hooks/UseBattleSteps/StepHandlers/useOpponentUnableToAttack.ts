import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentUnableToAttack = ({
	battleStep,
	setBattleStep,
	setNextOpponentMove,
	nextPlayerMove,
}: ExtendedBattleStepHandler) => {
	//"OPPONENT_MISSED"
	useEffect(() => {
		if (battleStep !== 'OPPONENT_UNABLE_TO_ATTACK') {
			return;
		}
		const t = setTimeout(() => {
			setNextOpponentMove(undefined);
			if (nextPlayerMove) {
				setBattleStep('PLAYER_CURE_AILMENTS');
			} else setBattleStep('HANDLE_PLAYER_ABILITY');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextPlayerMove, setBattleStep, setNextOpponentMove]);
};
