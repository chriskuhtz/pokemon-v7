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

export const generateRandomStatObject = (
	max: number,
	min?: number
): StatObject => {
	const m = min ?? 1;
	return {
		hp: Math.min(31, Math.floor(Math.random() * max + m)),
		defense: Math.min(31, Math.floor(Math.random() * max + m)),
		attack: Math.min(31, Math.floor(Math.random() * max + m)),
		'special-attack': Math.min(31, Math.floor(Math.random() * max + m)),
		'special-defense': Math.min(31, Math.floor(Math.random() * max + m)),
		speed: Math.min(31, Math.floor(Math.random() * max + m)),
		accuracy: Math.min(31, Math.floor(Math.random() * max + m)),
		evasion: Math.min(31, Math.floor(Math.random() * max + m)),
	};
};

export const getRandomBoostableStat = (omit?: Stat[]): Stat => {
	const o = ['hp', 'evasion', 'accuracy', ...(omit ?? [])];
	return getRandomEntry(stats.filter((s) => !o.includes(s)));
};
