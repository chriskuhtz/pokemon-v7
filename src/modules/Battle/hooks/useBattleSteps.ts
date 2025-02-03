import { useEffect, useState } from 'react';
import { animationTimer } from '../../../constants/gameData';
import { receiveNewPokemonFunction } from '../../../functions/receiveNewPokemonFunction';
import { reduceBattlePokemonToOwnedPokemon } from '../../../functions/reduceBattlePokemonToOwnedPokemon';
import {
	EmptyInventory,
	Inventory,
	joinInventories,
} from '../../../interfaces/Inventory';
import { PokeballType } from '../../../interfaces/Item';
import { SaveFile } from '../../../interfaces/SaveFile';
import { BattleStep } from '../Battle';
import { BattlePokemon } from './useBattlePokemon';

export interface CatchProcessInfo {
	pokemon: BattlePokemon;
	ball: PokeballType;
}
export const useBattleSteps = (
	initSaveFile: SaveFile,
	syncAfterBattleEnd: (update: SaveFile) => void,
	goBack: () => void
): {
	battleStep: BattleStep;
	initBattle: () => void;
	startCatchProcess: (x: CatchProcessInfo) => void;
	inCatchProcess: CatchProcessInfo | undefined;
	saveFile: SaveFile;
} => {
	const [battleStep, setBattleStep] = useState<BattleStep>('UNITIALIZED');
	const [inCatchProcess, setInCatchProcess] = useState<
		CatchProcessInfo | undefined
	>();
	const [usedItems, setUsedItems] = useState<Inventory>(EmptyInventory);
	const [caughtPokemon, setCaughtPokemon] = useState<CatchProcessInfo[]>([]);

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
			let updatedPokemon = [...initSaveFile.pokemon];

			caughtPokemon.forEach(({ pokemon, ball }) => {
				updatedPokemon = receiveNewPokemonFunction(
					reduceBattlePokemonToOwnedPokemon({
						...pokemon,
						ownerId: initSaveFile.playerId,
						ball,
					}),
					updatedPokemon
				);
			});
			const newSaveFile: SaveFile = {
				...initSaveFile,
				inventory: joinInventories(initSaveFile.inventory, usedItems, true),
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
		initSaveFile,
		setBattleStep,
		syncAfterBattleEnd,
		usedItems,
	]);

	const initBattle = () => {
		setBattleStep('OPPONENT_INTRO');
	};
	const startCatchProcess = ({ ball, pokemon }: CatchProcessInfo) => {
		setBattleStep('CATCHING_PROCESS_1');
		setInCatchProcess({ pokemon, ball });
	};

	return {
		saveFile: initSaveFile,
		battleStep,
		initBattle,
		startCatchProcess,
		inCatchProcess,
	};
};
