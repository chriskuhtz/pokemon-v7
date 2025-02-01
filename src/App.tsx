import { useState } from 'react';
import { BsBackpack4 } from 'react-icons/bs';
import { discardItemFunction } from './functions/discardItemFunction';
import { generateInventory, Inventory } from './interfaces/Inventory';
import { ItemType } from './interfaces/Item';
import { Bag } from './modules/Bag/Bag';
import { Card } from './uiComponents/Card/Card';
import { Page } from './uiComponents/Page/Page';

interface GameState {
	inventory: Inventory;
}

// const initialGameState: GameState = {
// 	inventory: EmptyInventory,
// };

const testState: GameState = {
	inventory: generateInventory({ 'master-ball': 10 }),
};

const routes = ['MAIN', 'BAG'] as const;
type RoutesType = (typeof routes)[number];

export const App = (): JSX.Element => {
	const [activeTab, setActiveTab] = useState<RoutesType>(routes[0]);
	const [gameState, setGameState] = useState<GameState>(testState);

	const discardItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = discardItemFunction(
			item,
			number,
			gameState.inventory
		);
		setGameState((gm) => ({ ...gm, inventory: updatedInventory }));
	};

	if (activeTab === 'BAG') {
		return (
			<div>
				<Bag
					inventory={gameState.inventory}
					discardItem={discardItemReducer}
					goBack={() => setActiveTab('MAIN')}
				/>
			</div>
		);
	}

	return (
		<Page headline="Main Menu:">
			<Card
				onClick={() => setActiveTab('BAG')}
				content={<h4>Bag</h4>}
				icon={<BsBackpack4 />}
				actionElements={[]}
			/>
		</Page>
	);
};
