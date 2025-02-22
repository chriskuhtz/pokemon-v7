import { getTimeOfDay } from '../../functions/getTimeOfDay';
import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { STANDARD_BUY_MARKET } from '../standardBuyMarket';

export const occupantNames = [
	'pc_Pokecenter_Camp',
	'merchant_Market_Camp',
	'nurse_Pokecenter_Camp',
	'kid_Camp',
	'pikachu_fan_Camp',
	'grandma_Camp',
	'oak_University',
	'gary_intro',
	'camp_to_market',
	'market_to_camp',
	'camp_to_pokecenter',
	'pokecenter_to_camp',
	'camp_to_university',
	'university_to_camp',
	'camp_to_trailer',
	'trailer_to_camp',
	'bookShelf1_university',
	'bed_trailer',
	'camp_sign',
	'to_sector1x0_sign',
	'camp_to_sector1x0',
	'sector1x0_to_camp',
] as const;
export type OccupantName = (typeof occupantNames)[number];

export const occupantsRecord: Record<OccupantName, Occupant> = {
	//items

	//PCS
	pc_Pokecenter_Camp: {
		type: 'PC',
		x: 4,
		y: 0,
		map: 'camp_pokecenter',
		approachDirection: 'UP',
		conditionFunction: () => true,
	},
	//Trainers

	//Merchants
	merchant_Market_Camp: {
		type: 'MERCHANT',
		x: 2,
		y: 0,
		orientation: 'DOWN',
		map: 'camp_market',
		inventory: STANDARD_BUY_MARKET,
		dialogue: [
			'Get your supplies here',
			'My Apologies, We only opened recently',
			'so we dont have much yet',
		],
		sprite: SpriteEnum['clerkMale'],
		conditionFunction: () => true,
	},
	//Nurses
	nurse_Pokecenter_Camp: {
		type: 'NURSE',
		x: 2,
		y: 0,
		orientation: 'DOWN',
		map: 'camp_pokecenter',
		dialogue: ['Let me heal your pokemon'],
		sprite: SpriteEnum['nurse'],
		conditionFunction: () => true,
	},
	//Bushes

	//NPCs
	kid_Camp: {
		type: 'NPC',
		x: 5,
		y: 11,
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

	pikachu_fan_Camp: {
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
		conditionFunction: (s) => s.quests['catch a pikachu'] !== 'COLLECTED',
	},
	grandma_Camp: {
		type: 'NPC',
		x: 8,
		y: 4,
		map: 'camp',
		orientation: 'DOWN',
		unhandledMessage: [
			'Your Pokemon look hungry',
			'maybe they will like these rare candies',
			'i made them myself',
		],
		handledMessage: ['did your pokemon enjoy the candies'],
		sprite: SpriteEnum['grandma2'],
		gifts: { 'rare-candy': 2 },
		conditionFunction: () => getTimeOfDay() !== 'NIGHT',
	},

	oak_University: {
		type: 'NPC',
		x: 1,
		y: 1,
		map: 'camp_university',
		orientation: 'DOWN',
		gifts: { 'poke-ball': 20 },
		unhandledMessage: [
			'Ah, the new research assistant',
			'perfect timing',
			'Since we have only just established this university outpost,',
			'we need to learn about the local pokemon.',
			'Please go to sector 1x0 and catch a pokemon there.',
		],
		handledMessage: [
			'how is the catching going?',
			'sector 1x0 is to the east of the camp',
		],
		quest: 'catch a pokemon in sector1x0',
		sprite: '136',
		conditionFunction: (s) =>
			s.quests['catch a pokemon in sector1x0'] !== 'COLLECTED',
	},
	gary_intro: {
		type: 'NPC',
		x: 18,
		y: 9,
		map: 'camp',
		orientation: 'LEFT',
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
			'The tent next to the lab is yours',
			'Its not much, but it will keep you warm and dry',
			'...Before i forget',
			'here is your starter kit',
			'smell ya later, small dog',
		],
		handledMessage: ['i bet i will find much stronger pokemon than you'],
		sprite: SpriteEnum['gary'],
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'gary_intro'),
	},

	//Portals
	camp_to_market: {
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
			mapId: 'camp_market',
		},
		conditionFunction: () => true,
	},
	market_to_camp: {
		type: 'PORTAL',
		small: true,
		map: 'camp_market',
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
	camp_to_pokecenter: {
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
			mapId: 'camp_pokecenter',
		},
		conditionFunction: () => true,
	},
	pokecenter_to_camp: {
		type: 'PORTAL',
		small: true,
		map: 'camp_pokecenter',
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
	camp_to_university: {
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
			mapId: 'camp_university',
		},
		conditionFunction: () => true,
	},
	university_to_camp: {
		type: 'PORTAL',
		small: true,
		map: 'camp_university',
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
	camp_to_trailer: {
		type: 'PORTAL',
		map: 'camp',
		x: 4,
		y: 1,

		sprite: '/mapObjects/houses/tent.png',
		portal: {
			forwardFoot: 'CENTER1',
			x: 1,
			y: 1,
			orientation: 'UP',
			mapId: 'camp_tent',
		},
		conditionFunction: () => true,
	},
	trailer_to_camp: {
		type: 'PORTAL',
		small: true,
		map: 'camp_tent',
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
	camp_to_sector1x0: {
		type: 'PORTAL',
		map: 'camp',
		x: 19,
		y: 9,

		sprite: '/mapObjects/doormat.png',
		small: true,
		portal: {
			forwardFoot: 'CENTER1',
			x: 0,
			y: 24,
			orientation: 'RIGHT',
			mapId: 'sector1x0',
		},
		conditionFunction: () => true,
	},
	sector1x0_to_camp: {
		type: 'PORTAL',
		map: 'sector1x0',
		x: 0,
		y: 24,

		sprite: '/mapObjects/doormat.png',
		small: true,
		portal: {
			forwardFoot: 'CENTER1',
			x: 19,
			y: 9,
			orientation: 'LEFT',
			mapId: 'camp',
		},
		conditionFunction: () => true,
	},
	//obstacles
	bookShelf1_university: {
		type: 'OBSTACLE',
		sprite: '/mapObjects/bookshelf.png',
		x: 0,
		y: 0,
		map: 'camp_university',
		conditionFunction: () => true,
	},
	bed_trailer: {
		small: true,
		type: 'OBSTACLE',
		sprite: '/mapObjects/mattress.png',
		x: 0,
		y: 0,
		map: 'camp_tent',
		conditionFunction: () => true,
	},
	//signs
	camp_sign: {
		map: 'camp',
		type: 'SIGN',
		x: 10,
		y: 9,
		dialogue: ['Oak Labs Research Outpost', 'Kuma Region'],
		approachDirection: 'UP',
		conditionFunction: () => true,
	},
	to_sector1x0_sign: {
		map: 'camp',
		type: 'SIGN',
		x: 18,
		y: 8,
		dialogue: ['Sector 1x0 this way', 'Beware of wild spearow'],
		approachDirection: 'UP',
		conditionFunction: () => true,
	},
};
