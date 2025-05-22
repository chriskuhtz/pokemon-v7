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
	hp: Math.floor(Math.random() * max + 1),
	defense: Math.floor(Math.random() * max + 1),
	attack: Math.floor(Math.random() * max + 1),
	'special-attack': Math.floor(Math.random() * max + 1),
	'special-defense': Math.floor(Math.random() * max + 1),
	speed: Math.floor(Math.random() * max + 1),
	accuracy: Math.floor(Math.random() * max + 1),
	evasion: Math.floor(Math.random() * max + 1),
});

export const getRandomBoostableStat = (omit?: Stat[]): Stat => {
	const o = ['hp', 'evasion', 'accuracy', ...(omit ?? [])];
	return getRandomEntry(stats.filter((s) => !o.includes(s)));
};
