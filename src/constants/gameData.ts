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
	ball: 'poke-ball',
	onTeam: true,
	firstMove: { name: 'tackle', usedPP: 15 },
	damage: 0,
	nature: 'adamant',
	xp: 200,
	ability: 'air-lock',
	happiness: 70,
	stepsWalked: 0,
	heldItemName: 'berry-juice',
	maxHp: 20,
	effortValues: EmptyStatObject,
	ppBoostedMoves: [],
	caughtOnMap: 'camp',
};
export const testState: SaveFile = {
	sprite: '',
	badges: [],
	quests: {
		'catch a pokemon in sector1x0': 'INACTIVE',
		'catch a pikachu': 'INACTIVE',
	},
	inventory: generateInventory({}),
	playerId: '',
	money: 5000,
	pokemon: [],
	meta: {
		activeTab: 'MAIN',
	},
	location: {
		mapId: 'camp',
		orientation: 'RIGHT',
		forwardFoot: 'CENTER1',
		x: 1,
		y: 5,
	},
	handledOccupants: [],
	lastEdited: new Date().getTime(),
	lastNurse: 'nurse_Pokecenter_Camp',
};

export const OPPO_ID = 'oppo';

export const testOpponent: OwnedPokemon = {
	dexId: 1,
	nature: 'adamant',
	ownerId: OPPO_ID,
	ball: 'poke-ball',
	damage: 0,
	firstMove: { name: 'scratch', usedPP: 0 },
	secondMove: { name: 'growl', usedPP: 0 },
	thirdMove: { name: 'pound', usedPP: 0 },
	fourthMove: { name: 'leer', usedPP: 0 },
	id: '1',
	xp: 200,
	ability: 'damp',
	happiness: -1,
	stepsWalked: 0,
	maxHp: 50,
	effortValues: EmptyStatObject,
	ppBoostedMoves: [],
	caughtOnMap: 'camp',
};

export const localStorageId = 'pokemonv7SaveFile';
