import { Occupant, OverworldNpc } from '../../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../../interfaces/SpriteEnum';

const evExpertBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 37,
	y: 30,
	orientation: 'UP',
	type: 'NPC',
	sprite: SpriteEnum.trent,
};

const evGuyDialogue = [
	'You should really care about your Pokemons Effort Values',
	'Pokemon gain them after Battle just like XP',
	'But certain foods can also increase their EVs',
	'A Pokemon can gain 255 EV in a stat, But only 510 in total',
	'at level 100, 255 EV give you 63 more stat points',
	'Thats quite significant',
	'The gym leaders definitely have perfect EVs on their pokemon',
];
export const evExpertLine: Occupant[] = [
	{
		...evExpertBase,
		id: 'evExpert_1',

		unhandledMessage: evGuyDialogue,
		quest: 'train a Pokemon to 200 Attack EV',
		conditionFunction: (s) =>
			s.campUpgrades['invite effort value expert'] &&
			s.quests['train a Pokemon to 200 Attack EV'] !== 'COLLECTED',
	},
	{
		...evExpertBase,
		id: 'evExpert_2',

		unhandledMessage: evGuyDialogue,
		quest: 'train a Pokemon to 200 Special Attack EV',
		conditionFunction: (s) =>
			s.campUpgrades['invite effort value expert'] &&
			s.quests['train a Pokemon to 200 Attack EV'] == 'COLLECTED' &&
			s.quests['train a Pokemon to 200 Special Attack EV'] !== 'COLLECTED',
	},
	{
		...evExpertBase,
		id: 'evExpert_3',
		unhandledMessage: evGuyDialogue,
		quest: 'train a Pokemon to 200 Defense EV',
		conditionFunction: (s) =>
			s.campUpgrades['invite effort value expert'] &&
			s.quests['train a Pokemon to 200 Special Attack EV'] == 'COLLECTED' &&
			s.quests['train a Pokemon to 200 Defense EV'] !== 'COLLECTED',
	},
	{
		...evExpertBase,
		id: 'evExpert_4',
		unhandledMessage: evGuyDialogue,
		quest: 'train a Pokemon to 200 Special Defense EV',
		conditionFunction: (s) =>
			s.campUpgrades['invite effort value expert'] &&
			s.quests['train a Pokemon to 200 Defense EV'] == 'COLLECTED' &&
			s.quests['train a Pokemon to 200 Special Defense EV'] !== 'COLLECTED',
	},
	{
		...evExpertBase,
		id: 'evExpert_5',
		unhandledMessage: evGuyDialogue,
		quest: 'train a Pokemon to 200 Speed EV',
		conditionFunction: (s) =>
			s.campUpgrades['invite effort value expert'] &&
			s.quests['train a Pokemon to 200 Special Defense EV'] == 'COLLECTED' &&
			s.quests['train a Pokemon to 200 Speed EV'] !== 'COLLECTED',
	},
	{
		...evExpertBase,
		id: 'evExpert_6',
		unhandledMessage: evGuyDialogue,
		quest: 'train a Pokemon to 200 Hp EV',
		conditionFunction: (s) =>
			s.campUpgrades['invite effort value expert'] &&
			s.quests['train a Pokemon to 200 Speed EV'] == 'COLLECTED' &&
			s.quests['train a Pokemon to 200 Hp EV'] !== 'COLLECTED',
	},
	{
		...evExpertBase,
		id: 'evExpert_7',
		unhandledMessage: evGuyDialogue,
		quest: 'train the EV of two stats over 200 on a Pokemon',
		conditionFunction: (s) =>
			s.campUpgrades['invite effort value expert'] &&
			s.quests['train a Pokemon to 200 Hp EV'] == 'COLLECTED' &&
			s.quests['train the EV of two stats over 200 on a Pokemon'] !==
				'COLLECTED',
	},
	{
		...evExpertBase,
		id: 'evExpert_8',
		unhandledMessage: evGuyDialogue,
		quest: 'train a Pokemon to 510 EV',
		conditionFunction: (s) =>
			s.campUpgrades['invite effort value expert'] &&
			s.quests['train the EV of two stats over 200 on a Pokemon'] ===
				'COLLECTED' &&
			s.quests['train a Pokemon to 510 EV'] !== 'COLLECTED',
	},
];
