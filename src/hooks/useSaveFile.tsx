import { useEffect, useState } from 'react';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { updateItemFunction } from '../functions/updateItemFunction';
import { generateInventory } from '../interfaces/Inventory';
import { ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { SaveFile } from '../interfaces/SaveFile';

const ownerId = 'Bear';
export const testState: SaveFile = {
	inventory: generateInventory({ 'master-ball': 10 }),
	playerId: ownerId,
	pokemon: [
		{
			dexId: 25,
			ownerId,
			id: 'bubu',
			ball: 'master-ball',
			onTeam: true,
		},
	],
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

	return {
		saveFile,
		discardItemReducer,
		addItemReducer,
		receiveNewPokemonReducer,
		putSaveFileReducer,
		patchSaveFileReducer,
	};
};
