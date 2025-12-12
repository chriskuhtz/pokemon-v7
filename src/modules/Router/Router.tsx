import { useContext, useMemo, useState } from 'react';
import { MapId } from '../../constants/gameData/maps/mapsRecord';
import { GameDataContext } from '../../hooks/useGameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { RoutesType } from '../../interfaces/Routing';
import { AbilityTutor } from '../AbilityTutor/AbilityTutor';
import { AmoongussCompostResearcher } from '../AmoongussResearcher/AmoongussResearcher';
import { ApricornSmithy } from '../ApricornSmithy/ApricornSmithy';
import { Bag } from '../Bag/Bag';
import { BattleLoader } from '../Battle/components/BattleLoader';
import { BattleJournalist } from '../BattleJournalist/BattleJournalist';
import { BerryLure } from '../BerryLure/BerryLure';
import { BulletinBoard } from '../BulletinBoard/BulletinBoard';
import { CampUpgrades } from '../CampUpgrades/CampUpgrades';
import { ChangeLog, newestChangeLog } from '../ChangeLog/ChangeLog';
import { CookingGrandma } from '../CookingGrandma/CookingGrandma';
import { Curator } from '../Curator/Curator';
import { DragoniteTaxi } from '../DragoniteTaxi/DragoniteTaxi';
import { Farm } from '../Farm/Farm';
import { FossilReviver } from '../FossilReviver/FossilReviver';
import { InternalDex } from '../InternalDex/InternalDex';
import { Intro } from '../Intro/Intro';
import { MainMenu } from '../MainMenu/MainMenu';
import { MapEditor } from '../MapMaker/components/MapEditor';
import { Market } from '../Market/Market';
import { MiltankFarm } from '../MiltankFarm/MiltankFarm';
import { MoveTutor } from '../MoveTutor/MoveTutor';
import { NatureTutor } from '../NatureTutor/NatureTutor';
import { Overworld } from '../Overworld/Overworld';
import { Pokedex } from '../Pokedex/Pokedex';
import { PokemonStorage } from '../PokemonStorage/PokemonStorage';
import { Quests } from '../Quests/Quests';
import { SeedVault } from '../SeedVault/SeedVault';
import { Settings } from '../Settings/Settings';
import { SpriteSelection } from '../SpriteSelection/SpriteSelection';
import { StarterSelection } from '../StarterSelection/StarterSelection';
import { StorageChest } from '../StorageChest/StorageChest';
import { SwarmRadar } from '../SwarmRadar/SwarmRadar';
import { Team } from '../Team/Team';
import { TrainingField } from '../TrainingField/TrainingField';
import { TravellingMerchant } from '../TravellingMerchant/TravellingMerchant';
import { VilePlumeScentResearcher } from '../VilePlumeScentResearcher/VilePlumeScentResearcher';
import { Wiki } from '../Wiki/Wiki';

export const Router = (): JSX.Element => {
	const { latestMessage, addMessage, addMultipleMessages } =
		useContext(MessageQueueContext);

	const { startingTab } = useContext(GameDataContext);

	const {
		saveFile,
		setActiveTabReducer,
		patchSaveFileReducer,
		changeHeldItemReducer,
	} = useContext(SaveFileContext);

	const {
		meta: { activeTab: savedTab, currentChallenger },
		bag: inventory,
		pokemon,
	} = saveFile;

	const team = useMemo(() => pokemon.filter((p) => p.onTeam), [pokemon]);

	const [hasReadIntro, setHasReadIntro] = useState<boolean>(
		!!window.localStorage.getItem('hasReadIntro')
	);
	const [hasReadNewestChangeLog, setHasReadNewestChangeLog] = useState<boolean>(
		!!window.localStorage.getItem(newestChangeLog)
	);

	const activeTab: RoutesType = useMemo(() => {
		if (!hasReadIntro) {
			return 'INTRO';
		}
		if (!hasReadNewestChangeLog) {
			return 'CHANGELOG';
		}
		return savedTab ?? startingTab;
	}, [hasReadIntro, hasReadNewestChangeLog, savedTab, startingTab]);

	if (activeTab === 'INTRO') {
		return <Intro setHasReadIntro={setHasReadIntro} />;
	}
	if (activeTab === 'CHANGELOG') {
		return <ChangeLog setHasReadIntro={setHasReadNewestChangeLog} />;
	}
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
	if (activeTab === 'SETTINGS_IN_GAME') {
		return <Settings backTo="MAIN" />;
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
		return <MainMenu goBack={() => setActiveTabReducer('OVERWORLD')} />;
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
				inventory={inventory}
				changeHeldItem={changeHeldItemReducer}
			/>
		);
	}
	if (activeTab === 'STORAGE') {
		return <PokemonStorage goBack={() => setActiveTabReducer('OVERWORLD')} />;
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
	if (activeTab === 'NATURE_TUTOR') {
		return <NatureTutor />;
	}
	if (activeTab === 'ABILITY_TUTOR') {
		return <AbilityTutor />;
	}
	if (activeTab === 'SWARM_RADAR') {
		return <SwarmRadar />;
	}
	if (activeTab === 'DRAGONITE_TAXI') {
		return <DragoniteTaxi />;
	}
	if (activeTab === 'MARKET') {
		return (
			<Market
				goBack={() => setActiveTabReducer('OVERWORLD')}
				navigate={setActiveTabReducer}
			/>
		);
	}
	if (activeTab === 'TRAVELLING_MERCHANT') {
		return <TravellingMerchant />;
	}
	if (activeTab === 'INTERNAL_DEX') {
		return <InternalDex />;
	}
	if (activeTab === 'BATTLE_JOURALIST') {
		return <BattleJournalist />;
	}
	if (activeTab.includes('MAP_MAKER')) {
		const mapId = activeTab.slice(10) as MapId;
		return (
			<MapEditor mapId={mapId} goBack={() => setActiveTabReducer('MAIN')} />
		);
	}

	return <Overworld />;
};
