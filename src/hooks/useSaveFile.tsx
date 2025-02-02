import { useEffect, useState } from 'react';
import { RoutesType } from '../App';
import { getNextForwardFoot } from '../functions/getNextForwardFoot';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { updateItemFunction } from '../functions/updateItemFunction';
import { generateInventory } from '../interfaces/Inventory';
import { ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { CharacterOrientation, SaveFile } from '../interfaces/SaveFile';

const ownerId = 'Bear';
export const testState: SaveFile = {
	inventory: generateInventory({ 'master-ball': 10, 'ultra-ball': 20 }),
	playerId: ownerId,
	money: 5000,
	pokemon: [
		{
			dexId: 25,
			ownerId,
			id: 'bubu',
			ball: 'master-ball',
			onTeam: true,
		},
	],
	meta: {
		activeTab: 'MAIN',
	},
	location: {
		orientation: 'RIGHT',
		forwardFoot: 'CENTER1',
	},
};

const localStorageId = 'pokemonv7SaveFile';

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
	setOrientationReducer: (newOrientation: CharacterOrientation) => void;
	setNextForwardFootReducer: () => void;
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
	const setOrientationReducer = (update: CharacterOrientation) => {
		setSaveFile((s) => ({
			...s,
			location: { ...s.location, orientation: update },
		}));
	};

	const setNextForwardFootReducer = () => {
		const nextFoot = getNextForwardFoot(saveFile.location.forwardFoot);
		setSaveFile((s) => ({
			...s,
			location: { ...s.location, forwardFoot: nextFoot },
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
		setOrientationReducer,
		setNextForwardFootReducer,
	};
};
