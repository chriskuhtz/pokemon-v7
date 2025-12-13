import {
	baseCampUpgrades,
	baseQuestState,
	emptyPokedex,
} from '../../constants/gameData/gameData';
import { EmptyInventory, joinInventories } from '../../interfaces/Inventory';
import { CharacterLocationData, SaveFile } from '../../interfaces/SaveFile';
import { Game } from '../../modules/Game/Game';
import { labyrinthDex } from './labyrinthDex';

const startingLocationLabyrinth: CharacterLocationData = {
	mapId: 'labyrinth_level_1',
	orientation: 'DOWN',
	forwardFoot: 'CENTER1',
	x: 10,
	y: 10,
};
const startingSaveFileLabyrinth: SaveFile = {
	sprite: 'NPC_013',
	badges: [],
	researchPoints: 0,
	quests: baseQuestState,
	bag: joinInventories(EmptyInventory, { 'berry-juice': 5 }),
	storage: EmptyInventory,
	seedVault: [],
	playerId: 'tom',
	money: 5000,
	pokemon: [],
	meta: { activeTab: 'OVERWORLD' },
	handledOccupants: [],
	lastEdited: new Date().getTime(),
	lastNurse: 'nurse_Pokecenter_Camp',
	mileStones: {
		hasEvolvedAPokemonThroughLevelUp: false,
		hasEvolvedAPokemonWithAHeldItem: false,
		hasEvolvedAPokemonWithAStone: false,
		hasCaughtAPokemonWithHoney: false,
		hasEvolvedAPokemonThroughFriendship: false,
		hasEvolvedAPokemonThatNeedsDaytime: false,
		hasEvolvedAPokemonThatNeedsNighttime: false,
		hasCraftedApricorn: false,
		hasGrownABerry: false,
		hasGrownAnApricorn: false,
		caughtFromSwarms: [],
		luredWithBerries: [],
		damageRecord: 0,
	},
	farm: { plants: [] },
	campUpgrades: baseCampUpgrades,
	pokedex: emptyPokedex,
	settings: {
		rogueLike: true,
		noRunningFromBattle: true,
		movesEditableInTeamOverview: true,
		movesLearnableInTeamOverview: true,
		fixedTeamSize: 6,
		noStorageSystem: true,
		questsTabHidden: true,
		releasePokemonInTeamOverview: true,
		hideMovementButtons: true,
	},
};
export const Labyrinth = (): JSX.Element => {
	return (
		<Game
			saveFileId="pokemonLabyrinthSaveFile"
			locationId="pokemonLabyrinthLocation"
			startingLocation={startingLocationLabyrinth}
			startingTab="OVERWORLD"
			startingRouterSequence={[]}
			startingSaveFile={startingSaveFileLabyrinth}
			allowedBaseSizes={[48]}
			internalDex={labyrinthDex}
			features={{
				settingsEditable: false,
				catchStreaks: false,
				numberOfBallsBadge: false,
			}}
			losingMessages={{
				training: 'Young Tom was never seen again ...',
				wild: 'Young Tom was never seen again ...',
				reset: 'Young Tom was never seen again ...',
			}}
		/>
	);
};
