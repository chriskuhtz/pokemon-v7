import { useEffect } from 'react';
import { secondTurnMoves } from '../../../../../constants/secondTurnMoves';
import { determineCrit } from '../../../../../functions/determineCrit';
import { determineMultiHits } from '../../../../../functions/determineMultiHits';
import { recommendMove } from '../../../../../functions/recommendMove';
import { BattleAction } from '../../../../../interfaces/BattleActions';
import { beginTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentMoveSelection = ({
	battleStep,

	opponent,
	player,
	battleWeather,
	followBattleStepPath,
	battleRound,
	setOpponent,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep === 'OPPONENT_MOVE_SELECTION' && opponent && player) {
			if (opponent.moveQueue.length > 0) {
				followBattleStepPath(beginTurnPath);
			} else {
				const chosenMove = recommendMove(opponent, player, battleWeather);

				const moveType = secondTurnMoves.includes(chosenMove.name)
					? 'ChargeUp'
					: 'BattleAttack';
				const fullyDeterminedMove: BattleAction = {
					...chosenMove,
					crit: determineCrit(
						chosenMove.name,
						chosenMove.data.meta.crit_rate,
						player.ability
					),
					multiHits: determineMultiHits(chosenMove),
					round: battleRound,
					type: moveType,
				};

				if (moveType === 'BattleAttack') {
					setOpponent({ ...opponent, moveQueue: [fullyDeterminedMove] });
				} else {
					const followUp: BattleAction = {
						...fullyDeterminedMove,
						round: battleRound + 1,
						type: 'BattleAttack',
					} as BattleAction;
					setOpponent({
						...opponent,
						moveQueue: [fullyDeterminedMove, followUp],
					});
				}

				followBattleStepPath(beginTurnPath);
			}
		}
	}, [
		battleRound,
		battleStep,
		battleWeather,
		followBattleStepPath,
		opponent,
		player,
		setOpponent,
	]);
};
