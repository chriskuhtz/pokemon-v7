import { EncounterMap } from '../encounters';

export const routeW1Encounters: EncounterMap = {
	WATER: [],
	BASE: [
		{ name: 'pikachu', minXp: 8, maxXp: 216, rarity: 'common' },
		{
			name: 'pikachu-partner-cap',
			minXp: 1000,
			maxXp: 1000,
			rarity: 'ultra-rare',
		},
	],
	MORNING: [],
	DAY: [],
	EVENING: [],
	NIGHT: [],
};
