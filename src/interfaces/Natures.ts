import { Stat } from './StatObject';

export const natureNames = [
	'hardy',
	'lonely',
	'adamant',
	'naughty',
	'brave',
	'bold',
	'docile',
	'impish',
	'lax',
	'relaxed',
	'modest',
	'mild',
	'bashful',
	'rash',
	'quiet',
	'calm',
	'gentle',
	'careful',
	'quirky',
	'sassy',
	'timid',
	'hasty',
	'jolly',
	'naive',
	'serious',
] as const;

export type Nature = (typeof natureNames)[number];

export const natures: Record<Nature, { buff?: Stat; debuff?: Stat }> = {
	hardy: {},
	lonely: { buff: 'attack', debuff: 'defense' },
	adamant: { buff: 'attack', debuff: 'special-attack' },
	naughty: { buff: 'attack', debuff: 'special-defense' },
	brave: { buff: 'attack', debuff: 'speed' },
	bold: { buff: 'defense', debuff: 'attack' },
	docile: {},
	impish: { buff: 'defense', debuff: 'special-attack' },
	lax: { buff: 'defense', debuff: 'special-defense' },
	relaxed: { buff: 'defense', debuff: 'speed' },
	modest: { buff: 'special-attack', debuff: 'attack' },
	mild: { buff: 'special-attack', debuff: 'defense' },
	bashful: {},
	rash: { buff: 'special-attack', debuff: 'special-defense' },
	quiet: { buff: 'special-attack', debuff: 'speed' },
	calm: { buff: 'special-defense', debuff: 'attack' },
	gentle: { buff: 'special-defense', debuff: 'defense' },
	careful: { buff: 'special-defense', debuff: 'special-attack' },
	quirky: {},
	sassy: { buff: 'special-defense', debuff: 'speed' },
	timid: { buff: 'speed', debuff: 'attack' },
	hasty: { buff: 'speed', debuff: 'defense' },
	jolly: { buff: 'speed', debuff: 'special-attack' },
	naive: { buff: 'speed', debuff: 'special-defense' },
	serious: {},
};

export type NatureFactor = 0.9 | 1 | 1.1;

export const getRandomNature = () => {
	return ArrayHelpers.getRandomEntry([...natureNames]);
};
