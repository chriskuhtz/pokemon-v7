import { EncounterMap } from '../encounters';

export const routeN1Encounters: EncounterMap = {
	WATER: [{ name: 'feebas', minXp: 125, maxXp: 125, rarity: 'common' }],
	BASE: [
		{ name: 'pikachu', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'eevee', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'rattata', minXp: 8, maxXp: 124, rarity: 'common' },
		{
			name: 'pikachu-original-cap',
			minXp: 125,
			maxXp: 125,
			rarity: 'ultra-rare',
		},
	],
	MORNING: [
		{ name: 'sunkern', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'ledyba', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'weedle', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'jigglypuff', minXp: 8, maxXp: 124, rarity: 'rare' },
		{ name: 'lickitung', minXp: 216, maxXp: 1000, rarity: 'ultra-rare' },
	],
	DAY: [
		{ name: 'spearow', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'zigzagoon', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'taillow', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'lotad', minXp: 8, maxXp: 124, rarity: 'rare' },
		{ name: 'zangoose', minXp: 216, maxXp: 1000, rarity: 'ultra-rare' },
	],
	EVENING: [
		{ name: 'poochyena', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'pidgey', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'teddiursa', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'oddish', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'swablu', minXp: 8, maxXp: 124, rarity: 'rare' },
		{ name: 'murkrow', minXp: 216, maxXp: 1000, rarity: 'ultra-rare' },
	],
	NIGHT: [
		{ name: 'hoothoot', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'houndour', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'spinarak', minXp: 8, maxXp: 124, rarity: 'common' },
		{ name: 'gastly', minXp: 8, maxXp: 124, rarity: 'rare' },
		{ name: 'misdreavus', minXp: 216, maxXp: 1000, rarity: 'ultra-rare' },
	],
};
