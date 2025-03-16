import { generateInventory } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { CharacterLocationData, SaveFile } from '../interfaces/SaveFile';
import { EmptyStatObject } from '../interfaces/StatObject';

export const frames = 16;
export const fps = 1000 / 16;
export const battleSpriteSize = 32;
export const animationTimer = 16000 / frames;

export const testPokemon: OwnedPokemon = {
	dexId: 217,
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
};

export const startingLocation: CharacterLocationData = {
	mapId: 'camp',
	orientation: 'UP',
	forwardFoot: 'CENTER1',
	x: 5,
	y: 6,
};
export const testState: SaveFile = {
	sprite: '',
	badges: [],
	researchPoints: 0,
	quests: {
		'catch a pokemon': 'INACTIVE',
		'catch a pikachu': 'INACTIVE',
		'lure a pokemon with honey': 'INACTIVE',
		'evolve a pokemon': 'INACTIVE',
		'catch a daytime pokemon from routeN1': 'INACTIVE',
		'catch a morning pokemon from routeN1': 'INACTIVE',
		'catch a evening pokemon from routeN1': 'INACTIVE',
		'catch a nighttime pokemon from routeN1': 'INACTIVE',
		'catch a pokemon orginally found in kanto': 'INACTIVE',
	},
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
	},
	farm: { unlockedPlots: 1, plants: [] },
	campUpgrades: {
		market_1: false,
		market_2: false,
		bulletin_board: false,
	},
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
