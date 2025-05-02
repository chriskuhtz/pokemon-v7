import { EncounterMap } from '../encounters';

export const onixCaveEncounters: EncounterMap = {
	WATER: [],
	BASE: [
		{
			name: 'pikachu-partner-cap',
			minXp: 1000,
			maxXp: 1000,
			rarity: 'ultra-rare',
		},
		{ name: 'togedemaru', minXp: 3375, maxXp: 15625, rarity: 'rare' },
		{ name: 'zubat', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'rhyhorn', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'glimmet', minXp: 3375, maxXp: 15625, rarity: 'rare' },
		{ name: 'nacli', minXp: 3375, maxXp: 15625, rarity: 'medium' },
		{ name: 'nosepass', minXp: 3375, maxXp: 15625, rarity: 'rare' },
		{ name: 'cubone', minXp: 3375, maxXp: 15625, rarity: 'rare' },
		{ name: 'golbat', minXp: 3375, maxXp: 15625, rarity: 'ultra-rare' },
		{ name: 'onix', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'diglett-alola', minXp: 3375, maxXp: 15625, rarity: 'medium' },
		{ name: 'steelix', minXp: 3375, maxXp: 15625, rarity: 'ultra-rare' },
	],
	MORNING: [],
	DAY: [],
	EVENING: [],
	NIGHT: [],
};
