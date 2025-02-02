import { testMap, testState } from './constants/gameData';
import { getRandomPokemonId } from './functions/getRandomPokemonId';
import { useSaveFile } from './hooks/useSaveFile';
import { generateInventory } from './interfaces/Inventory';
import { Bag } from './modules/Bag/Bag';
import { Battle } from './modules/Battle/Battle';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { BuyMarket } from './modules/Market/BuyMarket';
import { Market } from './modules/Market/Market';
import { SellMarket } from './modules/Market/SellMarket';
import { Overworld } from './modules/Overworld/Overworld';
import { Team } from './modules/Team/Team';

export const routes = [
	'OVERWORLD',
	'MAIN',
	'BAG',
	'TEAM',
	'BATTLE',
	'MARKET',
	'BUY_MARKET',
	'SELL_MARKET',
] as const;
export type RoutesType = (typeof routes)[number];

export const App = (): JSX.Element => {
	const {
		saveFile,
		discardItemReducer,
		putSaveFileReducer,
		setActiveTabReducer,
		sellItemReducer,
		buyItemReducer,
		setCharacterLocationReducer,
		collectItemReducer,
	} = useSaveFile(testState, true);

	const {
		meta: { activeTab },
		inventory,
		pokemon,
		money,
		location,
		collectedItems,
	} = saveFile;

	if (activeTab === 'MAIN') {
		return (
			<MainMenu
				money={money}
				goBack={() => setActiveTabReducer('OVERWORLD')}
				navigate={setActiveTabReducer}
			/>
		);
	}
	if (activeTab === 'BAG') {
		return (
			<Bag
				inventory={saveFile.inventory}
				discardItem={discardItemReducer}
				goBack={() => setActiveTabReducer('MAIN')}
			/>
		);
	}
	if (activeTab === 'TEAM') {
		return (
			<Team
				team={pokemon.filter((p) => p.onTeam)}
				goBack={() => setActiveTabReducer('MAIN')}
			/>
		);
	}
	if (activeTab === 'BATTLE') {
		return (
			<Battle
				initSaveFile={saveFile}
				syncAfterBattleEnd={putSaveFileReducer}
				opponent={{ dexId: getRandomPokemonId() }}
				goBack={() => setActiveTabReducer('MAIN')}
			/>
		);
	}
	if (activeTab === 'BUY_MARKET') {
		return (
			<BuyMarket
				buyItem={buyItemReducer}
				money={money}
				goBack={() => setActiveTabReducer('MARKET')}
				inventory={generateInventory({
					antidote: 10000,
					potion: 10000,
					'poke-ball': 10000,
				})}
			/>
		);
	}
	if (activeTab === 'SELL_MARKET') {
		return (
			<SellMarket
				goBack={() => setActiveTabReducer('MARKET')}
				inventory={inventory}
				sellItem={sellItemReducer}
			/>
		);
	}
	if (activeTab === 'MARKET') {
		return (
			<Market
				goBack={() => setActiveTabReducer('MAIN')}
				navigate={setActiveTabReducer}
			/>
		);
	}

	return (
		<Overworld
			openMenu={() => setActiveTabReducer('MAIN')}
			setCharacterLocation={setCharacterLocationReducer}
			collectItem={collectItemReducer}
			playerLocation={location}
			map={testMap}
			collectedItems={collectedItems}
		/>
	);
};
