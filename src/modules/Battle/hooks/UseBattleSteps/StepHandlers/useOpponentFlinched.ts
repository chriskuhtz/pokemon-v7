import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentFlinched = ({
	battleStep,
	setBattleStep,
	setNextPlayerMove,
	setNextOpponentMove,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_FLINCHED') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('HANDLE_PLAYER_ABILITY');
			setNextPlayerMove(undefined);
			setNextOpponentMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep, setNextOpponentMove, setNextPlayerMove]);
};
