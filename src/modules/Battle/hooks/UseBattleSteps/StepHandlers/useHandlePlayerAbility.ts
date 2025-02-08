import { useEffect } from 'react';
import { applyEndOfTurnAbility } from '../../../../../functions/applyEndOfTurnAbility';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useHandlePlayerAbility = ({
	battleStep,
	setBattleStep,
	opponent,
	setOpponent,
	dispatchToast,
	player,
	setPlayer,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep === 'HANDLE_PLAYER_ABILITY' && player) {
			applyEndOfTurnAbility({
				pokemon: player,
				setPokemon: setPlayer,
				dispatchToast,
			});
			setBattleStep('HANDLE_OPPONENT_ABILITY');
		}
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
