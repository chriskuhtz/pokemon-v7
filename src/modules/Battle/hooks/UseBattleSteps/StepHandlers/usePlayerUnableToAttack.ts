import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { endTurnPath, opponentTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerUnableToAttack = ({
	battleStep,
	battleRound,
	setPlayer,
	player,
	opponent,
	startPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (
			!['PLAYER_MISSED', 'PLAYER_UNABLE_TO_ATTACK'].includes(battleStep) ||
			!player ||
			!opponent
		) {
			return;
		}
		const t = setTimeout(() => {
			setPlayer({
				...player,
				moveQueue: [...player.moveQueue].filter((m) => m.round !== battleRound),
			});
			if (opponent.moveQueue.some((m) => m.round === battleRound)) {
				startPath(opponentTurnPath);
			} else startPath(endTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleRound, battleStep, opponent, player, setPlayer, startPath]);
};
