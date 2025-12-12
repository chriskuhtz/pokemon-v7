import {
	OverworldNpc,
	OverworldPokemon,
} from '../../../../interfaces/Occupant';
import { SpriteEnum } from '../../../../interfaces/SpriteEnum';

export const bugsy: OverworldNpc = {
	type: 'NPC',
	x: 27,
	y: 19,
	orientation: 'LEFT',
	id: 'bugsy',
	conditionFunction: (s) =>
		!!(
			s.mileStones.hasReportedBug &&
			!s.handledOccupants.some((h) => h.id === 'bugsy')
		),
	sprite: SpriteEnum.bugsy,
	quest: 'report a bug',
	unhandledMessage: [
		'Thank you for reporting a bug',
		'people like you make indie game development possible',
		'would you like to battle at the training field?',
	],
};

export const bugsysScyther: OverworldPokemon = {
	type: 'POKEMON',
	dialogue: ['scy scy'],
	x: 27,
	y: 20,
	orientation: 'LEFT',
	dexId: 123,
	id: 'bugsys-scyther',
	conditionFunction: (s) =>
		!!(
			s.mileStones.hasReportedBug &&
			!s.handledOccupants.some((h) => h.id === 'bugsy')
		),
};
