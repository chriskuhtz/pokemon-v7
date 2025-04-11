import { EncounterMap } from '../encounters';

export const routeE1Encounters: EncounterMap = {
	WATER: [],
	BASE: [
		{ name: 'growlithe', minXp: 3375, maxXp: 8000, rarity: 'medium' },
		{ name: 'growlithe-hisui', minXp: 3375, maxXp: 8000, rarity: 'medium' },
	],
	MORNING: [
		{ name: 'aron', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'sandshrew', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'rolycoly', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'sandslash', minXp: 8000, maxXp: 15625, rarity: 'rare' },
		{ name: 'riolu', minXp: 3375, maxXp: 8000, rarity: 'ultra-rare' },
	],
	DAY: [
		{ name: 'bidoof', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'bunnelby', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'toedscool', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'gligar', minXp: 3375, maxXp: 8000, rarity: 'rare' },
		{ name: 'sandslash', minXp: 3375, maxXp: 8000, rarity: 'ultra-rare' },
	],
	EVENING: [
		{ name: 'wooper', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'pidgey', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'machop', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'diglett', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'baltoy', minXp: 3375, maxXp: 8000, rarity: 'rare' },
		{ name: 'rockruff', minXp: 3375, maxXp: 8000, rarity: 'ultra-rare' },
	],
	NIGHT: [
		{ name: 'wooper-paldea', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'woobat', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'rattata-alola', minXp: 3375, maxXp: 8000, rarity: 'common' },
		{ name: 'golett', minXp: 3375, maxXp: 8000, rarity: 'rare' },
		{ name: 'abra', minXp: 3375, maxXp: 8000, rarity: 'ultra-rare' },
	],
};
