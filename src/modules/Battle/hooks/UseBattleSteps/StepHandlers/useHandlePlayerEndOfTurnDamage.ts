import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyPrimaryAilmentDamage } from '../../../../../functions/applyPrimaryAilmentDamage';
import { isKO } from '../../../../../functions/isKo';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useHandlePlayerEndOfTurnDamage = ({
	battleStep,
	setBattleStep,
	player,
	opponent,
	setOpponent,
	dispatchToast,
	setPlayer,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'HANDLE_PLAYER_END_OF_TURN_DAMAGE' || !player) {
			return;
		}
		if (!['burn', 'poison'].includes(player?.primaryAilment?.type ?? '')) {
			setBattleStep('HANDLE_OPPONENT_END_OF_TURN_DAMAGE');
			return;
		}
		const t = setTimeout(() => {
			setPlayer(applyPrimaryAilmentDamage(player, dispatchToast));

			if (isKO(player)) {
				setBattleStep('BATTLE_LOST');
				return;
			}
			setBattleStep('HANDLE_OPPONENT_END_OF_TURN_DAMAGE');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		dispatchToast,
		opponent,
		player,
		setBattleStep,
		setOpponent,
		setPlayer,
	]);
};
