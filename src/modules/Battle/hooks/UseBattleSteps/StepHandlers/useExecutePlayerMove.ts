import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { SELF_DESTRUCTING_MOVES } from '../../../../../constants/selfDestructingMoves';
import { applyAttackToPokemon } from '../../../../../functions/applyAttackToPokemon';
import { determineCrit } from '../../../../../functions/determineCrit';
import { isKO } from '../../../../../functions/isKo';
import { pokemonCantMove } from '../../../../../functions/pokemonCantMove';
import { reduceMovePP } from '../../../../../functions/reduceMovePP';
import { targetFlinched } from '../../../../../functions/targetFlinched';
import { BattleAttack } from '../../../../../interfaces/BattleAttack';
import {
	BattleStep,
	catchingPath,
	opponentFaintingPath,
} from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useExecutePlayerMove = ({
	battleStep,
	player,
	opponent,
	nextPlayerMove,
	setPlayer,
	setNextPlayerMove,
	setBattleStep,
	setOpponent,
	battleWeather,
	dispatchToast,
	setCoins,
	followBattleStepPath,
	startPath,
	followTurnPath,
}: ExtendedBattleStepHandler & {
	setBattleStep: (x: BattleStep) => void;
}) => {
	useEffect(() => {
		if (battleStep !== 'EXECUTE_PLAYER_MOVE' || !player) {
			return;
		}
		if (pokemonCantMove(player)) {
			setBattleStep('PLAYER_UNABLE_TO_ATTACK');
			setNextPlayerMove(undefined);
			return;
		}

		const t = setTimeout(() => {
			if (!player || !opponent) {
				throw new Error('no player or opponent');
				return;
			}
			if (nextPlayerMove?.type === 'CatchProcessInfo') {
				followBattleStepPath(catchingPath);
				return;
			}
			if (nextPlayerMove?.type === 'BattleAttack') {
				if (nextPlayerMove.name === 'pay-day') {
					const scatteredCoins = Math.floor(Math.random() * 100);
					setCoins((coins) => coins + scatteredCoins);
					dispatchToast('coins scattered everywhere');
				}
				if (
					(SELF_DESTRUCTING_MOVES.includes(nextPlayerMove.name) &&
						opponent.ability === 'damp') ||
					player.ability === 'damp'
				) {
					dispatchToast(
						`${
							opponent.ability === 'damp'
								? opponent.data.name
								: player.data.name
						} prevents self destruct moves with damp`
					);
					setNextPlayerMove(undefined);

					followTurnPath();
					return;
				}
				if (nextPlayerMove.miss) {
					setPlayer(reduceMovePP(player, nextPlayerMove.name));
					setNextPlayerMove(undefined);
					setBattleStep('PLAYER_MISSED');
					return;
				}
				const { updatedTarget } = applyAttackToPokemon({
					attack: nextPlayerMove,
					attacker: player,
					target: opponent,
					setAttacker: setPlayer,
					setTarget: setOpponent,
					weather: battleWeather,
					dispatchToast,
				});

				const updatedMove: BattleAttack | undefined =
					(nextPlayerMove?.multiHits ?? 0) > 1
						? {
								...nextPlayerMove,
								crit: determineCrit(
									nextPlayerMove.name,
									nextPlayerMove.data.meta.crit_rate,
									opponent.ability
								),
								multiHits: (nextPlayerMove?.multiHits ?? 0) - 1,
						  }
						: undefined;

				if (isKO(updatedTarget)) {
					startPath(opponentFaintingPath);
					setNextPlayerMove(undefined);
					return;
				}
				if (updatedMove) {
					setNextPlayerMove(updatedMove);
					setBattleStep('EXECUTE_PLAYER_MOVE');
					return;
				}
				if (targetFlinched(player, opponent, nextPlayerMove)) {
					setNextPlayerMove(undefined);
					setBattleStep('OPPONENT_FLINCHED');
					return;
				}
				setNextPlayerMove(undefined);
				followTurnPath();
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		battleWeather,
		dispatchToast,
		followBattleStepPath,
		followTurnPath,
		nextPlayerMove,
		opponent,
		player,
		setBattleStep,
		setCoins,
		setNextPlayerMove,
		setOpponent,
		setPlayer,
		startPath,
	]);
};
