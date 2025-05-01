import { EncounterMap } from '../encounters';

export const routeN1E1Encounters: EncounterMap = {
	WATER: [],
	BASE: [
		{ name: 'scyther', minXp: 1000, maxXp: 3375, rarity: 'rare' },
		{ name: 'meowth', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'nidoran-f', minXp: 1000, maxXp: 3375, rarity: 'medium' },
		{ name: 'nidoran-m', minXp: 1000, maxXp: 3375, rarity: 'medium' },
		{
			name: 'pikachu-hoenn-cap',
			minXp: 1000,
			maxXp: 1000,
			rarity: 'ultra-rare',
		},
	],
	MORNING: [
		{ name: 'starly', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'lillipup', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'smoliv', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'pinsir', minXp: 1000, maxXp: 3375, rarity: 'rare' },
		{ name: 'shroomish', minXp: 1000, maxXp: 3375, rarity: 'rare' },
		{ name: 'emolga', minXp: 1000, maxXp: 3375, rarity: 'ultra-rare' },
	],
	DAY: [
		{ name: 'kricketot', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'fletchling', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'skiddo', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'pancham', minXp: 1000, maxXp: 3375, rarity: 'rare' },
		{ name: 'croagunk', minXp: 1000, maxXp: 3375, rarity: 'ultra-rare' },
	],
	EVENING: [
		{ name: 'pikipek', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'bounsweet', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'grubbin', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'pansage', minXp: 1000, maxXp: 3375, rarity: 'rare' },
		{ name: 'oranguru', minXp: 1000, maxXp: 3375, rarity: 'ultra-rare' },
		{ name: 'pachirisu', minXp: 1000, maxXp: 3375, rarity: 'rare' },
	],
	NIGHT: [
		{ name: 'drifloon', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'shelmet', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'zubat', minXp: 1000, maxXp: 3375, rarity: 'common' },
		{ name: 'ekans', minXp: 1000, maxXp: 3375, rarity: 'rare' },
		{ name: 'golbat', minXp: 1000, maxXp: 3375, rarity: 'rare' },
		{ name: 'noibat', minXp: 1000, maxXp: 3375, rarity: 'ultra-rare' },
	],
};
