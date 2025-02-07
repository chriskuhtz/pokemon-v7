import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
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
}: ExtendedBattleStepHandler) => {
	//"EXECUTE_OPPONENT_MOVE"
	useEffect(() => {
		if (battleStep !== 'EXECUTE_OPPONENT_MOVE') {
			return;
		}

		const t = setTimeout(() => {
			if (!player || !opponent) {
				setBattleStep('ERROR');
				return;
			}

			if (nextOpponentMove?.type === 'BattleAttack') {
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
				});
				const updatedMove: BattleAttack | undefined =
					(nextOpponentMove?.multiHits ?? 0) > 1
						? {
								...nextOpponentMove,
								crit: determineCrit(nextOpponentMove.data.meta.crit_rate),
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
					console.log('multi hit');
					setBattleStep('EXECUTE_OPPONENT_MOVE');
					return;
				}
				if (targetFlinched(opponent, player, nextOpponentMove)) {
					setNextOpponentMove(undefined);
					setBattleStep('PLAYER_FLINCHED');
					return;
				}
				setNextOpponentMove(undefined);
				setBattleStep('HANDLE_PLAYER_ABILITY');
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		battleWeather,
		nextOpponentMove,
		nextPlayerMove,
		opponent,
		player,
		setBattleStep,
		setNextOpponentMove,
		setNextPlayerMove,
		setOpponent,
		setPlayer,
	]);
};
