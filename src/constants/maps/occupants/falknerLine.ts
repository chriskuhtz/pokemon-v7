import { Occupant, OverworldNpc } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const falknerBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 9,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.falkner,
};
export const falknerLine: Occupant[] = [
	{
		...falknerBase,
		id: 'falkner_1',

		unhandledMessage: [
			'My name is falkner, from violet city',
			'My favorite pokemon are flying types',
			'they soar through the air with complete freedom',
			'lets find out more about them',
		],
		quest: 'catch some local bird pokemon',
		conditionFunction: (s) =>
			s.campUpgrades['invite flying pokemon expert falkner'],
	},
];
