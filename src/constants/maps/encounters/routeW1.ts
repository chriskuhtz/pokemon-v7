import { EncounterMap } from '../encounters';

export const routeW1Encounters: EncounterMap = {
	WATER: [],
	BASE: [
		{
			name: 'pikachu-partner-cap',
			minXp: 1000,
			maxXp: 1000,
			rarity: 'ultra-rare',
		},
		{
			name: 'machoke',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'common',
		},
		{
			name: 'staraptor',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'common',
		},
	],
	MORNING: [
		{
			name: 'marowak-alola',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'rare',
		},
		{
			name: 'marowak',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'common',
		},
	],
	DAY: [
		{
			name: 'vigoroth',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'common',
		},
		{
			name: 'slaking',
			minXp: 64000,
			maxXp: 125000,
			rarity: 'rare',
		},
	],
	EVENING: [
		{
			name: 'hitmontop',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'common',
		},
		{
			name: 'hitmonlee',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'common',
		},
		{
			name: 'hitmonchan',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'common',
		},
		{
			name: 'tyrogue',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'rare',
		},
	],
	NIGHT: [
		{
			name: 'zorua',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'common',
		},
		{
			name: 'zorua-hisui',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'rare',
		},
		{
			name: 'zoroark',
			maxXp: 64000,
			minXp: 42875,
			rarity: 'ultra-rare',
		},
	],
};
