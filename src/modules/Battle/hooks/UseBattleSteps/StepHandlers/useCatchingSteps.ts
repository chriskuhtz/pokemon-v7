import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { determineCaptureSuccess } from '../../../../../functions/determineCaptureSuccess';
import { joinInventories } from '../../../../../interfaces/Inventory';
import { catchingFailurePath, catchingPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useCatchingSteps = ({
	battleStep,
	nextPlayerMove,
	opponent,
	setCaughtPokemon,
	setUsedItems,
	setNextPlayerMove,
	followBattleStepPath,
	startPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'CATCHING_PROCESS_1') {
			return;
		}
		const t = setTimeout(() => {
			followBattleStepPath(catchingPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, followBattleStepPath]);

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
				startPath(catchingFailurePath);
			} else followBattleStepPath(catchingPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, followBattleStepPath, nextPlayerMove, opponent, startPath]);

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
				startPath(catchingFailurePath);
			} else followBattleStepPath(catchingPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, followBattleStepPath, nextPlayerMove, opponent, startPath]);

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
				startPath(catchingFailurePath);
			} else {
				setCaughtPokemon((x) => [
					...x,
					{
						pokemon: opponent,
						ball: nextPlayerMove.ball,
						type: 'CatchProcessInfo',
					},
				]);
				followBattleStepPath(catchingPath);
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		followBattleStepPath,
		nextPlayerMove,
		opponent,
		startPath,
		setCaughtPokemon,
	]);

	useEffect(() => {
		if (battleStep !== 'CATCHING_FAILURE') {
			return;
		}
		const t = setTimeout(() => {
			if (nextPlayerMove?.type === 'CatchProcessInfo') {
				setUsedItems((i) => joinInventories(i, { [nextPlayerMove.ball]: 1 }));
			}
			setNextPlayerMove(undefined);
			followBattleStepPath(catchingFailurePath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		nextPlayerMove,
		followBattleStepPath,
		setNextPlayerMove,
		setUsedItems,
	]);

	useEffect(() => {
		if (battleStep !== 'CATCHING_SUCCESS') {
			return;
		}
		const t = setTimeout(() => {
			if (nextPlayerMove?.type === 'CatchProcessInfo') {
				setUsedItems((i) => joinInventories(i, { [nextPlayerMove.ball]: 1 }));
			}
			followBattleStepPath(catchingPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, followBattleStepPath, nextPlayerMove, setUsedItems]);
};
