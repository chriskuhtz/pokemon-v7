import { EncounterMap } from '../encounters';

export const routeS1E1Encounters: EncounterMap = {
	WATER: [
		{ name: 'psyduck', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'buizel', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'pelipper', minXp: 8000, maxXp: 15625, rarity: 'rare' },
		{ name: 'remoraid', minXp: 3375, maxXp: 15625, rarity: 'medium' },
		{ name: 'magikarp', minXp: 125, maxXp: 125, rarity: 'rare' },
	],
	BASE: [
		{ name: 'ponyta', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'ponyta-galar', minXp: 3375, maxXp: 15625, rarity: 'rare' },
		{ name: 'tauros', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'herdier', minXp: 3375, maxXp: 15625, rarity: 'medium' },
		{
			name: 'pikachu-libre',
			minXp: 1000,
			maxXp: 1000,
			rarity: 'ultra-rare',
		},
	],
	MORNING: [
		{
			name: 'tauros-paldea-blaze-breed',
			minXp: 3375,
			maxXp: 15625,
			rarity: 'ultra-rare',
		},
		{ name: 'wooloo', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'skitty', minXp: 3375, maxXp: 15625, rarity: 'medium' },
	],
	DAY: [
		{ name: 'bouffalant', minXp: 3375, maxXp: 15625, rarity: 'ultra-rare' },
		{ name: 'miltank', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'purrloin', minXp: 3375, maxXp: 15625, rarity: 'medium' },
	],
	EVENING: [
		{
			name: 'tauros-paldea-combat-breed',
			minXp: 3375,
			maxXp: 15625,
			rarity: 'ultra-rare',
		},
		{ name: 'lechonk', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'electrike', minXp: 3375, maxXp: 15625, rarity: 'medium' },
	],
	NIGHT: [
		{
			name: 'tauros-paldea-aqua-breed',
			minXp: 3375,
			maxXp: 15625,
			rarity: 'ultra-rare',
		},
		{ name: 'greavard', minXp: 3375, maxXp: 15625, rarity: 'common' },
		{ name: 'pawniard', minXp: 3375, maxXp: 15625, rarity: 'medium' },
	],
};
