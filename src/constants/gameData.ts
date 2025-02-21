import { generateInventory } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { SaveFile } from '../interfaces/SaveFile';
import { EmptyStatObject } from '../interfaces/StatObject';

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
	firstMove: { name: 'thrash', usedPP: 15 },
	secondMove: { name: 'fly', usedPP: 5 },
	thirdMove: { name: 'growl', usedPP: 7 },
	fourthMove: { name: 'ice-punch', usedPP: 8 },
	damage: 0,
	nature: 'adamant',
	xp: 200,
	ability: 'air-lock',
	happiness: 70,
	stepsWalked: 0,
	heldItemName: 'potion',
	maxHp: 20,
	effortValues: EmptyStatObject,
	ppBoostedMoves: [],
};
export const testState: SaveFile = {
	sprite: '',
	badges: [],
	quests: { 'catch a pikachu': 'ACTIVE' },
	inventory: generateInventory({ 'pp-up': 3, 'pp-max': 4, 'x-attack': 7 }),
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

export const OPPO_ID = 'oppo';

export const testOpponent: OwnedPokemon = {
	dexId: 1,
	nature: 'adamant',
	ownerId: OPPO_ID,
	ball: 'poke-ball',
	damage: 0,
	firstMove: { name: 'sand-attack', usedPP: 0 },
	secondMove: { name: 'double-kick', usedPP: 0 },
	thirdMove: { name: 'fly', usedPP: 0 },
	fourthMove: { name: 'horn-drill', usedPP: 0 },
	id: '1',
	xp: 200,
	ability: 'damp',
	happiness: -1,
	stepsWalked: 0,
	maxHp: 50,
	effortValues: EmptyStatObject,
	ppBoostedMoves: [],
};

export const localStorageId = 'pokemonv7SaveFile';
