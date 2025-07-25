import { makeChallengerPokemon } from '../../functions/makeChallengerPokemon';
import { Challenger } from '../../interfaces/Challenger';
import { EmptyInventory } from '../../interfaces/Inventory';
import { SpriteEnum } from '../../interfaces/SpriteEnum';

export const tier1trainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Fiery Fred',
		team: [
			makeChallengerPokemon({ name: 'magby', xp: 1000 }),
			makeChallengerPokemon({ name: 'slugma', xp: 1000 }),
			makeChallengerPokemon({ name: 'litleo', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fiery Fred', sprite: SpriteEnum.pyro },
	},
	{
		type: 'TRAINER',
		id: 'Adrian Agua',
		team: [
			makeChallengerPokemon({ name: 'corphish', xp: 1000 }),
			makeChallengerPokemon({ name: 'buizel', xp: 1000 }),
			makeChallengerPokemon({ name: 'poliwag', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Adrian Agua', sprite: SpriteEnum.sailor },
	},
	{
		type: 'TRAINER',
		id: 'Planter Paul',
		team: [
			makeChallengerPokemon({ name: 'petilil', xp: 1000 }),
			makeChallengerPokemon({ name: 'oddish', xp: 1000 }),
			makeChallengerPokemon({ name: 'shroomish', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Planter Paul', sprite: SpriteEnum.farmer },
	},
	{
		type: 'TRAINER',
		id: 'Electric Erik',
		team: [
			makeChallengerPokemon({ name: 'elekid', xp: 1000 }),
			makeChallengerPokemon({ name: 'pachirisu', xp: 1000 }),
			makeChallengerPokemon({ name: 'yamper', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Electric Erik', sprite: SpriteEnum.mechanic },
	},
	{
		type: 'TRAINER',
		id: 'Haunted Hilda',
		team: [
			makeChallengerPokemon({ name: 'gastly', xp: 1000 }),
			makeChallengerPokemon({ name: 'phantump', xp: 1000 }),
			makeChallengerPokemon({ name: 'duskull', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Haunted Hilda', sprite: SpriteEnum.possessed },
	},
	{
		type: 'TRAINER',
		id: 'Dark Dave',
		team: [
			makeChallengerPokemon({ name: 'houndour', xp: 1000 }),
			makeChallengerPokemon({ name: 'murkrow', xp: 1000 }),
			makeChallengerPokemon({ name: 'nuzleaf', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Dark Dave', sprite: SpriteEnum.gangster },
	},
	{
		type: 'TRAINER',
		id: 'Psycho Pete',
		team: [
			makeChallengerPokemon({ name: 'drowzee', xp: 1000 }),
			makeChallengerPokemon({ name: 'ralts', xp: 1000 }),
			makeChallengerPokemon({ name: 'espurr', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Psycho Pete', sprite: SpriteEnum.psychic },
	},
	{
		type: 'TRAINER',
		id: 'Fairy Frida',
		team: [
			makeChallengerPokemon({ name: 'clefairy', xp: 1000 }),
			makeChallengerPokemon({ name: 'marill', xp: 1000 }),
			makeChallengerPokemon({ name: 'slurpuff', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fairy Frida', sprite: SpriteEnum.maid },
	},
	{
		type: 'TRAINER',
		id: 'Normal Norman',
		team: [
			makeChallengerPokemon({ name: 'lillipup', xp: 1000 }),
			makeChallengerPokemon({ name: 'meowth', xp: 1000 }),
			makeChallengerPokemon({ name: 'tauros', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Normal Norman', sprite: SpriteEnum.uncle },
	},
	{
		type: 'TRAINER',
		id: 'Rick the Rock',
		team: [
			makeChallengerPokemon({ name: 'nosepass', xp: 1000 }),
			makeChallengerPokemon({ name: 'onix', xp: 1000 }),
			makeChallengerPokemon({ name: 'roggenrola', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Rick the Rock', sprite: SpriteEnum.hiker },
	},
	{
		type: 'TRAINER',
		id: 'grounded gunther',
		team: [
			makeChallengerPokemon({ name: 'sandshrew', xp: 1000 }),
			makeChallengerPokemon({ name: 'sandaconda', xp: 1000 }),
			makeChallengerPokemon({ name: 'trapinch', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'grounded gunther', sprite: SpriteEnum.explorer },
	},
	{
		type: 'TRAINER',
		id: 'steely stannis',
		team: [
			makeChallengerPokemon({ name: 'aron', xp: 1000 }),
			makeChallengerPokemon({ name: 'magnemite', xp: 1000 }),
			makeChallengerPokemon({ name: 'skarmory', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'steely stannis', sprite: SpriteEnum.builder },
	},
	{
		type: 'TRAINER',
		id: 'icy irmgard',
		team: [
			makeChallengerPokemon({ name: 'sandshrew-alola', xp: 1000 }),
			makeChallengerPokemon({ name: 'vanillish', xp: 1000 }),
			makeChallengerPokemon({ name: 'spheal', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'icy irmgard', sprite: SpriteEnum.grandma },
	},
	{
		type: 'TRAINER',
		id: 'drake',
		team: [
			makeChallengerPokemon({ name: 'dratini', xp: 1000 }),
			makeChallengerPokemon({ name: 'jangmo-o', xp: 1000 }),
			makeChallengerPokemon({ name: 'bagon', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'drake', sprite: SpriteEnum.ace2Male },
	},
	{
		type: 'TRAINER',
		id: 'fighting frank',
		team: [
			makeChallengerPokemon({ name: 'tyrogue', xp: 1000 }),
			makeChallengerPokemon({ name: 'machop', xp: 1000 }),
			makeChallengerPokemon({ name: 'timburr', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'fighting frank', sprite: SpriteEnum.karateMale },
	},
	{
		type: 'TRAINER',
		id: 'flying fernanda',
		team: [
			makeChallengerPokemon({ name: 'pidgey', xp: 1000 }),
			makeChallengerPokemon({ name: 'farfetchd', xp: 1000 }),
			makeChallengerPokemon({ name: 'spearow', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'flying fernanda', sprite: SpriteEnum.beauty1 },
	},
	{
		type: 'TRAINER',
		id: 'poisonous pedro',
		team: [
			makeChallengerPokemon({ name: 'koffing', xp: 1000 }),
			makeChallengerPokemon({ name: 'gulpin', xp: 1000 }),
			makeChallengerPokemon({ name: 'toxel', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'poisonous pedro', sprite: SpriteEnum.biker },
	},
	{
		type: 'TRAINER',
		id: 'Buggin Bob',
		team: [
			makeChallengerPokemon({ name: 'caterpie', xp: 1000 }),
			makeChallengerPokemon({ name: 'weedle', xp: 1000 }),
			makeChallengerPokemon({ name: 'pinsir', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Buggin Bob', sprite: SpriteEnum.bugCatcher },
	},
];
export const tier2trainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Fiery Fred 2',
		team: [
			makeChallengerPokemon({ name: 'magmar', xp: 8000 }),
			makeChallengerPokemon({ name: 'slugma', xp: 8000 }),
			makeChallengerPokemon({ name: 'litleo', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fiery Fred 2', sprite: SpriteEnum.pyro },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Adrian Agua 2',
		team: [
			makeChallengerPokemon({ name: 'sealeo', xp: 8000 }),
			makeChallengerPokemon({ name: 'buizel', xp: 8000 }),
			makeChallengerPokemon({ name: 'poliwag', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Adrian Agua 2', sprite: SpriteEnum.sailor },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Planter Paul 2',
		team: [
			makeChallengerPokemon({ name: 'petilil', xp: 8000 }),
			makeChallengerPokemon({ name: 'gloom', xp: 8000 }),
			makeChallengerPokemon({ name: 'shroomish', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Planter Paul 2', sprite: SpriteEnum.farmer },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Electric Erik 2',
		team: [
			makeChallengerPokemon({ name: 'electabuzz', xp: 8000 }),
			makeChallengerPokemon({ name: 'pachirisu', xp: 8000 }),
			makeChallengerPokemon({ name: 'yamper', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Electric Erik 2', sprite: SpriteEnum.mechanic },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Haunted Hilda 2',
		team: [
			makeChallengerPokemon({ name: 'gastly', xp: 8000 }),
			makeChallengerPokemon({ name: 'phantump', xp: 8000 }),
			makeChallengerPokemon({ name: 'dusclops', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Haunted Hilda 2', sprite: SpriteEnum.possessed },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Dark Dave 2',
		team: [
			makeChallengerPokemon({ name: 'houndour', xp: 8000 }),
			makeChallengerPokemon({ name: 'murkrow', xp: 8000 }),
			makeChallengerPokemon({ name: 'nuzleaf', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Dark Dave 2', sprite: SpriteEnum.gangster },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Psycho Pete 2',
		team: [
			makeChallengerPokemon({ name: 'drowzee', xp: 8000 }),
			makeChallengerPokemon({ name: 'kirlia', xp: 8000 }),
			makeChallengerPokemon({ name: 'espurr', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Psycho Pete 2', sprite: SpriteEnum.psychic },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Fairy Frida 2',
		team: [
			makeChallengerPokemon({ name: 'clefable', xp: 8000 }),
			makeChallengerPokemon({ name: 'marill', xp: 8000 }),
			makeChallengerPokemon({ name: 'slurpuff', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fairy Frida 2', sprite: SpriteEnum.maid },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Normal Norman 2',
		team: [
			makeChallengerPokemon({ name: 'herdier', xp: 8000 }),
			makeChallengerPokemon({ name: 'meowth', xp: 8000 }),
			makeChallengerPokemon({ name: 'tauros', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Normal Norman 2', sprite: SpriteEnum.uncle },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Rick the Rock 2',
		team: [
			makeChallengerPokemon({ name: 'nosepass', xp: 8000 }),
			makeChallengerPokemon({ name: 'onix', xp: 8000 }),
			makeChallengerPokemon({ name: 'boldore', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Rick the Rock 2', sprite: SpriteEnum.hiker },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'grounded gunther 2',
		team: [
			makeChallengerPokemon({ name: 'sandshrew', xp: 8000 }),
			makeChallengerPokemon({ name: 'sandaconda', xp: 8000 }),
			makeChallengerPokemon({ name: 'vibrava', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'grounded gunther 2', sprite: SpriteEnum.explorer },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'steely stannis 2',
		team: [
			makeChallengerPokemon({ name: 'lairon', xp: 8000 }),
			makeChallengerPokemon({ name: 'magnemite', xp: 8000 }),
			makeChallengerPokemon({ name: 'skarmory', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'steely stannis 2', sprite: SpriteEnum.builder },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'icy irmgard 2',
		team: [
			makeChallengerPokemon({ name: 'sandshrew-alola', xp: 8000 }),
			makeChallengerPokemon({ name: 'vanillish', xp: 8000 }),
			makeChallengerPokemon({ name: 'sealeo', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'icy irmgard 2', sprite: SpriteEnum.grandma },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'drake 2',
		team: [
			makeChallengerPokemon({ name: 'dragonair', xp: 8000 }),
			makeChallengerPokemon({ name: 'jangmo-o', xp: 8000 }),
			makeChallengerPokemon({ name: 'bagon', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: {
			id: 'drake 2',
			sprite: SpriteEnum.ace2Male,
		},
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'fighting frank 2',
		team: [
			makeChallengerPokemon({ name: 'hitmonlee', xp: 8000 }),
			makeChallengerPokemon({ name: 'machop', xp: 8000 }),
			makeChallengerPokemon({ name: 'timburr', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'fighting frank 2', sprite: SpriteEnum.karateMale },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'flying fernanda 2',
		team: [
			makeChallengerPokemon({ name: 'pidgeotto', xp: 8000 }),
			makeChallengerPokemon({ name: 'farfetchd', xp: 8000 }),
			makeChallengerPokemon({ name: 'spearow', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'flying fernanda 2', sprite: SpriteEnum.beauty1 },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'poisonous pedro 2',
		team: [
			makeChallengerPokemon({ name: 'koffing', xp: 8000 }),
			makeChallengerPokemon({ name: 'swalot', xp: 8000 }),
			makeChallengerPokemon({ name: 'toxel', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'poisonous pedro 2', sprite: SpriteEnum.biker },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Buggin Bob 2',
		team: [
			makeChallengerPokemon({ name: 'butterfree', xp: 8000 }),
			makeChallengerPokemon({ name: 'beedrill', xp: 8000 }),
			makeChallengerPokemon({ name: 'pinsir', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Buggin Bob 2', sprite: SpriteEnum.bugCatcher },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Kanto Ken',
		team: [
			makeChallengerPokemon({ name: 'charmeleon', xp: 8000 }),
			makeChallengerPokemon({ name: 'wartortle', xp: 8000 }),
			makeChallengerPokemon({ name: 'ivysaur', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Kanto Ken', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Johto John',
		team: [
			makeChallengerPokemon({ name: 'quilava', xp: 8000 }),
			makeChallengerPokemon({ name: 'croconaw', xp: 8000 }),
			makeChallengerPokemon({ name: 'bayleef', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Johto John', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Hoenn Hannah',
		team: [
			makeChallengerPokemon({ name: 'combusken', xp: 8000 }),
			makeChallengerPokemon({ name: 'marshtomp', xp: 8000 }),
			makeChallengerPokemon({ name: 'grovyle', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Hoenn Hannah', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Sinnoh Simone',
		team: [
			makeChallengerPokemon({ name: 'monferno', xp: 8000 }),
			makeChallengerPokemon({ name: 'prinplup', xp: 8000 }),
			makeChallengerPokemon({ name: 'grotle', xp: 8000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Sinnoh Simone', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 2',
	},
];
export const tier3trainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Fiery Fred 3',
		team: [
			makeChallengerPokemon({ name: 'magmar', xp: 27000 }),
			makeChallengerPokemon({ name: 'magcargo', xp: 27000 }),
			makeChallengerPokemon({ name: 'litleo', xp: 27000 }),
			makeChallengerPokemon({ name: 'heatmor', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fiery Fred 3', sprite: SpriteEnum.pyro },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Adrian Agua 3',
		team: [
			makeChallengerPokemon({ name: 'sealeo', xp: 27000 }),
			makeChallengerPokemon({ name: 'floatzel', xp: 27000 }),
			makeChallengerPokemon({ name: 'poliwhirl', xp: 27000 }),
			makeChallengerPokemon({ name: 'crawdaunt', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Adrian Agua 3', sprite: SpriteEnum.sailor },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Planter Paul 3',
		team: [
			makeChallengerPokemon({ name: 'parasect', xp: 27000 }),
			makeChallengerPokemon({ name: 'gloom', xp: 27000 }),
			makeChallengerPokemon({ name: 'breloom', xp: 27000 }),
			makeChallengerPokemon({ name: 'dolliv', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Planter Paul 3', sprite: SpriteEnum.farmer },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Electric Erik 3',
		team: [
			makeChallengerPokemon({ name: 'electabuzz', xp: 27000 }),
			makeChallengerPokemon({ name: 'pachirisu', xp: 27000 }),
			makeChallengerPokemon({ name: 'boltund', xp: 27000 }),
			makeChallengerPokemon({ name: 'pawmo', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Electric Erik 3', sprite: SpriteEnum.mechanic },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Haunted Hilda 3',
		team: [
			makeChallengerPokemon({ name: 'haunter', xp: 27000 }),
			makeChallengerPokemon({ name: 'trevenant', xp: 27000 }),
			makeChallengerPokemon({ name: 'dusclops', xp: 27000 }),
			makeChallengerPokemon({ name: 'banette', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Haunted Hilda 3', sprite: SpriteEnum.possessed },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Dark Dave 3',
		team: [
			makeChallengerPokemon({ name: 'houndoom', xp: 27000 }),
			makeChallengerPokemon({ name: 'murkrow', xp: 27000 }),
			makeChallengerPokemon({ name: 'nuzleaf', xp: 27000 }),
			makeChallengerPokemon({ name: 'cacturne', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Dark Dave 3', sprite: SpriteEnum.gangster },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Psycho Pete 3',
		team: [
			makeChallengerPokemon({ name: 'hypno', xp: 27000 }),
			makeChallengerPokemon({ name: 'kirlia', xp: 27000 }),
			makeChallengerPokemon({ name: 'espurr', xp: 27000 }),
			makeChallengerPokemon({ name: 'indeedee-male', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Psycho Pete 3', sprite: SpriteEnum.psychic },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Fairy Frida 3',
		team: [
			makeChallengerPokemon({ name: 'clefable', xp: 27000 }),
			makeChallengerPokemon({ name: 'azumarill', xp: 27000 }),
			makeChallengerPokemon({ name: 'slurpuff', xp: 27000 }),
			makeChallengerPokemon({ name: 'alcremie', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fairy Frida 3', sprite: SpriteEnum.maid },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Normal Norman 3',
		team: [
			makeChallengerPokemon({ name: 'herdier', xp: 27000 }),
			makeChallengerPokemon({ name: 'persian', xp: 27000 }),
			makeChallengerPokemon({ name: 'tauros', xp: 27000 }),
			makeChallengerPokemon({ name: 'zangoose', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Normal Norman 3', sprite: SpriteEnum.uncle },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Rick the Rock 3',
		team: [
			makeChallengerPokemon({ name: 'nosepass', xp: 27000 }),
			makeChallengerPokemon({ name: 'onix', xp: 27000 }),
			makeChallengerPokemon({ name: 'boldore', xp: 27000 }),
			makeChallengerPokemon({ name: 'golem', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Rick the Rock 3', sprite: SpriteEnum.hiker },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'grounded gunther 3',
		team: [
			makeChallengerPokemon({ name: 'sandslash', xp: 27000 }),
			makeChallengerPokemon({ name: 'sandaconda', xp: 27000 }),
			makeChallengerPokemon({ name: 'vibrava', xp: 27000 }),
			makeChallengerPokemon({ name: 'donphan', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'grounded gunther 3', sprite: SpriteEnum.explorer },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'steely stannis 3',
		team: [
			makeChallengerPokemon({ name: 'lairon', xp: 27000 }),
			makeChallengerPokemon({ name: 'magneton', xp: 27000 }),
			makeChallengerPokemon({ name: 'skarmory', xp: 27000 }),
			makeChallengerPokemon({ name: 'mawile', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'steely stannis 3', sprite: SpriteEnum.builder },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'icy irmgard 3',
		team: [
			makeChallengerPokemon({ name: 'sandslash-alola', xp: 27000 }),
			makeChallengerPokemon({ name: 'vanilluxe', xp: 27000 }),
			makeChallengerPokemon({ name: 'sealeo', xp: 27000 }),
			makeChallengerPokemon({ name: 'jynx', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'icy irmgard 3', sprite: SpriteEnum.grandma },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'drake 3',
		team: [
			makeChallengerPokemon({ name: 'dragonair', xp: 27000 }),
			makeChallengerPokemon({ name: 'jangmo-o', xp: 27000 }),
			makeChallengerPokemon({ name: 'shelgon', xp: 27000 }),
			makeChallengerPokemon({ name: 'druddigon', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: {
			id: 'drake 3',
			sprite: SpriteEnum.ace2Male,
		},
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'fighting frank 3',
		team: [
			makeChallengerPokemon({ name: 'hitmonlee', xp: 27000 }),
			makeChallengerPokemon({ name: 'machoke', xp: 27000 }),
			makeChallengerPokemon({ name: 'gurdurr', xp: 27000 }),
			makeChallengerPokemon({ name: 'hitmonchan', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'fighting frank 3', sprite: SpriteEnum.karateMale },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'flying fernanda 3',
		team: [
			makeChallengerPokemon({ name: 'pidgeotto', xp: 27000 }),
			makeChallengerPokemon({ name: 'farfetchd', xp: 27000 }),
			makeChallengerPokemon({ name: 'spearow', xp: 27000 }),
			makeChallengerPokemon({ name: 'honchkrow', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'flying fernanda 3', sprite: SpriteEnum.beauty1 },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'poisonous pedro 3',
		team: [
			makeChallengerPokemon({ name: 'weezing', xp: 27000 }),
			makeChallengerPokemon({ name: 'swalot', xp: 27000 }),
			makeChallengerPokemon({ name: 'toxel', xp: 27000 }),
			makeChallengerPokemon({ name: 'ariados', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'poisonous pedro 3', sprite: SpriteEnum.biker },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Buggin Bob 3',
		team: [
			makeChallengerPokemon({ name: 'butterfree', xp: 27000 }),
			makeChallengerPokemon({ name: 'beedrill', xp: 27000 }),
			makeChallengerPokemon({ name: 'pinsir', xp: 27000 }),
			makeChallengerPokemon({ name: 'heracross', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Buggin Bob 3', sprite: SpriteEnum.bugCatcher },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Kanto Ken 2',
		team: [
			makeChallengerPokemon({ name: 'charmeleon', xp: 27000 }),
			makeChallengerPokemon({ name: 'wartortle', xp: 27000 }),
			makeChallengerPokemon({ name: 'ivysaur', xp: 27000 }),
			makeChallengerPokemon({ name: 'raichu', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Kanto Ken 2', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Johto John 2',
		team: [
			makeChallengerPokemon({ name: 'quilava', xp: 27000 }),
			makeChallengerPokemon({ name: 'croconaw', xp: 27000 }),
			makeChallengerPokemon({ name: 'bayleef', xp: 27000 }),
			makeChallengerPokemon({ name: 'azumarill', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Johto John 2', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Hoenn Hannah 2',
		team: [
			makeChallengerPokemon({ name: 'combusken', xp: 27000 }),
			makeChallengerPokemon({ name: 'marshtomp', xp: 27000 }),
			makeChallengerPokemon({ name: 'grovyle', xp: 27000 }),
			makeChallengerPokemon({ name: 'plusle', xp: 27000 }),
			makeChallengerPokemon({ name: 'minun', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Hoenn Hannah 2', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 3',
	},
	{
		type: 'TRAINER',
		id: 'Sinnoh Simone 2',
		team: [
			makeChallengerPokemon({ name: 'monferno', xp: 27000 }),
			makeChallengerPokemon({ name: 'prinplup', xp: 27000 }),
			makeChallengerPokemon({ name: 'grotle', xp: 27000 }),
			makeChallengerPokemon({ name: 'pachirisu', xp: 27000 }),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Sinnoh Simone 2', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 3',
	},
];
export const tier4trainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Fiery Fred 4',
		team: [
			makeChallengerPokemon({
				name: 'magmortar',
				xp: 64000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'magcargo',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'pyroar',
				xp: 64000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'heatmor',
				xp: 64000,
				heldItemName: 'scope-lens',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fiery Fred 4', sprite: SpriteEnum.pyro },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Adrian Agua 4',
		team: [
			makeChallengerPokemon({
				name: 'sealeo',
				xp: 64000,
				heldItemName: 'never-melt-ice',
			}),
			makeChallengerPokemon({
				name: 'floatzel',
				xp: 64000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'poliwrath',
				xp: 64000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'crawdaunt',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Adrian Agua 4', sprite: SpriteEnum.sailor },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Planter Paul 4',
		team: [
			makeChallengerPokemon({
				name: 'gogoat',
				xp: 64000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'vileplume',
				xp: 64000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'breloom',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'arboliva',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Planter Paul 4', sprite: SpriteEnum.farmer },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Electric Erik 4',
		team: [
			makeChallengerPokemon({
				name: 'electivire',
				xp: 64000,
				heldItemName: 'magnet',
			}),
			makeChallengerPokemon({
				name: 'pikachu',
				xp: 64000,
				heldItemName: 'light-ball',
			}),
			makeChallengerPokemon({
				name: 'boltund',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'pawmo',
				xp: 64000,
				heldItemName: 'lum-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Electric Erik 4', sprite: SpriteEnum.mechanic },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Haunted Hilda 4',
		team: [
			makeChallengerPokemon({
				name: 'gengar',
				xp: 64000,
				heldItemName: 'poison-barb',
			}),
			makeChallengerPokemon({
				name: 'trevenant',
				xp: 64000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'dusknoir',
				xp: 64000,
				heldItemName: 'spell-tag',
			}),
			makeChallengerPokemon({
				name: 'banette',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Haunted Hilda 4', sprite: SpriteEnum.possessed },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Dark Dave 4',
		team: [
			makeChallengerPokemon({
				name: 'houndoom',
				xp: 64000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'honchkrow',
				xp: 64000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'shiftry',
				xp: 64000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'cacturne',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Dark Dave 4', sprite: SpriteEnum.gangster },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Psycho Pete 4',
		team: [
			makeChallengerPokemon({
				name: 'hypno',
				xp: 64000,
				heldItemName: 'twisted-spoon',
			}),
			makeChallengerPokemon({
				name: 'gardevoir',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'espurr',
				xp: 64000,
				heldItemName: 'scope-lens',
			}),
			makeChallengerPokemon({
				name: 'indeedee-male',
				xp: 64000,
				heldItemName: 'lum-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Psycho Pete 4', sprite: SpriteEnum.psychic },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Fairy Frida 4',
		team: [
			makeChallengerPokemon({
				name: 'clefable',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'azumarill',
				xp: 64000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'slurpuff',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'gardevoir',
				xp: 64000,
				heldItemName: 'twisted-spoon',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fairy Frida 4', sprite: SpriteEnum.maid },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Normal Norman 4',
		team: [
			makeChallengerPokemon({
				name: 'stoutland',
				xp: 64000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'persian',
				xp: 64000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'tauros',
				xp: 64000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'zangoose',
				xp: 64000,
				heldItemName: 'silk-scarf',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Normal Norman 4', sprite: SpriteEnum.uncle },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Rick the Rock 4',
		team: [
			makeChallengerPokemon({
				name: 'probopass',
				xp: 64000,
				heldItemName: 'hard-stone',
			}),
			makeChallengerPokemon({
				name: 'relicanth',
				xp: 64000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'gigalith',
				xp: 64000,
				heldItemName: 'lum-berry',
			}),
			makeChallengerPokemon({
				name: 'golem',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Rick the Rock 4', sprite: SpriteEnum.hiker },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'grounded gunther 4',
		team: [
			makeChallengerPokemon({
				name: 'sandslash',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'sandaconda',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'flygon',
				xp: 64000,
				heldItemName: 'dragon-fang',
			}),
			makeChallengerPokemon({
				name: 'donphan',
				xp: 64000,
				heldItemName: 'soft-sand',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'grounded gunther 4', sprite: SpriteEnum.explorer },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'steely stannis 4',
		team: [
			makeChallengerPokemon({
				name: 'aggron',
				xp: 64000,
				heldItemName: 'metal-coat',
			}),
			makeChallengerPokemon({
				name: 'magneton',
				xp: 64000,
				heldItemName: 'magnet',
			}),
			makeChallengerPokemon({
				name: 'skarmory',
				xp: 64000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'mawile',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'steely stannis 4', sprite: SpriteEnum.builder },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'icy irmgard 4',
		team: [
			makeChallengerPokemon({
				name: 'sandslash-alola',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'vanilluxe',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'walrein',
				xp: 64000,
				heldItemName: 'never-melt-ice',
			}),
			makeChallengerPokemon({
				name: 'jynx',
				xp: 64000,
				heldItemName: 'twisted-spoon',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'icy irmgard 4', sprite: SpriteEnum.grandma },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'drake 4',
		team: [
			makeChallengerPokemon({
				name: 'dragonair',
				xp: 64000,
				heldItemName: 'dragon-fang',
			}),
			makeChallengerPokemon({
				name: 'hakamo-o',
				xp: 64000,
				heldItemName: 'dragon-fang',
			}),
			makeChallengerPokemon({
				name: 'shelgon',
				xp: 64000,
				heldItemName: 'dragon-fang',
			}),
			makeChallengerPokemon({
				name: 'druddigon',
				xp: 64000,
				heldItemName: 'dragon-fang',
			}),
		],
		inventory: EmptyInventory,
		trainer: {
			id: 'drake 4',
			sprite: SpriteEnum.ace2Male,
		},
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'fighting frank 4',
		team: [
			makeChallengerPokemon({
				name: 'hitmonlee',
				xp: 64000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'machamp',
				xp: 64000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'conkeldurr',
				xp: 64000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'hitmonchan',
				xp: 64000,
				heldItemName: 'black-belt',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'fighting frank 4', sprite: SpriteEnum.karateMale },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'flying fernanda 4',
		team: [
			makeChallengerPokemon({
				name: 'pidgeot',
				xp: 64000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'sirfetchd',
				xp: 64000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'fearow',
				xp: 64000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'honchkrow',
				xp: 64000,
				heldItemName: 'sharp-beak',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'flying fernanda 4', sprite: SpriteEnum.beauty1 },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'poisonous pedro 4',
		team: [
			makeChallengerPokemon({
				name: 'weezing',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'swalot',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'toxtricity-amped',
				xp: 64000,
				heldItemName: 'poison-barb',
			}),
			makeChallengerPokemon({
				name: 'ariados',
				xp: 64000,
				heldItemName: 'silver-powder',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'poisonous pedro 4', sprite: SpriteEnum.biker },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Buggin Bob 4',
		team: [
			makeChallengerPokemon({
				name: 'scolipede',
				xp: 64000,
				heldItemName: 'silver-powder',
			}),
			makeChallengerPokemon({
				name: 'beedrill',
				xp: 64000,
				heldItemName: 'silver-powder',
			}),
			makeChallengerPokemon({
				name: 'pinsir',
				xp: 64000,
				heldItemName: 'silver-powder',
			}),
			makeChallengerPokemon({
				name: 'heracross',
				xp: 64000,
				heldItemName: 'silver-powder',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Buggin Bob 4', sprite: SpriteEnum.bugCatcher },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Kanto Ken 3',
		team: [
			makeChallengerPokemon({
				name: 'charizard',
				xp: 64000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'blastoise',
				xp: 64000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'venusaur',
				xp: 64000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'raichu',
				xp: 64000,
				heldItemName: 'magnet',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Kanto Ken 3', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Johto John 3',
		team: [
			makeChallengerPokemon({
				name: 'typhlosion',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'feraligatr',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'meganium',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'azumarill',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Johto John 3', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Hoenn Hannah 3',
		team: [
			makeChallengerPokemon({
				name: 'blaziken',
				xp: 64000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'swampert',
				xp: 64000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'sceptile',
				xp: 64000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'plusle',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'minun',
				xp: 64000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Hoenn Hannah 3', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Sinnoh Simone 3',
		team: [
			makeChallengerPokemon({
				name: 'infernape',
				xp: 64000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'empoleon',
				xp: 64000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'torterra',
				xp: 64000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'pachirisu',
				xp: 64000,
				heldItemName: 'magnet',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Sinnoh Simone 3', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 4',
	},
	{
		type: 'TRAINER',
		id: 'Blissful Beatrice',
		team: [
			makeChallengerPokemon({
				name: 'blissey',
				xp: 64000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 64000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 64000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 64000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 64000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 64000,
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Blissful Beatrice', sprite: SpriteEnum.grandma },
		requiredUpgrade: 'training field 4',
	},
];
export const tier5trainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Fiery Fred 5',
		team: [
			makeChallengerPokemon({
				name: 'magmortar',
				xp: 125000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'magcargo',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'pyroar',
				xp: 125000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'heatmor',
				xp: 125000,
				heldItemName: 'scope-lens',
			}),
			makeChallengerPokemon({
				name: 'coalossal',
				xp: 125000,
				heldItemName: 'hard-stone',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fiery Fred 5', sprite: SpriteEnum.pyro },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Adrian Agua 5',
		team: [
			makeChallengerPokemon({
				name: 'walrein',
				xp: 125000,
				heldItemName: 'never-melt-ice',
			}),
			makeChallengerPokemon({
				name: 'floatzel',
				xp: 125000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'poliwrath',
				xp: 125000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'crawdaunt',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'kingler',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Adrian Agua 5', sprite: SpriteEnum.sailor },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Planter Paul 5',
		team: [
			makeChallengerPokemon({
				name: 'gogoat',
				xp: 125000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'vileplume',
				xp: 125000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'breloom',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'arboliva',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'tropius',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Planter Paul 5', sprite: SpriteEnum.farmer },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Electric Erik 5',
		team: [
			makeChallengerPokemon({
				name: 'electivire',
				xp: 125000,
				heldItemName: 'magnet',
			}),
			makeChallengerPokemon({
				name: 'pikachu',
				xp: 125000,
				heldItemName: 'light-ball',
			}),
			makeChallengerPokemon({
				name: 'boltund',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'pawmo',
				xp: 125000,
				heldItemName: 'lum-berry',
			}),
			makeChallengerPokemon({
				name: 'luxray',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Electric Erik 5', sprite: SpriteEnum.mechanic },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Haunted Hilda 5',
		team: [
			makeChallengerPokemon({
				name: 'gengar',
				xp: 125000,
				heldItemName: 'poison-barb',
			}),
			makeChallengerPokemon({
				name: 'trevenant',
				xp: 125000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'dusknoir',
				xp: 125000,
				heldItemName: 'spell-tag',
			}),
			makeChallengerPokemon({
				name: 'banette',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'sableye',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Haunted Hilda 5', sprite: SpriteEnum.possessed },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Dark Dave 5',
		team: [
			makeChallengerPokemon({
				name: 'houndoom',
				xp: 125000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'honchkrow',
				xp: 125000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'shiftry',
				xp: 125000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'cacturne',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'bisharp',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Dark Dave 5', sprite: SpriteEnum.gangster },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Psycho Pete 5',
		team: [
			makeChallengerPokemon({
				name: 'hypno',
				xp: 125000,
				heldItemName: 'twisted-spoon',
			}),
			makeChallengerPokemon({
				name: 'gardevoir',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'espurr',
				xp: 125000,
				heldItemName: 'scope-lens',
			}),
			makeChallengerPokemon({
				name: 'indeedee-male',
				xp: 125000,
				heldItemName: 'lum-berry',
			}),
			makeChallengerPokemon({
				name: 'gallade',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Psycho Pete 5', sprite: SpriteEnum.psychic },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Fairy Frida 5',
		team: [
			makeChallengerPokemon({
				name: 'clefable',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'azumarill',
				xp: 125000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'slurpuff',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'gardevoir',
				xp: 125000,
				heldItemName: 'twisted-spoon',
			}),
			makeChallengerPokemon({
				name: 'alcremie',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Fairy Frida 5', sprite: SpriteEnum.maid },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Normal Norman 5',
		team: [
			makeChallengerPokemon({
				name: 'stoutland',
				xp: 125000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'persian',
				xp: 125000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'tauros',
				xp: 125000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'zangoose',
				xp: 125000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'miltank',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Normal Norman 5', sprite: SpriteEnum.uncle },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Rick the Rock 5',
		team: [
			makeChallengerPokemon({
				name: 'probopass',
				xp: 125000,
				heldItemName: 'hard-stone',
			}),
			makeChallengerPokemon({
				name: 'relicanth',
				xp: 125000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'gigalith',
				xp: 125000,
				heldItemName: 'lum-berry',
			}),
			makeChallengerPokemon({
				name: 'golem',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'rhyperior',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Rick the Rock 5', sprite: SpriteEnum.hiker },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'grounded gunther 5',
		team: [
			makeChallengerPokemon({
				name: 'sandslash',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'sandaconda',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'flygon',
				xp: 125000,
				heldItemName: 'dragon-fang',
			}),
			makeChallengerPokemon({
				name: 'donphan',
				xp: 125000,
				heldItemName: 'soft-sand',
			}),
			makeChallengerPokemon({
				name: 'hippowdon',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'grounded gunther 5', sprite: SpriteEnum.explorer },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'steely stannis 5',
		team: [
			makeChallengerPokemon({
				name: 'aggron',
				xp: 125000,
				heldItemName: 'metal-coat',
			}),
			makeChallengerPokemon({
				name: 'magneton',
				xp: 125000,
				heldItemName: 'magnet',
			}),
			makeChallengerPokemon({
				name: 'skarmory',
				xp: 125000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'mawile',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'bisharp',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'steely stannis 5', sprite: SpriteEnum.builder },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'icy irmgard 5',
		team: [
			makeChallengerPokemon({
				name: 'sandslash-alola',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'vanilluxe',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'walrein',
				xp: 125000,
				heldItemName: 'never-melt-ice',
			}),
			makeChallengerPokemon({
				name: 'jynx',
				xp: 125000,
				heldItemName: 'twisted-spoon',
			}),
			makeChallengerPokemon({
				name: 'avalugg',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'icy irmgard 5', sprite: SpriteEnum.grandma },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'drake 5',
		team: [
			makeChallengerPokemon({
				name: 'dragonite',
				xp: 125000,
				heldItemName: 'dragon-fang',
			}),
			makeChallengerPokemon({
				name: 'kommo-o',
				xp: 125000,
				heldItemName: 'dragon-fang',
			}),
			makeChallengerPokemon({
				name: 'salamence',
				xp: 125000,
				heldItemName: 'dragon-fang',
			}),
			makeChallengerPokemon({
				name: 'druddigon',
				xp: 125000,
				heldItemName: 'dragon-fang',
			}),
			makeChallengerPokemon({
				name: 'altaria',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: {
			id: 'drake 5',
			sprite: SpriteEnum.ace2Male,
		},
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'fighting frank 5',
		team: [
			makeChallengerPokemon({
				name: 'hitmonlee',
				xp: 125000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'machamp',
				xp: 125000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'conkeldurr',
				xp: 125000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'hitmonchan',
				xp: 125000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'hitmontop',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'fighting frank 5', sprite: SpriteEnum.karateMale },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'flying fernanda 5',
		team: [
			makeChallengerPokemon({
				name: 'pidgeot',
				xp: 125000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'sirfetchd',
				xp: 125000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'fearow',
				xp: 125000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'honchkrow',
				xp: 125000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'staraptor',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'flying fernanda 5', sprite: SpriteEnum.beauty1 },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'poisonous pedro 5',
		team: [
			makeChallengerPokemon({
				name: 'weezing',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'swalot',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'toxtricity-amped',
				xp: 125000,
				heldItemName: 'poison-barb',
			}),
			makeChallengerPokemon({
				name: 'ariados',
				xp: 125000,
				heldItemName: 'silver-powder',
			}),
			makeChallengerPokemon({
				name: 'toxicroak',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'poisonous pedro 5', sprite: SpriteEnum.biker },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Buggin Bob 5',
		team: [
			makeChallengerPokemon({
				name: 'scolipede',
				xp: 125000,
				heldItemName: 'silver-powder',
			}),
			makeChallengerPokemon({
				name: 'beedrill',
				xp: 125000,
				heldItemName: 'silver-powder',
			}),
			makeChallengerPokemon({
				name: 'pinsir',
				xp: 125000,
				heldItemName: 'silver-powder',
			}),
			makeChallengerPokemon({
				name: 'heracross',
				xp: 125000,
				heldItemName: 'silver-powder',
			}),
			makeChallengerPokemon({
				name: 'escavalier',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Buggin Bob 5', sprite: SpriteEnum.bugCatcher },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Kanto Ken 4',
		team: [
			makeChallengerPokemon({
				name: 'charizard',
				xp: 125000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'blastoise',
				xp: 125000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'venusaur',
				xp: 125000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'raichu',
				xp: 125000,
				heldItemName: 'magnet',
			}),
			makeChallengerPokemon({
				name: 'snorlax',
				xp: 125000,
				heldItemName: 'magnet',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Kanto Ken 4', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Johto John 4',
		team: [
			makeChallengerPokemon({
				name: 'typhlosion',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'feraligatr',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'meganium',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'azumarill',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'ampharos',
				xp: 125000,
				heldItemName: 'magnet',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Johto John 4', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Hoenn Hannah 4',
		team: [
			makeChallengerPokemon({
				name: 'blaziken',
				xp: 125000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'swampert',
				xp: 125000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'sceptile',
				xp: 125000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'plusle',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'minun',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'altaria',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Hoenn Hannah 4', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Sinnoh Simone 4',
		team: [
			makeChallengerPokemon({
				name: 'infernape',
				xp: 125000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'empoleon',
				xp: 125000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'torterra',
				xp: 125000,
				heldItemName: 'miracle-seed',
			}),
			makeChallengerPokemon({
				name: 'pachirisu',
				xp: 125000,
				heldItemName: 'magnet',
			}),
			makeChallengerPokemon({
				name: 'hippowdon',
				xp: 125000,
				heldItemName: 'magnet',
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Sinnoh Simone 4', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 5',
	},
	{
		type: 'TRAINER',
		id: 'Blissful Beatrice 2',
		team: [
			makeChallengerPokemon({
				name: 'blissey',
				xp: 125000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 125000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 125000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 125000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 125000,
			}),
			makeChallengerPokemon({
				name: 'blissey',
				xp: 125000,
			}),
		],
		inventory: EmptyInventory,
		trainer: { id: 'Blissful Beatrice 2', sprite: SpriteEnum.grandma },
		requiredUpgrade: 'training field 5',
	},
];
export const specialTrainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Gym Leader Falkner',
		team: [
			makeChallengerPokemon({
				name: 'noctowl',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'pidgeot',
				xp: 125000,
				heldItemName: 'leftovers',
			}),
			makeChallengerPokemon({
				name: 'braviary',
				xp: 125000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'skarmory',
				xp: 125000,
				heldItemName: 'metal-coat',
			}),
			makeChallengerPokemon({
				name: 'gliscor',
				xp: 125000,
				heldItemName: 'razor-fang',
			}),
		],
		inventory: EmptyInventory,
		availableAfter: 'catch the legendary bird of ice',
		trainer: {
			id: 'Gym Leader Falkner',
			sprite: SpriteEnum.falkner,
			profilePicture:
				'https://archives.bulbagarden.net/media/upload/5/5a/VSFalkner.png',
		},
		battleTeamConfig: { assignHeldItem: false },
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Bugsy',
		team: [
			makeChallengerPokemon({
				name: 'scizor',
				xp: 125000,
				heldItemName: 'quick-claw',
				ability: 'technician',
				fixedAbility: true,
			}),
			makeChallengerPokemon({
				name: 'pinsir',
				xp: 125000,
			}),
			makeChallengerPokemon({
				name: 'heracross',
				xp: 125000,
				heldItemName: 'hard-stone',
			}),
			makeChallengerPokemon({
				name: 'volcarona',
				xp: 125000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'scolipede',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		battleTeamConfig: { assignHeldItem: false },
		inventory: EmptyInventory,
		availableAfter: 'report a bug',
		trainer: {
			id: 'Gym Leader Bugsy',
			sprite: SpriteEnum.bugsy,
			profilePicture:
				'https://archives.bulbagarden.net/media/upload/2/2a/VSBugsy.png',
		},
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Whitney',
		team: [
			makeChallengerPokemon({
				name: 'miltank',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'wigglytuff',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({
				name: 'clefable',
				xp: 125000,
				heldItemName: 'silk-scarf',
			}),
			makeChallengerPokemon({
				name: 'raichu-alola',
				xp: 125000,
				heldItemName: 'twisted-spoon',
			}),
			makeChallengerPokemon({
				name: 'ninetales-alola',
				xp: 125000,
				heldItemName: 'never-melt-ice',
			}),
		],
		battleTeamConfig: { assignHeldItem: false },
		inventory: EmptyInventory,
		availableAfter: "catch whitney's favorite cute pokemon",
		trainer: {
			id: 'Gym Leader Whitney',
			sprite: SpriteEnum.whitney,
			profilePicture:
				'https://archives.bulbagarden.net/media/upload/2/27/VSWhitney.png',
		},
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Morty',
		team: [
			makeChallengerPokemon({
				name: 'trevenant',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
			makeChallengerPokemon({ name: 'shedinja', xp: 125000 }),
			makeChallengerPokemon({
				name: 'gengar',
				xp: 125000,
				heldItemName: 'black-sludge',
			}),
			makeChallengerPokemon({
				name: 'mismagius',
				xp: 125000,
				heldItemName: 'twisted-spoon',
			}),
			makeChallengerPokemon({
				name: 'aegislash-blade',
				xp: 125000,
				heldItemName: 'sitrus-berry',
			}),
		],
		inventory: EmptyInventory,
		availableAfter: 'catch Haunter and Mightyena',
		trainer: {
			id: 'Gym Leader Morty',
			sprite: SpriteEnum.morty,
			profilePicture:
				'https://archives.bulbagarden.net/media/upload/0/04/VSMorty.png',
		},
		battleTeamConfig: { assignHeldItem: false },
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Chuck',
		team: [
			makeChallengerPokemon({
				name: 'machamp',
				xp: 125000,
				heldItemName: 'black-belt',
			}),
			makeChallengerPokemon({
				name: 'hitmonlee',
				xp: 125000,
				heldItemName: 'leftovers',
			}),
			makeChallengerPokemon({
				name: 'emboar',
				xp: 125000,
				heldItemName: 'charcoal',
			}),
			makeChallengerPokemon({
				name: 'poliwrath',
				xp: 125000,
				heldItemName: 'mystic-water',
			}),
			makeChallengerPokemon({
				name: 'hawlucha',
				xp: 125000,
				heldItemName: 'sharp-beak',
			}),
			makeChallengerPokemon({
				name: 'kommo-o',
				xp: 125000,
				heldItemName: 'dragon-fang',
			}),
		],
		inventory: EmptyInventory,
		availableAfter: 'deal 10000 damage with one attack',
		trainer: {
			id: 'Gym Leader Chuck',
			sprite: SpriteEnum.chuck,
			profilePicture:
				'https://archives.bulbagarden.net/media/upload/a/af/VSChuck.png',
		},
		battleTeamConfig: { assignHeldItem: false },
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Jasmine',
		team: [
			makeChallengerPokemon({
				name: 'steelix',
				firstMove: { name: 'earthquake', usedPP: 0 },
				xp: 125000,
				heldItemName: 'occa-berry',
			}),
			makeChallengerPokemon({
				name: 'skarmory',
				xp: 125000,
				heldItemName: 'occa-berry',
			}),
			makeChallengerPokemon({
				name: 'scizor',
				xp: 125000,
				heldItemName: 'metal-coat',
			}),
			makeChallengerPokemon({
				name: 'magnezone',
				xp: 125000,
				heldItemName: 'magnet',
			}),
			makeChallengerPokemon({
				name: 'bisharp',
				xp: 125000,
				heldItemName: 'black-glasses',
			}),
		],
		inventory: EmptyInventory,
		availableAfter: 'catch an exceptional steel pokemon for jasmine',
		trainer: {
			id: 'Gym Leader Jasmine',
			sprite: SpriteEnum.jasmine,
			profilePicture:
				'https://archives.bulbagarden.net/media/upload/f/f2/VSJasmine.png',
		},
		battleTeamConfig: { assignHeldItem: false },
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Pryce',
		team: [
			makeChallengerPokemon({
				name: 'avalugg',
				xp: 125000,
				heldItemName: 'babiri-berry',
			}),

			makeChallengerPokemon({
				name: 'weavile',
				xp: 125000,
				heldItemName: 'chople-berry',
			}),
			makeChallengerPokemon({
				name: 'dewgong',
				xp: 125000,
				heldItemName: 'wacan-berry',
			}),
			makeChallengerPokemon({
				name: 'delibird',
				xp: 125000,
				heldItemName: 'charti-berry',
			}),
			makeChallengerPokemon({
				name: 'mamoswine',
				xp: 125000,
				heldItemName: 'charti-berry',
			}),
		],
		inventory: EmptyInventory,
		availableAfter: 'maximize the effort values of an ice pokemon',
		trainer: {
			id: 'Gym Leader Pryce',
			sprite: SpriteEnum.pryce,
			profilePicture:
				'https://archives.bulbagarden.net/media/upload/4/4f/VSPryce.png',
		},
		battleTeamConfig: { assignHeldItem: false },
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Clair',
		team: [
			makeChallengerPokemon({
				name: 'druddigon',
				xp: 125000,
				heldItemName: 'haban-berry',
			}),

			makeChallengerPokemon({
				name: 'dragonair',
				xp: 125000,
				heldItemName: 'roseli-berry',
			}),
			makeChallengerPokemon({
				name: 'haxorus',
				xp: 125000,
				heldItemName: 'haban-berry',
			}),
			makeChallengerPokemon({
				name: 'seadra',
				xp: 125000,
				heldItemName: 'wacan-berry',
			}),
			makeChallengerPokemon({
				name: 'kingdra',
				xp: 125000,
				heldItemName: 'roseli-berry',
			}),
		],
		inventory: EmptyInventory,
		availableAfter: 'reach max. friendship with a dragon pokemon',
		trainer: {
			id: 'Gym Leader Clair',
			sprite: SpriteEnum.clair,
			profilePicture:
				'https://archives.bulbagarden.net/media/upload/f/fc/VSClair.png',
		},
		battleTeamConfig: { assignHeldItem: false },
	},
	{
		type: 'TRAINER',
		id: 'Professor Rowan',
		team: [
			makeChallengerPokemon({ name: 'infernape', xp: 125000 }),
			makeChallengerPokemon({ name: 'empoleon', xp: 125000 }),
			makeChallengerPokemon({ name: 'torterra', xp: 125000 }),
			makeChallengerPokemon({ name: 'luxray', xp: 125000 }),
			makeChallengerPokemon({ name: 'staraptor', xp: 125000 }),
			makeChallengerPokemon({ name: 'lucario', xp: 125000 }),
		],
		inventory: EmptyInventory,
		availableAfter: 'catch all forms of tauros',
		trainer: { id: 'Professor Rowan', sprite: SpriteEnum.rowan },
	},
	{
		type: 'TRAINER',
		id: 'Professor Elm',
		team: [
			makeChallengerPokemon({ name: 'typhlosion', xp: 125000 }),
			makeChallengerPokemon({ name: 'feraligatr', xp: 125000 }),
			makeChallengerPokemon({ name: 'meganium', xp: 125000 }),
			makeChallengerPokemon({ name: 'ampharos', xp: 125000 }),
			makeChallengerPokemon({ name: 'noctowl', xp: 125000 }),
			makeChallengerPokemon({ name: 'kingdra', xp: 125000 }),
		],
		inventory: EmptyInventory,
		availableAfter: 'catch all evolutions of eevee',
		trainer: { id: 'Professor Elm', sprite: SpriteEnum.elm },
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Roark',
		team: [
			makeChallengerPokemon({ name: 'rampardos', xp: 125000 }),
			makeChallengerPokemon({ name: 'aerodactyl', xp: 125000 }),
			makeChallengerPokemon({ name: 'bastiodon', xp: 125000 }),
			makeChallengerPokemon({ name: 'omastar', xp: 125000 }),
			makeChallengerPokemon({ name: 'kabutops', xp: 125000 }),
			makeChallengerPokemon({ name: 'cradily', xp: 125000 }),
		],
		inventory: EmptyInventory,
		availableAfter: 'revive all different fossils',
		trainer: {
			id: 'Gym Leader Roark',
			sprite: SpriteEnum.roark,
			profilePicture:
				'https://archives.bulbagarden.net/media/upload/6/62/VSRoark.png',
		},
	},
];

export const trainers = [
	...specialTrainers,
	...tier5trainers,
	...tier4trainers,
	...tier3trainers,
	...tier2trainers,
	...tier1trainers,
];
export const trainersWeakToStrong = [
	...tier1trainers,
	...tier2trainers,
	...tier3trainers,
	...tier4trainers,
	...tier5trainers,
];

console.log('trainers', trainers.length);
console.log('trainers tier 1', tier1trainers.length);
console.log('trainers tier 2', tier2trainers.length);
console.log('trainers tier 3', tier3trainers.length);
console.log('trainers tier 4', tier4trainers.length);
console.log('trainers tier 5', tier5trainers.length);
