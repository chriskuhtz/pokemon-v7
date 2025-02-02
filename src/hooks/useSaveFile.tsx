import { useEffect, useState } from 'react';
import { RoutesType } from '../App';
import { localStorageId } from '../constants/gameData';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { updateItemFunction } from '../functions/updateItemFunction';
import { ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
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
} => {
	const local = window.localStorage.getItem(localStorageId);
	const loaded =
		useLocalStorage && local ? (JSON.parse(local) as SaveFile) : init;

	const [saveFile, setSaveFile] = useState<SaveFile>(loaded);

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
		setSaveFile((gm) => ({ ...gm, inventory: updatedInventory }));
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

		setSaveFile((gm) => ({
			...gm,
			inventory: updatedInventory,
			money: updatedMoney,
		}));
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

		setSaveFile((gm) => ({
			...gm,
			inventory: updatedInventory,
			money: updatedMoney,
		}));
	};
	const addItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(
			item,
			number,
			saveFile.inventory
		);
		setSaveFile((gm) => ({ ...gm, inventory: updatedInventory }));
	};
	const receiveNewPokemonReducer = (newMon: Omit<OwnedPokemon, 'onTeam'>) => {
		const updatedPokemon = receiveNewPokemonFunction(newMon, saveFile.pokemon);

		setSaveFile((gm) => ({ ...gm, pokemon: updatedPokemon }));
	};
	const putSaveFileReducer = (update: SaveFile) => {
		setSaveFile(update);
	};
	const patchSaveFileReducer = (update: Partial<SaveFile>) =>
		setSaveFile((s) => ({ ...s, ...update }));

	const setActiveTabReducer = (update: RoutesType) => {
		setSaveFile((s) => ({ ...s, meta: { ...s.meta, activeTab: update } }));
	};

	const setCharacterLocationReducer = (update: CharacterLocationData) => {
		setSaveFile((s) => ({
			...s,
			location: update,
		}));
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
	};
};
