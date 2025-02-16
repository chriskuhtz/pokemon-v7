import { generateInventory } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { SaveFile } from '../interfaces/SaveFile';

export const fps = 16;
export const baseSize = 64;
export const battleSpriteSize = baseSize * 2;
export const animationTimer = 16000 / fps;

export const testPokemon: OwnedPokemon = {
	dexId: 217,
	ownerId: 'test',
	id: 'bingo',
	ball: 'master-ball',
	onTeam: true,
	firstMove: { name: 'razor-wind', usedPP: 0 },
	secondMove: { name: 'take-down', usedPP: 0 },
	thirdMove: { name: 'double-kick', usedPP: 0 },
	fourthMove: { name: 'swords-dance', usedPP: 0 },
	damage: 0,
	nature: 'adamant',
	xp: 200,
	ability: 'suction-cups',
	happiness: 70,
	stepsWalked: 0,
	heldItemName: 'potion',
};
export const testState: SaveFile = {
	badges: ['boulder-badge'],
	quests: { 'catch a pikachu': 'ACTIVE' },
	inventory: generateInventory({
		'master-ball': 10,
		'ultra-ball': 20,
		'safari-ball': 10,
		'poke-ball': 10,
		'great-ball': 10,
		potion: 10,
		antidote: 10,
	}),
	playerId: '',
	money: 5000,
	pokemon: [],
	meta: {
		activeTab: 'MAIN',
	},
	location: {
		mapId: 'testMap',
		orientation: 'RIGHT',
		forwardFoot: 'CENTER1',
		x: 0,
		y: 0,
	},
	collectedItems: [],
	cutBushes: [],
	lastEdited: new Date().getTime(),
	lastNurse: 400001,
};

export const testOpponent: OwnedPokemon = {
	dexId: 1,
	nature: 'adamant',
	ownerId: 'oppo',
	ball: 'poke-ball',
	damage: 0,
	firstMove: { name: 'wing-attack', usedPP: 0 },
	id: '1',
	xp: 200,
	ability: 'volt-absorb',
	happiness: -1,
	stepsWalked: 0,
};

export const localStorageId = 'pokemonv7SaveFile';
