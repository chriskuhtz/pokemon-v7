import { useContext, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { testPokemon } from './constants/gameData';
import { mapsRecord } from './constants/maps/mapsRecord';
import { Message } from './hooks/useMessageQueue';
import { SaveFileContext } from './hooks/useSaveFile';
import { generateInventory, Inventory } from './interfaces/Inventory';
import { OwnedPokemon } from './interfaces/OwnedPokemon';
import { Bag } from './modules/Bag/Bag';
import { BattleLoader } from './modules/Battle/components/BattleLoader';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { MapMaker } from './modules/MapMaker/MapMaker';
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
}: {
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
}): JSX.Element => {
	const [currentMarketInventory, setCurrentMarketInventory] = useState<
		Partial<Inventory>
	>({});
	const {
		saveFile,
		discardItemReducer,
		setActiveTabReducer,
		sellItemReducer,
		buyItemReducer,
		setCharacterLocationReducer,
		setPokemonReducer,
		talkToNurseReducer,
		patchSaveFileReducer,
		navigateAwayFromOverworldReducer,
		applyItemToPokemonReducer,
		fulfillQuestReducer,
		changeHeldItemReducer,
		useSacredAshReducer,
		applyEncounterRateModifierItem,
		reset,
		leaveBattleReducer,
		addItemReducer,
		evolvePokemonReducer,
	} = useContext(SaveFileContext);

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

	const firstTeamMember = useMemo(
		() => (team.length > 0 ? team[0] : undefined),
		[team]
	);

	const encounterRateModifier = useMemo(() => {
		const stenchFactor = firstTeamMember?.ability === 'stench' ? 0.5 : 1;
		const illumFactor = firstTeamMember?.ability === 'illuminate' ? 2 : 1;
		const itemFactor = saveFile.encounterRateModifier?.factor ?? 1;
		const weatherFactor =
			firstTeamMember?.ability === 'sand-veil' &&
			mapsRecord[saveFile.location.mapId].weather === 'sandstorm'
				? 0.5
				: 1;

		return 1 * stenchFactor * itemFactor * weatherFactor * illumFactor;
	}, [firstTeamMember, saveFile]);

	// const fishingEncounterRateModifier = useMemo(() => {
	// 	if (firstTeamMember.ability === 'suction-cups') {
	// 		return 1.5;
	// 	}

	// 	return 1;
	// }, [firstTeamMember.ability]);

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
				applyEncounterRateModifierItem={applyEncounterRateModifierItem}
			/>
		);
	}
	if (activeTab === 'TEAM') {
		return (
			<Team
				initialFocus={team[0].id}
				evolve={evolvePokemonReducer}
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
				addMessage={addMessage}
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
	if (activeTab === 'MAP_MAKER') {
		return <MapMaker goBack={() => setActiveTabReducer('MAIN')} />;
	}

	return (
		<Overworld
			openMenu={(steps) => navigateAwayFromOverworldReducer('MAIN', steps)}
			openQuests={(steps) => navigateAwayFromOverworldReducer('QUESTS', steps)}
			openBag={(steps) => navigateAwayFromOverworldReducer('BAG', steps)}
			openTeam={(steps) => navigateAwayFromOverworldReducer('TEAM', steps)}
			setCharacterLocation={setCharacterLocationReducer}
			playerLocation={location}
			saveFile={saveFile}
			map={mapsRecord[saveFile.location.mapId]}
			startEncounter={(steps) => {
				navigateAwayFromOverworldReducer('BATTLE', steps);
			}}
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
			handledOccupants={handledOccupants.map((h) => h.id)}
			latestMessage={latestMessage}
			addMessage={addMessage}
			addMultipleMessages={addMultipleMessages}
			encounterRateModifier={encounterRateModifier}
		/>
	);
};
