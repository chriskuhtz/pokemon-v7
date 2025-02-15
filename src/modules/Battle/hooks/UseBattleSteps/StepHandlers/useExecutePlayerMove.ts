import { useEffect } from 'react';
import {
	BattleStep,
	opponentFaintingPath,
	playerFaintingPath,
} from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';
import { executeMove } from './functions/executeMove';

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
	chargedUpPlayerMove,
	setUsedItems,
	getWhirlwinded,
	chargedUpOpponentMove,
}: ExtendedBattleStepHandler & {
	setBattleStep: (x: BattleStep) => void;
	getWhirlwinded: () => void;
}) => {
	useEffect(() => {
		if (battleStep !== 'EXECUTE_PLAYER_MOVE' || !player) {
			return;
		}
		if (!player || !opponent) {
			throw new Error('no player or opponent');
		}
		executeMove({
			chargedUpMove: chargedUpPlayerMove,
			chargedUpTargetMove: chargedUpOpponentMove,
			followTurnPath: followTurnPath,
			setBattleStepUnableToAttack: () =>
				setBattleStep('PLAYER_UNABLE_TO_ATTACK'),
			attacker: player,
			target: opponent,
			setNextAttackerMove: setNextPlayerMove,
			nextAttackerMove: nextPlayerMove,
			followBattleStepPath,
			dispatchToast,
			setUsedItems,
			setAttacker: setPlayer,
			setTarget: setOpponent,
			getWhirlwinded,
			setCoins,
			startPath,
			battleWeather,
			setBattleStepFlinched: () => setBattleStep('OPPONENT_FLINCHED'),
			setBattleStepMissed: () => setBattleStep('PLAYER_MISSED'),
			repeatBattleStepForMultiHit: () => setBattleStep('EXECUTE_PLAYER_MOVE'),
			attackerFaintingPath: playerFaintingPath,
			targetFaintingPath: opponentFaintingPath,
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
		nextPlayerMove,
		opponent,
		player,
		setBattleStep,
		setCoins,
		setNextPlayerMove,
		setOpponent,
		setPlayer,
		setUsedItems,
		startPath,
	]);
};
