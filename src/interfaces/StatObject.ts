import { getRandomEntry } from '../functions/filterTargets';

export const stats = [
	'hp',
	'attack',
	'defense',
	'special-attack',
	'special-defense',
	'speed',
	'accuracy',
	'evasion',
] as const;
export type Stat = (typeof stats)[number];

export type StatObject = Record<Stat, number>;

export const EmptyStatObject: StatObject = {
	hp: 0,
	defense: 0,
	attack: 0,
	'special-attack': 0,
	'special-defense': 0,
	speed: 0,
	accuracy: 0,
	evasion: 0,
};

export const generateRandomStatObject = (max: number): StatObject => ({
	hp: Math.floor(Math.random() * max),
	defense: Math.floor(Math.random() * max),
	attack: Math.floor(Math.random() * max),
	'special-attack': Math.floor(Math.random() * max),
	'special-defense': Math.floor(Math.random() * max),
	speed: Math.floor(Math.random() * max),
	accuracy: Math.floor(Math.random() * max),
	evasion: Math.floor(Math.random() * max),
});

export const getRandomBoostableStat = (omit?: Stat[]): Stat => {
	const o = ['hp', 'evasion', 'accuracy', ...(omit ?? [])];
	return getRandomEntry(stats.filter((s) => !o.includes(s)));
};
