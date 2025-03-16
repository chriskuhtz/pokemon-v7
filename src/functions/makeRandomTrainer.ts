import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory } from '../interfaces/Inventory';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import { getRandomEntry } from './filterTargets';
import { makeChallengerPokemon } from './makeChallengerPokemon';

export const trainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'magmar', xp: 100 }),
			makeChallengerPokemon({ name: 'slugma', xp: 100 }),
			makeChallengerPokemon({ name: 'litleo', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Fiery Fred', sprite: SpriteEnum.pyro },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'corphish', xp: 100 }),
			makeChallengerPokemon({ name: 'buizel', xp: 100 }),
			makeChallengerPokemon({ name: 'poliwag', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Adrian Agua', sprite: SpriteEnum.sailor },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'petilil', xp: 100 }),
			makeChallengerPokemon({ name: 'oddish', xp: 100 }),
			makeChallengerPokemon({ name: 'shroomish', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Planter Paul', sprite: SpriteEnum.farmer },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'elekid', xp: 100 }),
			makeChallengerPokemon({ name: 'pachirisu', xp: 100 }),
			makeChallengerPokemon({ name: 'yamper', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Electric Erik', sprite: SpriteEnum.mechanic },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'gastly', xp: 100 }),
			makeChallengerPokemon({ name: 'phantump', xp: 100 }),
			makeChallengerPokemon({ name: 'duskull', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Haunted Hilda', sprite: SpriteEnum.possessed },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'houndour', xp: 100 }),
			makeChallengerPokemon({ name: 'murkrow', xp: 100 }),
			makeChallengerPokemon({ name: 'nuzleaf', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Dark Dave', sprite: SpriteEnum.gangster },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'drowzee', xp: 100 }),
			makeChallengerPokemon({ name: 'ralts', xp: 100 }),
			makeChallengerPokemon({ name: 'espurr', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Psycho Pete', sprite: SpriteEnum.psychic },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'clefairy', xp: 100 }),
			makeChallengerPokemon({ name: 'marill', xp: 100 }),
			makeChallengerPokemon({ name: 'slurpuff', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Fairy Frida', sprite: SpriteEnum.maid },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'lillipup', xp: 100 }),
			makeChallengerPokemon({ name: 'meowth', xp: 100 }),
			makeChallengerPokemon({ name: 'tauros', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Normal Norman', sprite: SpriteEnum.uncle },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'nosepass', xp: 100 }),
			makeChallengerPokemon({ name: 'onix', xp: 100 }),
			makeChallengerPokemon({ name: 'roggenrola', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Rick the Rock', sprite: SpriteEnum.hiker },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'sandshrew', xp: 100 }),
			makeChallengerPokemon({ name: 'sandaconda', xp: 100 }),
			makeChallengerPokemon({ name: 'trapinch', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'grounded gunther', sprite: SpriteEnum.explorer },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'aron', xp: 100 }),
			makeChallengerPokemon({ name: 'magnemite', xp: 100 }),
			makeChallengerPokemon({ name: 'skarmory', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'steely stannis', sprite: SpriteEnum.mechanic },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'sandshrew-alola', xp: 100 }),
			makeChallengerPokemon({ name: 'vanillish', xp: 100 }),
			makeChallengerPokemon({ name: 'spheal', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'icy irmgard', sprite: SpriteEnum.grandma },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'dratini', xp: 100 }),
			makeChallengerPokemon({ name: 'jangmo-o', xp: 100 }),
			makeChallengerPokemon({ name: 'bagon', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'drake (not the pedo)', sprite: SpriteEnum.ace2Male },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'tyrogue', xp: 100 }),
			makeChallengerPokemon({ name: 'machop', xp: 100 }),
			makeChallengerPokemon({ name: 'timburr', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'fighting frank', sprite: SpriteEnum.karateMale },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'pidgey', xp: 100 }),
			makeChallengerPokemon({ name: 'farfetchd', xp: 100 }),
			makeChallengerPokemon({ name: 'spearow', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'flying fernanda', sprite: SpriteEnum.beauty1 },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'koffing', xp: 100 }),
			makeChallengerPokemon({ name: 'gulpin', xp: 100 }),
			makeChallengerPokemon({ name: 'toxel', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'poisonous perd', sprite: SpriteEnum.biker },
	},
	{
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'caterpie', xp: 100 }),
			makeChallengerPokemon({ name: 'weedle', xp: 100 }),
			makeChallengerPokemon({ name: 'pinsir', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Buggin Bob', sprite: SpriteEnum.bugCatcher },
	},
];
export const makeRandomTrainer = (): Challenger => {
	return getRandomEntry(trainers);
};
