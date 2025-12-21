import { v4 } from 'uuid';
import {
	makeOverworldChest,
	makeOverworldItem,
} from '../../../../../functions/makeOverworldItem';
import { occupantHandled } from '../../../../../functions/occupantHandled';
import { ItemType } from '../../../../../interfaces/Item';
import { getRandomNature } from '../../../../../interfaces/Natures';
import { OverworldMap } from '../../../../../interfaces/OverworldMap';
import {
	EmptyStatObject,
	generateRandomStatObject,
} from '../../../../../interfaces/StatObject';
import { shinyChance, testPokemon } from '../../../gameData';

const starterBallId = 'lab1-starter-ball';

const firstDialogue = 'lab1-first-dialogue';
const secondDialogue = 'lab1-second-dialogue';
const thirdDialogue = 'lab1-third-dialogue';

const firstHiddenItem = 'lab1-first-hidden-item';

const firstItem = 'lab1-first-item';
const secondItem = 'lab1-second-item';

const firstChallenger = 'lab1-first-challenger';
const secondChallenger = 'lab1-second-challenger';
const thirdChallenger = 'lab1-third-challenger';

const itemOptions: ItemType[] = [
	'poke-ball',
	'potion',
	'pecha-berry',
	'berry-juice',
	'oran-berry',
	'ether',
	'sharp-beak',
	'miracle-seed',
	'black-belt',
];

export const labyrinthLevel1Occupants: OverworldMap['occupants'] = [
	{
		type: 'POKEBALL',
		x: 12,
		y: 9,
		id: starterBallId,
		conditionFunction: (s) => !occupantHandled(s, starterBallId),
		pokemon: {
			...testPokemon,
			name: 'rufflet',
			id: v4(),
			effortValues: EmptyStatObject,
			starter: true,
			firstMove: { name: 'peck', usedPP: 0 },
			secondMove: { name: 'quick-attack', usedPP: 0 },
			thirdMove: { name: 'fury-attack', usedPP: 0 },
			fourthMove: { name: 'leer', usedPP: 0 },
			unlockedMoves: ['peck', 'quick-attack', 'fury-attack', 'leer'],
			gender: 'MALE',
			nickname: 'Wilson',
			caughtOnMap: 'labyrinth_level_1',
			shiny: Math.random() / 10 < shinyChance,
			nature: getRandomNature(),
			intrinsicValues: generateRandomStatObject(31),
			ball: 'luxury-ball',
			heldItemName: 'sitrus-berry',
			ability: 'keen-eye',
		},
		dialogue: [
			'hmmm',
			'My head is still ringing',
			'Must have passed out',
			'i dont remember much',
			'...',
			'at least my trusty Pokemon is still here',
		],
	},
	{
		type: 'ON_STEP_DIALOGUE',
		x: 5,
		y: 9,
		dialogue: [
			'Ok,',
			'Lets find our way out of this forest!',
			'We must be careful,',
			'I dont see any poke centers nearby',
		],
		id: firstDialogue,
		conditionFunction: (s) => !occupantHandled(s, firstDialogue),
	},
	{
		type: 'ON_STEP_DIALOGUE',
		x: 13,
		y: 6,
		dialogue: [
			'I wonder what happened',
			'the last thing i remember',
			'is sneaking aboard the expedition zeppelin',
			'to search for the legendary pokemon',
		],
		id: secondDialogue,
		conditionFunction: (s) => !occupantHandled(s, secondDialogue),
	},
	{
		type: 'ON_STEP_DIALOGUE',
		x: 1,
		y: 12,
		dialogue: [
			'There is something over there',
			'looks like a supply crate from the expedition?',
		],
		id: thirdDialogue,
		conditionFunction: (s) => !occupantHandled(s, thirdDialogue),
	},
	{
		type: 'HIDDEN_ITEM',
		x: 9,
		y: 4,
		id: firstHiddenItem,
		item: 'poke-ball',
		amount: 1,
		conditionFunction: (s) => !occupantHandled(s, firstHiddenItem),
	},
	makeOverworldChest({
		x: 3,
		y: 1,
		contents: itemOptions,
		mapId: 'labyrinth_level_1',
	}),
	makeOverworldChest({
		x: 14,
		y: 18,
		contents: itemOptions,
		mapId: 'labyrinth_level_1',
	}),
	makeOverworldChest({
		x: 18,
		y: 1,
		contents: itemOptions,
		mapId: 'labyrinth_level_1',
	}),
	makeOverworldChest({
		x: 5,
		y: 18,
		contents: itemOptions,
		mapId: 'labyrinth_level_1',
	}),
	{
		type: 'ITEM',
		x: 4,
		y: 12,
		id: firstItem,
		item: 'sitrus-berry',
		amount: 1,
		conditionFunction: (s) => !occupantHandled(s, firstItem),
	},
	{
		type: 'POKEMON',
		dexId: 56,
		x: 4,
		y: 18,
		orientation: 'RIGHT',
		id: firstChallenger,
		conditionFunction: (s) => !occupantHandled(s, firstChallenger),
		dialogue: ['Mankey is trying to open the supply chest', 'You startled it'],
		encounter: {
			name: 'mankey',
			maxXp: 8 * 8 * 8,
			minXp: 8 * 8 * 8,
			rarity: 'common',
		},
	},
	{
		type: 'POKEMON',
		dexId: 299,
		x: 9,
		y: 17,
		orientation: 'RIGHT',
		id: secondChallenger,
		conditionFunction: (s) => !occupantHandled(s, secondChallenger),
		dialogue: ['...'],
		encounter: {
			name: 'nosepass',
			maxXp: 11 * 11 * 11,
			minXp: 11 * 11 * 11,
			rarity: 'common',
		},
	},

	{
		type: 'ITEM',
		x: 6,
		y: 16,
		id: secondItem,
		item: 'lava-cookie',
		amount: 2,
		conditionFunction: (s) => !occupantHandled(s, secondItem),
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 8,
		y: 19,
		id: 'to-labyrinth2',
		portal: {
			mapId: 'labyrinth_level_2',
			x: 5,
			y: 1,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
	},
	{
		type: 'POKEMON',
		dexId: 17,
		x: 15,
		y: 13,
		orientation: 'DOWN',
		id: thirdChallenger,
		conditionFunction: (s) => !occupantHandled(s, thirdChallenger),
		dialogue: ['pidgeotto is protecting a strange egg'],
		encounter: {
			name: 'pidgeotto',
			maxXp: 8 * 8 * 8,
			minXp: 8 * 8 * 8,
			rarity: 'common',
		},
	},
	makeOverworldItem({
		x: 15,
		y: 12,
		amount: 1,
		mapId: 'labyrinth_level_1',
		item: 'lucky-egg',
	}),
	{
		type: 'BUSH',
		x: 5,
		y: 17,
		id: 'lab-1-bush-1',
		conditionFunction: (s) => !occupantHandled(s, 'lab-1-bush-1'),
	},
];
