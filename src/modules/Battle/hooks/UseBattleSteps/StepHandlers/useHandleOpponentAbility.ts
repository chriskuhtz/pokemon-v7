import { useEffect } from 'react';
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
		if (battleStep === 'HANDLE_OPPONENT_ABILITY' && opponent) {
			applyEndOfTurnAbility({
				pokemon: opponent,
				setPokemon: setOpponent,
				dispatchToast,
			});
			setBattleStep('OPPONENT_MOVE_SELECTION');
		}
	}, [battleStep, dispatchToast, opponent, setBattleStep, setOpponent]);
};
