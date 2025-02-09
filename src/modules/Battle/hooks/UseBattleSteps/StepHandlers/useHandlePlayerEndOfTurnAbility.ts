import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyEndOfTurnAbility } from '../../../../../functions/applyEndOfTurnAbility';
import { endTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useHandlePlayerEndOfTurnAbility = ({
	battleStep,
	dispatchToast,
	player,
	setPlayer,
	followBattleStepPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'HANDLE_PLAYER_END_OF_TURN_ABILITY' || !player) {
			return;
		}
		const t = setTimeout(() => {
			applyEndOfTurnAbility({
				pokemon: player,
				setPokemon: setPlayer,
				dispatchToast,
			});
			followBattleStepPath(endTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, followBattleStepPath, player, setPlayer]);
};
