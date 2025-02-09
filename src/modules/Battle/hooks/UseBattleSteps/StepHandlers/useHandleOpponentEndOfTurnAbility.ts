import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyEndOfTurnAbility } from '../../../../../functions/applyEndOfTurnAbility';
import { endTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useHandleOpponentEndOfTurnAbility = ({
	battleStep,
	opponent,
	setOpponent,
	dispatchToast,
	followBattleStepPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'HANDLE_OPPONENT_END_OF_TURN_ABILITY' || !opponent) {
			return;
		}
		const t = setTimeout(() => {
			applyEndOfTurnAbility({
				pokemon: opponent,
				setPokemon: setOpponent,
				dispatchToast,
			});
			followBattleStepPath(endTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, followBattleStepPath, opponent, setOpponent]);
};
