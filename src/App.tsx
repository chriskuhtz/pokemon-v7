import { useContext, useMemo, useState } from 'react';
import { MapId, mapsRecord } from './constants/maps/mapsRecord';
import { MessageQueueContext } from './hooks/useMessageQueue';
import { SaveFileContext } from './hooks/useSaveFile';
import { generateInventory, Inventory } from './interfaces/Inventory';
import { OwnedPokemon } from './interfaces/OwnedPokemon';
import { mapMakerRoutes } from './interfaces/Routing';
import { AmoongussCompostResearcher } from './modules/AmoongussResearcher/AmoongussResearcher';
import { ApricornSmithy } from './modules/ApricornSmithy/ApricornSmithy';
import { Bag } from './modules/Bag/Bag';
import { BattleLoader } from './modules/Battle/components/BattleLoader';
import { BerryLure } from './modules/BerryLure/BerryLure';
import { BulletinBoard } from './modules/BulletinBoard/BulletinBoard';
import { CampUpgrades } from './modules/CampUpgrades/CampUpgrades';
import { CookingGrandma } from './modules/CookingGrandma/CookingGrandma';
import { Curator } from './modules/Curator/Curator';
import { Farm } from './modules/Farm/Farm';
import { FossilReviver } from './modules/FossilReviver/FossilReviver';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { MapMaker } from './modules/MapMaker/MapMaker';
import { BuyMarket } from './modules/Market/BuyMarket';
import { Market } from './modules/Market/Market';
import { SellMarket } from './modules/Market/SellMarket';
import { MiltankFarm } from './modules/MiltankFarm/MiltankFarm';
import { MoveTutor } from './modules/MoveTutor/MoveTutor';
import { Overworld } from './modules/Overworld/Overworld';
import { Pokedex } from './modules/Pokedex/Pokedex';
import { PokemonStorage } from './modules/PokemonStorage/PokemonStorage';
import { Quests } from './modules/Quests/Quests';
import { SeedVault } from './modules/SeedVault/SeedVault';
import { Settings } from './modules/Settings/Settings';
import { SpriteSelection } from './modules/SpriteSelection/SpriteSelection';
import { StarterSelection } from './modules/StarterSelection/StarterSelection';
import { StorageChest } from './modules/StorageChest/StorageChest';
import { Team } from './modules/Team/Team';
import { TrainingField } from './modules/TrainingField/TrainingField';
import { VilePlumeScentResearcher } from './modules/VilePlumeScentResearcher/VilePlumeScentResearcher';
import { Wiki } from './modules/Wiki/Wiki';

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
		setActiveTabReducer,
		sellItemReducer,
		buyItemReducer,
		setPokemonReducer,
		patchSaveFileReducer,
		navigateAwayFromOverworldReducer,
		changeHeldItemReducer,
		reset,
	} = useContext(SaveFileContext);

	const {
		meta: { activeTab, currentChallenger },
		bag: inventory,
		pokemon,
		money,
	} = saveFile;

	const team = useMemo(() => pokemon.filter((p) => p.onTeam), [pokemon]);

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
				inventory={inventory}
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
		return <StarterSelection />;
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
		return <Bag goBack={() => setActiveTabReducer('MAIN')} />;
	}
	if (activeTab === 'TEAM') {
		return (
			<Team
				initialFocus={team[0].id}
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
	if (activeTab === 'MILTANK_FARM') {
		return <MiltankFarm />;
	}
	if (activeTab === 'FOSSIL_REVIVER') {
		return <FossilReviver />;
	}
	if (activeTab === 'CHEF_GRANDMA') {
		return <CookingGrandma />;
	}
	if (activeTab === 'CURATOR') {
		return <Curator />;
	}
	if (activeTab === 'VILEPLUME') {
		return <VilePlumeScentResearcher />;
	}
	if (activeTab === 'AMOONGUSS') {
		return <AmoongussCompostResearcher />;
	}
	if (activeTab === 'SEED_VAULT') {
		return <SeedVault />;
	}
	if (activeTab === 'WIKI') {
		return <Wiki />;
	}
	if (activeTab === 'POKEDEX') {
		return <Pokedex />;
	}
	if (activeTab === 'APRICORN_SMITHY') {
		return <ApricornSmithy goBack={() => setActiveTabReducer('OVERWORLD')} />;
	}
	if (activeTab === 'CAMP_UPGRADES') {
		return <CampUpgrades goBack={() => setActiveTabReducer('OVERWORLD')} />;
	}
	if (activeTab === 'TRAINING_FIELD') {
		return <TrainingField />;
	}
	if (activeTab === 'STORAGE_CHEST') {
		return <StorageChest />;
	}
	if (activeTab === 'BERRY_LURE') {
		return <BerryLure />;
	}
	if (activeTab === 'MOVE_TUTOR') {
		return <MoveTutor />;
	}
	if (activeTab === 'MARKET') {
		return (
			<Market
				goBack={() => setActiveTabReducer('OVERWORLD')}
				navigate={setActiveTabReducer}
			/>
		);
	}
	if (mapMakerRoutes.includes(activeTab)) {
		const mapId = activeTab.slice(10) as MapId;
		return (
			<MapMaker
				mapId={mapId}
				tileSetUrl={mapsRecord[mapId].tilesetUrl}
				goBack={() => setActiveTabReducer('MAIN')}
			/>
		);
	}

	return (
		<Overworld
			goToMarket={(i, steps) => {
				navigateAwayFromOverworldReducer('MARKET', steps);
				setCurrentMarketInventory(i);
			}}
		/>
	);
};
