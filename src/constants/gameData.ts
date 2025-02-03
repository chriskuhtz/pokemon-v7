import { generateInventory } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { SaveFile } from '../interfaces/SaveFile';

export const fps = 16;
export const baseSize = 64;
export const battleSpriteSize = baseSize * 2;
export const animationTimer = 16000 / fps;

const ownerId = 'Bear';
export const testState: SaveFile = {
	inventory: generateInventory({ 'master-ball': 10, 'ultra-ball': 20 }),
	playerId: ownerId,
	money: 5000,
	pokemon: [
		{
			dexId: 25,
			ownerId,
			id: 'bubu',
			ball: 'master-ball',
			onTeam: true,
			firstMove: { name: 'pound', usedPP: 0 },
			damage: 0,
			nature: 'adamant',
		},
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
};

export const testOpponent: OwnedPokemon = {
	dexId: 52,
	nature: 'adamant',
	ownerId: 'oppo',
	ball: 'cherish-ball',
	damage: 0,
	firstMove: { name: 'pound', usedPP: 0 },
	id: 'oppoMon',
};

export const localStorageId = 'pokemonv7SaveFile';
