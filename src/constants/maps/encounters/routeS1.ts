import { EncounterMap } from '../encounters';

export const routeS1Encounters: EncounterMap = {
	WATER: [
		{ name: 'cramorant', minXp: 15625, maxXp: 27000, rarity: 'rare' },
		{ name: 'tentacool', minXp: 15625, maxXp: 27000, rarity: 'common' },
		{ name: 'mantine', minXp: 15625, maxXp: 27000, rarity: 'medium' },
		{ name: 'wailmer', minXp: 15625, maxXp: 27000, rarity: 'common' },
		{ name: 'veluza', minXp: 15625, maxXp: 27000, rarity: 'rare' },
		{ name: 'horsea', minXp: 15625, maxXp: 27000, rarity: 'medium' },
		{ name: 'seadra', minXp: 15625, maxXp: 27000, rarity: 'rare' },
		{ name: 'wailord', minXp: 27000, maxXp: 125000, rarity: 'ultra-rare' },
		{ name: 'carvanha', minXp: 15625, maxXp: 27000, rarity: 'medium' },
		{ name: 'magikarp', minXp: 125, maxXp: 125, rarity: 'rare' },
	],
	BASE: [],
	MORNING: [],
	DAY: [],
	EVENING: [],
	NIGHT: [],
};
