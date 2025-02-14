import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyPrimaryAilmentDamage } from '../../../../../functions/applyPrimaryAilmentDamage';
import { applySecondaryAilmentDamage } from '../../../../../functions/applySecondaryAilmentDamage';
import { isKO } from '../../../../../functions/isKo';
import { isTrapped } from '../../../../../functions/isTrapped';
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
		if (
			!['burn', 'poison'].includes(player?.primaryAilment?.type ?? '') &&
			!isTrapped(player)
		) {
			followBattleStepPath(endTurnPath);
			return;
		}
		const t = setTimeout(() => {
			let updatedPlayer = applyPrimaryAilmentDamage(player, dispatchToast);

			if (isKO(updatedPlayer)) {
				setPlayer(updatedPlayer);
				startPath(playerFaintingPath);
				return;
			}

			updatedPlayer = applySecondaryAilmentDamage(player, dispatchToast);
			if (isKO(updatedPlayer)) {
				setPlayer(updatedPlayer);
				startPath(playerFaintingPath);
				return;
			}

			setPlayer(updatedPlayer);
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
