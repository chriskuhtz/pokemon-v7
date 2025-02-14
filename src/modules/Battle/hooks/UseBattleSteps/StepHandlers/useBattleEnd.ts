import { useCallback, useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { occupantsRecord } from '../../../../../constants/occupantsRecord';
import { receiveNewPokemonFunction } from '../../../../../functions/receiveNewPokemonFunction';
import { reduceBattlePokemonToOwnedPokemon } from '../../../../../functions/reduceBattlePokemonToOwnedPokemon';
import { CatchProcessInfo } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import {
	Inventory,
	joinInventories,
} from '../../../../../interfaces/Inventory';
import {
	CharacterLocationData,
	SaveFile,
} from '../../../../../interfaces/SaveFile';
import { BattleStep } from '../../../types/BattleStep';

export const useBattleEnd = ({
	initSaveFile,
	caughtPokemon,
	coins,
	usedItems,
	battleStep,
	goBack,
	player,
}: {
	initSaveFile: SaveFile;
	caughtPokemon: CatchProcessInfo[];
	coins: number;
	usedItems: Inventory;
	battleStep: BattleStep;
	goBack: (update: SaveFile) => void;
	player: BattlePokemon | undefined;
}) => {
	// handle 'BATTLE_WON'
	const endBattle = useCallback(
		(won?: boolean) => {
			let updatedPokemon = [...initSaveFile.pokemon];

			const lastNurseLocation = occupantsRecord[initSaveFile.lastNurse];
			const { x, y, map } = lastNurseLocation;

			caughtPokemon.forEach(({ pokemon, ball }) => {
				updatedPokemon = receiveNewPokemonFunction(
					reduceBattlePokemonToOwnedPokemon(
						{
							...pokemon,
							ownerId: initSaveFile.playerId,
							ball,
						},
						ball === 'heal-ball'
					),
					updatedPokemon
				);
			});

			updatedPokemon = updatedPokemon.map((u) => {
				if (u.id !== player?.id) {
					return u;
				}
				return reduceBattlePokemonToOwnedPokemon(player);
			});

			const newLocation: CharacterLocationData = won
				? initSaveFile.location
				: {
						x,
						y: y + 1,
						mapId: map,
						orientation: 'UP',
						forwardFoot: 'CENTER1',
				  };
			const newSaveFile: SaveFile = {
				...initSaveFile,
				location: newLocation,
				money: initSaveFile.money + coins,
				inventory: joinInventories(initSaveFile.inventory, usedItems, true),
				pokemon: updatedPokemon,
			};
			goBack(newSaveFile);
		},
		[caughtPokemon, coins, goBack, initSaveFile, player, usedItems]
	);
	useEffect(() => {
		if (battleStep !== 'BATTLE_WON') {
			return;
		}
		const t = setTimeout(() => endBattle(true), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, endBattle]);
	// handle "BATTLE_LOST"
	useEffect(() => {
		if (battleStep !== 'BATTLE_LOST') {
			return;
		}
		const t = setTimeout(() => endBattle(false), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, endBattle]);

	return endBattle;
};
