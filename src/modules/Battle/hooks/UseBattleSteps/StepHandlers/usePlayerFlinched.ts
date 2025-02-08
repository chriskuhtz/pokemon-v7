import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerFlinched = ({
	battleStep,
	setBattleStep,
	setNextOpponentMove,
	setNextPlayerMove,
}: ExtendedBattleStepHandler) => {
	//"PLAYER_FLINCHED"
	useEffect(() => {
		if (battleStep !== 'PLAYER_FLINCHED') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('HANDLE_PLAYER_ABILITY');
			setNextOpponentMove(undefined);
			setNextPlayerMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep, setNextOpponentMove, setNextPlayerMove]);
};
