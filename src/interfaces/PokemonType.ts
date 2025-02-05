export type PokemonType =
	| 'fire'
	| 'water'
	| 'grass'
	| 'electric'
	| 'ghost'
	| 'dark'
	| 'psychic'
	| 'fairy'
	| 'normal'
	| 'rock'
	| 'ground'
	| 'steel'
	| 'ice'
	| 'dragon'
	| 'fighting'
	| 'flying'
	| 'poison'
	| 'bug';

//key : MoveType, values: Target Types
export const typeEffectivenessChart: Record<
	PokemonType,
	{
		isSuperEffectiveAgainst: PokemonType[];
		isNotVeryEffectiveAgainst: PokemonType[];
		doesntEffect: PokemonType[];
	}
> = {
	normal: {
		isSuperEffectiveAgainst: [],
		isNotVeryEffectiveAgainst: ['rock', 'steel'],
		doesntEffect: ['ghost'],
	},
	fire: {
		isSuperEffectiveAgainst: ['grass', 'ice', 'bug', 'steel'],
		isNotVeryEffectiveAgainst: ['fire', 'water', 'rock', 'dragon'],
		doesntEffect: [],
	},
	water: {
		isSuperEffectiveAgainst: ['fire', 'rock'],
		isNotVeryEffectiveAgainst: ['grass', 'water', 'dragon'],
		doesntEffect: [],
	},
	electric: {
		isSuperEffectiveAgainst: ['flying', 'water'],
		isNotVeryEffectiveAgainst: ['steel', 'dragon', 'grass'],
		doesntEffect: ['ground'],
	},
	grass: {
		isSuperEffectiveAgainst: ['rock', 'water', 'ground'],
		isNotVeryEffectiveAgainst: [
			'poison',
			'fire',
			'grass',
			'flying',
			'bug',
			'dragon',
		],
		doesntEffect: [],
	},
	ice: {
		isSuperEffectiveAgainst: ['flying', 'ground', 'dragon', 'grass'],
		isNotVeryEffectiveAgainst: ['water', 'fire', 'ice', 'steel'],
		doesntEffect: [],
	},
	fighting: {
		isSuperEffectiveAgainst: ['normal', 'rock', 'dark', 'steel', 'ice'],
		isNotVeryEffectiveAgainst: ['poison', 'psychic', 'fairy', 'flying', 'bug'],
		doesntEffect: ['ghost'],
	},
	poison: {
		isSuperEffectiveAgainst: ['grass', 'fairy'],
		isNotVeryEffectiveAgainst: ['poison', 'ground', 'rock', 'ghost'],
		doesntEffect: ['steel'],
	},
	ground: {
		isSuperEffectiveAgainst: ['electric', 'poison', 'rock', 'steel', 'fire'],
		isNotVeryEffectiveAgainst: ['grass', 'bug'],
		doesntEffect: ['flying'],
	},
	flying: {
		isSuperEffectiveAgainst: ['fighting', 'grass', 'bug'],
		isNotVeryEffectiveAgainst: ['steel', 'rock', 'electric'],
		doesntEffect: [],
	},
	psychic: {
		isSuperEffectiveAgainst: ['poison', 'fighting'],
		isNotVeryEffectiveAgainst: ['steel', 'psychic'],
		doesntEffect: ['dark'],
	},
	bug: {
		isSuperEffectiveAgainst: ['grass', 'psychic', 'dark'],
		isNotVeryEffectiveAgainst: [
			'fire',
			'fighting',
			'poison',
			'flying',
			'ghost',
			'steel',
			'fairy',
		],
		doesntEffect: [],
	},
	rock: {
		isSuperEffectiveAgainst: ['flying', 'fire', 'bug', 'ice'],
		isNotVeryEffectiveAgainst: ['steel', 'fighting', 'steel'],
		doesntEffect: [],
	},
	ghost: {
		isSuperEffectiveAgainst: ['psychic', 'ghost'],
		isNotVeryEffectiveAgainst: ['dark'],
		doesntEffect: ['normal'],
	},
	dragon: {
		isSuperEffectiveAgainst: ['dragon'],
		isNotVeryEffectiveAgainst: ['steel'],
		doesntEffect: ['fairy'],
	},
	dark: {
		isSuperEffectiveAgainst: ['psychic', 'ghost'],
		isNotVeryEffectiveAgainst: ['fighting', 'dark', 'fairy'],
		doesntEffect: [],
	},
	steel: {
		isSuperEffectiveAgainst: ['ice', 'rock', 'fairy'],
		isNotVeryEffectiveAgainst: ['fire', 'water', 'electric', 'steel'],
		doesntEffect: [],
	},
	fairy: {
		isSuperEffectiveAgainst: ['fighting', 'dragon', 'dark'],
		isNotVeryEffectiveAgainst: ['steel', 'fire', 'poison'],
		doesntEffect: [],
	},
};
