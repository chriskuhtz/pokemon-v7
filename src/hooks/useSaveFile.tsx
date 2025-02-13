import { useCallback, useEffect, useState } from 'react';
import { localStorageId } from '../constants/gameData';
import { applyHappinessFromWalking } from '../functions/applyHappinessFromWalking';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { updateItemFunction } from '../functions/updateItemFunction';
import { ItemType } from '../interfaces/Item';
import { OverworldItem } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { RoutesType } from '../interfaces/Routing';
import { CharacterLocationData, SaveFile } from '../interfaces/SaveFile';

export const useSaveFile = (
	init: SaveFile,
	useLocalStorage?: boolean
): {
	saveFile: SaveFile;
	discardItemReducer: (item: ItemType, number: number) => void;
	addItemReducer: (item: ItemType, number: number) => void;
	receiveNewPokemonReducer: (newMon: Omit<OwnedPokemon, 'onTeam'>) => void;
	putSaveFileReducer: (update: SaveFile) => void;
	patchSaveFileReducer: (update: Partial<SaveFile>) => void;
	setActiveTabReducer: (update: RoutesType) => void;
	sellItemReducer: (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => void;
	buyItemReducer: (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => void;
	setCharacterLocationReducer: (update: CharacterLocationData) => void;
	collectItemReducer: (item: [string, OverworldItem]) => void;
	setPokemonReducer: (update: OwnedPokemon[]) => void;

	talkToNurseReducer: (id: number) => void;
	cutBushReducer: (id: number) => void;
	navigateAwayFromOverworldReducer: (to: RoutesType, steps: number) => void;
} => {
	const local = window.localStorage.getItem(localStorageId);
	const loaded =
		useLocalStorage && local ? (JSON.parse(local) as SaveFile) : init;

	const [saveFile, s] = useState<SaveFile>(loaded);

	const setSaveFile = (update: SaveFile) => {
		const newTime = new Date().getTime();
		s({
			...update,
			lastEdited: newTime,
			cutBushes:
				newTime - saveFile.lastEdited > 90000 ? [] : saveFile.cutBushes,
		});
	};

	useEffect(() => {
		if (useLocalStorage) {
			window.localStorage.setItem(localStorageId, JSON.stringify(saveFile));
		}
	}, [saveFile, useLocalStorage]);

	const discardItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(
			item,
			-number,
			saveFile.inventory
		);
		setSaveFile({ ...saveFile, inventory: updatedInventory });
	};
	const sellItemReducer = (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => {
		const updatedInventory = updateItemFunction(
			item,
			-number,
			saveFile.inventory
		);
		const updatedMoney = saveFile.money + number * pricePerItem;

		setSaveFile({
			...saveFile,
			inventory: updatedInventory,
			money: updatedMoney,
		});
	};
	const buyItemReducer = (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => {
		const updatedInventory = updateItemFunction(
			item,
			number,
			saveFile.inventory
		);
		const updatedMoney = saveFile.money - number * pricePerItem;

		setSaveFile({
			...saveFile,
			inventory: updatedInventory,
			money: updatedMoney,
		});
	};
	const addItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(
			item,
			number,
			saveFile.inventory
		);
		setSaveFile({ ...saveFile, inventory: updatedInventory });
	};
	const receiveNewPokemonReducer = (newMon: Omit<OwnedPokemon, 'onTeam'>) => {
		const updatedPokemon = receiveNewPokemonFunction(newMon, saveFile.pokemon);

		setSaveFile({ ...saveFile, pokemon: updatedPokemon });
	};
	const putSaveFileReducer = (update: SaveFile) => {
		setSaveFile(update);
	};
	const patchSaveFileReducer = (update: Partial<SaveFile>) =>
		setSaveFile({ ...saveFile, ...update });

	const setActiveTabReducer = useCallback(
		(update: RoutesType) => {
			setSaveFile({
				...saveFile,
				meta: { ...saveFile.meta, activeTab: update },
			});
		},
		[saveFile]
	);
	useEffect(() => {
		if (
			saveFile.meta.activeTab !== 'STARTER_SELECTION' &&
			(saveFile.playerId === '' || saveFile.pokemon.length === 0)
		) {
			setActiveTabReducer('STARTER_SELECTION');
		}
	}, [
		saveFile.meta.activeTab,
		saveFile.playerId,
		saveFile.pokemon.length,
		setActiveTabReducer,
	]);

	const setCharacterLocationReducer = (update: CharacterLocationData) => {
		setSaveFile({
			...saveFile,
			location: update,
		});
	};

	const collectItemReducer = (item: [string, OverworldItem]) => {
		const id = Number.parseInt(item[0]);
		const updatedInventory = updateItemFunction(
			item[1].item,
			item[1].amount,
			saveFile.inventory
		);
		setSaveFile({
			...saveFile,
			inventory: updatedInventory,
			collectedItems: [...saveFile.collectedItems.filter((c) => c !== id), id],
		});
	};
	const setPokemonReducer = (update: OwnedPokemon[]) => {
		setSaveFile({
			...saveFile,
			pokemon: update,
		});
	};

	const navigateAwayFromOverworldReducer = (
		route: RoutesType,
		stepsTaken: number
	) => {
		applyStepsWalkedToTeamReducer(stepsTaken);
		setActiveTabReducer(route);
	};
	const applyStepsWalkedToTeamReducer = (steps: number) => {
		setPokemonReducer(
			saveFile.pokemon.map((p) => {
				if (!p.onTeam) {
					return p;
				}

				return applyHappinessFromWalking(p, steps);
			})
		);
	};
	const talkToNurseReducer = (id: number) => {
		setSaveFile({
			...saveFile,
			lastNurse: id,
			pokemon: saveFile.pokemon.map((p) => {
				if (!p.onTeam) {
					return p;
				}

				return fullyHealPokemon(p);
			}),
		});
	};
	const cutBushReducer = (id: number) => {
		setSaveFile({
			...saveFile,
			cutBushes: [...(saveFile.cutBushes ?? []), id],
		});
	};

	return {
		saveFile,
		discardItemReducer,
		addItemReducer,
		receiveNewPokemonReducer,
		putSaveFileReducer,
		patchSaveFileReducer,
		setActiveTabReducer,
		sellItemReducer,
		buyItemReducer,
		setCharacterLocationReducer,
		collectItemReducer,
		setPokemonReducer,
		talkToNurseReducer,
		navigateAwayFromOverworldReducer,
		cutBushReducer,
	};
};
