import {
	baseCampUpgrades,
	baseQuestState,
	emptyPokedex,
} from '../../constants/gameData/gameData';
import { EmptyInventory, generateInventory } from '../../interfaces/Inventory';
import { SaveFile } from '../../interfaces/SaveFile';

export const startingSaveFileKuma: SaveFile = {
	sprite: '',
	badges: [],
	researchPoints: 0,
	quests: baseQuestState,

	bag: EmptyInventory,
	storage: generateInventory({
		'berry-juice': 5,
		'poke-ball': 20,
	}),

	seedVault: [],
	playerId: '',
	money: 5000,
	pokemon: [],
	meta: {
		activeTab: 'MAIN',
	},
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
