import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { SELF_DESTRUCTING_MOVES } from '../../../../../constants/selfDestructingMoves';
import { applyAttackToPokemon } from '../../../../../functions/applyAttackToPokemon';
import { determineCrit } from '../../../../../functions/determineCrit';
import { isKO } from '../../../../../functions/isKo';
import { reduceMovePP } from '../../../../../functions/reduceMovePP';
import { targetFlinched } from '../../../../../functions/targetFlinched';
import { BattleAttack } from '../../../../../interfaces/BattleAttack';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useExecuteOpponentMove = ({
	battleStep,
	player,
	opponent,
	nextPlayerMove,
	setPlayer,
	setNextPlayerMove,
	setBattleStep,
	setOpponent,
	battleWeather,
	nextOpponentMove,
	setNextOpponentMove,
	dispatchToast,
	setCoins,
}: ExtendedBattleStepHandler) => {
	//"EXECUTE_OPPONENT_MOVE"
	useEffect(() => {
		if (battleStep !== 'EXECUTE_OPPONENT_MOVE' || !opponent) {
			return;
		}
		if (
			['freeze', 'paralysis', 'sleep'].includes(
				opponent.primaryAilment?.type ?? ''
			)
		) {
			setBattleStep('OPPONENT_UNABLE_TO_ATTACK');
			setNextOpponentMove(undefined);
			return;
		}

		const t = setTimeout(() => {
			if (!player || !opponent) {
				setBattleStep('ERROR');
				return;
			}

			if (nextOpponentMove?.type === 'BattleAttack') {
				if (nextOpponentMove.name === 'pay-day') {
					const scatteredCoins = Math.floor(Math.random() * 100);
					setCoins((coins) => coins + scatteredCoins);
					dispatchToast('coins scattered everywhere');
				}
				if (
					(SELF_DESTRUCTING_MOVES.includes(nextOpponentMove.name) &&
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
					if (nextPlayerMove) {
						setBattleStep('EXECUTE_PLAYER_MOVE');
					} else setBattleStep('HANDLE_PLAYER_ABILITY');
					return;
				}
				if (nextOpponentMove.miss) {
					setOpponent(reduceMovePP(opponent, nextOpponentMove.name));
					setNextPlayerMove(undefined);
					setBattleStep('OPPONENT_MISSED');
					return;
				}
				const { updatedTarget } = applyAttackToPokemon({
					attack: nextOpponentMove,
					target: player,
					attacker: opponent,
					setAttacker: setOpponent,
					setTarget: setPlayer,
					weather: battleWeather,
					dispatchToast,
				});
				const updatedMove: BattleAttack | undefined =
					(nextOpponentMove?.multiHits ?? 0) > 1
						? {
								...nextOpponentMove,
								crit: determineCrit(
									nextOpponentMove.data.meta.crit_rate,
									player.ability
								),
								multiHits: (nextOpponentMove.multiHits ?? 0) - 1,
						  }
						: undefined;

				if (isKO(updatedTarget)) {
					setBattleStep('PLAYER_FAINTING');
					setNextOpponentMove(undefined);
					return;
				}
				if (updatedMove) {
					setNextOpponentMove(updatedMove);
					setBattleStep('EXECUTE_OPPONENT_MOVE');
					return;
				}
				if (targetFlinched(opponent, player, nextOpponentMove)) {
					setNextOpponentMove(undefined);
					setBattleStep('PLAYER_FLINCHED');
					return;
				}
				setNextOpponentMove(undefined);

				if (nextPlayerMove) {
					setBattleStep('EXECUTE_PLAYER_MOVE');
				} else setBattleStep('HANDLE_PLAYER_ABILITY');
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		battleWeather,
		dispatchToast,
		nextOpponentMove,
		nextPlayerMove,
		opponent,
		player,
		setBattleStep,
		setCoins,
		setNextOpponentMove,
		setNextPlayerMove,
		setOpponent,
		setPlayer,
	]);
};
