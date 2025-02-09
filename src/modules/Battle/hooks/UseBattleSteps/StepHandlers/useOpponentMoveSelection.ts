import { useEffect } from 'react';
import { determineCrit } from '../../../../../functions/determineCrit';
import { determineMiss } from '../../../../../functions/determineMiss';
import { determineMultiHits } from '../../../../../functions/determineMultiHits';
import { recommendMove } from '../../../../../functions/recommendMove';
import { beginTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentMoveSelection = ({
	battleStep,
	nextOpponentMove,
	opponent,
	player,
	setNextOpponentMove,
	battleWeather,
	followBattleStepPath,
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
				crit: determineCrit(
					chosenMove.name,
					chosenMove.data.meta.crit_rate,
					player.ability
				),
				multiHits: determineMultiHits(chosenMove),
				miss: determineMiss(chosenMove, opponent, player, battleWeather),
			});
			followBattleStepPath(beginTurnPath);
		}
	}, [
		battleStep,
		battleWeather,
		followBattleStepPath,
		nextOpponentMove,
		opponent,
		player,
		setNextOpponentMove,
	]);
};
