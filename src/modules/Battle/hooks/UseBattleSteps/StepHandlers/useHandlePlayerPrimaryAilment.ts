import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyPrimaryAilmentDamage } from '../../../../../functions/applyPrimaryAilmentDamage';
import { isKO } from '../../../../../functions/isKo';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useHandlePlayerPrimaryAilment = ({
	battleStep,
	setBattleStep,
	player,
	opponent,
	setOpponent,
	dispatchToast,
	setPlayer,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'HANDLE_PLAYER_PRIMARY_AILMENT' || !player) {
			return;
		}
		const t = setTimeout(() => {
			setPlayer(applyPrimaryAilmentDamage(player, dispatchToast));

			if (isKO(player)) {
				setBattleStep('BATTLE_LOST');
				return;
			}
			setBattleStep('HANDLE_OPPONENT_PRIMARY_AILMENT');
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
