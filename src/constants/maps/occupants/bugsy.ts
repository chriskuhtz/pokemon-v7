import { OverworldNpc } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

export const bugsy: OverworldNpc = {
	type: 'NPC',
	x: 10,
	y: 3,
	orientation: 'DOWN',
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
