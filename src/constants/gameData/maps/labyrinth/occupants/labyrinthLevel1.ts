import { v4 } from 'uuid';
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

const firstRandomItem = 'lab1-first-random-item';
const secondRandomItem = 'lab1-second-random-item';
const thirdRandomItem = 'lab1-third-random-item';
const fourthRandomItem = 'lab1-fourth-random-item';

const firstChallenger = 'lab1-first-challenger';
const secondChallenger = 'lab1-second-challenger';

const labyrinthSuccess = 'labyrinth-success';

const itemOptions: ItemType[] = [
	'ether',
	'pecha-berry',
	'berry-juice',
	'rare-candy',
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

			unlockedMoves: ['peck'],
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
	{
		type: 'RANDOM_ITEM',
		options: itemOptions,
		amount: 2,
		x: 3,
		y: 1,
		id: firstRandomItem,
		conditionFunction: (s) => !occupantHandled(s, firstRandomItem),
	},
	{
		type: 'RANDOM_ITEM',
		options: itemOptions,
		amount: 3,
		x: 14,
		y: 18,
		id: secondRandomItem,
		conditionFunction: (s) => !occupantHandled(s, secondRandomItem),
	},
	{
		type: 'RANDOM_ITEM',
		options: ['poke-ball'],
		amount: 5,
		x: 5,
		y: 18,
		id: thirdRandomItem,
		conditionFunction: (s) => !occupantHandled(s, thirdRandomItem),
	},
	{
		type: 'RANDOM_ITEM',
		options: itemOptions,
		amount: 2,
		x: 18,
		y: 1,
		id: fourthRandomItem,
		conditionFunction: (s) => !occupantHandled(s, fourthRandomItem),
	},
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
			maxXp: 10 * 10 * 10,
			minXp: 10 * 10 * 10,
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
		x: 8,
		y: 19,
		type: 'ON_STEP_ROUTER',
		route: 'LABYRINTH_SUCCESS',
		id: labyrinthSuccess,
		conditionFunction: () => true,
	},
];
