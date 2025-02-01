import { useEffect, useState } from 'react';
import { v6 } from 'uuid';
import { receiveNewPokemonFunction } from '../../../functions/receiveNewPokemonFunction';
import { useSaveFile } from '../../../hooks/useSaveFile';
import {
	EmptyInventory,
	Inventory,
	joinInventories,
} from '../../../interfaces/Inventory';
import { PokeballType } from '../../../interfaces/Item';
import { SaveFile } from '../../../interfaces/SaveFile';
import { BattleStep, animationTimer } from '../Battle';

export const useBattleSteps = (
	initSaveFile: SaveFile,
	syncAfterBattleEnd: (update: SaveFile) => void,
	goBack: () => void
): {
	battleStep: BattleStep;
	initBattle: () => void;
	startCatchProcess: (ball: PokeballType, opponentDexId: number) => void;
	inCatchProcess: { dexId: number; ball: PokeballType } | undefined;

	saveFile: SaveFile;
} => {
	const { saveFile } = useSaveFile(initSaveFile);
	const [battleStep, setBattleStep] = useState<BattleStep>('UNITIALIZED');
	const [inCatchProcess, setInCatchProcess] = useState<
		{ dexId: number; ball: PokeballType } | undefined
	>();
	const [usedItems, setUsedItems] = useState<Inventory>(EmptyInventory);
	const [caughtPokemon, setCaughtPokemon] = useState<
		{ dexId: number; ball: PokeballType }[]
	>([]);

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
		const t = setTimeout(() => {
			if (inCatchProcess) {
				setUsedItems((i) => joinInventories(i, { [inCatchProcess.ball]: 1 }));
				setCaughtPokemon((x) => [...x, inCatchProcess]);
			}
			setBattleStep('CATCHING_SUCCESS');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, inCatchProcess, setBattleStep]);
	useEffect(() => {
		if (battleStep !== 'CATCHING_SUCCESS') {
			return;
		}
		const t = setTimeout(() => setBattleStep('BATTLE_WON'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	useEffect(() => {
		if (battleStep !== 'BATTLE_WON') {
			return;
		}
		const t = setTimeout(() => {
			let updatedPokemon = [...saveFile.pokemon];

			caughtPokemon.forEach((c) => {
				updatedPokemon = receiveNewPokemonFunction(
					{
						id: v6(),
						dexId: c.dexId,
						ball: c.ball,
						ownerId: saveFile.playerId,
					},
					updatedPokemon
				);
			});
			const newSaveFile: SaveFile = {
				...saveFile,
				inventory: joinInventories(saveFile.inventory, usedItems, true),
				pokemon: updatedPokemon,
			};
			syncAfterBattleEnd(newSaveFile);
			goBack();
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		caughtPokemon,
		goBack,
		saveFile,
		setBattleStep,
		syncAfterBattleEnd,
		usedItems,
	]);

	const initBattle = () => {
		setBattleStep('OPPONENT_INTRO');
	};
	const startCatchProcess = (ball: PokeballType, pokemonToCatch: number) => {
		setBattleStep('CATCHING_PROCESS_1');
		setInCatchProcess({ dexId: pokemonToCatch, ball });
	};

	return {
		saveFile,
		battleStep,
		initBattle,
		startCatchProcess,
		inCatchProcess,
	};
};
