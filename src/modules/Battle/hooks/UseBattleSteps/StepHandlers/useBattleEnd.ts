import { useCallback, useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { occupantsRecord } from '../../../../../constants/occupantsRecord';
import { isTrapped } from '../../../../../functions/isTrapped';
import { receiveNewPokemonFunction } from '../../../../../functions/receiveNewPokemonFunction';
import { reduceBattlePokemonToOwnedPokemon } from '../../../../../functions/reduceBattlePokemonToOwnedPokemon';
import { AddToastFunction } from '../../../../../hooks/useToasts';
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
	dispatchToast,
	player,
}: {
	initSaveFile: SaveFile;
	caughtPokemon: CatchProcessInfo[];
	coins: number;
	usedItems: Inventory;
	battleStep: BattleStep;
	goBack: (update: SaveFile) => void;
	player: BattlePokemon | undefined;
	dispatchToast: AddToastFunction;
}) => {
	// handle 'BATTLE_WON'
	const endBattle = useCallback(
		(mode: 'WIN' | 'LOOSE' | 'DRAW') => {
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

			const newLocation: CharacterLocationData =
				mode === 'LOOSE'
					? {
							x,
							y: y + 1,
							mapId: map,
							orientation: 'UP',
							forwardFoot: 'CENTER1',
					  }
					: initSaveFile.location;
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
		const t = setTimeout(() => endBattle('WIN'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, endBattle]);
	// handle "BATTLE_LOST"
	useEffect(() => {
		if (battleStep !== 'BATTLE_LOST') {
			return;
		}
		const t = setTimeout(() => endBattle('LOOSE'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, endBattle]);

	const runAway = useCallback(() => {
		if (player && isTrapped(player)) {
			dispatchToast('trapped, cant run away');
			return;
		}
		endBattle('DRAW');
	}, [dispatchToast, endBattle, player]);

	const getWhirlwinded = useCallback(() => {
		dispatchToast('Whirlwind separated the fighters');
		endBattle('DRAW');
	}, [dispatchToast, endBattle]);

	return { runAway, getWhirlwinded };
};
