import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyPrimaryAilmentDamage } from '../../../../../functions/applyPrimaryAilmentDamage';
import { applySecondaryAilmentDamage } from '../../../../../functions/applySecondaryAilmentDamage';
import { isKO } from '../../../../../functions/isKo';
import { isTrapped } from '../../../../../functions/isTrapped';
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
		if (
			!['burn', 'poison'].includes(opponent?.primaryAilment?.type ?? '') &&
			!isTrapped(opponent)
		) {
			followBattleStepPath(endTurnPath);
			return;
		}
		const t = setTimeout(() => {
			let updatedOpponent = applyPrimaryAilmentDamage(opponent, dispatchToast);

			if (isKO(updatedOpponent)) {
				setOpponent(updatedOpponent);
				startPath(opponentFaintingPath);
				return;
			}

			updatedOpponent = applySecondaryAilmentDamage(opponent, dispatchToast);
			if (isKO(updatedOpponent)) {
				setOpponent(updatedOpponent);
				startPath(opponentFaintingPath);
				return;
			}
			setOpponent(updatedOpponent);
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
