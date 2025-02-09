import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { playerFaintingPath } from '../../../types/BattleStep';
import { BattleStepHandler } from '../useBattleSteps';

export const usePlayerFainting = ({
	battleStep,

	followBattleStepPath,
}: BattleStepHandler) => {
	// 'PLAYER_FAINTING' to 'BATTLE_LOST'
	useEffect(() => {
		if (battleStep !== 'PLAYER_FAINTING') {
			return;
		}
		const t = setTimeout(
			() => followBattleStepPath(playerFaintingPath),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [battleStep, followBattleStepPath]);
};
