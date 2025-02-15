import { useEffect } from 'react';
import {
	BattleStep,
	opponentFaintingPath,
	playerFaintingPath,
} from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';
import { executeMove } from './functions/executeMove';

export const useExecuteOpponentMove = ({
	battleStep,
	player,
	opponent,
	setPlayer,
	setNextPlayerMove,
	setBattleStep,
	setOpponent,
	battleWeather,
	nextOpponentMove,
	setNextOpponentMove,
	dispatchToast,
	setCoins,
	followTurnPath,
	startPath,
	chargedUpOpponentMove,
	getWhirlwinded,
	chargedUpPlayerMove,
	setUsedItems,
	nextPlayerMove,
	followBattleStepPath,
}: ExtendedBattleStepHandler & {
	setBattleStep: (x: BattleStep) => void;
	getWhirlwinded: () => void;
}) => {
	useEffect(() => {
		if (battleStep !== 'EXECUTE_OPPONENT_MOVE' || !opponent) {
			return;
		}
		if (!player || !opponent) {
			throw new Error('no player or opponent');
		}
		executeMove({
			chargedUpTargetMove: chargedUpPlayerMove,
			chargedUpMove: chargedUpOpponentMove,
			followTurnPath: followTurnPath,
			setBattleStepUnableToAttack: () =>
				setBattleStep('OPPONENT_UNABLE_TO_ATTACK'),
			attacker: opponent,
			target: player,
			setNextAttackerMove: setNextOpponentMove,
			nextAttackerMove: nextOpponentMove,
			followBattleStepPath,
			dispatchToast,
			setUsedItems,
			setAttacker: setOpponent,
			setTarget: setPlayer,
			getWhirlwinded,
			setCoins,
			startPath,
			battleWeather,
			setBattleStepFlinched: () => setBattleStep('PLAYER_FLINCHED'),
			setBattleStepMissed: () => setBattleStep('OPPONENT_MISSED'),
			repeatBattleStepForMultiHit: () => setBattleStep('EXECUTE_OPPONENT_MOVE'),
			attackerFaintingPath: opponentFaintingPath,
			targetFaintingPath: playerFaintingPath,
		});
	}, [
		battleStep,
		battleWeather,
		chargedUpOpponentMove,
		chargedUpPlayerMove,
		dispatchToast,
		followBattleStepPath,
		followTurnPath,
		getWhirlwinded,
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
		setUsedItems,
		startPath,
	]);
};
