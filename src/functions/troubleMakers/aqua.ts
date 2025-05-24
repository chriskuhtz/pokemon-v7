import { PokemonName } from '../../constants/pokemonNames';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { SaveFile } from '../../interfaces/SaveFile';
import { EmptyStatObject } from '../../interfaces/StatObject';
import { getHighestXpOnTeam } from '../getHighestXpOnTeam';
import { makeChallengerPokemon } from '../makeChallengerPokemon';
export const aquaPokemon: {
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
	//aqua specific
	{ name: 'electrike', minXp: 1000, maxXp: 8000 },
	{ name: 'manectric', minXp: 8000, maxXp: 125000 },
	{ name: 'carvanha', minXp: 1000, maxXp: 8000 },
	{ name: 'sharpedo', minXp: 8000, maxXp: 125000 },
	{ name: 'lotad', minXp: 1000, maxXp: 8000 },
	{ name: 'lombre', minXp: 8000, maxXp: 125000 },
	{ name: 'ludicolo', minXp: 12000, maxXp: 125000 },
	{ name: 'corphish', minXp: 1000, maxXp: 8000 },
	{ name: 'crawdaunt', minXp: 8000, maxXp: 125000 },
	{ name: 'wailmer', minXp: 1000, maxXp: 8000 },
	{ name: 'wailord', minXp: 8000, maxXp: 125000 },
	{ name: 'clamperl', minXp: 1000, maxXp: 8000 },
	{ name: 'huntail', minXp: 8000, maxXp: 125000 },
	{ name: 'gorebyss', minXp: 8000, maxXp: 125000 },
	{ name: 'snorunt', minXp: 1000, maxXp: 8000 },
	{ name: 'glalie', minXp: 1000, maxXp: 125000 },
	{ name: 'spheal', minXp: 1000, maxXp: 8000 },
	{ name: 'sealeo', minXp: 8000, maxXp: 64000 },
	{ name: 'walrein', minXp: 15000, maxXp: 125000 },
	{ name: 'gyarados', minXp: 27000, maxXp: 125000 },
	{ name: 'relicanth', minXp: 27000, maxXp: 125000 },
	{ name: 'luvdisc', minXp: 27000, maxXp: 125000 },
];

export const aquaNamesMale = [
	'Arne',
	'Armadeus',
	'Alonso',
	'Alfonse',
	'Aiden',
	'Asher',
	'Anthony',
	'Alexander',
	'Andre',
	'Amir',
];
export const aquaNamesFemale = [
	'April',
	'Agnes',
	'Agatha',
	'Alicia',
	'Audrey',
	'Amelia',
	'Anna',
	'Arya',
	'Allison',
	'Ava',
];
export const getAquaMessage = (): string[] => {
	const r = Math.random();

	if (r > 0.9) {
		return ['Gotta stay hydrated'];
	}
	if (r > 0.8) {
		return ['More Water, less problems'];
	}
	if (r > 0.7) {
		return ['Arrr, we´re pirates'];
	}
	if (r > 0.6) {
		return ['Time to walk the plank'];
	}
	if (r > 0.5) {
		return ['Water Pokemon are the best'];
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

export const getAquaArnoldTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = getHighestXpOnTeam(s.pokemon);

	return [
		makeChallengerPokemon({
			xp,
			name: 'gyarados',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'mightyena',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'crobat',
			effortValues: { ...EmptyStatObject, 'special-attack': 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'dusclops',
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
			name: 'sableye',
			effortValues: {
				...EmptyStatObject,
				attack: 252,
				speed: 252,
			},
		}),
	];
};
export const getAquaAliyaTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = getHighestXpOnTeam(s.pokemon);

	return [
		makeChallengerPokemon({
			xp,
			name: 'walrein',
			effortValues: { ...EmptyStatObject, attack: 252, defense: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'tauros',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'slaking',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'ludicolo',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'pelipper',
			effortValues: {
				...EmptyStatObject,
				attack: 252,
				speed: 252,
			},
		}),
		makeChallengerPokemon({
			xp,
			name: 'ninjask',
			effortValues: {
				...EmptyStatObject,
				defense: 252,
				'special-attack': 252,
			},
		}),
	];
};
