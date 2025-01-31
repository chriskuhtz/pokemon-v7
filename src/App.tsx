import { useState } from 'react';
import { discardItemFunction } from './functions/discardItemFunction';
import { EmptyInventory, Inventory } from './interfaces/Inventory';
import { ItemType } from './interfaces/Item';
import { Bag } from './modules/Bag/Bag';

interface GameState {
	inventory: Inventory;
}

const initialGameState: GameState = {
	inventory: EmptyInventory,
};

export const App = (): JSX.Element => {
	const [gameState, setGameState] = useState<GameState>(initialGameState);

	const discardItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = discardItemFunction(
			item,
			number,
			gameState.inventory
		);
		setGameState((gm) => ({ ...gm, inventory: updatedInventory }));
	};

	return (
		<div>
			<Bag inventory={gameState.inventory} discardItem={discardItemReducer} />
		</div>
	);
};
