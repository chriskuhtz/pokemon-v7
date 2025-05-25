import { PokemonName } from '../../constants/pokemonNames';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { SaveFile } from '../../interfaces/SaveFile';
import { EmptyStatObject } from '../../interfaces/StatObject';
import { getHighestXpOnTeam } from '../getHighestXpOnTeam';
import { makeChallengerPokemon } from '../makeChallengerPokemon';
export const galacticPokemon: {
	name: PokemonName;
	minXp: number;
	maxXp: number;
}[] = [
	{ name: 'bidoof', minXp: 1000, maxXp: 8000 },
	{ name: 'bibarel', minXp: 8000, maxXp: 125000 },
	{ name: 'glameow', minXp: 1000, maxXp: 8000 },
	{ name: 'purugly', minXp: 8000, maxXp: 125000 },
	{ name: 'chatot', minXp: 8000, maxXp: 125000 },
	{ name: 'kricketune', minXp: 8000, maxXp: 125000 },
	{ name: 'shellos', minXp: 1000, maxXp: 8000 },
	{ name: 'gastrodon', minXp: 8000, maxXp: 125000 },
	{ name: 'shinx', minXp: 1000, maxXp: 8000 },
	{ name: 'luxio', minXp: 8000, maxXp: 64000 },
	{ name: 'luxray', minXp: 8000, maxXp: 125000 },
	{ name: 'buizel', minXp: 1000, maxXp: 8000 },
	{ name: 'floatzel', minXp: 8000, maxXp: 125000 },
	{ name: 'aipom', minXp: 1000, maxXp: 8000 },
	{ name: 'ambipom', minXp: 8000, maxXp: 125000 },
	{ name: 'starly', minXp: 1000, maxXp: 8000 },
	{ name: 'staravia', minXp: 8000, maxXp: 125000 },
	{ name: 'staraptor', minXp: 12000, maxXp: 125000 },
	{ name: 'drifloon', minXp: 1000, maxXp: 8000 },
	{ name: 'drifblim', minXp: 8000, maxXp: 125000 },
	{ name: 'roselia', minXp: 1000, maxXp: 8000 },
	{ name: 'roserade', minXp: 8000, maxXp: 125000 },
	{ name: 'bronzor', minXp: 1000, maxXp: 8000 },
	{ name: 'bronzong', minXp: 8000, maxXp: 125000 },
	{ name: 'electivire', minXp: 8000, maxXp: 125000 },
	{ name: 'magmortar', minXp: 8000, maxXp: 125000 },
	{ name: 'buneary', minXp: 1000, maxXp: 8000 },
	{ name: 'lopunny', minXp: 27000, maxXp: 125000 },
	{ name: 'yanmega', minXp: 27000, maxXp: 125000 },
	{ name: 'probopass', minXp: 27000, maxXp: 125000 },
];

export const galacticNamesMale = [
	'Garth',
	'Garett',
	'Gunther',
	'Gustav',
	'Gerome',
	'Gabe',
	'Guy',
	'Gregory',
	'Gideon',
	'Graham',
];
export const galacticNamesFemale = [
	'Gabrielle',
	'Gianna',
	'Gemma',
	'Georgia',
	'Genevieve',
	'Giselle',
	'Grace',
	'Gwendolyn',
	'Greta',
	'Gina',
];
export const getGalacticMessage = (): string[] => {
	const r = Math.random();

	if (r > 0.9) {
		return ['To the moon', 'or something like that'];
	}
	if (r > 0.8) {
		return [
			'Honestly, i have no clue what we do',
			'I just show up and get paid',
		];
	}
	if (r > 0.7) {
		return ['We want equality for humans and pokemon', '... i think'];
	}
	if (r > 0.6) {
		return ['I just love our coordinated outfits'];
	}
	if (r > 0.5) {
		return ['I thought we were going to space :('];
	}
	if (r > 0.4) {
		return ['You are so annoying'];
	}
	if (r > 0.3) {
		return ['Leave, if you know whats good for you'];
	}
	if (r > 0.2) {
		return ['You wouldnt understand our goals', 'and neither do I'];
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

export const getGalacticMarsTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = getHighestXpOnTeam(s.pokemon);

	return [
		makeChallengerPokemon({
			xp,
			name: 'staraptor',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'abomasnow',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'magmortar',
			effortValues: { ...EmptyStatObject, 'special-attack': 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'luxray',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'torterra',
			effortValues: {
				...EmptyStatObject,
				defense: 252,
				'special-defense': 252,
			},
		}),
	];
};
export const getGalacticJupiterTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = getHighestXpOnTeam(s.pokemon);

	return [
		makeChallengerPokemon({
			xp,
			name: 'purugly',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'infernape',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'probopass',
			effortValues: { ...EmptyStatObject, 'special-attack': 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'roserade',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'ambipom',
			effortValues: {
				...EmptyStatObject,
				defense: 252,
				'special-defense': 252,
			},
		}),
	];
};
export const getGalacticSaturnTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = getHighestXpOnTeam(s.pokemon);

	return [
		makeChallengerPokemon({
			xp,
			name: 'lopunny',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'empoleon',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'drifblim',
			effortValues: { ...EmptyStatObject, 'special-attack': 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'honchkrow',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'hippowdon',
			effortValues: {
				...EmptyStatObject,
				defense: 252,
				'special-defense': 252,
			},
		}),
	];
};
