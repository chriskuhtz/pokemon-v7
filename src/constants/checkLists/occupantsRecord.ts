import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { STANDARD_BUY_MARKET } from '../standardBuyMarket';

export const occupantsRecord: Record<number, Occupant> = {
	//items start at 0
	0: {
		type: 'ITEM',
		item: 'master-ball',
		x: 4,
		y: 0,
		amount: 3,
		map: 'testMap',
	},
	1: {
		type: 'ITEM',
		item: 'master-ball',
		x: 9,
		y: 1,
		amount: 7,
		map: 'testMap',
	},
	2: {
		type: 'HIDDEN_ITEM',
		item: 'antidote',
		x: 1,
		y: 1,
		amount: 1,
		map: 'testMap',
	},
	//PCS start at 100000
	100001: {
		type: 'PC',
		x: 9,
		y: 0,
		map: 'testMap',
		approachDirection: 'UP',
	},
	//Trainers start at 200000

	//Merchants start at 300000,
	300001: {
		type: 'MERCHANT',
		x: 6,
		y: 0,
		orientation: 'DOWN',
		map: 'testMap',
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
		map: 'testMap',
		dialogue: ['Let me heal your pokemon'],
		sprite: SpriteEnum['nurse'],
	},
	//Bushes start at 500000,
	500001: {
		type: 'BUSH',
		x: 6,
		y: 1,
		map: 'testMap',
	},
	//NPCs start at 600000
	600001: {
		type: 'NPC',
		x: 5,
		y: 7,
		map: 'testMap',
		orientation: 'UP',
		dialogue: ["i'll try spinning", 'thats a good trick'],
		sprite: '060',
		movememt: { path: ['UP', 'RIGHT', 'LEFT', 'DOWN'], currentStep: 0 },
	},
	600002: {
		type: 'NPC',
		x: 8,
		y: 4,
		map: 'testMap',
		orientation: 'LEFT',
		dialogue: ['did you know', 'some pokemon only appear at night'],
		sprite: '040',
		movememt: { path: ['RIGHT', 'LEFT'], currentStep: 0 },
	},
	600003: {
		type: 'NPC',
		x: 10,
		y: 5,
		map: 'testMap',
		orientation: 'LEFT',
		dialogue: ['Running in circles is dank af'],
		sprite: '070',
		movememt: {
			path: ['RIGHT', 'RIGHT', 'DOWN', 'DOWN', 'LEFT', 'LEFT', 'UP', 'UP'],
			currentStep: 0,
		},
	},
};
