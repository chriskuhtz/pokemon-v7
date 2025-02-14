import { useEffect } from 'react';
import { playerTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';
import { handleCureAilmentsStep } from './functions/handleCureAilmentsStep';

export const usePlayerCureAilments = ({
	battleStep,
	dispatchToast,
	player,
	setPlayer,
	followBattleStepPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'PLAYER_CURE_AILMENTS' || !player) {
			return;
		}

		const t = handleCureAilmentsStep(player, dispatchToast, setPlayer, () =>
			followBattleStepPath(playerTurnPath)
		);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, followBattleStepPath, player, setPlayer]);
};
