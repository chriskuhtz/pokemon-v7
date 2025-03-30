import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory } from '../interfaces/Inventory';
import { SaveFile } from '../interfaces/SaveFile';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import { getRandomEntry } from './filterTargets';
import { makeChallengerPokemon } from './makeChallengerPokemon';

const tier1trainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Fiery Fred',
		team: [
			makeChallengerPokemon({ name: 'magby', xp: 1000 }),
			makeChallengerPokemon({ name: 'slugma', xp: 1000 }),
			makeChallengerPokemon({ name: 'litleo', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Fiery Fred', sprite: SpriteEnum.pyro },
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
		trainer: { name: 'Adrian Agua', sprite: SpriteEnum.sailor },
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
		trainer: { name: 'Planter Paul', sprite: SpriteEnum.farmer },
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
		trainer: { name: 'Electric Erik', sprite: SpriteEnum.mechanic },
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
		trainer: { name: 'Haunted Hilda', sprite: SpriteEnum.possessed },
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
		trainer: { name: 'Dark Dave', sprite: SpriteEnum.gangster },
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
		trainer: { name: 'Psycho Pete', sprite: SpriteEnum.psychic },
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
		trainer: { name: 'Fairy Frida', sprite: SpriteEnum.maid },
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
		trainer: { name: 'Normal Norman', sprite: SpriteEnum.uncle },
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
		trainer: { name: 'Rick the Rock', sprite: SpriteEnum.hiker },
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
		trainer: { name: 'grounded gunther', sprite: SpriteEnum.explorer },
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
		trainer: { name: 'steely stannis', sprite: SpriteEnum.builder },
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
		trainer: { name: 'icy irmgard', sprite: SpriteEnum.grandma },
	},
	{
		type: 'TRAINER',
		id: 'drake (not the pedo)',
		team: [
			makeChallengerPokemon({ name: 'dratini', xp: 1000 }),
			makeChallengerPokemon({ name: 'jangmo-o', xp: 1000 }),
			makeChallengerPokemon({ name: 'bagon', xp: 1000 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'drake (not the pedo)', sprite: SpriteEnum.ace2Male },
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
		trainer: { name: 'fighting frank', sprite: SpriteEnum.karateMale },
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
		trainer: { name: 'flying fernanda', sprite: SpriteEnum.beauty1 },
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
		trainer: { name: 'poisonous pedro', sprite: SpriteEnum.biker },
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
		trainer: { name: 'Buggin Bob', sprite: SpriteEnum.bugCatcher },
	},
];
const tier2trainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Fiery Fred 2',
		team: [
			makeChallengerPokemon({ name: 'magmar', xp: 3375 }),
			makeChallengerPokemon({ name: 'slugma', xp: 3375 }),
			makeChallengerPokemon({ name: 'litleo', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Fiery Fred 2', sprite: SpriteEnum.pyro },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Adrian Agua 2',
		team: [
			makeChallengerPokemon({ name: 'sealeo', xp: 3375 }),
			makeChallengerPokemon({ name: 'buizel', xp: 3375 }),
			makeChallengerPokemon({ name: 'poliwag', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Adrian Agua 2', sprite: SpriteEnum.sailor },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Planter Paul 2',
		team: [
			makeChallengerPokemon({ name: 'petilil', xp: 3375 }),
			makeChallengerPokemon({ name: 'gloom', xp: 3375 }),
			makeChallengerPokemon({ name: 'shroomish', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Planter Paul 2', sprite: SpriteEnum.farmer },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Electric Erik 2',
		team: [
			makeChallengerPokemon({ name: 'electabuzz', xp: 3375 }),
			makeChallengerPokemon({ name: 'pachirisu', xp: 3375 }),
			makeChallengerPokemon({ name: 'yamper', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Electric Erik 2', sprite: SpriteEnum.mechanic },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Haunted Hilda 2',
		team: [
			makeChallengerPokemon({ name: 'gastly', xp: 3375 }),
			makeChallengerPokemon({ name: 'phantump', xp: 3375 }),
			makeChallengerPokemon({ name: 'dusclops', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Haunted Hilda 2', sprite: SpriteEnum.possessed },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Dark Dave 2',
		team: [
			makeChallengerPokemon({ name: 'houndour', xp: 3375 }),
			makeChallengerPokemon({ name: 'murkrow', xp: 3375 }),
			makeChallengerPokemon({ name: 'nuzleaf', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Dark Dave 2', sprite: SpriteEnum.gangster },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Psycho Pete 2',
		team: [
			makeChallengerPokemon({ name: 'drowzee', xp: 3375 }),
			makeChallengerPokemon({ name: 'kirlia', xp: 3375 }),
			makeChallengerPokemon({ name: 'espurr', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Psycho Pete 2', sprite: SpriteEnum.psychic },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Fairy Frida 2',
		team: [
			makeChallengerPokemon({ name: 'clefable', xp: 3375 }),
			makeChallengerPokemon({ name: 'marill', xp: 3375 }),
			makeChallengerPokemon({ name: 'slurpuff', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Fairy Frida 2', sprite: SpriteEnum.maid },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Normal Norman 2',
		team: [
			makeChallengerPokemon({ name: 'herdier', xp: 3375 }),
			makeChallengerPokemon({ name: 'meowth', xp: 3375 }),
			makeChallengerPokemon({ name: 'tauros', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Normal Norman 2', sprite: SpriteEnum.uncle },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Rick the Rock 2',
		team: [
			makeChallengerPokemon({ name: 'nosepass', xp: 3375 }),
			makeChallengerPokemon({ name: 'onix', xp: 3375 }),
			makeChallengerPokemon({ name: 'boldore', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Rick the Rock 2', sprite: SpriteEnum.hiker },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'grounded gunther 2',
		team: [
			makeChallengerPokemon({ name: 'sandshrew', xp: 3375 }),
			makeChallengerPokemon({ name: 'sandaconda', xp: 3375 }),
			makeChallengerPokemon({ name: 'vibrava', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'grounded gunther 2', sprite: SpriteEnum.explorer },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'steely stannis 2',
		team: [
			makeChallengerPokemon({ name: 'lairon', xp: 3375 }),
			makeChallengerPokemon({ name: 'magnemite', xp: 3375 }),
			makeChallengerPokemon({ name: 'skarmory', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'steely stannis 2', sprite: SpriteEnum.builder },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'icy irmgard 2',
		team: [
			makeChallengerPokemon({ name: 'sandshrew-alola', xp: 3375 }),
			makeChallengerPokemon({ name: 'vanillish', xp: 3375 }),
			makeChallengerPokemon({ name: 'sealeo', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'icy irmgard 2', sprite: SpriteEnum.grandma },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'drake (still not the pedo)',
		team: [
			makeChallengerPokemon({ name: 'dragonair', xp: 3375 }),
			makeChallengerPokemon({ name: 'jangmo-o', xp: 3375 }),
			makeChallengerPokemon({ name: 'bagon', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: {
			name: 'drake (still not the pedo)',
			sprite: SpriteEnum.ace2Male,
		},
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'fighting frank 2',
		team: [
			makeChallengerPokemon({ name: 'hitmonlee', xp: 3375 }),
			makeChallengerPokemon({ name: 'machop', xp: 3375 }),
			makeChallengerPokemon({ name: 'timburr', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'fighting frank 2', sprite: SpriteEnum.karateMale },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'flying fernanda 2',
		team: [
			makeChallengerPokemon({ name: 'pidgeotto', xp: 3375 }),
			makeChallengerPokemon({ name: 'farfetchd', xp: 3375 }),
			makeChallengerPokemon({ name: 'spearow', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'flying fernanda 2', sprite: SpriteEnum.beauty1 },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'poisonous pedro 2',
		team: [
			makeChallengerPokemon({ name: 'koffing', xp: 3375 }),
			makeChallengerPokemon({ name: 'swalot', xp: 3375 }),
			makeChallengerPokemon({ name: 'toxel', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'poisonous pedro 2', sprite: SpriteEnum.biker },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Buggin Bob 2',
		team: [
			makeChallengerPokemon({ name: 'butterfree', xp: 3375 }),
			makeChallengerPokemon({ name: 'beedrill', xp: 3375 }),
			makeChallengerPokemon({ name: 'pinsir', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Buggin Bob 2', sprite: SpriteEnum.bugCatcher },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Kanto Ken',
		team: [
			makeChallengerPokemon({ name: 'charmeleon', xp: 3375 }),
			makeChallengerPokemon({ name: 'wartortle', xp: 3375 }),
			makeChallengerPokemon({ name: 'ivysaur', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Kanto Ken', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Johto John',
		team: [
			makeChallengerPokemon({ name: 'quilava', xp: 3375 }),
			makeChallengerPokemon({ name: 'croconaw', xp: 3375 }),
			makeChallengerPokemon({ name: 'bayleef', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Johto John', sprite: SpriteEnum.aceMale },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Hoenn Hannah',
		team: [
			makeChallengerPokemon({ name: 'combusken', xp: 3375 }),
			makeChallengerPokemon({ name: 'marshtomp', xp: 3375 }),
			makeChallengerPokemon({ name: 'grovyle', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Hoenn Hannah', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 2',
	},
	{
		type: 'TRAINER',
		id: 'Sinnoh Simone',
		team: [
			makeChallengerPokemon({ name: 'monferno', xp: 3375 }),
			makeChallengerPokemon({ name: 'prinplup', xp: 3375 }),
			makeChallengerPokemon({ name: 'grotle', xp: 3375 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Sinnoh Simone', sprite: SpriteEnum.aceFemale },
		requiredUpgrade: 'training field 2',
	},
];
const specialTrainers: Challenger[] = [
	{
		type: 'TRAINER',
		id: 'Gym Leader Morty',
		team: [
			makeChallengerPokemon({ name: 'gastly', xp: 8000 }),
			makeChallengerPokemon({ name: 'haunter', xp: 8000 }),
			makeChallengerPokemon({ name: 'gengar', xp: 8000 }),
			makeChallengerPokemon({ name: 'misdreavus', xp: 8000 }),
			makeChallengerPokemon({ name: 'aegislash-blade', xp: 8000 }),
		],
		inventory: EmptyInventory,
		availableAfter: 'catch Haunter and Mightyena',
		trainer: { name: 'Gym Leader Morty', sprite: SpriteEnum.morty },
	},
	{
		type: 'TRAINER',
		id: 'Gym Leader Falkner',
		team: [
			makeChallengerPokemon({ name: 'noctowl', xp: 91125 }),
			makeChallengerPokemon({ name: 'pidgeot', xp: 91125 }),
			makeChallengerPokemon({ name: 'braviary', xp: 91125 }),
			makeChallengerPokemon({ name: 'skarmory', xp: 91125 }),
		],
		inventory: EmptyInventory,
		availableAfter: 'catch the legendary bird of ice',
		trainer: { name: 'Gym Leader Falkner', sprite: SpriteEnum.falkner },
	},
	{
		type: 'TRAINER',
		id: 'Professor Rowan',
		team: [
			makeChallengerPokemon({ name: 'infernape', xp: 15625 }),
			makeChallengerPokemon({ name: 'empoleon', xp: 15625 }),
			makeChallengerPokemon({ name: 'torterra', xp: 15625 }),
			makeChallengerPokemon({ name: 'luxray', xp: 15625 }),
			makeChallengerPokemon({ name: 'staraptor', xp: 15625 }),
			makeChallengerPokemon({ name: 'lucario', xp: 15625 }),
		],
		inventory: EmptyInventory,
		availableAfter: 'catch a pokemon orginally found in paldea',
		trainer: { name: 'Professor Rowan', sprite: SpriteEnum.rowan },
	},
	{
		type: 'TRAINER',
		id: 'Professor Elm',
		team: [
			makeChallengerPokemon({ name: 'typhlosion', xp: 15625 }),
			makeChallengerPokemon({ name: 'feraligatr', xp: 15625 }),
			makeChallengerPokemon({ name: 'meganium', xp: 15625 }),
			makeChallengerPokemon({ name: 'ampharos', xp: 15625 }),
			makeChallengerPokemon({ name: 'noctowl', xp: 15625 }),
			makeChallengerPokemon({ name: 'kingdra', xp: 15625 }),
		],
		inventory: EmptyInventory,
		availableAfter: 'evolve a pokemon that only evolves at night',
		trainer: { name: 'Professor Elm', sprite: SpriteEnum.rowan },
	},
];

export const trainers = [
	...specialTrainers,
	...tier2trainers,
	...tier1trainers,
];
export const makeRandomTrainer = (saveFile: SaveFile): Challenger => {
	return getRandomEntry(
		trainers.filter((t) => {
			let res = true;
			if (t.availableAfter) {
				res = saveFile.quests[t.availableAfter] === 'COLLECTED';
			}
			if (t.requiredUpgrade) {
				res = saveFile.campUpgrades[t.requiredUpgrade];
			}

			return res;
		})
	);
};
