import { useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { mapsRecord } from './constants/checkLists/mapsRecord';
import { testPokemon, testState } from './constants/gameData';
import { STANDARD_BUY_MARKET } from './constants/standardBuyMarket';
import { useSaveFile } from './hooks/useSaveFile';
import { generateInventory, Inventory } from './interfaces/Inventory';
import { OwnedPokemon } from './interfaces/OwnedPokemon';
import { Bag } from './modules/Bag/Bag';
import { BattleMessage } from './modules/Battle/BattleField';
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
	latestMessage,
	addMessage,
	addMultipleMessages,
	interjectMessage,
}: {
	latestMessage: BattleMessage | undefined;
	addMessage: (message: BattleMessage) => void;
	addMultipleMessages: (newMessages: BattleMessage[]) => void;
	interjectMessage: (message: BattleMessage) => void;
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
	} = useSaveFile(testState, (x: string) => addMessage({ message: x }));

	const {
		meta: { activeTab, currentChallenger },
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

	if (activeTab === 'BATTLE' && currentChallenger) {
		return (
			<BattleLoader
				challenger={currentChallenger}
				team={team}
				leave={leaveBattleReducer}
				inventory={inventory}
				ownedPokemonDexIds={saveFile.pokemon.map((p) => p.dexId)}
				latestMessage={latestMessage}
				addMessage={addMessage}
				interjectMessage={interjectMessage}
				addMultipleMessages={addMultipleMessages}
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
				latestMessage={latestMessage}
				addMessage={addMessage}
				interjectMessage={interjectMessage}
				addMultipleMessages={addMultipleMessages}
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
				latestMessage={latestMessage}
				addMessage={addMessage}
				interjectMessage={interjectMessage}
				addMultipleMessages={addMultipleMessages}
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
				allPokemon={pokemon}
				goBack={() => setActiveTabReducer('OVERWORLD')}
				setPokemon={setPokemonReducer}
				addToast={addMessage}
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
			saveFile={saveFile}
			map={mapsRecord[saveFile.location.mapId]}
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
			latestMessage={latestMessage}
			addMessage={addMessage}
			interjectMessage={interjectMessage}
			addMultipleMessages={addMultipleMessages}
		/>
	);
};
