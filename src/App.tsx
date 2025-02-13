import { useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { abilityNames } from './constants/checkLists/abilityCheckList';
import { testOpponent, testPokemon, testState } from './constants/gameData';
import { testMap } from './constants/maps/testmap';
import { STANDARD_BUY_MARKET } from './constants/standardBuyMarket';
import { useSaveFile } from './hooks/useSaveFile';
import { generateInventory, Inventory } from './interfaces/Inventory';
import { OwnedPokemon } from './interfaces/OwnedPokemon';
import { Bag } from './modules/Bag/Bag';
import { Battle } from './modules/Battle/Battle';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { BuyMarket } from './modules/Market/BuyMarket';
import { Market } from './modules/Market/Market';
import { SellMarket } from './modules/Market/SellMarket';
import { Overworld } from './modules/Overworld/Overworld';
import { PokemonStorage } from './modules/PokemonStorage/PokemonStorage';
import { Settings } from './modules/Settings/Settings';
import { StarterSelection } from './modules/StarterSelection/StarterSelection';
import { Team } from './modules/Team/Team';

export const App = (): JSX.Element => {
	const [currentOpponent, setCurrentOpponent] =
		useState<OwnedPokemon>(testOpponent);
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
		talkToNurseReducer,
		patchSaveFileReducer,
		navigateAwayFromOverworldReducer,
		cutBushReducer,
	} = useSaveFile(testState, true);

	const {
		meta: { activeTab },
		inventory,
		pokemon,
		money,
		location,
		collectedItems,
	} = saveFile;

	const team = useMemo(() => pokemon.filter((p) => p.onTeam), [pokemon]);

	const firstTeamMember = team[0];

	if (activeTab === 'SETTINGS') {
		return (
			<Settings
				proceed={(randomStarters: boolean) => {
					patchSaveFileReducer({
						settings: {
							randomStarters: randomStarters,
						},
					});
				}}
			/>
		);
	}
	if (activeTab === 'STARTER_SELECTION') {
		return (
			<StarterSelection
				randomStarters={!!saveFile.settings?.randomStarters}
				proceed={(name: string, starterId: number) => {
					patchSaveFileReducer({
						playerId: name,
						pokemon: [
							{
								...testPokemon,
								dexId: starterId,
								ownerId: name,
								onTeam: true,
							},
						],
						meta: { activeTab: 'OVERWORLD' },
					});
				}}
			/>
		);
	}
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
				opponent={currentOpponent}
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
			openMenu={(steps) => navigateAwayFromOverworldReducer('MAIN', steps)}
			setCharacterLocation={setCharacterLocationReducer}
			collectItem={collectItemReducer}
			playerLocation={location}
			map={testMap}
			collectedItems={collectedItems}
			startEncounter={({ dexId, xp }, steps) => {
				setCurrentOpponent((current) => ({
					...current,
					dexId,
					xp,
					id: v4(),
					ability:
						abilityNames[Math.floor(Math.random() * abilityNames.length)],
				}));

				navigateAwayFromOverworldReducer('BATTLE', steps);
			}}
			firstTeamMember={firstTeamMember}
			goToMarket={(i, steps) => {
				navigateAwayFromOverworldReducer('MARKET', steps);
				setCurrentMarketInventory(i);
			}}
			openStorage={(steps) =>
				navigateAwayFromOverworldReducer('STORAGE', steps)
			}
			talkToNurse={talkToNurseReducer}
			bushCutting={{
				cut: cutBushReducer,
				cutterPokemon: { dexId: team[0].dexId },
			}}
			cutBushes={saveFile.cutBushes}
		/>
	);
};
