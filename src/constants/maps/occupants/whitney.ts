import { Occupant, OverworldNpc } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const whitneyBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 11,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.whitney,
};

//catch sentret

export const whitneyLine: Occupant[] = [
	{
		...whitneyBase,
		id: 'whitney_1',

		unhandledMessage: [
			"Hiyaaa, i'm Whitney",
			'...',
			'Like, Pokemon are just the cutest',
			'Dont you think?',
		],
		handledMessage: [
			'Clefairy is the cutest...',
			'...Or Jigglypuff',
			'...or maybe a pikachu in a pretty dress?',
			'...cant forget about vulpix',
		],
		quest: "catch whitney's favorite cute pokemon",
		conditionFunction: (s) =>
			s.campUpgrades['invite normal pokemon expert whitney'] &&
			s.quests["catch whitney's favorite cute pokemon"] !== 'COLLECTED',
	},
];
