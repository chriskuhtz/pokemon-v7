import { useContext, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { testPokemon } from './constants/gameData';
import { mapsRecord } from './constants/maps/mapsRecord';
import { PokemonName } from './constants/pokemonNames';
import { MessageQueueContext } from './hooks/useMessageQueue';
import { SaveFileContext } from './hooks/useSaveFile';
import { generateInventory, Inventory } from './interfaces/Inventory';
import { OwnedPokemon } from './interfaces/OwnedPokemon';
import { ApricornSmithy } from './modules/ApricornSmithy/ApricornSmithy';
import { Bag } from './modules/Bag/Bag';
import { BattleLoader } from './modules/Battle/components/BattleLoader';
import { BulletinBoard } from './modules/BulletinBoard/BulletinBoard';
import { CampUpgrades } from './modules/CampUpgrades/CampUpgrades';
import { Farm } from './modules/Farm/Farm';
import { FossilReviver } from './modules/FossilReviver/FossilReviver';
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

export const FullScreenToggle = () => {
	const [f, setF] = useState<boolean>(!!document.fullscreenElement);

	if (f || (window.innerHeight > 800 && window.innerWidth > 800)) {
		return <></>;
	}
	return (
		<div
			style={{
				position: 'absolute',
				zIndex: 9000,
				backgroundColor: 'rgba(0,0,0,.8)',
				width: '100dvw',
				height: '100dvh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<button
				style={{ color: 'white', borderColor: 'white' }}
				onClick={() => {
					setF(true);
					document
						.getElementById('root')
						?.requestFullscreen({ navigationUI: 'hide' });
				}}
			>
				Enter FullScreen mode
			</button>
		</div>
	);
};
export const App = (): JSX.Element => {
	const { latestMessage, addMessage, addMultipleMessages } =
		useContext(MessageQueueContext);
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
				ownedPokemonNames={saveFile.pokemon.map((p) => p.name)}
				latestMessage={latestMessage}
				addMessage={addMessage}
				addMultipleMessages={addMultipleMessages}
			/>
		);
	}
	if (activeTab === 'SETTINGS') {
		return <Settings />;
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
				proceed={(name: string, starterName: PokemonName) => {
					patchSaveFileReducer({
						playerId: name,
						pokemon: [
							...saveFile.pokemon.map((p) => ({ ...p, ownerId: name })),
							{
								...testPokemon,
								name: starterName,
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
			<MainMenu goBack={() => setActiveTabReducer('OVERWORLD')} reset={reset} />
		);
	}
	if (activeTab === 'QUESTS') {
		return <Quests goBack={() => setActiveTabReducer('MAIN')} />;
	}
	if (activeTab === 'BULLETIN_BOARD') {
		return <BulletinBoard goBack={() => setActiveTabReducer('MAIN')} />;
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
	if (activeTab === 'FARM') {
		return <Farm />;
	}
	if (activeTab === 'FOSSIL_REVIVER') {
		return <FossilReviver />;
	}
	if (activeTab === 'APRICORN_SMITHY') {
		return <ApricornSmithy goBack={() => setActiveTabReducer('OVERWORLD')} />;
	}
	if (activeTab === 'CAMP_UPGRADES') {
		return <CampUpgrades goBack={() => setActiveTabReducer('OVERWORLD')} />;
	}
	if (activeTab === 'MARKET') {
		return (
			<Market
				goBack={() => setActiveTabReducer('OVERWORLD')}
				navigate={setActiveTabReducer}
			/>
		);
	}
	if (activeTab === 'MAP_MAKER_CAMP') {
		return <MapMaker mapId="camp" goBack={() => setActiveTabReducer('MAIN')} />;
	}
	if (activeTab === 'MAP_MAKER_ROUTEN1') {
		return (
			<MapMaker mapId="routeN1" goBack={() => setActiveTabReducer('MAIN')} />
		);
	}

	return (
		<Overworld
			setCharacterLocation={setCharacterLocationReducer}
			playerLocation={location}
			saveFile={saveFile}
			goToMarket={(i, steps) => {
				navigateAwayFromOverworldReducer('MARKET', steps);
				setCurrentMarketInventory(i);
			}}
			talkToNurse={talkToNurseReducer}
			cutterPokemon={{ name: team[0].name }}
			playerSprite={saveFile.sprite}
			receiveItems={addItemReducer}
			handledOccupants={handledOccupants.map((h) => h.id)}
			latestMessage={latestMessage}
			addMultipleMessages={addMultipleMessages}
			encounterRateModifier={encounterRateModifier}
		/>
	);
};
