import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyOnBattleEnterAbility } from '../../../../../functions/applyOnBattleEnterAbility';
import { introPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentEmerge = ({
	battleStep,
	opponent,
	setBattleWeather,
	dispatchToast,
	followBattleStepPath,
	battleWeather,
	player,
	setPlayer,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_EMERGE' || !opponent) {
			return;
		}
		const t = setTimeout(() => {
			applyOnBattleEnterAbility({
				pokemon: opponent,
				setWeather: setBattleWeather,
				currentWeather: battleWeather,
				dispatchToast,
				opponent: player,
				setOpponent: setPlayer,
			});

			followBattleStepPath(introPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		battleWeather,
		dispatchToast,
		followBattleStepPath,
		opponent,
		player,
		setBattleWeather,
		setPlayer,
	]);
};
