import { Occupant } from '../interfaces/OverworldMap';
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
	//PCS start at 10000
	100001: {
		type: 'PC',
		x: 9,
		y: 0,
		map: 'testMap',
	},
	//Trainers start at 20000
	//Merchants start at 30000, they have sprite 113
	300001: {
		type: 'MERCHANT',
		x: 8,
		y: 0,
		orientation: 'UP',
		map: 'testMap',
		inventory: STANDARD_BUY_MARKET,
		dialogue: ['Get your supplies here'],
	},
};
