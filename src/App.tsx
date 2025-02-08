import { useState } from 'react';
import { v4 } from 'uuid';
import { abilityNames } from './constants/checkLists/abilityCheckList';
import { testOpponent, testState } from './constants/gameData';
import { testMap } from './constants/maps/testmap';
import { STANDARD_BUY_MARKET } from './constants/standardBuyMarket';
import { getRandomPokemonId } from './functions/getRandomPokemonId';
import { useSaveFile } from './hooks/useSaveFile';
import { generateInventory, Inventory } from './interfaces/Inventory';
import { Bag } from './modules/Bag/Bag';
import { Battle } from './modules/Battle/Battle';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { BuyMarket } from './modules/Market/BuyMarket';
import { Market } from './modules/Market/Market';
import { SellMarket } from './modules/Market/SellMarket';
import { Overworld } from './modules/Overworld/Overworld';
import { PokemonStorage } from './modules/PokemonStorage/PokemonStorage';
import { Team } from './modules/Team/Team';

export const App = (): JSX.Element => {
	const [currentMarketInventory, setCurrentMarketInventory] =
		useState<Partial<Inventory>>(STANDARD_BUY_MARKET);
	const {
		saveFile,
		discardItemReducer,
		putSaveFileReducer,
		setActiveTabReducer,
		sellItemReducer,
		buyItemReducer,
		setCharacterLocationReducer,
		collectItemReducer,
		setPokemonReducer,
	} = useSaveFile(testState, true);

	const {
		meta: { activeTab },
		inventory,
		pokemon,
		money,
		location,
		collectedItems,
	} = saveFile;

	const team = pokemon.filter((p) => p.onTeam);

	const firstTeamMember = team[0];

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
		return <Team team={team} goBack={() => setActiveTabReducer('MAIN')} />;
	}
	if (activeTab === 'STORAGE') {
		return (
			<PokemonStorage
				allPokemon={pokemon}
				goBack={() => setActiveTabReducer('OVERWORLD')}
				setPokemon={setPokemonReducer}
			/>
		);
	}
	if (activeTab === 'BATTLE') {
		return (
			<Battle
				initSaveFile={saveFile}
				syncAfterBattleEnd={putSaveFileReducer}
				opponent={{
					...testOpponent,
					dexId: getRandomPokemonId(),
					id: v4(),
					ability:
						abilityNames[Math.floor(Math.random() * abilityNames.length)],
				}}
				goBack={() => setActiveTabReducer('OVERWORLD')}
			/>
		);
	}
	if (activeTab === 'BUY_MARKET') {
		return (
			<BuyMarket
				buyItem={buyItemReducer}
				money={money}
				goBack={() => setActiveTabReducer('MARKET')}
				inventory={generateInventory(currentMarketInventory)}
				owned={inventory}
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
				goBack={() => setActiveTabReducer('OVERWORLD')}
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
			startEncounter={() => setActiveTabReducer('BATTLE')}
			encounterRateModifier={firstTeamMember.ability === 'stench' ? 0.5 : 1}
			navigate={setActiveTabReducer}
			goToMarket={(i) => {
				setActiveTabReducer('MARKET');
				setCurrentMarketInventory(i);
			}}
		/>
	);
};
