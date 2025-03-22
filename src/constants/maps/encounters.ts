import { TimeOfDay } from '../../functions/getTimeOfDay';
import { OverworldEncounter } from '../../interfaces/OverworldMap';

export type EncounterMap = Record<TimeOfDay | 'BASE', OverworldEncounter[]>;
export const routeN1Encounters: EncounterMap = {
	BASE: [
		{ name: 'pikachu', xp: 125, rarity: 'rare' },
		{ name: 'eevee', xp: 125, rarity: 'rare' },
	],
	MORNING: [
		{ name: 'rattata', xp: 50, rarity: 'common' },
		{ name: 'rattata', xp: 100, rarity: 'common' },
		{ name: 'rattata', xp: 125, rarity: 'medium' },
		{ name: 'spearow', xp: 50, rarity: 'common' },
		{ name: 'spearow', xp: 100, rarity: 'common' },
		{ name: 'spearow', xp: 125, rarity: 'medium' },
		{ name: 'meowth', xp: 50, rarity: 'common' },
		{ name: 'meowth', xp: 100, rarity: 'common' },
		{ name: 'meowth', xp: 125, rarity: 'medium' },
		{ name: 'shinx', xp: 125, rarity: 'rare' },
		{ name: 'riolu', xp: 125, rarity: 'ultra-rare' },
	],
	DAY: [
		{ name: 'bidoof', xp: 50, rarity: 'common' },
		{ name: 'bidoof', xp: 100, rarity: 'common' },
		{ name: 'bidoof', xp: 125, rarity: 'medium' },
		{ name: 'zigzagoon', xp: 50, rarity: 'common' },
		{ name: 'zigzagoon', xp: 100, rarity: 'common' },
		{ name: 'zigzagoon', xp: 125, rarity: 'medium' },
		{ name: 'taillow', xp: 50, rarity: 'common' },
		{ name: 'taillow', xp: 100, rarity: 'common' },
		{ name: 'taillow', xp: 125, rarity: 'medium' },
		{ name: 'lotad', xp: 125, rarity: 'rare' },
		{ name: 'zangoose', xp: 125, rarity: 'ultra-rare' },
	],
	EVENING: [
		{ name: 'poochyena', xp: 50, rarity: 'common' },
		{ name: 'poochyena', xp: 100, rarity: 'common' },
		{ name: 'poochyena', xp: 125, rarity: 'medium' },
		{ name: 'pidgey', xp: 50, rarity: 'common' },
		{ name: 'pidgey', xp: 100, rarity: 'common' },
		{ name: 'pidgey', xp: 125, rarity: 'medium' },
		{ name: 'teddiursa', xp: 50, rarity: 'common' },
		{ name: 'teddiursa', xp: 100, rarity: 'common' },
		{ name: 'teddiursa', xp: 125, rarity: 'medium' },
		{ name: 'oddish', xp: 50, rarity: 'common' },
		{ name: 'oddish', xp: 100, rarity: 'common' },
		{ name: 'oddish', xp: 125, rarity: 'medium' },
		{ name: 'swablu', xp: 125, rarity: 'rare' },
		{ name: 'rockruff', xp: 125, rarity: 'ultra-rare' },
	],
	NIGHT: [
		{ name: 'hoothoot', xp: 100, rarity: 'common' },
		{ name: 'hoothoot', xp: 50, rarity: 'common' },
		{ name: 'hoothoot', xp: 125, rarity: 'medium' },
		{ name: 'houndour', xp: 100, rarity: 'common' },
		{ name: 'houndour', xp: 50, rarity: 'common' },
		{ name: 'houndour', xp: 125, rarity: 'medium' },
		{ name: 'rattata-alola', xp: 100, rarity: 'common' },
		{ name: 'rattata-alola', xp: 50, rarity: 'common' },
		{ name: 'rattata-alola', xp: 125, rarity: 'medium' },
		{ name: 'gastly', xp: 125, rarity: 'rare' },
		{ name: 'misdreavus', xp: 125, rarity: 'ultra-rare' },
	],
};
export const routeN1E1Encounters: EncounterMap = {
	BASE: [{ name: 'scyther', xp: 1500, rarity: 'rare' }],
	MORNING: [
		{ name: 'wurmple', xp: 1000, rarity: 'common' },
		{ name: 'wurmple', xp: 800, rarity: 'common' },
		{ name: 'wurmple', xp: 1500, rarity: 'medium' },
		{ name: 'lillipup', xp: 1000, rarity: 'common' },
		{ name: 'lillipup', xp: 800, rarity: 'common' },
		{ name: 'lillipup', xp: 1500, rarity: 'medium' },
		{ name: 'smoliv', xp: 1000, rarity: 'common' },
		{ name: 'smoliv', xp: 800, rarity: 'common' },
		{ name: 'smoliv', xp: 1500, rarity: 'medium' },
		{ name: 'pinsir', xp: 1500, rarity: 'rare' },
		{ name: 'meowth', xp: 1000, rarity: 'rare' },
		{ name: 'emolga', xp: 1000, rarity: 'ultra-rare' },
	],
	DAY: [
		{ name: 'kricketot', xp: 1000, rarity: 'common' },
		{ name: 'kricketot', xp: 800, rarity: 'common' },
		{ name: 'kricketot', xp: 1500, rarity: 'medium' },
		{ name: 'fletchling', xp: 1000, rarity: 'common' },
		{ name: 'fletchling', xp: 800, rarity: 'common' },
		{ name: 'fletchling', xp: 1500, rarity: 'medium' },
		{ name: 'skiddo', xp: 1000, rarity: 'common' },
		{ name: 'skiddo', xp: 800, rarity: 'common' },
		{ name: 'skiddo', xp: 1500, rarity: 'medium' },
		{ name: 'pancham', xp: 1500, rarity: 'rare' },

		{ name: 'toxel', xp: 1500, rarity: 'ultra-rare' },
	],
	EVENING: [
		{ name: 'pikipek', xp: 1000, rarity: 'common' },
		{ name: 'pikipek', xp: 800, rarity: 'common' },
		{ name: 'pikipek', xp: 1500, rarity: 'medium' },
		{ name: 'bounsweet', xp: 1000, rarity: 'common' },
		{ name: 'bounsweet', xp: 800, rarity: 'common' },
		{ name: 'bounsweet', xp: 1500, rarity: 'medium' },
		{ name: 'grubbin', xp: 1000, rarity: 'common' },
		{ name: 'grubbin', xp: 800, rarity: 'common' },
		{ name: 'grubbin', xp: 1500, rarity: 'medium' },
		{ name: 'rockruff', xp: 1500, rarity: 'rare' },
		{ name: 'meowth-galar', xp: 1000, rarity: 'rare' },
		{ name: 'oranguru', xp: 1500, rarity: 'ultra-rare' },
	],
	NIGHT: [
		{ name: 'rookidee', xp: 800, rarity: 'common' },
		{ name: 'rookidee', xp: 1000, rarity: 'common' },
		{ name: 'rookidee', xp: 1500, rarity: 'medium' },
		{ name: 'impidimp', xp: 800, rarity: 'common' },
		{ name: 'impidimp', xp: 1000, rarity: 'common' },
		{ name: 'impidimp', xp: 1500, rarity: 'medium' },
		{ name: 'zubat', xp: 800, rarity: 'common' },
		{ name: 'zubat', xp: 8000, rarity: 'common' },
		{ name: 'zubat', xp: 1500, rarity: 'medium' },
		{ name: 'tarountula', xp: 1500, rarity: 'rare' },
		{ name: 'meowth-alola', xp: 1000, rarity: 'rare' },
		{ name: 'noibat', xp: 1000, rarity: 'ultra-rare' },
	],
};
