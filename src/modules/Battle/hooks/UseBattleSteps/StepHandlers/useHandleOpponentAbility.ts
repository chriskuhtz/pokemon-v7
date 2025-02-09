import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyEndOfTurnAbility } from '../../../../../functions/applyEndOfTurnAbility';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useHandleOpponentAbility = ({
	battleStep,
	setBattleStep,
	opponent,
	setOpponent,
	dispatchToast,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'HANDLE_OPPONENT_ABILITY' || !opponent) {
			return;
		}
		const t = setTimeout(() => {
			applyEndOfTurnAbility({
				pokemon: opponent,
				setPokemon: setOpponent,
				dispatchToast,
			});
			setBattleStep('HANDLE_PLAYER_END_OF_TURN_DAMAGE');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, opponent, setBattleStep, setOpponent]);
};
