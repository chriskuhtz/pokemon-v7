import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyOnBattleEnterAbility } from '../../../../../functions/applyOnBattleEnterAbility';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentEmerge = ({
	battleStep,
	setBattleStep,
	opponent,
	setBattleWeather,
	dispatchToast,
}: ExtendedBattleStepHandler) => {
	//'OPPONENT_EMERGE' to 'PLAYER_EMERGE'
	useEffect(() => {
		if (battleStep !== 'OPPONENT_EMERGE' || !opponent) {
			return;
		}
		const t = setTimeout(() => {
			applyOnBattleEnterAbility({
				pokemon: opponent,
				setWeather: setBattleWeather,
				dispatchToast: dispatchToast,
			});

			setBattleStep('PLAYER_EMERGE');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, opponent, setBattleStep]);
};
