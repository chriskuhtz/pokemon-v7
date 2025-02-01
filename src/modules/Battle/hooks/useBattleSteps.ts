import { useEffect, useState } from 'react';
import { PokeballType } from '../../../interfaces/Item';
import { BattleStep, animationTimer } from '../Battle';

export const useBattleSteps = (): {
	battleStep: BattleStep;
	startCatchProcess: (ball: PokeballType, opponentDexId: number) => void;
	catchProcessBall: PokeballType | undefined;
} => {
	const [battleStep, setBattleStep] = useState<BattleStep>('OPPONENT_INTRO');
	const [catchProcessBall, setCatchProcessBall] = useState<
		PokeballType | undefined
	>();
	const [, setPokemonToCatch] = useState<number | undefined>();

	useEffect(() => {
		if (battleStep !== 'OPPONENT_INTRO') {
			return;
		}
		const t = setTimeout(() => setBattleStep('PLAYER_INTRO'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);

	useEffect(() => {
		if (battleStep !== 'PLAYER_INTRO') {
			return;
		}
		const t = setTimeout(
			() => setBattleStep('OPPONENT_EMERGE'),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);

	useEffect(() => {
		if (battleStep !== 'OPPONENT_EMERGE') {
			return;
		}
		const t = setTimeout(() => setBattleStep('PLAYER_EMERGE'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	useEffect(() => {
		if (battleStep !== 'PLAYER_EMERGE') {
			return;
		}
		const t = setTimeout(() => setBattleStep('MOVE_SELECTION'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	useEffect(() => {
		if (battleStep !== 'CATCHING_PROCESS_1') {
			return;
		}
		const t = setTimeout(
			() => setBattleStep('CATCHING_PROCESS_2'),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);

	useEffect(() => {
		if (battleStep !== 'CATCHING_PROCESS_2') {
			return;
		}
		const t = setTimeout(
			() => setBattleStep('CATCHING_PROCESS_3'),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);

	useEffect(() => {
		if (battleStep !== 'CATCHING_PROCESS_3') {
			return;
		}
		const t = setTimeout(
			() => setBattleStep('CATCHING_PROCESS_4'),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);

	useEffect(() => {
		if (battleStep !== 'CATCHING_PROCESS_4') {
			return;
		}
		const t = setTimeout(
			() => setBattleStep('CATCHING_SUCCESS'),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);

	const startCatchProcess = (ball: PokeballType, pokemonToCatch: number) => {
		setBattleStep('CATCHING_PROCESS_1');
		setCatchProcessBall(ball);
		setPokemonToCatch(pokemonToCatch);
	};

	return { battleStep, startCatchProcess, catchProcessBall };
};
