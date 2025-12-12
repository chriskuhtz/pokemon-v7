import { v4 } from 'uuid';
import { occupantHandled } from '../../../../functions/occupantHandled';
import { getRandomNature } from '../../../../interfaces/Natures';
import { OverworldMap } from '../../../../interfaces/OverworldMap';
import {
	EmptyStatObject,
	generateRandomStatObject,
} from '../../../../interfaces/StatObject';
import { shinyChance, testPokemon } from '../../gameData';

const starterBallId = 'starter-ball';
export const labyrinthLevel1Occupants: OverworldMap['occupants'] = [
	{
		type: 'POKEBALL',
		x: 12,
		y: 9,
		id: starterBallId,
		conditionFunction: (s) => !occupantHandled(s, 'starter-ball'),
		pokemon: {
			...testPokemon,
			name: 'rufflet',
			id: v4(),
			effortValues: EmptyStatObject,
			starter: true,
			firstMove: { name: 'peck', usedPP: 0 },
			secondMove: { name: 'return', usedPP: 0 },
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
			'My head is ringing',
			'i dont remember much',
			'...',
			'i think something grabbed me',
			'at least my trusty Pokemon is still here',
		],
	},
];
