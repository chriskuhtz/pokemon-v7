import {
	Occupant,
	OverworldNpc,
	OverworldPokemon,
} from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const clairBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 15,
	y: 35,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.clair,
};

export const clairsKingdra: OverworldPokemon = {
	type: 'POKEMON',
	dialogue: ['drat drat'],
	x: 15,
	y: 36,
	orientation: 'LEFT',
	dexId: 230,
	id: 'clairs-kingdra',
	conditionFunction: (s) =>
		s.campUpgrades['invite dragon pokemon expert clair'] &&
		s.quests['reach max. friendship with a dragon pokemon'] !== 'COLLECTED',
};

export const clairLine: Occupant[] = [
	{
		...clairBase,
		id: 'clair_1',

		unhandledMessage: [
			'I am Clair, Gym Leader of Blackthorn Town',
			'Just like my favorite dragon pokemon',
			'I dont just consider anyone my friend',
			'But if a dragon pokemon trusts you',
			'so will I',
		],
		handledMessage: ['Dragon pokemon are fierce and majestic'],
		quest: 'reach max. friendship with a dragon pokemon',
		conditionFunction: (s) =>
			s.campUpgrades['invite dragon pokemon expert clair'] &&
			s.quests['reach max. friendship with a dragon pokemon'] !== 'COLLECTED',
	},
];
