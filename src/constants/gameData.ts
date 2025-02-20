import { v4 } from 'uuid';
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
	firstMove: { name: 'swords-dance', usedPP: 15 },
	secondMove: { name: 'double-slap', usedPP: 5 },
	thirdMove: { name: 'whirlwind', usedPP: 7 },
	fourthMove: { name: 'ice-punch', usedPP: 8 },
	damage: 0,
	nature: 'adamant',
	xp: 200,
	ability: 'color-change',
	happiness: 70,
	stepsWalked: 0,
	heldItemName: 'potion',
	maxHp: 20,
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
		revive: 10,
		elixir: 5,
		ether: 5,
	}),
	playerId: '',
	money: 5000,
	pokemon: [
		{ ...testPokemon, dexId: 87, id: v4() },
		{ ...testPokemon, dexId: 153, id: v4() },
	],
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

export const OPPO_ID = 'oppo';

export const testOpponent: OwnedPokemon = {
	dexId: 1,
	nature: 'adamant',
	ownerId: OPPO_ID,
	ball: 'poke-ball',
	damage: 0,
	firstMove: { name: 'pound', usedPP: 0 },
	id: '1',
	xp: 200,
	ability: 'air-lock',
	happiness: -1,
	stepsWalked: 0,
	maxHp: 50,
};

export const localStorageId = 'pokemonv7SaveFile';
