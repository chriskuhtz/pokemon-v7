import { useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { testPokemon, testState } from './constants/gameData';
import { meadow } from './constants/maps/meadow';
import { STANDARD_BUY_MARKET } from './constants/standardBuyMarket';
import { determineWildPokemon } from './functions/determineWildPokemon';
import { useSaveFile } from './hooks/useSaveFile';
import { AddToastFunction } from './hooks/useToasts';
import { generateInventory, Inventory } from './interfaces/Inventory';
import { OwnedPokemon } from './interfaces/OwnedPokemon';
import { Bag } from './modules/Bag/Bag';
import { BattleLoader } from './modules/Battle/components/BattleLoader';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { BuyMarket } from './modules/Market/BuyMarket';
import { Market } from './modules/Market/Market';
import { SellMarket } from './modules/Market/SellMarket';
import { Overworld } from './modules/Overworld/Overworld';
import { PokemonStorage } from './modules/PokemonStorage/PokemonStorage';
import { Quests } from './modules/Quests/Quests';
import { Settings } from './modules/Settings/Settings';
import { SpriteSelection } from './modules/SpriteSelection/SpriteSelection';
import { StarterSelection } from './modules/StarterSelection/StarterSelection';
import { Team } from './modules/Team/Team';

export const App = ({
	addToast,
}: {
	activeToast: boolean;
	addToast: AddToastFunction;
}): JSX.Element => {
	const [currentMarketInventory, setCurrentMarketInventory] =
		useState<Partial<Inventory>>(STANDARD_BUY_MARKET);
	const {
		saveFile,
		discardItemReducer,
		setActiveTabReducer,
		sellItemReducer,
		buyItemReducer,
		setCharacterLocationReducer,
		handleOccupantReducer,
		setPokemonReducer,
		talkToNurseReducer,
		patchSaveFileReducer,
		navigateAwayFromOverworldReducer,
		applyItemToPokemonReducer,
		fulfillQuestReducer,
		changeHeldItemReducer,
		useSacredAshReducer,
		reset,
		leaveBattleReducer,
		addItemReducer,
	} = useSaveFile(testState, addToast);

	const {
		meta: { activeTab },
		inventory,
		pokemon,
		money,
		location,
		handledOccupants,
		badges,
		playerId,
		quests,
	} = saveFile;

	const team = useMemo(() => pokemon.filter((p) => p.onTeam), [pokemon]);

	const firstTeamMember = team[0];

	if (activeTab === 'BATTLE') {
		const opps = determineWildPokemon(team, meadow);
		return (
			<BattleLoader
				opponents={opps}
				team={team}
				leave={leaveBattleReducer}
				fightersPerSide={opps.length}
				inventory={inventory}
				ownedPokemonDexIds={saveFile.pokemon.map((p) => p.dexId)}
			/>
		);
	}
	if (activeTab === 'SETTINGS') {
		return (
			<Settings
				proceed={(settings) => {
					patchSaveFileReducer({
						settings,
					});
				}}
			/>
		);
	}
	if (activeTab === 'SPRITE_SELECTION') {
		return (
			<SpriteSelection
				proceed={(sprite: string) => {
					patchSaveFileReducer({
						sprite: sprite,
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
							...saveFile.pokemon.map((p) => ({ ...p, ownerId: name })),
							{
								...testPokemon,
								dexId: starterId,
								id: v4(),
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
				badges={badges}
				spriteUrl={`/npcs/${saveFile.sprite}.png`}
				name={playerId}
				reset={reset}
			/>
		);
	}
	if (activeTab === 'QUESTS') {
		return (
			<Quests
				quests={quests}
				goBack={() => setActiveTabReducer('MAIN')}
				fulfillQuest={fulfillQuestReducer}
				saveFile={saveFile}
			/>
		);
	}
	if (activeTab === 'BAG') {
		return (
			<Bag
				inventory={saveFile.inventory}
				discardItem={discardItemReducer}
				goBack={() => setActiveTabReducer('MAIN')}
				team={team}
				applyItem={applyItemToPokemonReducer}
				applySacredAsh={useSacredAshReducer}
			/>
		);
	}
	if (activeTab === 'TEAM') {
		return (
			<Team
				team={team}
				goBack={() => setActiveTabReducer('MAIN')}
				setTeam={(newTeam: OwnedPokemon[]) =>
					setPokemonReducer([...newTeam, ...pokemon.filter((p) => !p.onTeam)])
				}
				inventory={inventory}
				changeHeldItem={changeHeldItemReducer}
			/>
		);
	}
	if (activeTab === 'STORAGE') {
		return (
			<PokemonStorage
				addToast={addToast}
				allPokemon={pokemon}
				goBack={() => setActiveTabReducer('OVERWORLD')}
				setPokemon={setPokemonReducer}
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
			playerLocation={location}
			map={meadow}
			startEncounter={(steps) => {
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
			cutterPokemon={{ dexId: team[0].dexId }}
			playerSprite={saveFile.sprite}
			receiveItems={addItemReducer}
			handleThisOccupant={handleOccupantReducer}
			handledOccupants={handledOccupants.map((h) => h.id)}
		/>
	);
};
