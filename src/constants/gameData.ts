import { generateInventory } from '../interfaces/Inventory';
import { OverworldMap } from '../interfaces/OverworldMap';
import { SaveFile } from '../interfaces/SaveFile';

export const fps = 32;
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
		},
	],
	meta: {
		activeTab: 'MAIN',
	},
	location: {
		orientation: 'RIGHT',
		forwardFoot: 'CENTER1',
		x: 0,
		y: 0,
	},
};

export const localStorageId = 'pokemonv7SaveFile';

export const testMap: OverworldMap = {
	backgroundTile: { x: 103, y: 1 },
	width: 5,
	height: 1,
	tileMap: [[]],
};
