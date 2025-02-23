import { getTimeOfDay } from '../../functions/getTimeOfDay';
import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { STANDARD_BUY_MARKET } from '../standardBuyMarket';

export const occupantsRecord: Record<number, Occupant> = {
	//items start at 0

	//PCS start at 100000
	100001: {
		type: 'PC',
		x: 4,
		y: 0,
		map: 'pokecenter_meadow',
		approachDirection: 'UP',
		conditionFunction: () => true,
	},
	//Trainers start at 200000

	//Merchants start at 300000,
	300001: {
		type: 'MERCHANT',
		x: 2,
		y: 0,
		orientation: 'DOWN',
		map: 'market_meadow',
		inventory: STANDARD_BUY_MARKET,
		dialogue: [
			'Get your supplies here',
			'My Apologies, We only opened recently',
			'so we dont have much yet',
		],
		sprite: SpriteEnum['clerkMale'],
		conditionFunction: () => true,
	},
	//Nurses start at 400000,
	400001: {
		type: 'NURSE',
		x: 2,
		y: 0,
		orientation: 'DOWN',
		map: 'pokecenter_meadow',
		dialogue: ['Let me heal your pokemon'],
		sprite: SpriteEnum['nurse'],
		conditionFunction: () => true,
	},
	//Bushes start at 500000,

	//NPCs start at 600000
	600001: {
		type: 'NPC',
		x: 5,
		y: 4,
		map: 'camp',
		orientation: 'UP',
		unhandledMessage: [
			'Pokemon Trainers compete with each other',
			'Can you become the best of them all?',
		],
		handledMessage: ['I cant wait to grow up and become a trainer'],
		sprite: SpriteEnum['boy'],
		conditionFunction: () => getTimeOfDay() !== 'NIGHT',
	},

	600003: {
		type: 'NPC',
		x: 10,
		y: 5,
		map: 'camp',
		orientation: 'LEFT',
		unhandledMessage: ['Have you seen a little yellow mouse?'],
		quest: 'catch a pikachu',
		sprite: SpriteEnum['lass1'],
		movement: {
			path: ['RIGHT', 'RIGHT', 'DOWN', 'DOWN', 'LEFT', 'LEFT', 'UP', 'UP'],
			currentStep: 0,
		},
		conditionFunction: () => true,
	},
	600004: {
		type: 'NPC',
		x: 6,
		y: 4,
		map: 'camp',
		orientation: 'UP',
		unhandledMessage: [
			'Your Pokemon look hungry',
			'maybe they will like these',
			'i made them myself',
		],
		handledMessage: ['did your pokemon enjoy the candies'],
		sprite: SpriteEnum['grandma2'],
		gifts: { 'rare-candy': 2 },
		quest: 'Train a Pokemon to lvl 10',
		conditionFunction: () => getTimeOfDay() !== 'NIGHT',
	},

	600006: {
		type: 'NPC',
		x: 1,
		y: 1,
		map: 'university_meadow',
		orientation: 'DOWN',
		gifts: { 'poke-ball': 20 },
		unhandledMessage: [
			'Ah, the new research assistant',
			'perfect timing',
			'Since we have only just established this university outpost,',
			'we need to learn about the local pokemon',
			'Can you catch 5 different species?',
		],
		handledMessage: ['how is the catching going?'],
		quest: 'Catch five different pokemon',
		sprite: '136',
		conditionFunction: () => true,
	},
	600007: {
		type: 'NPC',
		x: 4,
		y: 2,
		map: 'camp',
		orientation: 'DOWN',
		gifts: {
			repel: 5,
			'poke-ball': 10,
			potion: 5,
		},
		unhandledMessage: [
			'Nice to meet you, new guy',
			'I am Gary, the other research assistant',
			'Professor Oak is my Grandpa',
			'So i am basically your boss!',
			'This trailer will be your home',
			'Its not much, but it will keep you warm and dry',
			'...Before i forget',
			'here is your starter kit',
			'smell ya later, small dog',
		],
		handledMessage: ['i bet i will find much stronger pokemon than you'],
		sprite: SpriteEnum['gary'],
		conditionFunction: (s) => !s.handledOccupants.some((h) => h.id === 600007),
	},

	//Portals start at 700000
	700001: {
		type: 'PORTAL',
		map: 'camp',
		x: 2,
		y: 1,

		sprite: '/mapObjects/houses/market.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 2,
			y: 3,
			orientation: 'UP',
			mapId: 'market_meadow',
		},
		conditionFunction: () => true,
	},
	700002: {
		type: 'PORTAL',
		small: true,
		map: 'market_meadow',
		x: 2,
		y: 3,
		sprite: '/mapObjects/doormat.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 2,
			y: 2,
			orientation: 'DOWN',
			mapId: 'camp',
		},
		conditionFunction: () => true,
	},
	700003: {
		type: 'PORTAL',
		map: 'camp',
		x: 1,
		y: 1,

		sprite: '/mapObjects/houses/pokemonCenter.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 2,
			y: 3,
			orientation: 'UP',
			mapId: 'pokecenter_meadow',
		},
		conditionFunction: () => true,
	},
	700004: {
		type: 'PORTAL',
		small: true,
		map: 'pokecenter_meadow',
		x: 2,
		y: 3,
		sprite: '/mapObjects/doormat.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 1,
			y: 2,
			orientation: 'DOWN',
			mapId: 'camp',
		},
		conditionFunction: () => true,
	},
	700005: {
		type: 'PORTAL',
		map: 'camp',
		x: 3,
		y: 1,

		sprite: '/mapObjects/houses/blueRoof.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 4,
			y: 7,
			orientation: 'UP',
			mapId: 'university_meadow',
		},
		conditionFunction: () => true,
	},
	700006: {
		type: 'PORTAL',
		small: true,
		map: 'university_meadow',
		x: 4,
		y: 7,
		sprite: '/mapObjects/doormat.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 3,
			y: 2,
			orientation: 'DOWN',
			mapId: 'camp',
		},
		conditionFunction: () => true,
	},
	700007: {
		type: 'PORTAL',
		map: 'camp',
		x: 4,
		y: 1,

		sprite: '/mapObjects/houses/trailer.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 1,
			y: 1,
			orientation: 'UP',
			mapId: 'trailer_meadow',
		},
		conditionFunction: () => true,
	},
	700008: {
		type: 'PORTAL',
		small: true,
		map: 'trailer_meadow',
		x: 1,
		y: 1,
		sprite: '/mapObjects/doormat.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 4,
			y: 2,
			orientation: 'DOWN',
			mapId: 'camp',
		},
		conditionFunction: () => true,
	},
	//obstacles start at 800000

	800013: {
		type: 'OBSTACLE',
		sprite: '/mapObjects/bookshelf.png',
		x: 0,
		y: 0,
		map: 'university_meadow',
		conditionFunction: () => true,
	},
	800014: {
		type: 'OBSTACLE',
		sprite: '/mapObjects/mattress.png',
		x: 0,
		y: 0,
		map: 'trailer_meadow',
		conditionFunction: () => true,
	},

	//signs start at 900000
	900001: {
		map: 'camp',
		type: 'SIGN',
		x: 7,
		y: 1,
		dialogue: ['Oak Labs Research Outpost', 'Kuma Region'],
		approachDirection: 'UP',
		conditionFunction: () => true,
	},
};
