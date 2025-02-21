import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { STANDARD_BUY_MARKET } from '../standardBuyMarket';

export const occupantsRecord: Record<number, Occupant> = {
	//items start at 0
	0: {
		type: 'ITEM',
		item: 'poke-ball',
		x: 4,
		y: 0,
		amount: 1,
		map: 'meadow',
	},
	1: {
		type: 'ITEM',
		item: 'potion',
		x: 9,
		y: 1,
		amount: 2,
		map: 'meadow',
	},
	2: {
		type: 'HIDDEN_ITEM',
		item: 'antidote',
		x: 1,
		y: 1,
		amount: 1,
		map: 'meadow',
	},
	//PCS start at 100000
	100001: {
		type: 'PC',
		x: 9,
		y: 0,
		map: 'meadow',
		approachDirection: 'UP',
	},
	//Trainers start at 200000

	//Merchants start at 300000,
	300001: {
		type: 'MERCHANT',
		x: 6,
		y: 0,
		orientation: 'DOWN',
		map: 'meadow',
		inventory: STANDARD_BUY_MARKET,
		dialogue: ['Get your supplies here'],
		sprite: SpriteEnum['clerkMale'],
	},

	//Nurses start at 400000,
	400001: {
		type: 'NURSE',
		x: 7,
		y: 0,
		orientation: 'DOWN',
		map: 'meadow',
		dialogue: ['Let me heal your pokemon'],
		sprite: SpriteEnum['nurse'],
	},
	//Bushes start at 500000,
	500001: {
		type: 'BUSH',
		x: 6,
		y: 1,
		map: 'meadow',
	},
	//NPCs start at 600000
	600001: {
		type: 'NPC',
		x: 5,
		y: 7,
		map: 'meadow',
		orientation: 'UP',
		unhandledDialogue: ["i'll try spinning", 'thats a good trick'],
		sprite: '060',
		movement: { path: ['UP', 'RIGHT', 'LEFT', 'DOWN'], currentStep: 0 },
	},
	600002: {
		type: 'NPC',
		x: 8,
		y: 4,
		map: 'meadow',
		orientation: 'LEFT',
		unhandledDialogue: [
			'did you know?',
			'some pokemon only appear at night!',
			'These might help you',
		],
		handledDialogue: ['did you find one?'],
		sprite: '040',
		gifts: { 'dusk-ball': 5 },
		quest: 'Catch a nocturnal pokemon from the meadow',
		movement: { path: ['RIGHT', 'LEFT'], currentStep: 0 },
	},
	600003: {
		type: 'NPC',
		x: 10,
		y: 5,
		map: 'meadow',
		orientation: 'LEFT',
		unhandledDialogue: ['Running in circles is dank af'],
		sprite: '070',
		movement: {
			path: ['RIGHT', 'RIGHT', 'DOWN', 'DOWN', 'LEFT', 'LEFT', 'UP', 'UP'],
			currentStep: 0,
		},
	},
	600004: {
		type: 'NPC',
		x: 14,
		y: 0,
		map: 'meadow',
		orientation: 'DOWN',
		unhandledDialogue: [
			'Your Pokemon look hungry',
			'maybe they will like these',
			'i made them myself',
		],
		handledDialogue: ['did your pokemon enjoy the candies'],
		sprite: '077',
		gifts: { 'rare-candy': 10 },
	},
};
