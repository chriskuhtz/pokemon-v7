import { useEffect } from 'react';
import { endTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useCleanMoveQueue = ({
	battleStep,
	followBattleStepPath,
	player,
	opponent,
	setPlayer,
	setOpponent,
	battleRound,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (!player || !opponent || battleStep !== 'CLEAN_MOVE_QUEUE') {
			return;
		}
		setPlayer({
			...player,
			moveQueue: player.moveQueue.filter((m) => m.round >= battleRound),
		});
		setOpponent({
			...opponent,
			moveQueue: opponent.moveQueue.filter((m) => m.round >= battleRound),
		});
		followBattleStepPath(endTurnPath);
	}, [
		battleRound,
		battleStep,
		followBattleStepPath,
		opponent,
		player,
		setOpponent,
		setPlayer,
	]);
};
