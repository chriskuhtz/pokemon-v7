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
	secondMove: { name: 'karate-chop', usedPP: 0 },
	thirdMove: { name: 'pay-day', usedPP: 0 },
	fourthMove: { name: 'swords-dance', usedPP: 0 },
	damage: 0,
	nature: 'adamant',
	xp: 100000,
	ability: 'sand-veil',
	happiness: 70,
	stepsWalked: 0,
};
export const testState: SaveFile = {
	inventory: generateInventory({
		'master-ball': 10,
		'ultra-ball': 20,
		'safari-ball': 10,
		'poke-ball': 10,
		'great-ball': 10,
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
	lastNurse: 400001,
};

export const testOpponent: OwnedPokemon = {
	dexId: 1,
	nature: 'adamant',
	ownerId: 'oppo',
	ball: 'poke-ball',
	damage: 0,
	firstMove: { name: 'swords-dance', usedPP: 0 },
	// secondMove: { name: 'thunder-punch', usedPP: 0 },
	// thirdMove: { name: 'ice-punch', usedPP: 0 },
	// fourthMove: { name: 'comet-punch', usedPP: 0 },
	id: '1',
	xp: 200000,
	ability: 'volt-absorb',
	happiness: -1,
	stepsWalked: 0,
};

export const localStorageId = 'pokemonv7SaveFile';
