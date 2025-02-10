import { Occupant } from '../interfaces/OverworldMap';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import { STANDARD_BUY_MARKET } from './standardBuyMarket';

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
	//PCS start at 100000
	100001: {
		type: 'PC',
		x: 9,
		y: 0,
		map: 'testMap',
	},
	//Trainers start at 200000
	//Merchants start at 300000,
	300001: {
		type: 'MERCHANT',
		x: 8,
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
};
