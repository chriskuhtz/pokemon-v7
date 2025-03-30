import { OverworldNpc, Occupant } from '../../../interfaces/OverworldMap';
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

		unhandledMessage: ['BIRD'],
		conditionFunction: (s) =>
			s.campUpgrades['invite flying pokemon expert falkner'],
	},
];
