import { useEffect } from 'react';
import { determineCrit } from '../../../../../functions/determineCrit';
import { determineMiss } from '../../../../../functions/determineMiss';
import { determineMultiHits } from '../../../../../functions/determineMultiHits';
import { recommendMove } from '../../../../../functions/recommendMove';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentMoveSelection = ({
	battleStep,
	nextOpponentMove,
	opponent,
	player,
	setBattleStep,
	setNextOpponentMove,
	battleWeather,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (
			battleStep === 'OPPONENT_MOVE_SELECTION' &&
			!nextOpponentMove &&
			opponent &&
			player
		) {
			const chosenMove = recommendMove(opponent, player, battleWeather);
			setNextOpponentMove({
				...chosenMove,
				crit: determineCrit(chosenMove.data.meta.crit_rate, player.ability),
				multiHits: determineMultiHits(chosenMove),
				miss: determineMiss(chosenMove, player.ability, battleWeather),
			});
			setBattleStep('MOVE_HANDLING');
		}
	}, [
		battleStep,
		battleWeather,
		nextOpponentMove,
		opponent,
		player,
		setBattleStep,
		setNextOpponentMove,
	]);
};
