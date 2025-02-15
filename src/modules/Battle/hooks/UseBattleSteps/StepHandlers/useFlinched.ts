import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { endTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useFlinched = ({
	battleStep,
	startPath,
	battleRound,
	player,
	opponent,
	setPlayer,
	setOpponent,
}: ExtendedBattleStepHandler) => {
	//"PLAYER_FLINCHED"
	useEffect(() => {
		if (
			!['PLAYER_FLINCHED', 'OPPONENT_FLINCHED'].includes(battleStep) ||
			!player ||
			!opponent
		) {
			return;
		}
		const t = setTimeout(() => {
			startPath(endTurnPath);
			setPlayer({
				...player,
				moveQueue: [...player.moveQueue].filter((m) => m.round !== battleRound),
			});
			setOpponent({
				...opponent,
				moveQueue: [...opponent.moveQueue].filter(
					(m) => m.round !== battleRound
				),
			});
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleRound,
		battleStep,
		opponent,
		player,
		setOpponent,
		setPlayer,
		startPath,
	]);
};
