import { getRandomIndex } from '../functions/filterTargets';
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
	adamant: { buff: 'attack', debuff: 'spatk' },
	naughty: { buff: 'attack', debuff: 'spdef' },
	brave: { buff: 'attack', debuff: 'speed' },
	bold: { buff: 'defense', debuff: 'attack' },
	docile: {},
	impish: { buff: 'defense', debuff: 'spatk' },
	lax: { buff: 'defense', debuff: 'spdef' },
	relaxed: { buff: 'defense', debuff: 'speed' },
	modest: { buff: 'spatk', debuff: 'attack' },
	mild: { buff: 'spatk', debuff: 'defense' },
	bashful: {},
	rash: { buff: 'spatk', debuff: 'spdef' },
	quiet: { buff: 'spatk', debuff: 'speed' },
	calm: { buff: 'spdef', debuff: 'attack' },
	gentle: { buff: 'spdef', debuff: 'defense' },
	careful: { buff: 'spdef', debuff: 'spatk' },
	quirky: {},
	sassy: { buff: 'spdef', debuff: 'speed' },
	timid: { buff: 'speed', debuff: 'attack' },
	hasty: { buff: 'speed', debuff: 'defense' },
	jolly: { buff: 'speed', debuff: 'spatk' },
	naive: { buff: 'speed', debuff: 'spdef' },
	serious: {},
};

export type NatureFactor = 0.9 | 1 | 1.1;

export const getRandomNature = () => {
	return natureNames[getRandomIndex(natureNames.length)];
};
