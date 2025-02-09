import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { determineCaptureSuccess } from '../../../../../functions/determineCaptureSuccess';
import { joinInventories } from '../../../../../interfaces/Inventory';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useCatchingSteps = ({
	battleStep,
	setBattleStep,
	nextPlayerMove,
	opponent,
	setCaughtPokemon,
	setUsedItems,
	setNextPlayerMove,
}: ExtendedBattleStepHandler) => {
	//'CATCHING_PROCESS_1' to 'CATCHING_PROCESS_2'
	useEffect(() => {
		if (battleStep !== 'CATCHING_PROCESS_1') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('CATCHING_PROCESS_2');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	//'CATCHING_PROCESS_2' to 'CATCHING_PROCESS_3'
	useEffect(() => {
		if (
			battleStep !== 'CATCHING_PROCESS_2' ||
			nextPlayerMove?.type !== 'CatchProcessInfo' ||
			!opponent
		) {
			return;
		}
		const t = setTimeout(() => {
			const catchSuccess = determineCaptureSuccess(
				nextPlayerMove.ball,
				opponent,
				1,

				'STANDARD',
				false
			);
			if (!catchSuccess) {
				setBattleStep('CATCHING_FAILURE');
			} else setBattleStep('CATCHING_PROCESS_3');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextPlayerMove, opponent, setBattleStep]);
	//'CATCHING_PROCESS_3' to 'CATCHING_PROCESS_4'
	useEffect(() => {
		if (
			battleStep !== 'CATCHING_PROCESS_3' ||
			nextPlayerMove?.type !== 'CatchProcessInfo' ||
			!opponent
		) {
			return;
		}
		const t = setTimeout(() => {
			const catchSuccess = determineCaptureSuccess(
				nextPlayerMove.ball,
				opponent,
				1,
				'STANDARD',
				false
			);
			if (!catchSuccess) {
				setBattleStep('CATCHING_FAILURE');
			} else setBattleStep('CATCHING_PROCESS_4');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextPlayerMove, opponent, setBattleStep]);
	//'CATCHING_PROCESS_4' to 'CATCHING_SUCCESS' or 'CATCHING_FAILURE'
	useEffect(() => {
		if (
			battleStep !== 'CATCHING_PROCESS_4' ||
			nextPlayerMove?.type !== 'CatchProcessInfo' ||
			!opponent
		) {
			return;
		}
		const t = setTimeout(() => {
			const catchSuccess = determineCaptureSuccess(
				nextPlayerMove.ball,
				opponent,
				1,
				'STANDARD',
				false
			);

			if (!catchSuccess) {
				setBattleStep('CATCHING_FAILURE');
			} else {
				setCaughtPokemon((x) => [
					...x,
					{
						pokemon: opponent,
						ball: nextPlayerMove.ball,
						type: 'CatchProcessInfo',
					},
				]);
				setBattleStep('CATCHING_SUCCESS');
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextPlayerMove, opponent, setBattleStep, setCaughtPokemon]);
	useEffect(() => {
		if (battleStep !== 'CATCHING_FAILURE') {
			return;
		}
		const t = setTimeout(() => {
			if (nextPlayerMove?.type === 'CatchProcessInfo') {
				setUsedItems((i) => joinInventories(i, { [nextPlayerMove.ball]: 1 }));
			}
			setNextPlayerMove(undefined);
			setBattleStep('OPPONENT_CURE_AILMENTS');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		nextPlayerMove,
		setBattleStep,
		setNextPlayerMove,
		setUsedItems,
	]);
	// 'CATCHING_SUCCESS' to 'BATTLE_WON'
	useEffect(() => {
		if (battleStep !== 'CATCHING_SUCCESS') {
			return;
		}
		const t = setTimeout(() => {
			if (nextPlayerMove?.type === 'CatchProcessInfo') {
				setUsedItems((i) => joinInventories(i, { [nextPlayerMove.ball]: 1 }));
			}
			setBattleStep('BATTLE_WON');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextPlayerMove, setBattleStep, setUsedItems]);
};
