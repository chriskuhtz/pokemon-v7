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
