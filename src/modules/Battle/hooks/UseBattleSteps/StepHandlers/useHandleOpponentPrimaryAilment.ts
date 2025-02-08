import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyPrimaryAilmentDamage } from '../../../../../functions/applyPrimaryAilmentDamage';
import { isKO } from '../../../../../functions/isKo';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useHandleOpponentPrimaryAilment = ({
	battleStep,
	setBattleStep,
	player,
	opponent,
	setOpponent,
	dispatchToast,
	setPlayer,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'HANDLE_OPPONENT_PRIMARY_AILMENT' || !opponent) {
			return;
		}
		const t = setTimeout(() => {
			setOpponent(applyPrimaryAilmentDamage(opponent, dispatchToast));

			if (isKO(opponent)) {
				setBattleStep('BATTLE_WON');
				return;
			}
			setBattleStep('MOVE_SELECTION');
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
