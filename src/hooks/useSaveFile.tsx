import { useState } from 'react';
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

export const useSaveFile = (
	init: SaveFile
): {
	saveFile: SaveFile;
	discardItemReducer: (item: ItemType, number: number) => void;
	addItemReducer: (item: ItemType, number: number) => void;
	receiveNewPokemonReducer: (newMon: Omit<OwnedPokemon, 'onTeam'>) => void;
	putSaveFileReducer: (update: SaveFile) => void;
	patchSaveFileReducer: (update: Partial<SaveFile>) => void;
} => {
	const [saveFile, setSaveFile] = useState<SaveFile>(init);

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
	const putSaveFileReducer = (update: SaveFile) => setSaveFile(update);
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
