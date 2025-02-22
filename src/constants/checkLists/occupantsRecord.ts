import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { testOpponent } from '../gameData';
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
	200001: {
		type: 'TRAINER',
		x: 12,
		y: 3,
		map: 'meadow',
		orientation: 'LEFT',
		unhandledDialogue: ['fight me', 'big dog'],
		handledDialogue: ['you are the big dog, big dog'],
		sprite: '033',
		team: [{ ...testOpponent, dexId: 66 }],
		name: 'Sailor Bob',
	},
	200002: {
		type: 'TRAINER',
		x: 13,
		y: 3,
		map: 'meadow',
		orientation: 'RIGHT',
		unhandledDialogue: ['Watt up', 'can you feel the electricity'],
		handledDialogue: ['I short circuited'],
		sprite: '069',
		team: [
			{ ...testOpponent, dexId: 100 },
			{ ...testOpponent, dexId: 309 },
			{ ...testOpponent, dexId: 522 },
		],
		name: 'Electrician Erik',
	},
	//Merchants start at 300000,
	300001: {
		type: 'MERCHANT',
		x: 2,
		y: 0,
		orientation: 'DOWN',
		map: 'market',
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
			'some pokemon only appear in the morning!',
			'These might help you catch them',
		],
		handledDialogue: ['did you find one?'],
		sprite: '040',
		gifts: { 'quick-ball': 5 },
		quest: 'Catch a morning pokemon from the meadow',
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
	600005: {
		type: 'NPC',
		x: 16,
		y: 4,
		map: 'meadow',
		timeofDay: 'NIGHT',
		orientation: 'DOWN',
		gifts: { 'dusk-ball': 5 },
		unhandledDialogue: [
			'During the day, i work in the city',
			'I come here at night to search for zorua',
			'These Dusk balls work well at night',
		],
		quest: 'Catch a Zorua at night in the meadow',
		sprite: '080',
	},
	//Buildings start at 700000
	700001: {
		type: 'BUILDING',
		map: 'meadow',
		x: 15,
		y: 0,
		height: 1,
		width: 1,
		sprite: '/mapObjects/houses/market.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 2,
			y: 3,
			orientation: 'UP',
			mapId: 'market',
		},
	},
};
