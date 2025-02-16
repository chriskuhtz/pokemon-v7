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
	setBattleStep,
	setOpponent,
	battleWeather,
	dispatchToast,
	setCoins,
	followTurnPath,
	startPath,
	getWhirlwinded,
	setUsedItems,
	followBattleStepPath,
	battleRound,
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
			followTurnPath: followTurnPath,
			setBattleStepUnableToAttack: () =>
				setBattleStep('OPPONENT_UNABLE_TO_ATTACK'),
			attacker: opponent,
			target: player,
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
			battleRound,
		});
	}, [
		battleRound,
		battleStep,
		battleWeather,
		dispatchToast,
		followBattleStepPath,
		followTurnPath,
		getWhirlwinded,
		opponent,
		player,
		setBattleStep,
		setCoins,
		setOpponent,
		setPlayer,
		setUsedItems,
		startPath,
	]);
};
