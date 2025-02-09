import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyPrimaryAilmentDamage } from '../../../../../functions/applyPrimaryAilmentDamage';
import { isKO } from '../../../../../functions/isKo';
import { endTurnPath, opponentFaintingPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useHandleOpponentEndOfTurnDamage = ({
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
		if (battleStep !== 'HANDLE_OPPONENT_END_OF_TURN_DAMAGE' || !opponent) {
			return;
		}
		if (!['burn', 'poison'].includes(opponent?.primaryAilment?.type ?? '')) {
			followBattleStepPath(endTurnPath);
			return;
		}
		const t = setTimeout(() => {
			setOpponent(applyPrimaryAilmentDamage(opponent, dispatchToast));

			if (isKO(opponent)) {
				startPath(opponentFaintingPath);
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
		startPath,
		setOpponent,
		setPlayer,
	]);
};
