import { PokemonName } from '../../constants/pokemonNames';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { SaveFile } from '../../interfaces/SaveFile';
import { EmptyStatObject } from '../../interfaces/StatObject';
import { getHighestXpOnTeam } from '../getHighestXpOnTeam';
import { makeChallengerPokemon } from '../makeChallengerPokemon';
export const magmaPokemon: {
	name: PokemonName;
	minXp: number;
	maxXp: number;
}[] = [
	//magma and aqua
	{ name: 'makuhita', minXp: 8000, maxXp: 125000 },
	{ name: 'hariyama', minXp: 1000, maxXp: 8000 },
	{ name: 'poochyena', minXp: 1000, maxXp: 8000 },
	{ name: 'mightyena', minXp: 8000, maxXp: 125000 },
	{ name: 'seviper', minXp: 8000, maxXp: 125000 },
	{ name: 'zangoose', minXp: 8000, maxXp: 125000 },
	{ name: 'zigzagoon', minXp: 1000, maxXp: 8000 },
	{ name: 'linoone', minXp: 8000, maxXp: 125000 },
	{ name: 'zubat', minXp: 1000, maxXp: 8000 },
	{ name: 'golbat', minXp: 8000, maxXp: 64000 },
	{ name: 'crobat', minXp: 8000, maxXp: 125000 },
	//magma specific
	{ name: 'numel', minXp: 1000, maxXp: 8000 },
	{ name: 'camerupt', minXp: 8000, maxXp: 125000 },
	{ name: 'baltoy', minXp: 1000, maxXp: 8000 },
	{ name: 'claydol', minXp: 8000, maxXp: 125000 },
	{ name: 'aron', minXp: 1000, maxXp: 8000 },
	{ name: 'lairon', minXp: 8000, maxXp: 125000 },
	{ name: 'aggron', minXp: 12000, maxXp: 125000 },
	{ name: 'meditite', minXp: 1000, maxXp: 8000 },
	{ name: 'medicham', minXp: 8000, maxXp: 125000 },
	{ name: 'cacnea', minXp: 1000, maxXp: 8000 },
	{ name: 'cacturne', minXp: 8000, maxXp: 125000 },
	{ name: 'spoink', minXp: 1000, maxXp: 8000 },
	{ name: 'grumpig', minXp: 8000, maxXp: 125000 },
	{ name: 'lunatone', minXp: 8000, maxXp: 125000 },
	{ name: 'solrock', minXp: 8000, maxXp: 125000 },
	{ name: 'trapinch', minXp: 1000, maxXp: 8000 },
	{ name: 'vibrava', minXp: 8000, maxXp: 64000 },
	{ name: 'flygon', minXp: 15000, maxXp: 125000 },
	{ name: 'torkoal', minXp: 27000, maxXp: 125000 },
	{ name: 'nosepass', minXp: 27000, maxXp: 125000 },
];

export const magmaNamesMale = [
	'Matt',
	'Mike',
	'Mitch',
	'Mark',
	'Mo',
	'Mac',
	'Mannie',
	'Manfred',
	'Malachay',
	'Mateo',
];
export const magmaNamesFemale = [
	'Madeline',
	'Mackenzie',
	'Mallory',
	'Maeve',
	'Mia',
	'Maria',
	'Melanie',
	'Magnolia',
	'Mabel',
	'Maya',
];
export const getMagmaMessage = (): string[] => {
	const r = Math.random();

	if (r > 0.9) {
		return ['We hate water', 'we dont even shower'];
	}
	if (r > 0.8) {
		return ['Desert Power!'];
	}
	if (r > 0.7) {
		return [
			'We need more land',
			'or something?',
			'i dont quite get it',
			'but team magma gets me out of the house',
		];
	}
	if (r > 0.6) {
		return ['We will bury you in sand up to your neck'];
	}
	if (r > 0.5) {
		return ['Ground Pokemon are the best'];
	}
	if (r > 0.4) {
		return ['You are so annoying'];
	}
	if (r > 0.3) {
		return ['Leave, if you know whats good for you'];
	}
	if (r > 0.2) {
		return ['You wouldnt understand our goals'];
	}
	if (r > 0.2) {
		return ['You little Runt'];
	}
	if (r > 0.1) {
		return [
			'We are hardened Criminals',
			'But if you defeat our pokemon',
			'We will stop ;)',
		];
	}
	return ['I will squash you'];
};

export const getMagmaMaxieTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = getHighestXpOnTeam(s.pokemon);

	return [
		makeChallengerPokemon({
			xp,
			name: 'flygon',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'hariyama',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'camerupt',
			effortValues: { ...EmptyStatObject, 'special-attack': 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'torkoal',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'exploud',
			effortValues: {
				...EmptyStatObject,
				defense: 252,
				'special-defense': 252,
			},
		}),
		makeChallengerPokemon({
			xp,
			name: 'aggron',
			effortValues: {
				...EmptyStatObject,
				attack: 252,
				speed: 252,
			},
		}),
	];
};
