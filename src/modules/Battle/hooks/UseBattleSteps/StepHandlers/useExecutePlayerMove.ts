import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { applyAttackToPokemon } from '../../../../../functions/applyAttackToPokemon';
import { determineCrit } from '../../../../../functions/determineCrit';
import { isKO } from '../../../../../functions/isKo';
import { reduceMovePP } from '../../../../../functions/reduceMovePP';
import { targetFlinched } from '../../../../../functions/targetFlinched';
import { BattleAttack } from '../../../../../interfaces/BattleAttack';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useExecutePlayerMove = ({
	battleStep,
	player,
	opponent,
	nextPlayerMove,
	setPlayer,
	setNextPlayerMove,
	setBattleStep,
	nextOpponentMove,
	setOpponent,
	battleWeather,
	dispatchToast,
	setCoins,
}: ExtendedBattleStepHandler) => {
	//"EXECUTE_PLAYER_MOVE"
	useEffect(() => {
		if (battleStep !== 'EXECUTE_PLAYER_MOVE') {
			return;
		}

		const t = setTimeout(() => {
			if (!player || !opponent) {
				setBattleStep('ERROR');
				return;
			}
			if (nextPlayerMove?.type === 'CatchProcessInfo') {
				setBattleStep('CATCHING_PROCESS_1');
				return;
			}
			if (nextPlayerMove?.type === 'BattleAttack') {
				if (nextPlayerMove.name === 'pay-day') {
					const scatteredCoins = Math.floor(Math.random() * 100);
					setCoins((coins) => coins + scatteredCoins);
					dispatchToast('coins scattered everywhere');
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
									nextPlayerMove.data.meta.crit_rate,
									opponent.ability
								),
								multiHits: (nextPlayerMove?.multiHits ?? 0) - 1,
						  }
						: undefined;

				if (isKO(updatedTarget)) {
					setBattleStep('OPPONENT_FAINTING');
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
				if (nextOpponentMove) {
					setBattleStep('EXECUTE_OPPONENT_MOVE');
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
		setNextPlayerMove,
		setOpponent,
		setPlayer,
	]);
};
