import {
	baseCampUpgrades,
	baseQuestState,
	emptyPokedex,
} from '../../constants/gameData/gameData';
import { EmptyInventory } from '../../interfaces/Inventory';
import { CharacterLocationData, SaveFile } from '../../interfaces/SaveFile';
import { Game } from '../../modules/Game/Game';

const startingLocationLabyrinth: CharacterLocationData = {
	mapId: 'caveW1',
	orientation: 'DOWN',
	forwardFoot: 'CENTER1',
	x: 20,
	y: 18,
};
const startingSaveFileLabyrinth: SaveFile = {
	sprite: 'NPC_013',
	badges: [],
	researchPoints: 0,
	quests: baseQuestState,
	bag: EmptyInventory,
	storage: EmptyInventory,
	seedVault: [],
	playerId: 'tim',
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
		/>
	);
};
