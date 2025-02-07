import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyOnBattleEnterAbility } from '../../../../../functions/applyOnBattleEnterAbility';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerEmerge = ({
	battleStep,
	setBattleStep,
	player,
	setBattleWeather,
	dispatchToast,
}: ExtendedBattleStepHandler) => {
	//'PLAYER_EMERGE' to 'MOVE_SELECTION'
	useEffect(() => {
		if (battleStep !== 'PLAYER_EMERGE' || !player) {
			return;
		}
		const t = setTimeout(() => {
			applyOnBattleEnterAbility({
				pokemon: player,
				setWeather: setBattleWeather,
				dispatchToast: dispatchToast,
			});

			setBattleStep('MOVE_SELECTION');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, player, setBattleStep, setBattleWeather]);
};
