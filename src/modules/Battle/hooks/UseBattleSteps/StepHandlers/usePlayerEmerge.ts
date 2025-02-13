import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyOnBattleEnterAbility } from '../../../../../functions/applyOnBattleEnterAbility';
import { introPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerEmerge = ({
	battleStep,
	player,
	setBattleWeather,
	battleWeather,
	dispatchToast,
	followBattleStepPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'PLAYER_EMERGE' || !player) {
			return;
		}
		const t = setTimeout(() => {
			applyOnBattleEnterAbility({
				pokemon: player,
				setWeather: setBattleWeather,
				currentWeather: battleWeather,
				dispatchToast,
			});

			followBattleStepPath(introPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		battleWeather,
		dispatchToast,
		followBattleStepPath,
		player,
		setBattleWeather,
	]);
};
