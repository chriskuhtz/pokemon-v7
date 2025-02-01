import { getRandomPokemonId } from './functions/getRandomPokemonId';
import { testState, useSaveFile } from './hooks/useSaveFile';
import { Bag } from './modules/Bag/Bag';
import { Battle } from './modules/Battle/Battle';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { BuyMarket } from './modules/Market/BuyMarket';
import { Market } from './modules/Market/Market';
import { SellMarket } from './modules/Market/SellMarket';
import { Overworld } from './modules/Overworld/Overworld';
import { Team } from './modules/Team/Team';

const routes = [
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
	} = useSaveFile(testState, true);

	const { activeTab } = saveFile.meta;

	if (activeTab === 'MAIN') {
		return (
			<MainMenu
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
				team={saveFile.pokemon.filter((p) => p.onTeam)}
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
		return <BuyMarket goBack={() => setActiveTabReducer('MARKET')} />;
	}
	if (activeTab === 'SELL_MARKET') {
		return <SellMarket goBack={() => setActiveTabReducer('MARKET')} />;
	}
	if (activeTab === 'MARKET') {
		return (
			<Market
				goBack={() => setActiveTabReducer('MAIN')}
				navigate={setActiveTabReducer}
			/>
		);
	}

	return <Overworld openMenu={() => setActiveTabReducer('MAIN')} />;
};
