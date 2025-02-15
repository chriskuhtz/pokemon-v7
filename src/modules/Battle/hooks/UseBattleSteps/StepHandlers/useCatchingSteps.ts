import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { determineCaptureSuccess } from '../../../../../functions/determineCaptureSuccess';
import { joinInventories } from '../../../../../interfaces/Inventory';
import { catchingFailurePath, catchingPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useCatchingSteps = ({
	battleStep,
	player,
	opponent,
	setCaughtPokemon,
	setUsedItems,
	followBattleStepPath,
	startPath,
	opponentHasBeenCaughtBefore,
	battleRound,
	setPlayer,
}: ExtendedBattleStepHandler & { opponentHasBeenCaughtBefore: boolean }) => {
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
			player?.moveQueue[0]?.type !== 'CatchProcessInfo' ||
			!opponent
		) {
			return;
		}
		const { ball } = player.moveQueue[0];
		const t = setTimeout(() => {
			const catchSuccess = determineCaptureSuccess(
				ball,
				opponent,
				battleRound,
				'STANDARD',
				opponentHasBeenCaughtBefore
			);
			if (!catchSuccess) {
				startPath(catchingFailurePath);
			} else followBattleStepPath(catchingPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		followBattleStepPath,
		opponent,
		opponentHasBeenCaughtBefore,
		startPath,
		battleRound,
		player,
	]);

	useEffect(() => {
		if (
			battleStep !== 'CATCHING_PROCESS_3' ||
			player?.moveQueue[0]?.type !== 'CatchProcessInfo' ||
			!opponent
		) {
			return;
		}
		const { ball } = player.moveQueue[0];
		const t = setTimeout(() => {
			const catchSuccess = determineCaptureSuccess(
				ball,
				opponent,
				battleRound,
				'STANDARD',
				opponentHasBeenCaughtBefore
			);
			if (!catchSuccess) {
				startPath(catchingFailurePath);
			} else followBattleStepPath(catchingPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		followBattleStepPath,
		opponent,
		opponentHasBeenCaughtBefore,
		startPath,
		battleRound,
		player,
	]);

	useEffect(() => {
		if (
			battleStep !== 'CATCHING_PROCESS_4' ||
			player?.moveQueue[0]?.type !== 'CatchProcessInfo' ||
			!opponent
		) {
			return;
		}
		const { ball } = player.moveQueue[0];
		const t = setTimeout(() => {
			const catchSuccess = determineCaptureSuccess(
				ball,
				opponent,
				battleRound,
				'STANDARD',
				opponentHasBeenCaughtBefore
			);

			if (!catchSuccess) {
				startPath(catchingFailurePath);
			} else {
				setCaughtPokemon((x) => [
					...x,
					{
						pokemon: opponent,
						ball: ball,
						type: 'CatchProcessInfo',
						round: battleRound,
					},
				]);
				followBattleStepPath(catchingPath);
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		followBattleStepPath,
		opponent,
		startPath,
		setCaughtPokemon,
		opponentHasBeenCaughtBefore,
		battleRound,
		player,
	]);

	useEffect(() => {
		if (battleStep !== 'CATCHING_FAILURE' || !player) {
			return;
		}
		const t = setTimeout(() => {
			if (player?.moveQueue[0]?.type === 'CatchProcessInfo') {
				const { ball } = player.moveQueue[0];
				setUsedItems((i) => joinInventories(i, { [ball]: 1 }));
			}
			setPlayer({
				...player,
				moveQueue: [...player.moveQueue].filter((m) => m.round !== battleRound),
			});
			followBattleStepPath(catchingFailurePath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		followBattleStepPath,
		setUsedItems,
		player,
		setPlayer,
		battleRound,
	]);

	useEffect(() => {
		if (battleStep !== 'CATCHING_SUCCESS') {
			return;
		}
		const t = setTimeout(() => {
			if (player?.moveQueue[0]?.type === 'CatchProcessInfo') {
				const { ball } = player.moveQueue[0];
				setUsedItems((i) => joinInventories(i, { [ball]: 1 }));
			}
			followBattleStepPath(catchingPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, followBattleStepPath, player, setUsedItems]);
};
