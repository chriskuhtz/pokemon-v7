import { useEffect } from 'react';
import { secondTurnMoves } from '../../../../../constants/secondTurnMoves';
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
	chargedUpOpponentMove,
	setChargedUpOpponentMove,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (
			battleStep === 'OPPONENT_MOVE_SELECTION' &&
			!nextOpponentMove &&
			opponent &&
			player
		) {
			if (chargedUpOpponentMove) {
				setNextOpponentMove(chargedUpOpponentMove);
				setChargedUpOpponentMove(undefined);
				followBattleStepPath(beginTurnPath);
				return;
			}
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
				type: secondTurnMoves.includes(chosenMove.name)
					? 'ChargeUp'
					: 'BattleAttack',
			});
			followBattleStepPath(beginTurnPath);
		}
	}, [
		battleStep,
		battleWeather,
		chargedUpOpponentMove,
		followBattleStepPath,
		nextOpponentMove,
		opponent,
		player,
		setChargedUpOpponentMove,
		setNextOpponentMove,
	]);
};
