import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory } from '../interfaces/Inventory';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import { getRandomEntry } from './filterTargets';
import { makeChallengerPokemon } from './makeChallengerPokemon';

export const trainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Fiery Fred',
		team: [
			makeChallengerPokemon({ name: 'magmar', xp: 125 }),
			makeChallengerPokemon({ name: 'slugma', xp: 125 }),
			makeChallengerPokemon({ name: 'litleo', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Fiery Fred', sprite: SpriteEnum.pyro },
	},
	{
		type: 'TRAINER',
		id: 'Adrian Agua',
		team: [
			makeChallengerPokemon({ name: 'corphish', xp: 125 }),
			makeChallengerPokemon({ name: 'buizel', xp: 125 }),
			makeChallengerPokemon({ name: 'poliwag', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Adrian Agua', sprite: SpriteEnum.sailor },
	},
	{
		type: 'TRAINER',
		id: 'Planter Paul',
		team: [
			makeChallengerPokemon({ name: 'petilil', xp: 125 }),
			makeChallengerPokemon({ name: 'oddish', xp: 125 }),
			makeChallengerPokemon({ name: 'shroomish', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Planter Paul', sprite: SpriteEnum.farmer },
	},
	{
		type: 'TRAINER',
		id: 'Electric Erik',
		team: [
			makeChallengerPokemon({ name: 'elekid', xp: 125 }),
			makeChallengerPokemon({ name: 'pachirisu', xp: 125 }),
			makeChallengerPokemon({ name: 'yamper', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Electric Erik', sprite: SpriteEnum.mechanic },
	},
	{
		type: 'TRAINER',
		id: 'Haunted Hilda',
		team: [
			makeChallengerPokemon({ name: 'gastly', xp: 125 }),
			makeChallengerPokemon({ name: 'phantump', xp: 125 }),
			makeChallengerPokemon({ name: 'duskull', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Haunted Hilda', sprite: SpriteEnum.possessed },
	},
	{
		type: 'TRAINER',
		id: 'Dark Dave',
		team: [
			makeChallengerPokemon({ name: 'houndour', xp: 125 }),
			makeChallengerPokemon({ name: 'murkrow', xp: 125 }),
			makeChallengerPokemon({ name: 'nuzleaf', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Dark Dave', sprite: SpriteEnum.gangster },
	},
	{
		type: 'TRAINER',
		id: 'Psycho Pete',
		team: [
			makeChallengerPokemon({ name: 'drowzee', xp: 125 }),
			makeChallengerPokemon({ name: 'ralts', xp: 125 }),
			makeChallengerPokemon({ name: 'espurr', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Psycho Pete', sprite: SpriteEnum.psychic },
	},
	{
		type: 'TRAINER',
		id: 'Fairy Frida',
		team: [
			makeChallengerPokemon({ name: 'clefairy', xp: 125 }),
			makeChallengerPokemon({ name: 'marill', xp: 125 }),
			makeChallengerPokemon({ name: 'slurpuff', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Fairy Frida', sprite: SpriteEnum.maid },
	},
	{
		type: 'TRAINER',
		id: 'Normal Norman',
		team: [
			makeChallengerPokemon({ name: 'lillipup', xp: 125 }),
			makeChallengerPokemon({ name: 'meowth', xp: 125 }),
			makeChallengerPokemon({ name: 'tauros', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Normal Norman', sprite: SpriteEnum.uncle },
	},
	{
		type: 'TRAINER',
		id: 'Rick the Rock',
		team: [
			makeChallengerPokemon({ name: 'nosepass', xp: 125 }),
			makeChallengerPokemon({ name: 'onix', xp: 125 }),
			makeChallengerPokemon({ name: 'roggenrola', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Rick the Rock', sprite: SpriteEnum.hiker },
	},
	{
		type: 'TRAINER',
		id: 'grounded gunther',
		team: [
			makeChallengerPokemon({ name: 'sandshrew', xp: 125 }),
			makeChallengerPokemon({ name: 'sandaconda', xp: 125 }),
			makeChallengerPokemon({ name: 'trapinch', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'grounded gunther', sprite: SpriteEnum.explorer },
	},
	{
		type: 'TRAINER',
		id: 'steely stannis',
		team: [
			makeChallengerPokemon({ name: 'aron', xp: 125 }),
			makeChallengerPokemon({ name: 'magnemite', xp: 125 }),
			makeChallengerPokemon({ name: 'skarmory', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'steely stannis', sprite: SpriteEnum.builder },
	},
	{
		type: 'TRAINER',
		id: 'icy irmgard',
		team: [
			makeChallengerPokemon({ name: 'sandshrew-alola', xp: 125 }),
			makeChallengerPokemon({ name: 'vanillish', xp: 125 }),
			makeChallengerPokemon({ name: 'spheal', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'icy irmgard', sprite: SpriteEnum.grandma },
	},
	{
		type: 'TRAINER',
		id: 'drake (not the pedo)',
		team: [
			makeChallengerPokemon({ name: 'dratini', xp: 125 }),
			makeChallengerPokemon({ name: 'jangmo-o', xp: 125 }),
			makeChallengerPokemon({ name: 'bagon', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'drake (not the pedo)', sprite: SpriteEnum.ace2Male },
	},
	{
		type: 'TRAINER',
		id: 'fighting frank',
		team: [
			makeChallengerPokemon({ name: 'tyrogue', xp: 125 }),
			makeChallengerPokemon({ name: 'machop', xp: 125 }),
			makeChallengerPokemon({ name: 'timburr', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'fighting frank', sprite: SpriteEnum.karateMale },
	},
	{
		type: 'TRAINER',
		id: 'flying fernanda',
		team: [
			makeChallengerPokemon({ name: 'pidgey', xp: 125 }),
			makeChallengerPokemon({ name: 'farfetchd', xp: 125 }),
			makeChallengerPokemon({ name: 'spearow', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'flying fernanda', sprite: SpriteEnum.beauty1 },
	},
	{
		type: 'TRAINER',
		id: 'poisonous pedro',
		team: [
			makeChallengerPokemon({ name: 'koffing', xp: 125 }),
			makeChallengerPokemon({ name: 'gulpin', xp: 125 }),
			makeChallengerPokemon({ name: 'toxel', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'poisonous pedro', sprite: SpriteEnum.biker },
	},
	{
		type: 'TRAINER',
		id: 'Buggin Bob',
		team: [
			makeChallengerPokemon({ name: 'caterpie', xp: 125 }),
			makeChallengerPokemon({ name: 'weedle', xp: 125 }),
			makeChallengerPokemon({ name: 'pinsir', xp: 125 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Buggin Bob', sprite: SpriteEnum.bugCatcher },
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Morty',
		team: [
			makeChallengerPokemon({ name: 'gastly', xp: 20000 }),
			makeChallengerPokemon({ name: 'haunter', xp: 25000 }),
			makeChallengerPokemon({ name: 'gengar', xp: 30000 }),
			makeChallengerPokemon({ name: 'misdreavus', xp: 30000 }),
			makeChallengerPokemon({ name: 'aegislash-blade', xp: 30000 }),
		],
		inventory: EmptyInventory,
		availableAfter: 'catch Haunter and Mightyena',
		trainer: { name: 'Gym Leader Morty', sprite: SpriteEnum.morty },
	},
];
export const makeRandomTrainer = (): Challenger => {
	return getRandomEntry(trainers);
};
