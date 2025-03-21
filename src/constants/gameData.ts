import { generateInventory } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { QuestStatus } from '../interfaces/Quest';
import { CharacterLocationData, SaveFile } from '../interfaces/SaveFile';
import { EmptyStatObject } from '../interfaces/StatObject';
import { CampUpgrade, campUpgradeNames } from './checkLists/campUpgrades';
import { QuestName, QuestsRecord } from './checkLists/questsRecord';

export const frames = 16;
export const fps = 1000 / 16;
export const battleSpriteSize = 32;
export const animationTimer = 16000 / frames;
export const ONE_HOUR = 3600000;
export const ONE_DAY = ONE_HOUR * 24;

export const testPokemon: OwnedPokemon = {
	name: 'teddiursa',
	gender: 'MALE',
	ownerId: 'test',
	id: 'bingo',
	ball: 'poke-ball',
	onTeam: true,
	firstMove: { name: 'tackle', usedPP: 0 },
	damage: 0,
	nature: 'adamant',
	xp: 125,
	ability: 'air-lock',
	happiness: 70,
	stepsWalked: 0,
	heldItemName: 'berry-juice',
	maxHp: 20,
	effortValues: EmptyStatObject,
	ppBoostedMoves: [],
	caughtOnMap: 'camp',
	weightModifier: Math.random(),
};

export const startingLocation: CharacterLocationData = {
	mapId: 'camp',
	orientation: 'UP',
	forwardFoot: 'CENTER1',
	x: 5,
	y: 6,
};

const baseQuestState: Record<QuestName, QuestStatus> = Object.fromEntries(
	Object.keys(QuestsRecord).map((key) => [key, 'INACTIVE'])
) as Record<QuestName, QuestStatus>;

const baseCampUpgrades: Record<CampUpgrade, boolean> = Object.fromEntries(
	//campUpgradeNames.map((key) => [key, false])
	campUpgradeNames.map((key) => [key, true])
) as Record<CampUpgrade, boolean>;

export const testState: SaveFile = {
	sprite: '',
	badges: [],
	researchPoints: 0,
	quests: baseQuestState,
	inventory: generateInventory({}),
	playerId: '',
	money: 5000,
	pokemon: [],
	meta: {
		activeTab: 'MAIN',
	},
	location: startingLocation,
	handledOccupants: [],
	lastEdited: new Date().getTime(),
	lastNurse: 'nurse_Pokecenter_Camp',
	mileStones: {
		hasEvolvedAPokemon: false,
		hasCaughtAPokemonWithHoney: false,
		hasCraftedApricorn: false,
		hasGrownABerry: false,
		hasGrownAnApricorn: false,
	},
	farm: { plants: [] },
	campUpgrades: baseCampUpgrades,
};

export const localStorageId = 'pokemonv7SaveFile';
