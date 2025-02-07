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
			setBattleStep('MOVE_SELECTION');
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
