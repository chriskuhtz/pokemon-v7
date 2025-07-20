import { Occupant, OverworldNpc } from '../../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../../interfaces/SpriteEnum';

const oakBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 10,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.oak,
};
export const oakLine: Occupant[] = [
	{
		...oakBase,
		id: 'oak_1',
		unhandledMessage: [
			'Ah, you made it',
			'Outside of the fence, the wild Kuma Region awaits',
			'If your Pokemon are hurt, talk to nurse joy',
			'There is some equipment for you in the storage chest',
			'but we cant rely on our limited supplies',
			'we must establish a self sufficient camp',
			'Camp Manager Kevin can help you with that',
		],
		handledMessage: [
			'Start exploring the area',
			'and prepare the camp for self sufficiency',
		],

		quest: 'catch a pokemon',
		conditionFunction: (s) => s.quests['catch a pokemon'] !== 'COLLECTED',
	},
	{
		...oakBase,
		id: 'oak_2',
		unhandledMessage: [
			'Well done',
			'To navigate the wilderness successfully',
			'It is important to train your pokemon',
		],
		handledMessage: ['Battle wild pokemon to grow stronger'],
		quest: 'evolve your starter pokemon',
		conditionFunction: (s) =>
			s.quests['catch a pokemon'] === 'COLLECTED' &&
			s.quests['evolve your starter pokemon'] !== 'COLLECTED',
	},
	{
		...oakBase,
		id: 'oak_4',
		unhandledMessage: [
			'Great work',
			'Check the Bulletin board for more quests',
		],
		conditionFunction: (s) =>
			s.quests['catch a pokemon'] === 'COLLECTED' &&
			s.quests['evolve your starter pokemon'] === 'COLLECTED',
	},
];
