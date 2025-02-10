import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { secondTurnMoves } from '../../../../../constants/secondTurnMoves';
import { opponentTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentChargeUp = ({
	battleStep,
	player,
	followBattleStepPath,
	opponent,
	chargedUpOpponentMove,
	nextOpponentMove,
	setNextOpponentMove,
	setChargedUpOpponentMove,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'OPPONENT_CHARGE_UP' || !opponent) {
			return;
		}

		if (chargedUpOpponentMove || nextOpponentMove?.type !== 'ChargeUp') {
			followBattleStepPath(opponentTurnPath);
			return;
		}
		if (!secondTurnMoves.includes(nextOpponentMove.name)) {
			throw new Error(
				`this is not a charge up move, big dog, ${nextOpponentMove.name}`
			);
		}

		const t = setTimeout(() => {
			setNextOpponentMove(undefined);
			setChargedUpOpponentMove({ ...nextOpponentMove, type: 'BattleAttack' });
			followBattleStepPath(opponentTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		chargedUpOpponentMove,
		followBattleStepPath,
		nextOpponentMove,
		opponent,
		player,
		setChargedUpOpponentMove,
		setNextOpponentMove,
	]);
};
