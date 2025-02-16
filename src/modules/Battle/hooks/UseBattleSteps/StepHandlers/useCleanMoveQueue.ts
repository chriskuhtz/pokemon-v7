import { useEffect } from 'react';
import { thrashingMoves } from '../../../../../constants/lockInMoves';
import { applySecondaryAilmentToPokemon } from '../../../../../functions/applySecondaryAilmentToPokemon';
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
	dispatchToast,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (!player || !opponent || battleStep !== 'CLEAN_MOVE_QUEUE') {
			return;
		}

		const filteredPlayerQueue = player.moveQueue.filter(
			(m) => m.round >= battleRound
		);
		if (
			player.moveQueue.some(
				(m) => m.type === 'BattleAttack' && thrashingMoves.includes(m.data.name)
			) &&
			!filteredPlayerQueue.some(
				(m) => m.type === 'BattleAttack' && thrashingMoves.includes(m.data.name)
			)
		) {
			setPlayer(
				applySecondaryAilmentToPokemon(
					{
						...player,
						moveQueue: filteredPlayerQueue,
					},
					'confusion',
					dispatchToast
				)
			);
		} else {
			setPlayer({
				...player,
				moveQueue: filteredPlayerQueue,
			});
		}

		const filteredOpponentQueue = opponent.moveQueue.filter(
			(m) => m.round >= battleRound
		);
		if (
			opponent.moveQueue.some(
				(m) => m.type === 'BattleAttack' && thrashingMoves.includes(m.data.name)
			) &&
			!filteredOpponentQueue.some(
				(m) => m.type === 'BattleAttack' && thrashingMoves.includes(m.data.name)
			)
		) {
			setOpponent(
				applySecondaryAilmentToPokemon(
					{
						...opponent,
						moveQueue: filteredOpponentQueue,
					},
					'confusion',
					dispatchToast
				)
			);
		} else {
			setPlayer({
				...opponent,
				moveQueue: filteredOpponentQueue,
			});
		}
		followBattleStepPath(endTurnPath);
	}, [
		battleRound,
		battleStep,
		dispatchToast,
		followBattleStepPath,
		opponent,
		player,
		setOpponent,
		setPlayer,
	]);
};
