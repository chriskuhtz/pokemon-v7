import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentFlinched = ({
	battleStep,
	setBattleStep,
	setNextOpponentMove,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_FLINCHED') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('HANDLE_PLAYER_ABILITY');
			setNextOpponentMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep, setNextOpponentMove]);
};
