import {
	baseCampUpgrades,
	baseQuestState,
	emptyPokedex,
} from '../../constants/gameData/gameData';
import { EmptyInventory } from '../../interfaces/Inventory';
import { SaveFile } from '../../interfaces/SaveFile';

export const startingSaveFileLabyrinth: SaveFile = {
	sprite: 'NPC_013',
	badges: [],
	researchPoints: 0,
	quests: baseQuestState,
	bag: EmptyInventory,
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
		hideMovementButtons: true,
	},
};
