export const stats = [
	'hp',
	'attack',
	'defense',
	'spatk',
	'spdef',
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
	spatk: 0,
	spdef: 0,
	speed: 0,
	accuracy: 0,
	evasion: 0,
};
