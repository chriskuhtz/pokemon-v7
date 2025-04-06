import { EncounterMap } from '../encounters';

export const routeS1Encounters: EncounterMap = {
	WATER: [
		{ name: 'cramorant', xp: 11000, rarity: 'rare' },
		{ name: 'tentacool', xp: 8000, rarity: 'common' },
		{ name: 'mantine', xp: 11000, rarity: 'medium' },
		{ name: 'wailmer', xp: 8000, rarity: 'common' },
		{ name: 'veluza', xp: 11000, rarity: 'rare' },
		{ name: 'horsea', xp: 8000, rarity: 'medium' },
		{ name: 'seadra', xp: 8000, rarity: 'rare' },
		{ name: 'wailord', xp: 64000, rarity: 'ultra-rare' },
		{ name: 'carvanha', xp: 8000, rarity: 'medium' },
	],
	BASE: [{ name: 'magikarp', xp: 125, rarity: 'rare' }],
	MORNING: [],
	DAY: [],
	EVENING: [],
	NIGHT: [],
};
