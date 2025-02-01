import { useState } from 'react';
import { discardItemFunction } from '../functions/discardItemFunction';
import { Inventory, generateInventory } from '../interfaces/Inventory';
import { ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export interface SaveFile {
	playerId: string;
	inventory: Inventory;
	pokemon: OwnedPokemon[];
}

// const initialGameState: GameState = {
// 	inventory: EmptyInventory,
// };

const ownerId = 'Bear';
const testState: SaveFile = {
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

export const useSaveFile = (): {
	saveFile: SaveFile;
	discardItemReducer: (item: ItemType, number: number) => void;
} => {
	const [saveFile, setSaveFile] = useState<SaveFile>(testState);

	const discardItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = discardItemFunction(
			item,
			number,
			saveFile.inventory
		);
		setSaveFile((gm) => ({ ...gm, inventory: updatedInventory }));
	};

	return { saveFile, discardItemReducer };
};
