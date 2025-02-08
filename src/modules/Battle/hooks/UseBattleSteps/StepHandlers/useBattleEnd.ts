import { useCallback, useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { receiveNewPokemonFunction } from '../../../../../functions/receiveNewPokemonFunction';
import { reduceBattlePokemonToOwnedPokemon } from '../../../../../functions/reduceBattlePokemonToOwnedPokemon';
import {
	Inventory,
	joinInventories,
} from '../../../../../interfaces/Inventory';
import { SaveFile } from '../../../../../interfaces/SaveFile';
import { BattleStep } from '../../../types/BattleStep';
import { CatchProcessInfo } from '../useBattleSteps';

export const useBattleEnd = ({
	initSaveFile,
	caughtPokemon,
	coins,
	usedItems,
	battleStep,
	syncAfterBattleEnd,
	goBack,
}: {
	initSaveFile: SaveFile;
	caughtPokemon: CatchProcessInfo[];
	coins: number;
	usedItems: Inventory;
	battleStep: BattleStep;
	syncAfterBattleEnd: (update: SaveFile) => void;
	goBack: () => void;
}) => {
	// handle 'BATTLE_WON'
	const endBattle = useCallback(() => {
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
			money: initSaveFile.money + coins,
			inventory: joinInventories(initSaveFile.inventory, usedItems, true),
			pokemon: updatedPokemon,
		};
		syncAfterBattleEnd(newSaveFile);
		goBack();
	}, [
		caughtPokemon,
		coins,
		goBack,
		initSaveFile,
		syncAfterBattleEnd,
		usedItems,
	]);
	useEffect(() => {
		if (battleStep !== 'BATTLE_WON') {
			return;
		}
		const t = setTimeout(() => endBattle(), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, endBattle]);
	// handle "BATTLE_LOST"
	useEffect(() => {
		if (battleStep !== 'BATTLE_LOST') {
			return;
		}
		const t = setTimeout(() => endBattle(), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, endBattle]);
};
