import {
	Occupant,
	OverworldNpc,
	OverworldPokemon,
} from '../../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../../interfaces/SpriteEnum';

const whitneyBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 29,
	y: 5,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.whitney,
};

export const whitneysClefairy: OverworldPokemon = {
	type: 'POKEMON',
	dialogue: ['clef clef clef'],
	x: 28,
	y: 5,
	orientation: 'DOWN',
	dexId: 35,
	id: 'whitneys-clefairy',
	conditionFunction: (s) =>
		s.campUpgrades['invite normal pokemon expert whitney'] &&
		s.quests["catch whitney's favorite cute pokemon"] !== 'COLLECTED',
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
