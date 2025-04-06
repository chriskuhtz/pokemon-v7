import { EncounterMap } from '../encounters';

export const routeS1E1Encounters: EncounterMap = {
	WATER: [
		{ name: 'wingull', xp: 8000, rarity: 'common' },
		{ name: 'buizel', xp: 7000, rarity: 'common' },
		{ name: 'pelipper', xp: 12000, rarity: 'rare' },
		{ name: 'remoraid', xp: 7000, rarity: 'medium' },
		{ name: 'magikarp', xp: 125, rarity: 'rare' },
	],
	BASE: [
		{ name: 'ponyta', xp: 6000, rarity: 'common' },
		{ name: 'ponyta-galar', xp: 6000, rarity: 'rare' },
		{ name: 'tauros', xp: 8000, rarity: 'common' },
		{ name: 'herdier', xp: 8000, rarity: 'medium' },
	],
	MORNING: [
		{ name: 'tauros-paldea-blaze-breed', xp: 8000, rarity: 'ultra-rare' },
		{ name: 'wooloo', xp: 6000, rarity: 'common' },
		{ name: 'skitty', xp: 7000, rarity: 'medium' },
	],
	DAY: [
		{ name: 'bouffalant', xp: 8000, rarity: 'ultra-rare' },
		{ name: 'miltank', xp: 6000, rarity: 'common' },
		{ name: 'purrloin', xp: 7000, rarity: 'medium' },
	],
	EVENING: [
		{ name: 'tauros-paldea-combat-breed', xp: 8000, rarity: 'ultra-rare' },
		{ name: 'lechonk', xp: 6000, rarity: 'common' },
		{ name: 'electrike', xp: 7000, rarity: 'medium' },
	],
	NIGHT: [
		{ name: 'tauros-paldea-aqua-breed', xp: 8000, rarity: 'ultra-rare' },
		{ name: 'greavard', xp: 6000, rarity: 'common' },
		{ name: 'pawniard', xp: 7000, rarity: 'medium' },
	],
};
