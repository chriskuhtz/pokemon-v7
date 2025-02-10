import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { secondTurnMoves } from '../../../../../constants/secondTurnMoves';
import { playerTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerChargeUp = ({
	battleStep,
	player,
	followBattleStepPath,
	chargedUpPlayerMove,
	nextPlayerMove,
	setChargedUpPlayerMove,
	setNextPlayerMove,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'PLAYER_CHARGE_UP' || !player) {
			return;
		}

		if (chargedUpPlayerMove || nextPlayerMove?.type !== 'ChargeUp') {
			followBattleStepPath(playerTurnPath);
			return;
		}
		if (!secondTurnMoves.includes(nextPlayerMove.name)) {
			throw new Error(
				`this is not a charge up move, big dog, ${nextPlayerMove.name}`
			);
		}

		const t = setTimeout(() => {
			setNextPlayerMove(undefined);
			setChargedUpPlayerMove({ ...nextPlayerMove, type: 'BattleAttack' });
			followBattleStepPath(playerTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		chargedUpPlayerMove,
		followBattleStepPath,
		nextPlayerMove,
		player,
		setChargedUpPlayerMove,
		setNextPlayerMove,
	]);
};
