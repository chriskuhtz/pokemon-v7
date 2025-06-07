import {
	Occupant,
	OverworldNpc,
	OverworldPokemon,
} from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const pryceBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 13,
	y: 26,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.pryce,
};

export const prycesMamoswine: OverworldPokemon = {
	type: 'POKEMON',
	dialogue: ['grrruuum'],
	x: 12,
	y: 26,
	orientation: 'DOWN',
	dexId: 473,
	id: 'pryces-mamoswine',
	conditionFunction: (s) =>
		s.campUpgrades['invite ice pokemon expert pryce'] &&
		s.quests['maximize the effort values of an ice pokemon'] !== 'COLLECTED',
};

export const pryceLine: Occupant[] = [
	{
		...pryceBase,
		id: 'pryce_1',

		unhandledMessage: [
			'In the freezing cold',
			'You and your Pokemon need to trust each other',
			'and work as a team',
		],
		handledMessage: [
			'When you work together with your pokemon, you will both grow stronger',
		],
		quest: 'maximize the effort values of an ice pokemon',
		conditionFunction: (s) =>
			s.campUpgrades['invite ice pokemon expert pryce'] &&
			s.quests['maximize the effort values of an ice pokemon'] !== 'COLLECTED',
	},
];
