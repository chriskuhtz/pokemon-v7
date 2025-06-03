import { TimeOfDay } from '../functions/getTimeOfDay';
import { PokemonType } from '../interfaces/PokemonType';
import { StatObject } from '../interfaces/StatObject';
import { MapId } from './maps/mapsRecord';
import { PokemonName } from './pokemonNames';

export type SwarmType =
	| 'WEAK'
	| 'STRONG'
	| 'PAST_DISTORTION'
	| 'SPACE_DISTORTION'
	| 'FUTURE_DISTORTION';

export type EncounterOption = {
	route: MapId;
	timeOfDay: TimeOfDay | 'ALL_DAY';
	minXp: number;
	maxXp: number;
	rarity: 'common' | 'medium' | 'rare' | 'ultra-rare';
	area: 'LAND' | 'WATER';
};
export type InternalDexEntry = {
	dexId: number;
	rampager?: boolean;
	swarm?: SwarmType;
	berryLureMapId?: MapId;
	types: PokemonType[];
	honey?: boolean;
	underRock?: boolean;
	encounterOptions: EncounterOption[];
	evs: Partial<StatObject>;
};

//route W1:  rock

export const internalDex: Record<PokemonName, InternalDexEntry> = {
	bulbasaur: {
		dexId: 1,
		types: ['grass', 'poison'],
		encounterOptions: [],
		swarm: 'WEAK',
		evs: {
			'special-attack': 1,
		},
	},
	ivysaur: {
		dexId: 2,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
		},
	},
	venusaur: {
		dexId: 3,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
	},
	charmander: {
		dexId: 4,
		types: ['fire'],
		encounterOptions: [],
		swarm: 'WEAK',
		evs: {
			speed: 1,
		},
	},
	charmeleon: {
		dexId: 5,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	charizard: {
		dexId: 6,
		types: ['fire', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	squirtle: {
		dexId: 7,
		types: ['water'],
		encounterOptions: [],
		swarm: 'WEAK',
		evs: {
			defense: 1,
		},
	},
	wartortle: {
		dexId: 8,
		types: ['water'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	blastoise: {
		dexId: 9,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	caterpie: {
		dexId: 10,
		types: ['bug'],
		encounterOptions: [],
		berryLureMapId: 'routeN1E1',
		evs: {
			hp: 1,
		},
	},
	metapod: {
		dexId: 11,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	butterfree: {
		dexId: 12,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
	},
	weedle: {
		dexId: 13,
		types: ['bug', 'poison'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	kakuna: {
		dexId: 14,
		types: ['bug', 'poison'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	beedrill: {
		dexId: 15,
		types: ['bug', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 2,
			'special-defense': 1,
		},
	},
	pidgey: {
		dexId: 16,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	pidgeotto: {
		dexId: 17,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	pidgeot: {
		dexId: 18,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			speed: 3,
		},
	},
	rattata: {
		dexId: 19,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	raticate: {
		dexId: 20,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	spearow: {
		dexId: 21,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	fearow: {
		dexId: 22,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	ekans: {
		dexId: 23,
		types: ['poison'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	arbok: {
		dexId: 24,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	pikachu: {
		dexId: 25,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	raichu: {
		dexId: 26,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	sandshrew: {
		dexId: 27,
		types: ['ground'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			defense: 1,
		},
	},
	sandslash: {
		dexId: 28,
		types: ['ground'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 15625,
				minXp: 8000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	'nidoran-f': {
		dexId: 29,
		types: ['poison'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	nidorina: {
		dexId: 30,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	nidoqueen: {
		dexId: 31,
		types: ['poison', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'nidoran-m': {
		dexId: 32,
		types: ['poison'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	nidorino: {
		dexId: 33,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	nidoking: {
		dexId: 34,
		types: ['poison', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	clefairy: {
		dexId: 35,
		types: ['fairy'],
		encounterOptions: [
			{
				maxXp: 125,
				minXp: 125,
				route: 'onixCave',
				rarity: 'ultra-rare',
				timeOfDay: 'NIGHT',
				area: 'LAND',
			},
		],
		evs: {
			hp: 2,
		},
	},
	clefable: {
		dexId: 36,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	vulpix: {
		dexId: 37,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	ninetales: {
		dexId: 38,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
			speed: 1,
		},
	},
	jigglypuff: {
		dexId: 39,
		types: ['normal', 'fairy'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			hp: 2,
		},
	},
	wigglytuff: {
		dexId: 40,
		swarm: 'STRONG',
		types: ['normal', 'fairy'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	zubat: {
		dexId: 41,
		types: ['poison', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1E1',
			},
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			speed: 1,
		},
	},
	golbat: {
		dexId: 42,
		types: ['poison', 'flying'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1E1',
			},
			{
				rarity: 'ultra-rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'caveW1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	oddish: {
		dexId: 43,
		types: ['grass', 'poison'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	gloom: {
		dexId: 44,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	vileplume: {
		dexId: 45,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	paras: {
		dexId: 46,
		types: ['bug', 'grass'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	parasect: {
		dexId: 47,
		types: ['bug', 'grass'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'caveW1',
			},
		],
		evs: {
			attack: 2,
			defense: 1,
		},
	},
	venonat: {
		dexId: 48,
		types: ['bug', 'poison'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	venomoth: {
		dexId: 49,
		types: ['bug', 'poison'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	diglett: {
		dexId: 50,
		types: ['ground'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	dugtrio: {
		dexId: 51,
		types: ['ground'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	meowth: {
		dexId: 52,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	persian: {
		dexId: 53,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	psyduck: {
		dexId: 54,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1E1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	golduck: {
		dexId: 55,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	mankey: {
		dexId: 56,
		types: ['fighting'],
		honey: true,
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	primeape: {
		dexId: 57,
		rampager: true,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	growlithe: {
		dexId: 58,
		types: ['fire'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	arcanine: {
		dexId: 59,
		rampager: true,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	poliwag: {
		dexId: 60,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1W1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	poliwhirl: {
		dexId: 61,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1W1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	poliwrath: {
		dexId: 62,
		types: ['water', 'fighting'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	abra: {
		dexId: 63,
		types: ['psychic'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	kadabra: {
		dexId: 64,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	alakazam: {
		dexId: 65,
		rampager: true,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	machop: {
		dexId: 66,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	machoke: {
		dexId: 67,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	machamp: {
		dexId: 68,
		rampager: true,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	bellsprout: {
		dexId: 69,
		types: ['grass', 'poison'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	weepinbell: {
		dexId: 70,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	victreebel: {
		dexId: 71,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	tentacool: {
		dexId: 72,
		types: ['water', 'poison'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	tentacruel: {
		dexId: 73,
		types: ['water', 'poison'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	geodude: {
		dexId: 74,
		types: ['rock', 'ground'],
		underRock: true,
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	graveler: {
		dexId: 75,
		types: ['rock', 'ground'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	golem: {
		dexId: 76,
		types: ['rock', 'ground'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'caveW1',
			},
		],
		evs: {
			defense: 3,
		},
	},
	ponyta: {
		dexId: 77,
		types: ['fire'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	rapidash: {
		dexId: 78,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	slowpoke: {
		dexId: 79,
		types: ['water', 'psychic'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	slowbro: {
		dexId: 80,
		types: ['water', 'psychic'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 35000,
				minXp: 20000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	magnemite: {
		dexId: 81,
		types: ['electric', 'steel'],
		encounterOptions: [],
		berryLureMapId: 'routeS1W1',
		evs: {
			'special-attack': 1,
		},
	},
	magneton: {
		dexId: 82,
		swarm: 'STRONG',
		types: ['electric', 'steel'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	farfetchd: {
		dexId: 83,
		types: ['normal', 'flying'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	doduo: {
		dexId: 84,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	dodrio: {
		dexId: 85,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	seel: {
		dexId: 86,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	dewgong: {
		dexId: 87,
		types: ['water', 'ice'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	grimer: {
		dexId: 88,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	muk: {
		dexId: 89,
		types: ['poison'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 35000,
				minXp: 20000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			hp: 1,
			attack: 1,
		},
	},
	shellder: {
		dexId: 90,
		types: ['water'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	cloyster: {
		dexId: 91,
		types: ['water', 'ice'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	gastly: {
		dexId: 92,
		types: ['ghost', 'poison'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	haunter: {
		dexId: 93,
		types: ['ghost', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	gengar: {
		dexId: 94,
		types: ['ghost', 'poison'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			'special-attack': 3,
		},
	},
	onix: {
		dexId: 95,
		types: ['rock', 'ground'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			defense: 1,
		},
	},
	drowzee: {
		dexId: 96,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	hypno: {
		dexId: 97,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	krabby: {
		dexId: 98,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	kingler: {
		dexId: 99,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 35000,
				minXp: 20000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	voltorb: {
		dexId: 100,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	electrode: {
		dexId: 101,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	exeggcute: {
		dexId: 102,
		types: ['grass', 'psychic'],
		honey: true,
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	exeggutor: {
		dexId: 103,
		types: ['grass', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	cubone: {
		dexId: 104,
		types: ['ground'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			defense: 1,
		},
	},
	marowak: {
		dexId: 105,
		types: ['ground'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	hitmonlee: {
		dexId: 106,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	hitmonchan: {
		dexId: 107,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			'special-defense': 2,
		},
	},
	lickitung: {
		dexId: 108,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 216,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			hp: 2,
		},
	},
	koffing: {
		dexId: 109,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	weezing: {
		dexId: 110,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	rhyhorn: {
		dexId: 111,
		types: ['ground', 'rock'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			defense: 1,
		},
	},
	rhydon: {
		dexId: 112,
		types: ['ground', 'rock'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	chansey: {
		dexId: 113,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	tangela: {
		dexId: 114,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	kangaskhan: {
		dexId: 115,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'caveW1',
			},
		],
		evs: {
			hp: 2,
		},
	},
	horsea: {
		dexId: 116,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	seadra: {
		dexId: 117,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 35000,
				minXp: 20000,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			defense: 1,
			'special-attack': 1,
		},
	},
	goldeen: {
		dexId: 118,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1W1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	seaking: {
		dexId: 119,
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	staryu: {
		dexId: 120,
		types: ['water'],
		encounterOptions: [],
		berryLureMapId: 'routeS1E1',
		evs: {
			speed: 1,
		},
	},
	starmie: {
		dexId: 121,
		types: ['water', 'psychic'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'mr-mime': {
		dexId: 122,
		types: ['psychic', 'fairy'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	scyther: {
		dexId: 123,
		types: ['bug', 'flying'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	jynx: {
		dexId: 124,
		types: ['ice', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	electabuzz: {
		dexId: 125,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	magmar: {
		dexId: 126,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	pinsir: {
		dexId: 127,
		rampager: true,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	tauros: {
		dexId: 128,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			attack: 1,
			speed: 1,
		},
	},
	magikarp: {
		dexId: 129,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 125,
				minXp: 125,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1E1',
			},
			{
				rarity: 'rare',
				maxXp: 125,
				minXp: 125,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	gyarados: {
		dexId: 130,
		types: ['water', 'flying'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 125000,
				minXp: 64000,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeW1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	lapras: {
		dexId: 131,
		types: ['water', 'ice'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 343000,
				minXp: 226981,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'victoryRoad',
			},
		],
		evs: {
			hp: 2,
		},
	},
	ditto: {
		dexId: 132,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	eevee: {
		dexId: 133,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	vaporeon: {
		dexId: 134,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	jolteon: {
		dexId: 135,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	flareon: {
		dexId: 136,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	porygon: {
		dexId: 137,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	omanyte: {
		dexId: 138,
		types: ['rock', 'water'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	omastar: {
		dexId: 139,
		types: ['rock', 'water'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	kabuto: {
		dexId: 140,
		types: ['rock', 'water'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	kabutops: {
		dexId: 141,
		types: ['rock', 'water'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	aerodactyl: {
		dexId: 142,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	snorlax: {
		dexId: 143,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	articuno: {
		dexId: 144,
		types: ['ice', 'flying'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	zapdos: {
		dexId: 145,
		types: ['electric', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	moltres: {
		dexId: 146,
		types: ['fire', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	dratini: {
		dexId: 147,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	dragonair: {
		dexId: 148,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	dragonite: {
		dexId: 149,
		rampager: true,
		types: ['dragon', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	mewtwo: {
		dexId: 150,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	mew: {
		dexId: 151,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	chikorita: {
		dexId: 152,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	bayleef: {
		dexId: 153,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	meganium: {
		dexId: 154,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
	},
	cyndaquil: {
		dexId: 155,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	quilava: {
		dexId: 156,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	typhlosion: {
		dexId: 157,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	totodile: {
		dexId: 158,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	croconaw: {
		dexId: 159,
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
		},
	},
	feraligatr: {
		dexId: 160,
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 2,
			defense: 1,
		},
	},
	sentret: {
		dexId: 161,
		types: ['normal'],
		encounterOptions: [],
		berryLureMapId: 'routeN1',
		evs: {
			attack: 1,
		},
	},
	furret: {
		dexId: 162,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	hoothoot: {
		dexId: 163,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	noctowl: {
		dexId: 164,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	ledyba: {
		dexId: 165,
		types: ['bug', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	ledian: {
		dexId: 166,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	spinarak: {
		dexId: 167,
		types: ['bug', 'poison'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	ariados: {
		dexId: 168,
		types: ['bug', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	crobat: {
		dexId: 169,
		rampager: true,
		types: ['poison', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	chinchou: {
		dexId: 170,
		types: ['water', 'electric'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1W1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	lanturn: {
		dexId: 171,
		types: ['water', 'electric'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	pichu: {
		dexId: 172,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	cleffa: {
		dexId: 173,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	igglybuff: {
		dexId: 174,
		types: ['normal', 'fairy'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	togepi: {
		dexId: 175,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	togetic: {
		dexId: 176,
		types: ['fairy', 'flying'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	natu: {
		dexId: 177,
		types: ['psychic', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	xatu: {
		dexId: 178,
		types: ['psychic', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	mareep: {
		dexId: 179,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	flaaffy: {
		dexId: 180,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	ampharos: {
		dexId: 181,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	bellossom: {
		dexId: 182,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	marill: {
		dexId: 183,
		types: ['water', 'fairy'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			hp: 2,
		},
	},
	azumarill: {
		dexId: 184,
		types: ['water', 'fairy'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 35000,
				minXp: 20000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			hp: 3,
		},
	},
	sudowoodo: {
		dexId: 185,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	politoed: {
		dexId: 186,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	hoppip: {
		dexId: 187,
		types: ['grass', 'flying'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	skiploom: {
		dexId: 188,
		types: ['grass', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	jumpluff: {
		dexId: 189,
		types: ['grass', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	aipom: {
		dexId: 190,
		types: ['normal'],
		honey: true,
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	sunkern: {
		dexId: 191,
		types: ['grass'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	sunflora: {
		dexId: 192,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	yanma: {
		dexId: 193,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	wooper: {
		dexId: 194,
		types: ['water', 'ground'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	quagsire: {
		dexId: 195,
		types: ['water', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	espeon: {
		dexId: 196,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	umbreon: {
		dexId: 197,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	murkrow: {
		dexId: 198,
		types: ['dark', 'flying'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 216,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	slowking: {
		dexId: 199,
		types: ['water', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	misdreavus: {
		dexId: 200,
		types: ['ghost'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 216,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	unown: {
		dexId: 201,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	wobbuffet: {
		dexId: 202,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	girafarig: {
		dexId: 203,
		types: ['normal', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	pineco: {
		dexId: 204,
		types: ['bug'],
		honey: true,
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	forretress: {
		dexId: 205,
		types: ['bug', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	dunsparce: {
		dexId: 206,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	gligar: {
		dexId: 207,
		types: ['ground', 'flying'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			defense: 1,
		},
	},
	steelix: {
		dexId: 208,
		types: ['steel', 'ground'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			defense: 2,
		},
	},
	snubbull: {
		dexId: 209,
		types: ['fairy'],
		encounterOptions: [],
		berryLureMapId: 'routeS1E1',
		evs: {
			attack: 1,
		},
	},
	granbull: {
		dexId: 210,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	qwilfish: {
		dexId: 211,
		types: ['water', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	scizor: {
		dexId: 212,
		types: ['bug', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	shuckle: {
		dexId: 213,
		types: ['bug', 'rock'],
		underRock: true,
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	heracross: {
		dexId: 214,
		types: ['bug', 'fighting'],
		honey: true,
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	sneasel: {
		dexId: 215,
		types: ['dark', 'ice'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	teddiursa: {
		dexId: 216,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	ursaring: {
		dexId: 217,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	slugma: {
		dexId: 218,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	magcargo: {
		dexId: 219,
		types: ['fire', 'rock'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	swinub: {
		dexId: 220,
		types: ['ice', 'ground'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	piloswine: {
		dexId: 221,
		types: ['ice', 'ground'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			hp: 1,
			attack: 1,
		},
	},
	corsola: {
		dexId: 222,
		types: ['water', 'rock'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	remoraid: {
		dexId: 223,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1E1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	octillery: {
		dexId: 224,
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	delibird: {
		dexId: 225,
		swarm: 'STRONG',
		types: ['ice', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	mantine: {
		dexId: 226,
		types: ['water', 'flying'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			'special-defense': 2,
		},
	},
	skarmory: {
		dexId: 227,
		types: ['steel', 'flying'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	houndour: {
		dexId: 228,
		types: ['dark', 'fire'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	houndoom: {
		dexId: 229,
		types: ['dark', 'fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	kingdra: {
		dexId: 230,
		types: ['water', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
			'special-defense': 1,
		},
	},
	phanpy: {
		dexId: 231,
		types: ['ground'],
		encounterOptions: [],
		berryLureMapId: 'routeE1',
		evs: {
			hp: 1,
		},
	},
	donphan: {
		dexId: 232,
		swarm: 'STRONG',
		types: ['ground'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
		},
	},
	porygon2: {
		dexId: 233,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	stantler: {
		dexId: 234,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	smeargle: {
		dexId: 235,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	tyrogue: {
		dexId: 236,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	hitmontop: {
		dexId: 237,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			'special-defense': 2,
		},
	},
	smoochum: {
		dexId: 238,
		types: ['ice', 'psychic'],
		berryLureMapId: 'routeW1',
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	elekid: {
		dexId: 239,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	magby: {
		dexId: 240,
		types: ['fire'],
		encounterOptions: [],
		berryLureMapId: 'routeE1',
		evs: {
			speed: 1,
		},
	},
	miltank: {
		dexId: 241,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	blissey: {
		dexId: 242,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	raikou: {
		dexId: 243,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 2,
		},
	},
	entei: {
		dexId: 244,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			hp: 1,
			attack: 2,
		},
	},
	suicune: {
		dexId: 245,
		types: ['water'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
	},
	larvitar: {
		dexId: 246,
		types: ['rock', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	pupitar: {
		dexId: 247,
		swarm: 'STRONG',
		types: ['rock', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	tyranitar: {
		dexId: 248,
		rampager: true,
		types: ['rock', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	lugia: {
		dexId: 249,
		types: ['psychic', 'flying'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	'ho-oh': {
		dexId: 250,
		types: ['fire', 'flying'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	celebi: {
		dexId: 251,
		types: ['psychic', 'grass'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	treecko: {
		dexId: 252,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	grovyle: {
		dexId: 253,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	sceptile: {
		dexId: 254,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	torchic: {
		dexId: 255,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	combusken: {
		dexId: 256,
		types: ['fire', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	blaziken: {
		dexId: 257,
		types: ['fire', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	mudkip: {
		dexId: 258,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	marshtomp: {
		dexId: 259,
		types: ['water', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	swampert: {
		dexId: 260,
		types: ['water', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	poochyena: {
		dexId: 261,
		types: ['dark'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	mightyena: {
		dexId: 262,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	zigzagoon: {
		dexId: 263,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	linoone: {
		dexId: 264,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	wurmple: {
		dexId: 265,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	silcoon: {
		dexId: 266,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	beautifly: {
		dexId: 267,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	cascoon: {
		dexId: 268,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	dustox: {
		dexId: 269,
		types: ['bug', 'poison'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	lotad: {
		dexId: 270,
		types: ['water', 'grass'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	lombre: {
		dexId: 271,
		types: ['water', 'grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	ludicolo: {
		dexId: 272,
		types: ['water', 'grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	seedot: {
		dexId: 273,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	nuzleaf: {
		dexId: 274,
		types: ['grass', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	shiftry: {
		dexId: 275,
		types: ['grass', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	taillow: {
		dexId: 276,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	swellow: {
		dexId: 277,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	wingull: {
		dexId: 278,
		types: ['water', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	pelipper: {
		dexId: 279,
		types: ['water', 'flying'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	ralts: {
		dexId: 280,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	kirlia: {
		dexId: 281,
		types: ['psychic', 'fairy'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			'special-attack': 2,
		},
	},
	gardevoir: {
		dexId: 282,
		swarm: 'STRONG',
		types: ['psychic', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	surskit: {
		dexId: 283,
		types: ['bug', 'water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	masquerain: {
		dexId: 284,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
		},
	},
	shroomish: {
		dexId: 285,
		types: ['grass'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	breloom: {
		dexId: 286,
		types: ['grass', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	slakoth: {
		dexId: 287,
		honey: true,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	vigoroth: {
		dexId: 288,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	slaking: {
		dexId: 289,
		rampager: true,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	nincada: {
		dexId: 290,
		types: ['bug', 'ground'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	ninjask: {
		dexId: 291,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	shedinja: {
		dexId: 292,
		types: ['bug', 'ghost'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	whismur: {
		dexId: 293,
		types: ['normal'],
		underRock: true,
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	loudred: {
		dexId: 294,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	exploud: {
		dexId: 295,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	makuhita: {
		dexId: 296,
		types: ['fighting'],
		encounterOptions: [],
		berryLureMapId: 'routeE1',
		evs: {
			hp: 1,
		},
	},
	hariyama: {
		dexId: 297,
		swarm: 'STRONG',
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	azurill: {
		dexId: 298,
		types: ['normal', 'fairy'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	nosepass: {
		dexId: 299,
		types: ['rock'],
		berryLureMapId: 'routeW1',
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	skitty: {
		dexId: 300,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	delcatty: {
		dexId: 301,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 1,
			speed: 1,
		},
	},
	sableye: {
		dexId: 302,
		types: ['dark', 'ghost'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'caveW1',
			},
		],
		evs: {
			attack: 1,
			defense: 1,
		},
	},
	mawile: {
		dexId: 303,
		berryLureMapId: 'routeS1W1',
		types: ['steel', 'fairy'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
		},
	},
	aron: {
		dexId: 304,
		types: ['steel', 'rock'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			defense: 1,
		},
	},
	lairon: {
		dexId: 305,
		types: ['steel', 'rock'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	aggron: {
		dexId: 306,
		types: ['steel', 'rock'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	meditite: {
		dexId: 307,
		types: ['fighting', 'psychic'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	medicham: {
		dexId: 308,
		types: ['fighting', 'psychic'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	electrike: {
		dexId: 309,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	manectric: {
		dexId: 310,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	plusle: {
		dexId: 311,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	minun: {
		dexId: 312,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	volbeat: {
		dexId: 313,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	illumise: {
		dexId: 314,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	roselia: {
		dexId: 315,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	gulpin: {
		dexId: 316,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	swalot: {
		dexId: 317,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	carvanha: {
		dexId: 318,
		types: ['water', 'dark'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	sharpedo: {
		dexId: 319,
		types: ['water', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	wailmer: {
		dexId: 320,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	wailord: {
		dexId: 321,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 125000,
				minXp: 27000,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			hp: 2,
		},
	},
	numel: {
		dexId: 322,
		types: ['fire', 'ground'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	camerupt: {
		dexId: 323,
		types: ['fire', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	torkoal: {
		dexId: 324,
		types: ['fire'],
		underRock: true,
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	spoink: {
		dexId: 325,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	grumpig: {
		dexId: 326,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	spinda: {
		dexId: 327,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	trapinch: {
		dexId: 328,
		types: ['ground'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 125,
				minXp: 125,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			attack: 1,
		},
	},
	vibrava: {
		dexId: 329,
		types: ['ground', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 1,
			speed: 1,
		},
	},
	flygon: {
		dexId: 330,
		types: ['ground', 'dragon'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 343000,
				minXp: 226981,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			attack: 1,
			speed: 2,
		},
	},
	cacnea: {
		dexId: 331,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	cacturne: {
		dexId: 332,
		types: ['grass', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	swablu: {
		dexId: 333,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 124,
				minXp: 8,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	altaria: {
		dexId: 334,
		types: ['dragon', 'flying'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	zangoose: {
		dexId: 335,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 216,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	seviper: {
		dexId: 336,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	lunatone: {
		dexId: 337,
		types: ['rock', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	solrock: {
		dexId: 338,
		types: ['rock', 'psychic'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	barboach: {
		dexId: 339,
		types: ['water', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	whiscash: {
		dexId: 340,
		types: ['water', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	corphish: {
		dexId: 341,
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	crawdaunt: {
		dexId: 342,
		types: ['water', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	baltoy: {
		dexId: 343,
		types: ['ground', 'psychic'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	claydol: {
		dexId: 344,
		types: ['ground', 'psychic'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			'special-defense': 2,
		},
	},
	lileep: {
		dexId: 345,
		types: ['rock', 'grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	cradily: {
		dexId: 346,
		types: ['rock', 'grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	anorith: {
		dexId: 347,
		types: ['rock', 'bug'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	armaldo: {
		dexId: 348,
		types: ['rock', 'bug'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	feebas: {
		dexId: 349,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 125,
				minXp: 125,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	milotic: {
		dexId: 350,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	castform: {
		dexId: 351,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	kecleon: {
		dexId: 352,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	shuppet: {
		dexId: 353,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	banette: {
		dexId: 354,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	duskull: {
		dexId: 355,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	dusclops: {
		dexId: 356,
		types: ['ghost'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 343000,
				minXp: 226981,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	tropius: {
		dexId: 357,
		types: ['grass', 'flying'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	chimecho: {
		dexId: 358,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
		},
	},
	absol: {
		dexId: 359,
		types: ['dark'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	wynaut: {
		dexId: 360,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	snorunt: {
		dexId: 361,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	glalie: {
		dexId: 362,
		types: ['ice'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			hp: 2,
		},
	},
	spheal: {
		dexId: 363,
		types: ['ice', 'water'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	sealeo: {
		dexId: 364,
		types: ['ice', 'water'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	walrein: {
		dexId: 365,
		types: ['ice', 'water'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	clamperl: {
		dexId: 366,
		types: ['water'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	huntail: {
		dexId: 367,
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
		},
	},
	gorebyss: {
		dexId: 368,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	relicanth: {
		dexId: 369,
		types: ['water', 'rock'],
		encounterOptions: [],
		evs: {
			hp: 1,
			defense: 1,
		},
	},
	luvdisc: {
		dexId: 370,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	bagon: {
		dexId: 371,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	shelgon: {
		dexId: 372,
		swarm: 'STRONG',
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	salamence: {
		dexId: 373,
		types: ['dragon', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	beldum: {
		dexId: 374,
		types: ['steel', 'psychic'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	metang: {
		dexId: 375,
		types: ['steel', 'psychic'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	metagross: {
		dexId: 376,
		types: ['steel', 'psychic'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	regirock: {
		dexId: 377,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	regice: {
		dexId: 378,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	registeel: {
		dexId: 379,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			defense: 2,
			'special-defense': 1,
		},
	},
	latias: {
		dexId: 380,
		types: ['dragon', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	latios: {
		dexId: 381,
		types: ['dragon', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	kyogre: {
		dexId: 382,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	groudon: {
		dexId: 383,
		types: ['ground'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	rayquaza: {
		dexId: 384,
		types: ['dragon', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
	},
	jirachi: {
		dexId: 385,
		types: ['steel', 'psychic'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'deoxys-normal': {
		dexId: 386,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
			speed: 1,
		},
	},
	turtwig: {
		dexId: 387,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	grotle: {
		dexId: 388,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
		},
	},
	torterra: {
		dexId: 389,
		types: ['grass', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 2,
			defense: 1,
		},
	},
	chimchar: {
		dexId: 390,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	monferno: {
		dexId: 391,
		types: ['fire', 'fighting'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	infernape: {
		dexId: 392,
		types: ['fire', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
			speed: 1,
		},
	},
	piplup: {
		dexId: 393,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	prinplup: {
		dexId: 394,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	empoleon: {
		dexId: 395,
		types: ['water', 'steel'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	starly: {
		dexId: 396,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	staravia: {
		dexId: 397,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	staraptor: {
		dexId: 398,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			attack: 3,
		},
	},
	bidoof: {
		dexId: 399,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	bibarel: {
		dexId: 400,
		types: ['normal', 'water'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	kricketot: {
		dexId: 401,
		types: ['bug'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			defense: 1,
		},
	},
	kricketune: {
		dexId: 402,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	shinx: {
		dexId: 403,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	luxio: {
		dexId: 404,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	luxray: {
		dexId: 405,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	budew: {
		dexId: 406,
		types: ['grass', 'poison'],
		honey: true,
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	roserade: {
		dexId: 407,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	cranidos: {
		dexId: 408,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	rampardos: {
		dexId: 409,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	shieldon: {
		dexId: 410,
		types: ['rock', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	bastiodon: {
		dexId: 411,
		types: ['rock', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	burmy: {
		dexId: 412,
		types: ['bug'],
		honey: true,
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	'wormadam-plant': {
		dexId: 413,
		types: ['bug', 'grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	mothim: {
		dexId: 414,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	combee: {
		dexId: 415,
		types: ['bug', 'flying'],
		honey: true,
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	vespiquen: {
		dexId: 416,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	pachirisu: {
		dexId: 417,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	buizel: {
		dexId: 418,
		types: ['water'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	floatzel: {
		dexId: 419,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	cherubi: {
		dexId: 420,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	cherrim: {
		dexId: 421,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	shellos: {
		dexId: 422,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	gastrodon: {
		dexId: 423,
		types: ['water', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	ambipom: {
		dexId: 424,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	drifloon: {
		dexId: 425,
		types: ['ghost', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	drifblim: {
		dexId: 426,
		types: ['ghost', 'flying'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	buneary: {
		dexId: 427,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	lopunny: {
		dexId: 428,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	mismagius: {
		dexId: 429,
		types: ['ghost'],
		swarm: 'STRONG',
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
		},
	},
	honchkrow: {
		dexId: 430,
		types: ['dark', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	glameow: {
		dexId: 431,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	purugly: {
		dexId: 432,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	chingling: {
		dexId: 433,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	stunky: {
		dexId: 434,
		types: ['poison', 'dark'],
		encounterOptions: [],
		berryLureMapId: 'routeN1E1',
		evs: {
			speed: 1,
		},
	},
	skuntank: {
		dexId: 435,
		types: ['poison', 'dark'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	bronzor: {
		dexId: 436,
		types: ['steel', 'psychic'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 125,
				minXp: 125,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			defense: 1,
		},
	},
	bronzong: {
		dexId: 437,
		types: ['steel', 'psychic'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 343000,
				minXp: 226981,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	bonsly: {
		dexId: 438,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	'mime-jr': {
		dexId: 439,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	happiny: {
		dexId: 440,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	chatot: {
		dexId: 441,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	spiritomb: {
		dexId: 442,
		types: ['ghost', 'dark'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	gible: {
		dexId: 443,
		types: ['dragon', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	gabite: {
		dexId: 444,
		types: ['dragon', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	garchomp: {
		dexId: 445,
		rampager: true,
		types: ['dragon', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	munchlax: {
		dexId: 446,
		types: ['normal'],
		honey: true,
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	riolu: {
		dexId: 447,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	lucario: {
		dexId: 448,
		types: ['fighting', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	hippopotas: {
		dexId: 449,
		types: ['ground'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	hippowdon: {
		dexId: 450,
		types: ['ground'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	skorupi: {
		dexId: 451,
		types: ['poison', 'bug'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	drapion: {
		dexId: 452,
		rampager: true,
		types: ['poison', 'dark'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	croagunk: {
		dexId: 453,
		types: ['poison', 'fighting'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	toxicroak: {
		dexId: 454,
		types: ['poison', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	carnivine: {
		dexId: 455,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	finneon: {
		dexId: 456,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	lumineon: {
		dexId: 457,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	mantyke: {
		dexId: 458,
		types: ['water', 'flying'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	snover: {
		dexId: 459,
		types: ['grass', 'ice'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 27000,
				minXp: 8000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	abomasnow: {
		dexId: 460,
		types: ['grass', 'ice'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	weavile: {
		dexId: 461,
		types: ['dark', 'ice'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			attack: 1,
			speed: 1,
		},
	},
	magnezone: {
		dexId: 462,
		types: ['electric', 'steel'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	lickilicky: {
		dexId: 463,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	rhyperior: {
		dexId: 464,
		types: ['ground', 'rock'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	tangrowth: {
		dexId: 465,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	electivire: {
		dexId: 466,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	magmortar: {
		dexId: 467,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	togekiss: {
		dexId: 468,
		types: ['fairy', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
	},
	yanmega: {
		dexId: 469,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	leafeon: {
		dexId: 470,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	glaceon: {
		dexId: 471,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	gliscor: {
		dexId: 472,
		types: ['ground', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	mamoswine: {
		dexId: 473,
		types: ['ice', 'ground'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			attack: 3,
		},
	},
	'porygon-z': {
		dexId: 474,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	gallade: {
		dexId: 475,
		swarm: 'STRONG',
		types: ['psychic', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	probopass: {
		dexId: 476,
		types: ['rock', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
	},
	dusknoir: {
		dexId: 477,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
	},
	froslass: {
		dexId: 478,
		types: ['ice', 'ghost'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	rotom: {
		dexId: 479,
		types: ['electric', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	uxie: {
		dexId: 480,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			defense: 2,
			'special-defense': 1,
		},
	},
	mesprit: {
		dexId: 481,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
			'special-defense': 1,
		},
	},
	azelf: {
		dexId: 482,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
	},
	dialga: {
		dexId: 483,
		types: ['steel', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	palkia: {
		dexId: 484,
		types: ['water', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	heatran: {
		dexId: 485,
		types: ['fire', 'steel'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	regigigas: {
		dexId: 486,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'giratina-altered': {
		dexId: 487,
		types: ['ghost', 'dragon'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	cresselia: {
		dexId: 488,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	phione: {
		dexId: 489,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	manaphy: {
		dexId: 490,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	darkrai: {
		dexId: 491,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
			speed: 1,
		},
	},
	'shaymin-land': {
		dexId: 492,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	arceus: {
		dexId: 493,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	victini: {
		dexId: 494,
		types: ['psychic', 'fire'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	snivy: {
		dexId: 495,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	servine: {
		dexId: 496,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	serperior: {
		dexId: 497,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	tepig: {
		dexId: 498,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	pignite: {
		dexId: 499,
		types: ['fire', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	emboar: {
		dexId: 500,
		types: ['fire', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	oshawott: {
		dexId: 501,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	dewott: {
		dexId: 502,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	samurott: {
		dexId: 503,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	patrat: {
		dexId: 504,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	watchog: {
		dexId: 505,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	lillipup: {
		dexId: 506,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	herdier: {
		dexId: 507,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	stoutland: {
		dexId: 508,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	purrloin: {
		dexId: 509,
		types: ['dark'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	liepard: {
		dexId: 510,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	pansage: {
		dexId: 511,
		types: ['grass'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	simisage: {
		dexId: 512,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	pansear: {
		dexId: 513,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	simisear: {
		dexId: 514,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	panpour: {
		dexId: 515,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	simipour: {
		dexId: 516,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	munna: {
		dexId: 517,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	musharna: {
		dexId: 518,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	pidove: {
		dexId: 519,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	tranquill: {
		dexId: 520,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	unfezant: {
		dexId: 521,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	blitzle: {
		dexId: 522,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	zebstrika: {
		dexId: 523,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	roggenrola: {
		dexId: 524,
		types: ['rock'],
		underRock: true,
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	boldore: {
		dexId: 525,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
		},
	},
	gigalith: {
		dexId: 526,
		types: ['rock'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'caveW1',
			},
		],
		evs: {
			attack: 3,
		},
	},
	woobat: {
		dexId: 527,
		types: ['psychic', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	swoobat: {
		dexId: 528,
		types: ['psychic', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	drilbur: {
		dexId: 529,
		types: ['ground'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 125,
				minXp: 125,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			attack: 1,
		},
	},
	excadrill: {
		dexId: 530,
		types: ['ground', 'steel'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 343000,
				minXp: 226981,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			attack: 2,
		},
	},
	audino: {
		dexId: 531,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	timburr: {
		dexId: 532,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	gurdurr: {
		dexId: 533,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	conkeldurr: {
		dexId: 534,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	tympole: {
		dexId: 535,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	palpitoad: {
		dexId: 536,
		types: ['water', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	seismitoad: {
		dexId: 537,
		types: ['water', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	throh: {
		dexId: 538,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	sawk: {
		dexId: 539,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	sewaddle: {
		dexId: 540,
		types: ['bug', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	swadloon: {
		dexId: 541,
		types: ['bug', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	leavanny: {
		dexId: 542,
		types: ['bug', 'grass'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	venipede: {
		dexId: 543,
		types: ['bug', 'poison'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	whirlipede: {
		dexId: 544,
		types: ['bug', 'poison'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	scolipede: {
		dexId: 545,
		rampager: true,
		types: ['bug', 'poison'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	cottonee: {
		dexId: 546,
		types: ['grass', 'fairy'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	whimsicott: {
		dexId: 547,
		types: ['grass', 'fairy'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	petilil: {
		dexId: 548,
		types: ['grass'],
		honey: true,
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	lilligant: {
		dexId: 549,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'basculin-red-striped': {
		dexId: 550,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	sandile: {
		dexId: 551,
		types: ['ground', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	krokorok: {
		dexId: 552,
		types: ['ground', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	krookodile: {
		dexId: 553,
		types: ['ground', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	darumaka: {
		dexId: 554,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'darmanitan-standard': {
		dexId: 555,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	maractus: {
		dexId: 556,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	dwebble: {
		dexId: 557,
		types: ['bug', 'rock'],
		underRock: true,
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	crustle: {
		dexId: 558,
		types: ['bug', 'rock'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	scraggy: {
		dexId: 559,
		types: ['dark', 'fighting'],
		encounterOptions: [],
		berryLureMapId: 'routeS1W1',
		evs: {
			attack: 1,
		},
	},
	scrafty: {
		dexId: 560,
		types: ['dark', 'fighting'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	sigilyph: {
		dexId: 561,
		types: ['psychic', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	yamask: {
		dexId: 562,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	cofagrigus: {
		dexId: 563,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	tirtouga: {
		dexId: 564,
		types: ['water', 'rock'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	carracosta: {
		dexId: 565,
		types: ['water', 'rock'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	archen: {
		dexId: 566,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	archeops: {
		dexId: 567,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	trubbish: {
		dexId: 568,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	garbodor: {
		dexId: 569,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	zorua: {
		dexId: 570,
		types: ['dark'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	zoroark: {
		dexId: 571,
		types: ['dark'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			'special-attack': 2,
		},
	},
	minccino: {
		dexId: 572,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	cinccino: {
		dexId: 573,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	gothita: {
		dexId: 574,
		types: ['psychic'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 125,
				minXp: 125,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	gothorita: {
		dexId: 575,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	gothitelle: {
		dexId: 576,
		types: ['psychic'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 343000,
				minXp: 226981,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			'special-defense': 3,
		},
	},
	solosis: {
		dexId: 577,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	duosion: {
		dexId: 578,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	reuniclus: {
		dexId: 579,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	ducklett: {
		dexId: 580,
		types: ['water', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1E1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	swanna: {
		dexId: 581,
		types: ['water', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	vanillite: {
		dexId: 582,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	vanillish: {
		dexId: 583,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	vanilluxe: {
		dexId: 584,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	deerling: {
		dexId: 585,
		types: ['normal', 'grass'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	sawsbuck: {
		dexId: 586,
		types: ['normal', 'grass'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	emolga: {
		dexId: 587,
		types: ['electric', 'flying'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	karrablast: {
		dexId: 588,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	escavalier: {
		dexId: 589,
		types: ['bug', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	foongus: {
		dexId: 590,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	amoonguss: {
		dexId: 591,
		swarm: 'STRONG',
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	frillish: {
		dexId: 592,
		types: ['water', 'ghost'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	jellicent: {
		dexId: 593,
		types: ['water', 'ghost'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 35000,
				minXp: 20000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			'special-defense': 2,
		},
	},
	alomomola: {
		dexId: 594,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	joltik: {
		dexId: 595,
		types: ['bug', 'electric'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	galvantula: {
		dexId: 596,
		types: ['bug', 'electric'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	ferroseed: {
		dexId: 597,
		types: ['grass', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	ferrothorn: {
		dexId: 598,
		types: ['grass', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	klink: {
		dexId: 599,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	klang: {
		dexId: 600,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	klinklang: {
		dexId: 601,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	tynamo: {
		dexId: 602,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	eelektrik: {
		dexId: 603,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	eelektross: {
		dexId: 604,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	elgyem: {
		dexId: 605,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	beheeyem: {
		dexId: 606,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	litwick: {
		dexId: 607,
		types: ['ghost', 'fire'],
		encounterOptions: [],
		berryLureMapId: 'routeN1E1',
		evs: {
			'special-attack': 1,
		},
	},
	lampent: {
		dexId: 608,
		types: ['ghost', 'fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	chandelure: {
		dexId: 609,
		types: ['ghost', 'fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	axew: {
		dexId: 610,
		types: ['dragon'],
		encounterOptions: [],
		berryLureMapId: 'routeW1',
		evs: {
			attack: 1,
		},
	},
	fraxure: {
		dexId: 611,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	haxorus: {
		dexId: 612,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	cubchoo: {
		dexId: 613,
		types: ['ice'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	beartic: {
		dexId: 614,
		rampager: true,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	cryogonal: {
		dexId: 615,
		types: ['ice'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			'special-defense': 2,
		},
	},
	shelmet: {
		dexId: 616,
		types: ['bug'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			defense: 1,
		},
	},
	accelgor: {
		dexId: 617,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	stunfisk: {
		dexId: 618,
		types: ['ground', 'electric'],
		underRock: true,
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	mienfoo: {
		dexId: 619,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	mienshao: {
		dexId: 620,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	druddigon: {
		dexId: 621,
		types: ['dragon'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 343000,
				minXp: 226981,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			attack: 2,
		},
	},
	golett: {
		dexId: 622,
		types: ['ground', 'ghost'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	golurk: {
		dexId: 623,
		types: ['ground', 'ghost'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	pawniard: {
		dexId: 624,
		types: ['dark', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	bisharp: {
		dexId: 625,
		types: ['dark', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	bouffalant: {
		dexId: 626,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	rufflet: {
		dexId: 627,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	braviary: {
		dexId: 628,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	vullaby: {
		dexId: 629,
		types: ['dark', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	mandibuzz: {
		dexId: 630,
		types: ['dark', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	heatmor: {
		dexId: 631,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	durant: {
		dexId: 632,
		types: ['bug', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	deino: {
		dexId: 633,
		types: ['dark', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	zweilous: {
		dexId: 634,
		swarm: 'STRONG',
		types: ['dark', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	hydreigon: {
		dexId: 635,
		types: ['dark', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	larvesta: {
		dexId: 636,
		types: ['bug', 'fire'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	volcarona: {
		dexId: 637,
		swarm: 'STRONG',
		types: ['bug', 'fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	cobalion: {
		dexId: 638,
		types: ['steel', 'fighting'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	terrakion: {
		dexId: 639,
		types: ['rock', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	virizion: {
		dexId: 640,
		types: ['grass', 'fighting'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	'tornadus-incarnate': {
		dexId: 641,
		types: ['flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'thundurus-incarnate': {
		dexId: 642,
		types: ['electric', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	reshiram: {
		dexId: 643,
		types: ['dragon', 'fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	zekrom: {
		dexId: 644,
		types: ['dragon', 'electric'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'landorus-incarnate': {
		dexId: 645,
		types: ['ground', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	kyurem: {
		dexId: 646,
		types: ['dragon', 'ice'],
		encounterOptions: [],
		evs: {
			hp: 1,
			attack: 1,
			'special-attack': 1,
		},
	},
	'keldeo-ordinary': {
		dexId: 647,
		types: ['water', 'fighting'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'meloetta-aria': {
		dexId: 648,
		types: ['normal', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
			speed: 1,
		},
	},
	genesect: {
		dexId: 649,
		types: ['bug', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
			speed: 1,
		},
	},
	chespin: {
		dexId: 650,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	quilladin: {
		dexId: 651,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	chesnaught: {
		dexId: 652,
		types: ['grass', 'fighting'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	fennekin: {
		dexId: 653,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	braixen: {
		dexId: 654,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	delphox: {
		dexId: 655,
		types: ['fire', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	froakie: {
		dexId: 656,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	frogadier: {
		dexId: 657,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	greninja: {
		dexId: 658,
		types: ['water', 'dark'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	bunnelby: {
		dexId: 659,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	diggersby: {
		dexId: 660,
		types: ['normal', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	fletchling: {
		dexId: 661,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	fletchinder: {
		dexId: 662,
		types: ['fire', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	talonflame: {
		dexId: 663,
		types: ['fire', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	scatterbug: {
		dexId: 664,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	spewpa: {
		dexId: 665,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	vivillon: {
		dexId: 666,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			hp: 1,
			'special-attack': 1,
			speed: 1,
		},
	},
	litleo: {
		dexId: 667,
		types: ['fire', 'normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	pyroar: {
		dexId: 668,
		types: ['fire', 'normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	flabebe: {
		dexId: 669,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	floette: {
		dexId: 670,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	florges: {
		dexId: 671,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	skiddo: {
		dexId: 672,
		types: ['grass'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	gogoat: {
		dexId: 673,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	pancham: {
		dexId: 674,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	pangoro: {
		dexId: 675,
		rampager: true,
		types: ['fighting', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	furfrou: {
		dexId: 676,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	espurr: {
		dexId: 677,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	'meowstic-male': {
		dexId: 678,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	honedge: {
		dexId: 679,
		types: ['steel', 'ghost'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	doublade: {
		dexId: 680,
		types: ['steel', 'ghost'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'aegislash-shield': {
		dexId: 681,
		types: ['steel', 'ghost'],
		encounterOptions: [],
		evs: {
			defense: 2,
			'special-defense': 1,
		},
	},
	spritzee: {
		dexId: 682,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	aromatisse: {
		dexId: 683,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	swirlix: {
		dexId: 684,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	slurpuff: {
		dexId: 685,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	inkay: {
		dexId: 686,
		types: ['dark', 'psychic'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	malamar: {
		dexId: 687,
		types: ['dark', 'psychic'],
		encounterOptions: [],
		rampager: true,
		evs: {
			attack: 2,
		},
	},
	binacle: {
		dexId: 688,
		types: ['rock', 'water'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	barbaracle: {
		dexId: 689,
		types: ['rock', 'water'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	skrelp: {
		dexId: 690,
		types: ['poison', 'water'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	dragalge: {
		dexId: 691,
		types: ['poison', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	clauncher: {
		dexId: 692,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	clawitzer: {
		dexId: 693,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	helioptile: {
		dexId: 694,
		types: ['electric', 'normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	heliolisk: {
		dexId: 695,
		types: ['electric', 'normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	tyrunt: {
		dexId: 696,
		types: ['rock', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	tyrantrum: {
		dexId: 697,
		types: ['rock', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	amaura: {
		dexId: 698,
		types: ['rock', 'ice'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	aurorus: {
		dexId: 699,
		types: ['rock', 'ice'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	sylveon: {
		dexId: 700,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	hawlucha: {
		dexId: 701,
		types: ['fighting', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	dedenne: {
		dexId: 702,
		types: ['electric', 'fairy'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 1000,
				minXp: 1000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	carbink: {
		dexId: 703,
		types: ['rock', 'fairy'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	goomy: {
		dexId: 704,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	sliggoo: {
		dexId: 705,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	goodra: {
		dexId: 706,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	klefki: {
		dexId: 707,
		types: ['steel', 'fairy'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	phantump: {
		dexId: 708,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	trevenant: {
		dexId: 709,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'pumpkaboo-average': {
		dexId: 710,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	'gourgeist-average': {
		dexId: 711,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	bergmite: {
		dexId: 712,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	avalugg: {
		dexId: 713,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	noibat: {
		dexId: 714,
		types: ['flying', 'dragon'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	noivern: {
		dexId: 715,
		types: ['flying', 'dragon'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	xerneas: {
		dexId: 716,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	yveltal: {
		dexId: 717,
		types: ['dark', 'flying'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'zygarde-50': {
		dexId: 718,
		types: ['dragon', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	diancie: {
		dexId: 719,
		types: ['rock', 'fairy'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
	},
	hoopa: {
		dexId: 720,
		types: ['psychic', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	volcanion: {
		dexId: 721,
		types: ['fire', 'water'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	rowlet: {
		dexId: 722,
		swarm: 'WEAK',
		types: ['grass', 'flying'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	dartrix: {
		dexId: 723,
		types: ['grass', 'flying'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	decidueye: {
		dexId: 724,
		types: ['grass', 'ghost'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	litten: {
		dexId: 725,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	torracat: {
		dexId: 726,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	incineroar: {
		dexId: 727,
		types: ['fire', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	popplio: {
		dexId: 728,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	brionne: {
		dexId: 729,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	primarina: {
		dexId: 730,
		types: ['water', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	pikipek: {
		dexId: 731,
		types: ['normal', 'flying'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	trumbeak: {
		dexId: 732,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	toucannon: {
		dexId: 733,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	yungoos: {
		dexId: 734,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	gumshoos: {
		dexId: 735,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	grubbin: {
		dexId: 736,
		types: ['bug'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	charjabug: {
		dexId: 737,
		types: ['bug', 'electric'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	vikavolt: {
		dexId: 738,
		types: ['bug', 'electric'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	crabrawler: {
		dexId: 739,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	crabominable: {
		dexId: 740,
		types: ['fighting', 'ice'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'oricorio-baile': {
		dexId: 741,
		types: ['fire', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	cutiefly: {
		dexId: 742,
		types: ['bug', 'fairy'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	ribombee: {
		dexId: 743,
		types: ['bug', 'fairy'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	rockruff: {
		dexId: 744,
		types: ['rock'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	'lycanroc-midday': {
		dexId: 745,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'wishiwashi-solo': {
		dexId: 746,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	mareanie: {
		dexId: 747,
		types: ['poison', 'water'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	toxapex: {
		dexId: 748,
		types: ['poison', 'water'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	mudbray: {
		dexId: 749,
		types: ['ground'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	mudsdale: {
		dexId: 750,
		types: ['ground'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	dewpider: {
		dexId: 751,
		types: ['water', 'bug'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	araquanid: {
		dexId: 752,
		types: ['water', 'bug'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 35000,
				minXp: 20000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			'special-defense': 2,
		},
	},
	fomantis: {
		dexId: 753,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	lurantis: {
		dexId: 754,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	morelull: {
		dexId: 755,
		types: ['grass', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	shiinotic: {
		dexId: 756,
		types: ['grass', 'fairy'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 343000,
				minXp: 226981,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			'special-defense': 2,
		},
	},
	salandit: {
		dexId: 757,
		types: ['poison', 'fire'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	salazzle: {
		dexId: 758,
		types: ['poison', 'fire'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	stufful: {
		dexId: 759,
		types: ['normal', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	bewear: {
		dexId: 760,
		types: ['normal', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	bounsweet: {
		dexId: 761,
		types: ['grass'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	steenee: {
		dexId: 762,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	tsareena: {
		dexId: 763,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	comfey: {
		dexId: 764,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	oranguru: {
		dexId: 765,
		rampager: true,
		types: ['normal', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	passimian: {
		dexId: 766,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	wimpod: {
		dexId: 767,
		types: ['bug', 'water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	golisopod: {
		dexId: 768,
		types: ['bug', 'water'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	sandygast: {
		dexId: 769,
		types: ['ghost', 'ground'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	palossand: {
		dexId: 770,
		types: ['ghost', 'ground'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	pyukumuku: {
		dexId: 771,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'type-null': {
		dexId: 772,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	silvally: {
		dexId: 773,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'minior-red-meteor': {
		dexId: 774,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	komala: {
		dexId: 775,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	turtonator: {
		dexId: 776,
		types: ['fire', 'dragon'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	togedemaru: {
		dexId: 777,
		types: ['electric', 'steel'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			attack: 2,
		},
	},
	'mimikyu-disguised': {
		dexId: 778,
		types: ['ghost', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	bruxish: {
		dexId: 779,
		types: ['water', 'psychic'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	drampa: {
		dexId: 780,
		types: ['normal', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	dhelmise: {
		dexId: 781,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'jangmo-o': {
		dexId: 782,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	'hakamo-o': {
		dexId: 783,
		types: ['dragon', 'fighting'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'kommo-o': {
		dexId: 784,
		rampager: true,
		types: ['dragon', 'fighting'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'tapu-koko': {
		dexId: 785,
		types: ['electric', 'fairy'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'tapu-lele': {
		dexId: 786,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'tapu-bulu': {
		dexId: 787,
		types: ['grass', 'fairy'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'tapu-fini': {
		dexId: 788,
		types: ['water', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	cosmog: {
		dexId: 789,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	cosmoem: {
		dexId: 790,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	solgaleo: {
		dexId: 791,
		types: ['psychic', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	lunala: {
		dexId: 792,
		types: ['psychic', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	nihilego: {
		dexId: 793,
		swarm: 'SPACE_DISTORTION',
		types: ['rock', 'poison'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	buzzwole: {
		dexId: 794,
		swarm: 'SPACE_DISTORTION',
		types: ['bug', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 2,
		},
	},
	pheromosa: {
		dexId: 795,
		swarm: 'SPACE_DISTORTION',
		types: ['bug', 'fighting'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	xurkitree: {
		dexId: 796,
		swarm: 'SPACE_DISTORTION',
		types: ['electric'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	celesteela: {
		dexId: 797,
		swarm: 'SPACE_DISTORTION',
		types: ['steel', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
			'special-attack': 1,
		},
	},
	kartana: {
		dexId: 798,
		swarm: 'SPACE_DISTORTION',
		types: ['grass', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	guzzlord: {
		dexId: 799,
		swarm: 'SPACE_DISTORTION',
		types: ['dark', 'dragon'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	necrozma: {
		dexId: 800,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 2,
		},
	},
	magearna: {
		dexId: 801,
		types: ['steel', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	marshadow: {
		dexId: 802,
		types: ['fighting', 'ghost'],
		encounterOptions: [],
		evs: {
			attack: 2,
			speed: 1,
		},
	},
	poipole: {
		dexId: 803,
		swarm: 'SPACE_DISTORTION',
		types: ['poison'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	naganadel: {
		dexId: 804,
		types: ['poison', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	stakataka: {
		dexId: 805,
		swarm: 'SPACE_DISTORTION',
		types: ['rock', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	blacephalon: {
		dexId: 806,
		swarm: 'SPACE_DISTORTION',
		types: ['fire', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	zeraora: {
		dexId: 807,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	meltan: {
		dexId: 808,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	melmetal: {
		dexId: 809,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	grookey: {
		dexId: 810,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	thwackey: {
		dexId: 811,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	rillaboom: {
		dexId: 812,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	scorbunny: {
		dexId: 813,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	raboot: {
		dexId: 814,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	cinderace: {
		dexId: 815,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	sobble: {
		dexId: 816,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
			speed: 1,
		},
	},
	drizzile: {
		dexId: 817,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	inteleon: {
		dexId: 818,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	skwovet: {
		dexId: 819,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	greedent: {
		dexId: 820,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	rookidee: {
		dexId: 821,
		types: ['flying'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	corvisquire: {
		dexId: 822,
		types: ['flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	corviknight: {
		dexId: 823,
		types: ['flying', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	blipbug: {
		dexId: 824,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	dottler: {
		dexId: 825,
		types: ['bug', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	orbeetle: {
		dexId: 826,
		types: ['bug', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	nickit: {
		dexId: 827,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	thievul: {
		dexId: 828,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	gossifleur: {
		dexId: 829,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	eldegoss: {
		dexId: 830,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	wooloo: {
		dexId: 831,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			defense: 1,
		},
	},
	dubwool: {
		dexId: 832,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	chewtle: {
		dexId: 833,
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	drednaw: {
		dexId: 834,
		types: ['water', 'rock'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	yamper: {
		dexId: 835,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	boltund: {
		dexId: 836,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	rolycoly: {
		dexId: 837,
		types: ['rock'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			defense: 1,
		},
	},
	carkol: {
		dexId: 838,
		types: ['rock', 'fire'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	coalossal: {
		dexId: 839,
		types: ['rock', 'fire'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	applin: {
		dexId: 840,
		types: ['grass', 'dragon'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	flapple: {
		dexId: 841,
		types: ['grass', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	appletun: {
		dexId: 842,
		types: ['grass', 'dragon'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	silicobra: {
		dexId: 843,
		types: ['ground'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	sandaconda: {
		dexId: 844,
		types: ['ground'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	cramorant: {
		dexId: 845,
		types: ['flying', 'water'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			'special-defense': 2,
		},
	},
	arrokuda: {
		dexId: 846,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	barraskewda: {
		dexId: 847,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	toxel: {
		dexId: 848,
		types: ['electric', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	'toxtricity-amped': {
		dexId: 849,
		types: ['electric', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	sizzlipede: {
		dexId: 850,
		types: ['fire', 'bug'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	centiskorch: {
		dexId: 851,
		types: ['fire', 'bug'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	clobbopus: {
		dexId: 852,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	grapploct: {
		dexId: 853,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	sinistea: {
		dexId: 854,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	polteageist: {
		dexId: 855,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	hatenna: {
		dexId: 856,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	hattrem: {
		dexId: 857,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	hatterene: {
		dexId: 858,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	impidimp: {
		dexId: 859,
		types: ['dark', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	morgrem: {
		dexId: 860,
		types: ['dark', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	grimmsnarl: {
		dexId: 861,
		types: ['dark', 'fairy'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	obstagoon: {
		dexId: 862,
		types: ['dark', 'normal'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	perrserker: {
		dexId: 863,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	cursola: {
		dexId: 864,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	sirfetchd: {
		dexId: 865,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'mr-rime': {
		dexId: 866,
		types: ['ice', 'psychic'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			'special-attack': 3,
		},
	},
	runerigus: {
		dexId: 867,
		types: ['ground', 'ghost'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	milcery: {
		dexId: 868,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	alcremie: {
		dexId: 869,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	falinks: {
		dexId: 870,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
			'special-defense': 1,
		},
	},
	pincurchin: {
		dexId: 871,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	snom: {
		dexId: 872,
		types: ['ice', 'bug'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	frosmoth: {
		dexId: 873,
		types: ['ice', 'bug'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	stonjourner: {
		dexId: 874,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'eiscue-ice': {
		dexId: 875,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'indeedee-male': {
		dexId: 876,
		types: ['psychic', 'normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'morpeko-full-belly': {
		dexId: 877,
		types: ['electric', 'dark'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	cufant: {
		dexId: 878,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	copperajah: {
		dexId: 879,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	dracozolt: {
		dexId: 880,
		types: ['electric', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	arctozolt: {
		dexId: 881,
		types: ['electric', 'ice'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	dracovish: {
		dexId: 882,
		types: ['water', 'dragon'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	arctovish: {
		dexId: 883,
		types: ['water', 'ice'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	duraludon: {
		dexId: 884,
		types: ['steel', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	dreepy: {
		dexId: 885,
		types: ['dragon', 'ghost'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	drakloak: {
		dexId: 886,
		types: ['dragon', 'ghost'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	dragapult: {
		dexId: 887,
		types: ['dragon', 'ghost'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	zacian: {
		dexId: 888,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	zamazenta: {
		dexId: 889,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	eternatus: {
		dexId: 890,
		types: ['poison', 'dragon'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	kubfu: {
		dexId: 891,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'urshifu-single-strike': {
		dexId: 892,
		types: ['fighting', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	zarude: {
		dexId: 893,
		types: ['dark', 'grass'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	regieleki: {
		dexId: 894,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	regidrago: {
		dexId: 895,
		types: ['dragon'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	glastrier: {
		dexId: 896,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	spectrier: {
		dexId: 897,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	calyrex: {
		dexId: 898,
		types: ['psychic', 'grass'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	wyrdeer: {
		dexId: 899,
		types: ['normal', 'psychic'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	kleavor: {
		dexId: 900,
		types: ['bug', 'rock'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	ursaluna: {
		dexId: 901,
		types: ['ground', 'normal'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'basculegion-male': {
		dexId: 902,
		types: ['water', 'ghost'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	sneasler: {
		dexId: 903,
		types: ['fighting', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 1,
			speed: 1,
		},
	},
	overqwil: {
		dexId: 904,
		types: ['dark', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'enamorus-incarnate': {
		dexId: 905,
		types: ['fairy', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	sprigatito: {
		dexId: 906,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	floragato: {
		dexId: 907,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	meowscarada: {
		dexId: 908,
		types: ['grass', 'dark'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	fuecoco: {
		dexId: 909,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	crocalor: {
		dexId: 910,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	skeledirge: {
		dexId: 911,
		types: ['fire', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	quaxly: {
		dexId: 912,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	quaxwell: {
		dexId: 913,
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	quaquaval: {
		dexId: 914,
		types: ['water', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	lechonk: {
		dexId: 915,
		types: ['normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	'oinkologne-male': {
		dexId: 916,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	tarountula: {
		dexId: 917,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	spidops: {
		dexId: 918,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	nymble: {
		dexId: 919,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	lokix: {
		dexId: 920,
		types: ['bug', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	pawmi: {
		dexId: 921,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 1000,
				minXp: 1000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	pawmo: {
		dexId: 922,
		types: ['electric', 'fighting'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	pawmot: {
		dexId: 923,
		types: ['electric', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	tandemaus: {
		dexId: 924,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	'maushold-family-of-four': {
		dexId: 925,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	fidough: {
		dexId: 926,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	dachsbun: {
		dexId: 927,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	smoliv: {
		dexId: 928,
		types: ['grass', 'normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 3375,
				minXp: 1000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	dolliv: {
		dexId: 929,
		types: ['grass', 'normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	arboliva: {
		dexId: 930,
		types: ['grass', 'normal'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'squawkabilly-green-plumage': {
		dexId: 931,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	nacli: {
		dexId: 932,
		types: ['rock'],
		underRock: true,
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	naclstack: {
		dexId: 933,
		types: ['rock'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			defense: 2,
		},
	},
	garganacl: {
		dexId: 934,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	charcadet: {
		dexId: 935,
		types: ['fire'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	armarouge: {
		dexId: 936,
		types: ['fire', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	ceruledge: {
		dexId: 937,
		types: ['fire', 'ghost'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	tadbulb: {
		dexId: 938,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	bellibolt: {
		dexId: 939,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	wattrel: {
		dexId: 940,
		types: ['electric', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	kilowattrel: {
		dexId: 941,
		types: ['electric', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	maschiff: {
		dexId: 942,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	mabosstiff: {
		dexId: 943,
		types: ['dark'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 343000,
				minXp: 226981,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'victoryRoad',
			},
		],
		evs: {
			attack: 2,
		},
	},
	shroodle: {
		dexId: 944,
		types: ['poison', 'normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	grafaiai: {
		dexId: 945,
		types: ['poison', 'normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	bramblin: {
		dexId: 946,
		types: ['grass', 'ghost'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	brambleghast: {
		dexId: 947,
		types: ['grass', 'ghost'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	toedscool: {
		dexId: 948,
		types: ['ground', 'grass'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'DAY',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			'special-defense': 1,
		},
	},
	toedscruel: {
		dexId: 949,
		types: ['ground', 'grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	klawf: {
		dexId: 950,
		types: ['rock'],
		underRock: true,
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	capsakid: {
		dexId: 951,
		types: ['grass'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	scovillain: {
		dexId: 952,
		types: ['grass', 'fire'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	rellor: {
		dexId: 953,
		types: ['bug'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	rabsca: {
		dexId: 954,
		types: ['bug', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	flittle: {
		dexId: 955,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	espathra: {
		dexId: 956,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	tinkatink: {
		dexId: 957,
		types: ['fairy', 'steel'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	tinkatuff: {
		dexId: 958,
		types: ['fairy', 'steel'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	tinkaton: {
		dexId: 959,
		types: ['fairy', 'steel'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	wiglett: {
		dexId: 960,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	wugtrio: {
		dexId: 961,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	bombirdier: {
		dexId: 962,
		types: ['flying', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	finizen: {
		dexId: 963,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	'palafin-zero': {
		dexId: 964,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	varoom: {
		dexId: 965,
		types: ['steel', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	revavroom: {
		dexId: 966,
		types: ['steel', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	cyclizar: {
		dexId: 967,
		swarm: 'STRONG',
		types: ['dragon', 'normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	orthworm: {
		dexId: 968,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	glimmet: {
		dexId: 969,
		types: ['rock', 'poison'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	glimmora: {
		dexId: 970,
		types: ['rock', 'poison'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'caveW1',
			},
		],
		evs: {
			'special-attack': 2,
		},
	},
	greavard: {
		dexId: 971,
		types: ['ghost'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	houndstone: {
		dexId: 972,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	flamigo: {
		dexId: 973,
		types: ['flying', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	cetoddle: {
		dexId: 974,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	cetitan: {
		dexId: 975,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	veluza: {
		dexId: 976,
		types: ['water', 'psychic'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'ALL_DAY',
				area: 'WATER',
				route: 'routeS1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	dondozo: {
		dexId: 977,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'tatsugiri-curly': {
		dexId: 978,
		types: ['dragon', 'water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	annihilape: {
		dexId: 979,
		types: ['fighting', 'ghost'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	clodsire: {
		dexId: 980,
		types: ['poison', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	farigiraf: {
		dexId: 981,
		types: ['normal', 'psychic'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'dudunsparce-two-segment': {
		dexId: 982,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	kingambit: {
		dexId: 983,
		types: ['dark', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'great-tusk': {
		dexId: 984,
		swarm: 'PAST_DISTORTION',
		types: ['ground', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'scream-tail': {
		dexId: 985,
		swarm: 'PAST_DISTORTION',
		types: ['fairy', 'psychic'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'brute-bonnet': {
		dexId: 986,
		swarm: 'PAST_DISTORTION',
		types: ['grass', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'flutter-mane': {
		dexId: 987,
		swarm: 'PAST_DISTORTION',
		types: ['ghost', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
			speed: 1,
		},
	},
	'slither-wing': {
		dexId: 988,
		swarm: 'PAST_DISTORTION',
		types: ['bug', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'sandy-shocks': {
		dexId: 989,
		swarm: 'PAST_DISTORTION',
		types: ['electric', 'ground'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'iron-treads': {
		dexId: 990,
		swarm: 'FUTURE_DISTORTION',
		types: ['ground', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'iron-bundle': {
		dexId: 991,
		swarm: 'FUTURE_DISTORTION',
		types: ['ice', 'water'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'iron-hands': {
		dexId: 992,
		swarm: 'FUTURE_DISTORTION',
		types: ['fighting', 'electric'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'iron-jugulis': {
		dexId: 993,
		swarm: 'FUTURE_DISTORTION',
		types: ['dark', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'iron-moth': {
		dexId: 994,
		swarm: 'FUTURE_DISTORTION',
		types: ['fire', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'iron-thorns': {
		dexId: 995,
		swarm: 'FUTURE_DISTORTION',
		types: ['rock', 'electric'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	frigibax: {
		dexId: 996,
		types: ['dragon', 'ice'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 27000,
				minXp: 8000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	arctibax: {
		dexId: 997,
		types: ['dragon', 'ice'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	baxcalibur: {
		dexId: 998,
		types: ['dragon', 'ice'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	gimmighoul: {
		dexId: 999,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	gholdengo: {
		dexId: 1000,
		types: ['steel', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'wo-chien': {
		dexId: 1001,
		types: ['dark', 'grass'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	'chien-pao': {
		dexId: 1002,
		types: ['dark', 'ice'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'ting-lu': {
		dexId: 1003,
		types: ['dark', 'ground'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'chi-yu': {
		dexId: 1004,
		types: ['dark', 'fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'roaring-moon': {
		dexId: 1005,
		swarm: 'PAST_DISTORTION',
		types: ['dragon', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'iron-valiant': {
		dexId: 1006,
		swarm: 'FUTURE_DISTORTION',
		types: ['fairy', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	koraidon: {
		dexId: 1007,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	miraidon: {
		dexId: 1008,
		types: ['electric', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'walking-wake': {
		dexId: 1009,
		types: ['water', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'iron-leaves': {
		dexId: 1010,
		types: ['grass', 'psychic'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	dipplin: {
		dexId: 1011,
		types: ['grass', 'dragon'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	poltchageist: {
		dexId: 1012,
		types: ['grass', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	sinistcha: {
		dexId: 1013,
		types: ['grass', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	okidogi: {
		dexId: 1014,
		types: ['poison', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	munkidori: {
		dexId: 1015,
		types: ['poison', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	fezandipiti: {
		dexId: 1016,
		types: ['poison', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	ogerpon: {
		dexId: 1017,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	archaludon: {
		dexId: 1018,
		types: ['steel', 'dragon'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	hydrapple: {
		dexId: 1019,
		types: ['grass', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'gouging-fire': {
		dexId: 1020,
		types: ['fire', 'dragon'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'raging-bolt': {
		dexId: 1021,
		types: ['electric', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'iron-boulder': {
		dexId: 1022,
		types: ['rock', 'psychic'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'iron-crown': {
		dexId: 1023,
		types: ['steel', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	terapagos: {
		dexId: 1024,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	pecharunt: {
		dexId: 1025,
		types: ['poison', 'ghost'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'deoxys-attack': {
		dexId: 10001,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
	},
	'deoxys-defense': {
		dexId: 10002,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			defense: 2,
			'special-defense': 1,
		},
	},
	'deoxys-speed': {
		dexId: 10003,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'wormadam-sandy': {
		dexId: 10004,
		types: ['bug', 'ground'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'wormadam-trash': {
		dexId: 10005,
		types: ['bug', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	'shaymin-sky': {
		dexId: 10006,
		types: ['grass', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'giratina-origin': {
		dexId: 10007,
		types: ['ghost', 'dragon'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'rotom-heat': {
		dexId: 10008,
		types: ['electric', 'fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	'rotom-wash': {
		dexId: 10009,
		types: ['electric', 'water'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	'rotom-frost': {
		dexId: 10010,
		types: ['electric', 'ice'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	'rotom-fan': {
		dexId: 10011,
		types: ['electric', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	'rotom-mow': {
		dexId: 10012,
		types: ['electric', 'grass'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
	},
	'castform-sunny': {
		dexId: 10013,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	'castform-rainy': {
		dexId: 10014,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	'castform-snowy': {
		dexId: 10015,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	'basculin-blue-striped': {
		dexId: 10016,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'darmanitan-zen': {
		dexId: 10017,
		types: ['fire', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'meloetta-pirouette': {
		dexId: 10018,
		types: ['normal', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
			speed: 1,
		},
	},
	'tornadus-therian': {
		dexId: 10019,
		types: ['flying'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'thundurus-therian': {
		dexId: 10020,
		types: ['electric', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'landorus-therian': {
		dexId: 10021,
		types: ['ground', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'kyurem-black': {
		dexId: 10022,
		types: ['dragon', 'ice'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'kyurem-white': {
		dexId: 10023,
		types: ['dragon', 'ice'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'keldeo-resolute': {
		dexId: 10024,
		types: ['water', 'fighting'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'meowstic-female': {
		dexId: 10025,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'aegislash-blade': {
		dexId: 10026,
		types: ['steel', 'ghost'],
		encounterOptions: [],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
	},
	'pumpkaboo-small': {
		dexId: 10027,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	'pumpkaboo-large': {
		dexId: 10028,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	'pumpkaboo-super': {
		dexId: 10029,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	'gourgeist-small': {
		dexId: 10030,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'gourgeist-large': {
		dexId: 10031,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'gourgeist-super': {
		dexId: 10032,
		types: ['ghost', 'grass'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'venusaur-mega': {
		dexId: 10033,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
	},
	'charizard-mega-x': {
		dexId: 10034,
		types: ['fire', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'charizard-mega-y': {
		dexId: 10035,
		types: ['fire', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'blastoise-mega': {
		dexId: 10036,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	'alakazam-mega': {
		dexId: 10037,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'gengar-mega': {
		dexId: 10038,
		types: ['ghost', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'kangaskhan-mega': {
		dexId: 10039,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'pinsir-mega': {
		dexId: 10040,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'gyarados-mega': {
		dexId: 10041,
		types: ['water', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'aerodactyl-mega': {
		dexId: 10042,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'mewtwo-mega-x': {
		dexId: 10043,
		types: ['psychic', 'fighting'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'mewtwo-mega-y': {
		dexId: 10044,
		types: ['psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'ampharos-mega': {
		dexId: 10045,
		types: ['electric', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'scizor-mega': {
		dexId: 10046,
		types: ['bug', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'heracross-mega': {
		dexId: 10047,
		types: ['bug', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'houndoom-mega': {
		dexId: 10048,
		types: ['dark', 'fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'tyranitar-mega': {
		dexId: 10049,
		types: ['rock', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'blaziken-mega': {
		dexId: 10050,
		types: ['fire', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'gardevoir-mega': {
		dexId: 10051,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'mawile-mega': {
		dexId: 10052,
		types: ['steel', 'fairy'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
		},
	},
	'aggron-mega': {
		dexId: 10053,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'medicham-mega': {
		dexId: 10054,
		types: ['fighting', 'psychic'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'manectric-mega': {
		dexId: 10055,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'banette-mega': {
		dexId: 10056,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'absol-mega': {
		dexId: 10057,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'garchomp-mega': {
		dexId: 10058,
		types: ['dragon', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'lucario-mega': {
		dexId: 10059,
		types: ['fighting', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'abomasnow-mega': {
		dexId: 10060,
		types: ['grass', 'ice'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'floette-eternal': {
		dexId: 10061,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'latias-mega': {
		dexId: 10062,
		types: ['dragon', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	'latios-mega': {
		dexId: 10063,
		types: ['dragon', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'swampert-mega': {
		dexId: 10064,
		types: ['water', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'sceptile-mega': {
		dexId: 10065,
		types: ['grass', 'dragon'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'sableye-mega': {
		dexId: 10066,
		types: ['dark', 'ghost'],
		encounterOptions: [],
		evs: {
			attack: 1,
			defense: 1,
		},
	},
	'altaria-mega': {
		dexId: 10067,
		types: ['dragon', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'gallade-mega': {
		dexId: 10068,
		types: ['psychic', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'audino-mega': {
		dexId: 10069,
		types: ['normal', 'fairy'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'sharpedo-mega': {
		dexId: 10070,
		types: ['water', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'slowbro-mega': {
		dexId: 10071,
		types: ['water', 'psychic'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'steelix-mega': {
		dexId: 10072,
		types: ['steel', 'ground'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'pidgeot-mega': {
		dexId: 10073,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'glalie-mega': {
		dexId: 10074,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'diancie-mega': {
		dexId: 10075,
		types: ['rock', 'fairy'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
	},
	'metagross-mega': {
		dexId: 10076,
		types: ['steel', 'psychic'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'kyogre-primal': {
		dexId: 10077,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'groudon-primal': {
		dexId: 10078,
		types: ['ground', 'fire'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'rayquaza-mega': {
		dexId: 10079,
		types: ['dragon', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
	},
	'pikachu-rock-star': {
		dexId: 10080,
		types: ['electric'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'pikachu-belle': {
		dexId: 10081,
		types: ['electric'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'pikachu-pop-star': {
		dexId: 10082,
		types: ['electric'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'pikachu-phd': {
		dexId: 10083,
		types: ['electric'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'pikachu-libre': {
		dexId: 10084,
		types: ['electric'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'pikachu-cosplay': {
		dexId: 10085,
		types: ['electric'],
		berryLureMapId: 'routeW1',
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'hoopa-unbound': {
		dexId: 10086,
		types: ['psychic', 'dark'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'camerupt-mega': {
		dexId: 10087,
		types: ['fire', 'ground'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'lopunny-mega': {
		dexId: 10088,
		types: ['normal', 'fighting'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'salamence-mega': {
		dexId: 10089,
		types: ['dragon', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'beedrill-mega': {
		dexId: 10090,
		types: ['bug', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 2,
			'special-defense': 1,
		},
	},
	'rattata-alola': {
		dexId: 10091,
		types: ['dark', 'normal'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	'raticate-alola': {
		dexId: 10092,
		types: ['dark', 'normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'raticate-totem-alola': {
		dexId: 10093,
		types: ['dark', 'normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'pikachu-original-cap': {
		dexId: 10094,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 125,
				minXp: 125,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'pikachu-hoenn-cap': {
		dexId: 10095,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1E1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'pikachu-sinnoh-cap': {
		dexId: 10096,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'pikachu-unova-cap': {
		dexId: 10097,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'pikachu-kalos-cap': {
		dexId: 10098,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 216,
				minXp: 8,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'pikachu-alola-cap': {
		dexId: 10099,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'raichu-alola': {
		dexId: 10100,
		types: ['electric', 'psychic'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'sandshrew-alola': {
		dexId: 10101,
		types: ['ice', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	'sandslash-alola': {
		dexId: 10102,
		types: ['ice', 'steel'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	'vulpix-alola': {
		dexId: 10103,
		types: ['ice'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 27000,
				minXp: 8000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	'ninetales-alola': {
		dexId: 10104,
		types: ['ice', 'fairy'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 216000,
				minXp: 64000,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'diglett-alola': {
		dexId: 10105,
		types: ['ground', 'steel'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			speed: 1,
		},
	},
	'dugtrio-alola': {
		dexId: 10106,
		types: ['ground', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'meowth-alola': {
		dexId: 10107,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	'persian-alola': {
		dexId: 10108,
		types: ['dark'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'geodude-alola': {
		dexId: 10109,
		types: ['rock', 'electric'],
		underRock: true,
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	'graveler-alola': {
		dexId: 10110,
		types: ['rock', 'electric'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	'golem-alola': {
		dexId: 10111,
		types: ['rock', 'electric'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'grimer-alola': {
		dexId: 10112,
		types: ['poison', 'dark'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	'muk-alola': {
		dexId: 10113,
		types: ['poison', 'dark'],
		encounterOptions: [],
		evs: {
			hp: 1,
			attack: 1,
		},
	},
	'exeggutor-alola': {
		dexId: 10114,
		types: ['grass', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'marowak-alola': {
		dexId: 10115,
		types: ['fire', 'ghost'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			defense: 2,
		},
	},
	'greninja-battle-bond': {
		dexId: 10116,
		types: ['water', 'dark'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'greninja-ash': {
		dexId: 10117,
		types: ['water', 'dark'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'zygarde-10-power-construct': {
		dexId: 10118,
		types: ['dragon', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'zygarde-50-power-construct': {
		dexId: 10119,
		types: ['dragon', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'zygarde-complete': {
		dexId: 10120,
		types: ['dragon', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'gumshoos-totem': {
		dexId: 10121,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'vikavolt-totem': {
		dexId: 10122,
		types: ['bug', 'electric'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'oricorio-pom-pom': {
		dexId: 10123,
		types: ['electric', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'oricorio-pau': {
		dexId: 10124,
		types: ['psychic', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'oricorio-sensu': {
		dexId: 10125,
		types: ['ghost', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'lycanroc-midnight': {
		dexId: 10126,
		types: ['rock'],
		rampager: true,
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'wishiwashi-school': {
		dexId: 10127,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 1,
		},
	},
	'lurantis-totem': {
		dexId: 10128,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'salazzle-totem': {
		dexId: 10129,
		types: ['poison', 'fire'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'minior-orange-meteor': {
		dexId: 10130,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	'minior-yellow-meteor': {
		dexId: 10131,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	'minior-green-meteor': {
		dexId: 10132,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	'minior-blue-meteor': {
		dexId: 10133,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	'minior-indigo-meteor': {
		dexId: 10134,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	'minior-violet-meteor': {
		dexId: 10135,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
	},
	'minior-red': {
		dexId: 10136,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'minior-orange': {
		dexId: 10137,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'minior-yellow': {
		dexId: 10138,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'minior-green': {
		dexId: 10139,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'minior-blue': {
		dexId: 10140,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'minior-indigo': {
		dexId: 10141,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'minior-violet': {
		dexId: 10142,
		types: ['rock', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
	},
	'mimikyu-busted': {
		dexId: 10143,
		types: ['ghost', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'mimikyu-totem-disguised': {
		dexId: 10144,
		types: ['ghost', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'mimikyu-totem-busted': {
		dexId: 10145,
		types: ['ghost', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'kommo-o-totem': {
		dexId: 10146,
		types: ['dragon', 'fighting'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'magearna-original': {
		dexId: 10147,
		types: ['steel', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'pikachu-partner-cap': {
		dexId: 10148,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'onixCave',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'marowak-totem': {
		dexId: 10149,
		types: ['fire', 'ghost'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'ribombee-totem': {
		dexId: 10150,
		types: ['bug', 'fairy'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'rockruff-own-tempo': {
		dexId: 10151,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'lycanroc-dusk': {
		dexId: 10152,
		types: ['rock'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'araquanid-totem': {
		dexId: 10153,
		types: ['water', 'bug'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'togedemaru-totem': {
		dexId: 10154,
		types: ['electric', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'necrozma-dusk': {
		dexId: 10155,
		types: ['psychic', 'steel'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'necrozma-dawn': {
		dexId: 10156,
		types: ['psychic', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'necrozma-ultra': {
		dexId: 10157,
		types: ['psychic', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 1,
			'special-attack': 1,
			speed: 1,
		},
	},
	'pikachu-starter': {
		dexId: 10158,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'eevee-starter': {
		dexId: 10159,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	'pikachu-world-cap': {
		dexId: 10160,
		types: ['electric'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 1000,
				minXp: 1000,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeN1W1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'meowth-galar': {
		dexId: 10161,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'ponyta-galar': {
		dexId: 10162,
		types: ['psychic'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	'rapidash-galar': {
		dexId: 10163,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'slowpoke-galar': {
		dexId: 10164,
		types: ['psychic'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 27000,
				minXp: 15625,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	'slowbro-galar': {
		dexId: 10165,
		types: ['poison', 'psychic'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'farfetchd-galar': {
		dexId: 10166,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'weezing-galar': {
		dexId: 10167,
		types: ['poison', 'fairy'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'mr-mime-galar': {
		dexId: 10168,
		types: ['ice', 'psychic'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'articuno-galar': {
		dexId: 10169,
		types: ['psychic', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'zapdos-galar': {
		dexId: 10170,
		types: ['fighting', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'moltres-galar': {
		dexId: 10171,
		types: ['dark', 'flying'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	'slowking-galar': {
		dexId: 10172,
		types: ['poison', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'corsola-galar': {
		dexId: 10173,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	'zigzagoon-galar': {
		dexId: 10174,
		types: ['dark', 'normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	'linoone-galar': {
		dexId: 10175,
		types: ['dark', 'normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'darumaka-galar': {
		dexId: 10176,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'darmanitan-galar-standard': {
		dexId: 10177,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'darmanitan-galar-zen': {
		dexId: 10178,
		types: ['ice', 'fire'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'yamask-galar': {
		dexId: 10179,
		types: ['ground', 'ghost'],
		encounterOptions: [],
		evs: {
			defense: 1,
		},
	},
	'stunfisk-galar': {
		dexId: 10180,
		types: ['ground', 'steel'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'zygarde-10': {
		dexId: 10181,
		types: ['dragon', 'ground'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'cramorant-gulping': {
		dexId: 10182,
		types: ['flying', 'water'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'cramorant-gorging': {
		dexId: 10183,
		types: ['flying', 'water'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'toxtricity-low-key': {
		dexId: 10184,
		types: ['electric', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'eiscue-noice': {
		dexId: 10185,
		types: ['ice'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'indeedee-female': {
		dexId: 10186,
		types: ['psychic', 'normal'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'morpeko-hangry': {
		dexId: 10187,
		types: ['electric', 'dark'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			speed: 2,
		},
	},
	'zacian-crowned': {
		dexId: 10188,
		types: ['fairy', 'steel'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'zamazenta-crowned': {
		dexId: 10189,
		types: ['fighting', 'steel'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'eternatus-eternamax': {
		dexId: 10190,
		types: ['poison', 'dragon'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
	'urshifu-rapid-strike': {
		dexId: 10191,
		types: ['fighting', 'water'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'zarude-dada': {
		dexId: 10192,
		types: ['dark', 'grass'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'calyrex-ice': {
		dexId: 10193,
		types: ['psychic', 'ice'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'calyrex-shadow': {
		dexId: 10194,
		types: ['psychic', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'venusaur-gmax': {
		dexId: 10195,
		types: ['grass', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
	},
	'charizard-gmax': {
		dexId: 10196,
		types: ['fire', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'blastoise-gmax': {
		dexId: 10197,
		types: ['water'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	'butterfree-gmax': {
		dexId: 10198,
		types: ['bug', 'flying'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
	},
	'pikachu-gmax': {
		dexId: 10199,
		types: ['electric'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'meowth-gmax': {
		dexId: 10200,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	'machamp-gmax': {
		dexId: 10201,
		types: ['fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'gengar-gmax': {
		dexId: 10202,
		types: ['ghost', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'kingler-gmax': {
		dexId: 10203,
		types: ['water'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'lapras-gmax': {
		dexId: 10204,
		types: ['water', 'ice'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'eevee-gmax': {
		dexId: 10205,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			'special-defense': 1,
		},
	},
	'snorlax-gmax': {
		dexId: 10206,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'garbodor-gmax': {
		dexId: 10207,
		types: ['poison'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'melmetal-gmax': {
		dexId: 10208,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'rillaboom-gmax': {
		dexId: 10209,
		types: ['grass'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'cinderace-gmax': {
		dexId: 10210,
		types: ['fire'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'inteleon-gmax': {
		dexId: 10211,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 3,
		},
	},
	'corviknight-gmax': {
		dexId: 10212,
		types: ['flying', 'steel'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'orbeetle-gmax': {
		dexId: 10213,
		types: ['bug', 'psychic'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	'drednaw-gmax': {
		dexId: 10214,
		types: ['water', 'rock'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'coalossal-gmax': {
		dexId: 10215,
		types: ['rock', 'fire'],
		encounterOptions: [],
		evs: {
			defense: 3,
		},
	},
	'flapple-gmax': {
		dexId: 10216,
		types: ['grass', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'appletun-gmax': {
		dexId: 10217,
		types: ['grass', 'dragon'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'sandaconda-gmax': {
		dexId: 10218,
		types: ['ground'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'toxtricity-amped-gmax': {
		dexId: 10219,
		types: ['electric', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'centiskorch-gmax': {
		dexId: 10220,
		types: ['fire', 'bug'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'hatterene-gmax': {
		dexId: 10221,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'grimmsnarl-gmax': {
		dexId: 10222,
		types: ['dark', 'fairy'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'alcremie-gmax': {
		dexId: 10223,
		types: ['fairy'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'copperajah-gmax': {
		dexId: 10224,
		types: ['steel'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'duraludon-gmax': {
		dexId: 10225,
		types: ['steel', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'urshifu-single-strike-gmax': {
		dexId: 10226,
		types: ['fighting', 'dark'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'urshifu-rapid-strike-gmax': {
		dexId: 10227,
		types: ['fighting', 'water'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'toxtricity-low-key-gmax': {
		dexId: 10228,
		types: ['electric', 'poison'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'growlithe-hisui': {
		dexId: 10229,
		types: ['fire', 'rock'],
		encounterOptions: [
			{
				rarity: 'medium',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'ALL_DAY',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			attack: 1,
		},
	},
	'arcanine-hisui': {
		dexId: 10230,
		types: ['fire', 'rock'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'voltorb-hisui': {
		dexId: 10231,
		types: ['electric', 'grass'],
		encounterOptions: [],
		evs: {
			speed: 1,
		},
	},
	'electrode-hisui': {
		dexId: 10232,
		types: ['electric', 'grass'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'typhlosion-hisui': {
		dexId: 10233,
		types: ['fire', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'qwilfish-hisui': {
		dexId: 10234,
		types: ['dark', 'poison'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'sneasel-hisui': {
		dexId: 10235,
		types: ['fighting', 'poison'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 42875,
				minXp: 27000,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1W1',
			},
		],
		evs: {
			speed: 1,
		},
	},
	'samurott-hisui': {
		dexId: 10236,
		types: ['water', 'dark'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'lilligant-hisui': {
		dexId: 10237,
		types: ['grass', 'fighting'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'zorua-hisui': {
		dexId: 10238,
		types: ['normal', 'ghost'],
		encounterOptions: [
			{
				rarity: 'rare',
				maxXp: 64000,
				minXp: 42875,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeW1',
			},
		],
		evs: {
			'special-attack': 1,
		},
	},
	'zoroark-hisui': {
		dexId: 10239,
		types: ['normal', 'ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'braviary-hisui': {
		dexId: 10240,
		types: ['psychic', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 2,
		},
	},
	'sliggoo-hisui': {
		dexId: 10241,
		types: ['steel', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-defense': 2,
		},
	},
	'goodra-hisui': {
		dexId: 10242,
		types: ['steel', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-defense': 3,
		},
	},
	'avalugg-hisui': {
		dexId: 10243,
		types: ['ice', 'rock'],
		encounterOptions: [],
		evs: {
			defense: 2,
		},
	},
	'decidueye-hisui': {
		dexId: 10244,
		types: ['grass', 'fighting'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'dialga-origin': {
		dexId: 10245,
		types: ['steel', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'palkia-origin': {
		dexId: 10246,
		types: ['water', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'basculin-white-striped': {
		dexId: 10247,
		types: ['water'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'basculegion-female': {
		dexId: 10248,
		types: ['water', 'ghost'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'enamorus-therian': {
		dexId: 10249,
		types: ['fairy', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'tauros-paldea-combat-breed': {
		dexId: 10250,
		types: ['fighting'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'EVENING',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	'tauros-paldea-blaze-breed': {
		dexId: 10251,
		types: ['fighting', 'fire'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'MORNING',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	'tauros-paldea-aqua-breed': {
		dexId: 10252,
		types: ['fighting', 'water'],
		encounterOptions: [
			{
				rarity: 'ultra-rare',
				maxXp: 15625,
				minXp: 3375,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeS1E1',
			},
		],
		evs: {
			attack: 2,
		},
	},
	'wooper-paldea': {
		dexId: 10253,
		types: ['poison', 'ground'],
		encounterOptions: [
			{
				rarity: 'common',
				maxXp: 8000,
				minXp: 3375,
				timeOfDay: 'NIGHT',
				area: 'LAND',
				route: 'routeE1',
			},
		],
		evs: {
			hp: 1,
		},
	},
	'oinkologne-female': {
		dexId: 10254,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'dudunsparce-three-segment': {
		dexId: 10255,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'palafin-hero': {
		dexId: 10256,
		types: ['water'],
		encounterOptions: [],
		evs: {
			hp: 2,
		},
	},
	'maushold-family-of-three': {
		dexId: 10257,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			speed: 2,
		},
	},
	'tatsugiri-droopy': {
		dexId: 10258,
		types: ['dragon', 'water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'tatsugiri-stretchy': {
		dexId: 10259,
		types: ['dragon', 'water'],
		encounterOptions: [],
		evs: {
			'special-attack': 2,
		},
	},
	'squawkabilly-blue-plumage': {
		dexId: 10260,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'squawkabilly-yellow-plumage': {
		dexId: 10261,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'squawkabilly-white-plumage': {
		dexId: 10262,
		types: ['normal', 'flying'],
		encounterOptions: [],
		evs: {
			attack: 1,
		},
	},
	'gimmighoul-roaming': {
		dexId: 10263,
		types: ['ghost'],
		encounterOptions: [],
		evs: {
			'special-attack': 1,
		},
	},
	'koraidon-limited-build': {
		dexId: 10264,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'koraidon-sprinting-build': {
		dexId: 10265,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'koraidon-swimming-build': {
		dexId: 10266,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'koraidon-gliding-build': {
		dexId: 10267,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'miraidon-low-power-mode': {
		dexId: 10268,
		types: ['electric', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'miraidon-drive-mode': {
		dexId: 10269,
		types: ['electric', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'miraidon-aquatic-mode': {
		dexId: 10270,
		types: ['electric', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'miraidon-glide-mode': {
		dexId: 10271,
		types: ['electric', 'dragon'],
		encounterOptions: [],
		evs: {
			'special-attack': 3,
		},
	},
	'ursaluna-bloodmoon': {
		dexId: 10272,
		types: ['ground', 'normal'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'ogerpon-wellspring-mask': {
		dexId: 10273,
		types: ['grass', 'water'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'ogerpon-hearthflame-mask': {
		dexId: 10274,
		types: ['grass', 'fire'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'ogerpon-cornerstone-mask': {
		dexId: 10275,
		types: ['grass', 'rock'],
		encounterOptions: [],
		evs: {
			attack: 3,
		},
	},
	'terapagos-terastal': {
		dexId: 10276,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			defense: 2,
			'special-defense': 2,
		},
	},
	'terapagos-stellar': {
		dexId: 10277,
		types: ['normal'],
		encounterOptions: [],
		evs: {
			hp: 3,
		},
	},
};
