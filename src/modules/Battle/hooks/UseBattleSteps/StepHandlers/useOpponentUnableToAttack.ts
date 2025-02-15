import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { endTurnPath, playerTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useOpponentUnableToAttack = ({
	battleStep,
	opponent,
	player,
	battleRound,
	setOpponent,
	startPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (
			!['OPPONENT_MISSED', 'OPPONENT_UNABLE_TO_ATTACK'].includes(battleStep) ||
			!player ||
			!opponent
		) {
			return;
		}
		const t = setTimeout(() => {
			setOpponent({
				...opponent,
				moveQueue: [...opponent.moveQueue].filter(
					(m) => m.round !== battleRound
				),
			});
			if (player.moveQueue.some((m) => m.round === battleRound)) {
				startPath(playerTurnPath);
			} else startPath(endTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleRound, battleStep, opponent, player, setOpponent, startPath]);
};
