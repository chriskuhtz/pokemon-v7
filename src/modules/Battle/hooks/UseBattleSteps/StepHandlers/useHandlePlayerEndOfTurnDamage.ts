import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyPrimaryAilmentDamage } from '../../../../../functions/applyPrimaryAilmentDamage';
import { isKO } from '../../../../../functions/isKo';
import { endTurnPath, playerFaintingPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useHandlePlayerEndOfTurnDamage = ({
	battleStep,
	player,
	opponent,
	setOpponent,
	dispatchToast,
	setPlayer,
	followBattleStepPath,
	startPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'HANDLE_PLAYER_END_OF_TURN_DAMAGE' || !player) {
			return;
		}
		if (!['burn', 'poison'].includes(player?.primaryAilment?.type ?? '')) {
			followBattleStepPath(endTurnPath);
			return;
		}
		const t = setTimeout(() => {
			setPlayer(applyPrimaryAilmentDamage(player, dispatchToast));

			if (isKO(player)) {
				startPath(playerFaintingPath);
				return;
			}
			followBattleStepPath(endTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		dispatchToast,
		followBattleStepPath,
		opponent,
		player,
		setOpponent,
		setPlayer,
		startPath,
	]);
};
