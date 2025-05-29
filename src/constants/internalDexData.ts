import { TimeOfDay } from '../functions/getTimeOfDay';
import { PokemonType } from '../interfaces/PokemonType';
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
};

export const internalDex: Record<PokemonName, InternalDexEntry> = {
	bulbasaur: {
		dexId: 1,
		types: ['grass', 'poison'],
		encounterOptions: [],
		swarm: 'WEAK',
	},
	ivysaur: {
		dexId: 2,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	venusaur: {
		dexId: 3,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	charmander: {
		dexId: 4,
		types: ['fire'],
		encounterOptions: [],
		swarm: 'WEAK',
	},
	charmeleon: {
		dexId: 5,
		types: ['fire'],
		encounterOptions: [],
	},
	charizard: {
		dexId: 6,
		types: ['fire', 'flying'],
		encounterOptions: [],
	},
	squirtle: {
		dexId: 7,
		types: ['water'],
		encounterOptions: [],
		swarm: 'WEAK',
	},
	wartortle: {
		dexId: 8,
		types: ['water'],
		encounterOptions: [],
	},
	blastoise: {
		dexId: 9,
		types: ['water'],
		encounterOptions: [],
	},
	caterpie: {
		dexId: 10,
		types: ['bug'],
		encounterOptions: [],
	},
	metapod: {
		dexId: 11,
		types: ['bug'],
		encounterOptions: [],
	},
	butterfree: {
		dexId: 12,
		types: ['bug', 'flying'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
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
	},
	kakuna: {
		dexId: 14,
		types: ['bug', 'poison'],
		encounterOptions: [],
	},
	beedrill: {
		dexId: 15,
		types: ['bug', 'poison'],
		encounterOptions: [],
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
	},
	raticate: {
		dexId: 20,
		types: ['normal'],
		encounterOptions: [],
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
	},
	fearow: {
		dexId: 22,
		types: ['normal', 'flying'],
		encounterOptions: [],
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
	},
	arbok: {
		dexId: 24,
		types: ['poison'],
		encounterOptions: [],
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
	},
	raichu: {
		dexId: 26,
		types: ['electric'],
		encounterOptions: [],
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
	},
	nidorina: {
		dexId: 30,
		types: ['poison'],
		encounterOptions: [],
	},
	nidoqueen: {
		dexId: 31,
		types: ['poison', 'ground'],
		encounterOptions: [],
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
	},
	nidorino: {
		dexId: 33,
		types: ['poison'],
		encounterOptions: [],
	},
	nidoking: {
		dexId: 34,
		types: ['poison', 'ground'],
		encounterOptions: [],
	},
	clefairy: {
		dexId: 35,
		types: ['fairy'],
		encounterOptions: [],
	},
	clefable: {
		dexId: 36,
		types: ['fairy'],
		encounterOptions: [],
	},
	vulpix: {
		dexId: 37,
		types: ['fire'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	ninetales: {
		dexId: 38,
		types: ['fire'],
		encounterOptions: [],
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
	},
	wigglytuff: {
		dexId: 40,
		swarm: 'STRONG',
		types: ['normal', 'fairy'],
		encounterOptions: [],
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
	},
	gloom: {
		dexId: 44,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	vileplume: {
		dexId: 45,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	paras: {
		dexId: 46,
		types: ['bug', 'grass'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
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
	},
	venonat: {
		dexId: 48,
		types: ['bug', 'poison'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
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
	},
	dugtrio: {
		dexId: 51,
		types: ['ground'],
		encounterOptions: [],
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
	},
	persian: {
		dexId: 53,
		types: ['normal'],
		encounterOptions: [],
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
	},
	golduck: {
		dexId: 55,
		types: ['water'],
		encounterOptions: [],
	},
	mankey: {
		dexId: 56,
		types: ['fighting'],
		honey: true,
		encounterOptions: [],
	},
	primeape: {
		dexId: 57,
		rampager: true,
		types: ['fighting'],
		encounterOptions: [],
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
	},
	arcanine: {
		dexId: 59,
		rampager: true,
		types: ['fire'],
		encounterOptions: [],
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
	},
	poliwrath: {
		dexId: 62,
		types: ['water', 'fighting'],
		encounterOptions: [],
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
	},
	kadabra: {
		dexId: 64,
		types: ['psychic'],
		encounterOptions: [],
	},
	alakazam: {
		dexId: 65,
		rampager: true,
		types: ['psychic'],
		encounterOptions: [],
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
	},
	machamp: {
		dexId: 68,
		rampager: true,
		types: ['fighting'],
		encounterOptions: [],
	},
	bellsprout: {
		dexId: 69,
		types: ['grass', 'poison'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	weepinbell: {
		dexId: 70,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	victreebel: {
		dexId: 71,
		types: ['grass', 'poison'],
		encounterOptions: [],
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
	},
	tentacruel: {
		dexId: 73,
		types: ['water', 'poison'],
		encounterOptions: [],
	},
	geodude: {
		dexId: 74,
		types: ['rock', 'ground'],
		underRock: true,
		encounterOptions: [],
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
	},
	rapidash: {
		dexId: 78,
		types: ['fire'],
		encounterOptions: [],
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
	},
	magnemite: {
		dexId: 81,
		types: ['electric', 'steel'],
		encounterOptions: [],
	},
	magneton: {
		dexId: 82,
		swarm: 'STRONG',
		types: ['electric', 'steel'],
		encounterOptions: [],
	},
	farfetchd: {
		dexId: 83,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	doduo: {
		dexId: 84,
		types: ['normal', 'flying'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	dodrio: {
		dexId: 85,
		types: ['normal', 'flying'],
		encounterOptions: [],
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
	},
	dewgong: {
		dexId: 87,
		types: ['water', 'ice'],
		encounterOptions: [],
	},
	grimer: {
		dexId: 88,
		types: ['poison'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
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
	},
	shellder: {
		dexId: 90,
		types: ['water'],
		encounterOptions: [],
	},
	cloyster: {
		dexId: 91,
		types: ['water', 'ice'],
		encounterOptions: [],
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
	},
	haunter: {
		dexId: 93,
		types: ['ghost', 'poison'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
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
	},
	drowzee: {
		dexId: 96,
		types: ['psychic'],
		encounterOptions: [],
	},
	hypno: {
		dexId: 97,
		types: ['psychic'],
		encounterOptions: [],
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
	},
	voltorb: {
		dexId: 100,
		types: ['electric'],
		encounterOptions: [],
	},
	electrode: {
		dexId: 101,
		types: ['electric'],
		encounterOptions: [],
	},
	exeggcute: {
		dexId: 102,
		types: ['grass', 'psychic'],
		honey: true,
		encounterOptions: [],
	},
	exeggutor: {
		dexId: 103,
		types: ['grass', 'psychic'],
		encounterOptions: [],
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
	},
	koffing: {
		dexId: 109,
		types: ['poison'],
		encounterOptions: [],
	},
	weezing: {
		dexId: 110,
		types: ['poison'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
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
	},
	rhydon: {
		dexId: 112,
		types: ['ground', 'rock'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	chansey: {
		dexId: 113,
		types: ['normal'],
		encounterOptions: [],
	},
	tangela: {
		dexId: 114,
		types: ['grass'],
		encounterOptions: [],
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
	},
	seaking: {
		dexId: 119,
		types: ['water'],
		encounterOptions: [],
	},
	staryu: {
		dexId: 120,
		types: ['water'],
		encounterOptions: [],
	},
	starmie: {
		dexId: 121,
		types: ['water', 'psychic'],
		encounterOptions: [],
	},
	'mr-mime': {
		dexId: 122,
		types: ['psychic', 'fairy'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
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
	},
	jynx: {
		dexId: 124,
		types: ['ice', 'psychic'],
		encounterOptions: [],
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
	},
	magmar: {
		dexId: 126,
		types: ['fire'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	pinsir: {
		dexId: 127,
		rampager: true,
		types: ['bug'],
		encounterOptions: [],
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
	},
	lapras: {
		dexId: 131,
		types: ['water', 'ice'],
		encounterOptions: [],
	},
	ditto: {
		dexId: 132,
		types: ['normal'],
		encounterOptions: [],
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
	},
	vaporeon: {
		dexId: 134,
		types: ['water'],
		encounterOptions: [],
	},
	jolteon: {
		dexId: 135,
		types: ['electric'],
		encounterOptions: [],
	},
	flareon: {
		dexId: 136,
		types: ['fire'],
		encounterOptions: [],
	},
	porygon: {
		dexId: 137,
		types: ['normal'],
		encounterOptions: [],
	},
	omanyte: {
		dexId: 138,
		types: ['rock', 'water'],
		encounterOptions: [],
	},
	omastar: {
		dexId: 139,
		types: ['rock', 'water'],
		encounterOptions: [],
	},
	kabuto: {
		dexId: 140,
		types: ['rock', 'water'],
		encounterOptions: [],
	},
	kabutops: {
		dexId: 141,
		types: ['rock', 'water'],
		encounterOptions: [],
	},
	aerodactyl: {
		dexId: 142,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	snorlax: {
		dexId: 143,
		types: ['normal'],
		encounterOptions: [],
	},
	articuno: {
		dexId: 144,
		types: ['ice', 'flying'],
		encounterOptions: [],
	},
	zapdos: {
		dexId: 145,
		types: ['electric', 'flying'],
		encounterOptions: [],
	},
	moltres: {
		dexId: 146,
		types: ['fire', 'flying'],
		encounterOptions: [],
	},
	dratini: {
		dexId: 147,
		types: ['dragon'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	dragonair: {
		dexId: 148,
		types: ['dragon'],
		encounterOptions: [],
	},
	dragonite: {
		dexId: 149,
		rampager: true,
		types: ['dragon', 'flying'],
		encounterOptions: [],
	},
	mewtwo: {
		dexId: 150,
		types: ['psychic'],
		encounterOptions: [],
	},
	mew: {
		dexId: 151,
		types: ['psychic'],
		encounterOptions: [],
	},
	chikorita: {
		dexId: 152,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
	},
	bayleef: {
		dexId: 153,
		types: ['grass'],
		encounterOptions: [],
	},
	meganium: {
		dexId: 154,
		types: ['grass'],
		encounterOptions: [],
	},
	cyndaquil: {
		dexId: 155,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
	},
	quilava: {
		dexId: 156,
		types: ['fire'],
		encounterOptions: [],
	},
	typhlosion: {
		dexId: 157,
		types: ['fire'],
		encounterOptions: [],
	},
	totodile: {
		dexId: 158,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
	},
	croconaw: {
		dexId: 159,
		types: ['water'],
		encounterOptions: [],
	},
	feraligatr: {
		dexId: 160,
		types: ['water'],
		encounterOptions: [],
	},
	sentret: {
		dexId: 161,
		types: ['normal'],
		encounterOptions: [],
	},
	furret: {
		dexId: 162,
		types: ['normal'],
		encounterOptions: [],
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
	},
	noctowl: {
		dexId: 164,
		types: ['normal', 'flying'],
		encounterOptions: [],
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
	},
	ledian: {
		dexId: 166,
		types: ['bug', 'flying'],
		encounterOptions: [],
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
	},
	ariados: {
		dexId: 168,
		types: ['bug', 'poison'],
		encounterOptions: [],
	},
	crobat: {
		dexId: 169,
		rampager: true,
		types: ['poison', 'flying'],
		encounterOptions: [],
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
	},
	lanturn: {
		dexId: 171,
		types: ['water', 'electric'],
		encounterOptions: [],
	},
	pichu: {
		dexId: 172,
		types: ['electric'],
		encounterOptions: [],
	},
	cleffa: {
		dexId: 173,
		types: ['fairy'],
		encounterOptions: [],
	},
	igglybuff: {
		dexId: 174,
		types: ['normal', 'fairy'],
		encounterOptions: [],
	},
	togepi: {
		dexId: 175,
		types: ['fairy'],
		encounterOptions: [],
	},
	togetic: {
		dexId: 176,
		types: ['fairy', 'flying'],
		encounterOptions: [],
	},
	natu: {
		dexId: 177,
		types: ['psychic', 'flying'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	xatu: {
		dexId: 178,
		types: ['psychic', 'flying'],
		encounterOptions: [],
	},
	mareep: {
		dexId: 179,
		types: ['electric'],
		encounterOptions: [],
	},
	flaaffy: {
		dexId: 180,
		types: ['electric'],
		encounterOptions: [],
	},
	ampharos: {
		dexId: 181,
		types: ['electric'],
		encounterOptions: [],
	},
	bellossom: {
		dexId: 182,
		types: ['grass'],
		encounterOptions: [],
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
	},
	sudowoodo: {
		dexId: 185,
		types: ['rock'],
		encounterOptions: [],
	},
	politoed: {
		dexId: 186,
		types: ['water'],
		encounterOptions: [],
	},
	hoppip: {
		dexId: 187,
		types: ['grass', 'flying'],
		encounterOptions: [],
	},
	skiploom: {
		dexId: 188,
		types: ['grass', 'flying'],
		encounterOptions: [],
	},
	jumpluff: {
		dexId: 189,
		types: ['grass', 'flying'],
		encounterOptions: [],
	},
	aipom: {
		dexId: 190,
		types: ['normal'],
		honey: true,
		encounterOptions: [],
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
	},
	sunflora: {
		dexId: 192,
		types: ['grass'],
		encounterOptions: [],
	},
	yanma: {
		dexId: 193,
		types: ['bug', 'flying'],
		encounterOptions: [],
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
	},
	quagsire: {
		dexId: 195,
		types: ['water', 'ground'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	espeon: {
		dexId: 196,
		types: ['psychic'],
		encounterOptions: [],
	},
	umbreon: {
		dexId: 197,
		types: ['dark'],
		encounterOptions: [],
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
	},
	slowking: {
		dexId: 199,
		types: ['water', 'psychic'],
		encounterOptions: [],
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
	},
	unown: {
		dexId: 201,
		types: ['psychic'],
		encounterOptions: [],
	},
	wobbuffet: {
		dexId: 202,
		types: ['psychic'],
		encounterOptions: [],
	},
	girafarig: {
		dexId: 203,
		types: ['normal', 'psychic'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	pineco: {
		dexId: 204,
		types: ['bug'],
		honey: true,
		encounterOptions: [],
	},
	forretress: {
		dexId: 205,
		types: ['bug', 'steel'],
		encounterOptions: [],
	},
	dunsparce: {
		dexId: 206,
		types: ['normal'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
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
	},
	snubbull: {
		dexId: 209,
		types: ['fairy'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	granbull: {
		dexId: 210,
		types: ['fairy'],
		encounterOptions: [],
	},
	qwilfish: {
		dexId: 211,
		types: ['water', 'poison'],
		encounterOptions: [],
	},
	scizor: {
		dexId: 212,
		types: ['bug', 'steel'],
		encounterOptions: [],
	},
	shuckle: {
		dexId: 213,
		types: ['bug', 'rock'],
		underRock: true,
		encounterOptions: [],
	},
	heracross: {
		dexId: 214,
		types: ['bug', 'fighting'],
		honey: true,
		encounterOptions: [],
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
	},
	slugma: {
		dexId: 218,
		types: ['fire'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	magcargo: {
		dexId: 219,
		types: ['fire', 'rock'],
		encounterOptions: [],
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
	},
	corsola: {
		dexId: 222,
		types: ['water', 'rock'],
		encounterOptions: [],
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
	},
	octillery: {
		dexId: 224,
		types: ['water'],
		encounterOptions: [],
	},
	delibird: {
		dexId: 225,
		swarm: 'STRONG',
		types: ['ice', 'flying'],
		encounterOptions: [],
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
	},
	houndoom: {
		dexId: 229,
		types: ['dark', 'fire'],
		encounterOptions: [],
	},
	kingdra: {
		dexId: 230,
		types: ['water', 'dragon'],
		encounterOptions: [],
	},
	phanpy: {
		dexId: 231,
		types: ['ground'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	donphan: {
		dexId: 232,
		swarm: 'STRONG',
		types: ['ground'],
		encounterOptions: [],
	},
	porygon2: {
		dexId: 233,
		types: ['normal'],
		encounterOptions: [],
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
	},
	smeargle: {
		dexId: 235,
		types: ['normal'],
		encounterOptions: [],
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
	},
	smoochum: {
		dexId: 238,
		types: ['ice', 'psychic'],
		encounterOptions: [],
	},
	elekid: {
		dexId: 239,
		types: ['electric'],
		encounterOptions: [],
	},
	magby: {
		dexId: 240,
		types: ['fire'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
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
	},
	blissey: {
		dexId: 242,
		types: ['normal'],
		encounterOptions: [],
	},
	raikou: {
		dexId: 243,
		types: ['electric'],
		encounterOptions: [],
	},
	entei: {
		dexId: 244,
		types: ['fire'],
		encounterOptions: [],
	},
	suicune: {
		dexId: 245,
		types: ['water'],
		encounterOptions: [],
	},
	larvitar: {
		dexId: 246,
		types: ['rock', 'ground'],
		encounterOptions: [],
	},
	pupitar: {
		dexId: 247,
		swarm: 'STRONG',
		types: ['rock', 'ground'],
		encounterOptions: [],
	},
	tyranitar: {
		dexId: 248,
		rampager: true,
		types: ['rock', 'dark'],
		encounterOptions: [],
	},
	lugia: {
		dexId: 249,
		types: ['psychic', 'flying'],
		encounterOptions: [],
	},
	'ho-oh': {
		dexId: 250,
		types: ['fire', 'flying'],
		encounterOptions: [],
	},
	celebi: {
		dexId: 251,
		types: ['psychic', 'grass'],
		encounterOptions: [],
	},
	treecko: {
		dexId: 252,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
	},
	grovyle: {
		dexId: 253,
		types: ['grass'],
		encounterOptions: [],
	},
	sceptile: {
		dexId: 254,
		types: ['grass'],
		encounterOptions: [],
	},
	torchic: {
		dexId: 255,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
	},
	combusken: {
		dexId: 256,
		types: ['fire', 'fighting'],
		encounterOptions: [],
	},
	blaziken: {
		dexId: 257,
		types: ['fire', 'fighting'],
		encounterOptions: [],
	},
	mudkip: {
		dexId: 258,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
	},
	marshtomp: {
		dexId: 259,
		types: ['water', 'ground'],
		encounterOptions: [],
	},
	swampert: {
		dexId: 260,
		types: ['water', 'ground'],
		encounterOptions: [],
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
	},
	mightyena: {
		dexId: 262,
		types: ['dark'],
		encounterOptions: [],
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
	},
	linoone: {
		dexId: 264,
		types: ['normal'],
		encounterOptions: [],
	},
	wurmple: {
		dexId: 265,
		types: ['bug'],
		encounterOptions: [],
	},
	silcoon: {
		dexId: 266,
		types: ['bug'],
		encounterOptions: [],
	},
	beautifly: {
		dexId: 267,
		types: ['bug', 'flying'],
		encounterOptions: [],
	},
	cascoon: {
		dexId: 268,
		types: ['bug'],
		encounterOptions: [],
	},
	dustox: {
		dexId: 269,
		types: ['bug', 'poison'],
		encounterOptions: [],
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
	},
	lombre: {
		dexId: 271,
		types: ['water', 'grass'],
		encounterOptions: [],
	},
	ludicolo: {
		dexId: 272,
		types: ['water', 'grass'],
		encounterOptions: [],
	},
	seedot: {
		dexId: 273,
		types: ['grass'],
		encounterOptions: [],
	},
	nuzleaf: {
		dexId: 274,
		types: ['grass', 'dark'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	shiftry: {
		dexId: 275,
		types: ['grass', 'dark'],
		encounterOptions: [],
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
	},
	swellow: {
		dexId: 277,
		types: ['normal', 'flying'],
		encounterOptions: [],
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
	},
	ralts: {
		dexId: 280,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
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
	},
	gardevoir: {
		dexId: 282,
		swarm: 'STRONG',
		types: ['psychic', 'fairy'],
		encounterOptions: [],
	},
	surskit: {
		dexId: 283,
		types: ['bug', 'water'],
		encounterOptions: [],
	},
	masquerain: {
		dexId: 284,
		types: ['bug', 'flying'],
		encounterOptions: [],
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
	},
	breloom: {
		dexId: 286,
		types: ['grass', 'fighting'],
		encounterOptions: [],
	},
	slakoth: {
		dexId: 287,
		types: ['normal'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
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
	},
	slaking: {
		dexId: 289,
		rampager: true,
		types: ['normal'],
		encounterOptions: [],
	},
	nincada: {
		dexId: 290,
		types: ['bug', 'ground'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	ninjask: {
		dexId: 291,
		types: ['bug', 'flying'],
		encounterOptions: [],
	},
	shedinja: {
		dexId: 292,
		types: ['bug', 'ghost'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	whismur: {
		dexId: 293,
		types: ['normal'],
		underRock: true,
		encounterOptions: [],
	},
	loudred: {
		dexId: 294,
		types: ['normal'],
		encounterOptions: [],
	},
	exploud: {
		dexId: 295,
		types: ['normal'],
		encounterOptions: [],
	},
	makuhita: {
		dexId: 296,
		types: ['fighting'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	hariyama: {
		dexId: 297,
		swarm: 'STRONG',
		types: ['fighting'],
		encounterOptions: [],
	},
	azurill: {
		dexId: 298,
		types: ['normal', 'fairy'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	nosepass: {
		dexId: 299,
		types: ['rock'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
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
	},
	delcatty: {
		dexId: 301,
		types: ['normal'],
		encounterOptions: [],
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
	},
	mawile: {
		dexId: 303,
		types: ['steel', 'fairy'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
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
	},
	lairon: {
		dexId: 305,
		types: ['steel', 'rock'],
		encounterOptions: [],
	},
	aggron: {
		dexId: 306,
		types: ['steel', 'rock'],
		encounterOptions: [],
	},
	meditite: {
		dexId: 307,
		berryLureMapId: 'routeE1',
		types: ['fighting', 'psychic'],
		encounterOptions: [],
	},
	medicham: {
		dexId: 308,
		types: ['fighting', 'psychic'],
		encounterOptions: [],
	},
	electrike: {
		dexId: 309,
		types: ['electric'],
		encounterOptions: [],
	},
	manectric: {
		dexId: 310,
		types: ['electric'],
		encounterOptions: [],
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
	},
	volbeat: {
		dexId: 313,
		types: ['bug'],
		encounterOptions: [],
	},
	illumise: {
		dexId: 314,
		types: ['bug'],
		encounterOptions: [],
	},
	roselia: {
		dexId: 315,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	gulpin: {
		dexId: 316,
		types: ['poison'],
		encounterOptions: [],
	},
	swalot: {
		dexId: 317,
		types: ['poison'],
		encounterOptions: [],
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
	},
	sharpedo: {
		dexId: 319,
		types: ['water', 'dark'],
		encounterOptions: [],
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
	},
	numel: {
		dexId: 322,
		types: ['fire', 'ground'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	camerupt: {
		dexId: 323,
		types: ['fire', 'ground'],
		encounterOptions: [],
	},
	torkoal: {
		dexId: 324,
		types: ['fire'],
		underRock: true,
		encounterOptions: [],
	},
	spoink: {
		dexId: 325,
		types: ['psychic'],
		encounterOptions: [],
	},
	grumpig: {
		dexId: 326,
		types: ['psychic'],
		encounterOptions: [],
	},
	spinda: {
		dexId: 327,
		types: ['normal'],
		encounterOptions: [],
	},
	trapinch: {
		dexId: 328,
		types: ['ground'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	vibrava: {
		dexId: 329,
		types: ['ground', 'dragon'],
		encounterOptions: [],
	},
	flygon: {
		dexId: 330,
		types: ['ground', 'dragon'],
		encounterOptions: [],
	},
	cacnea: {
		dexId: 331,
		types: ['grass'],
		encounterOptions: [],
	},
	cacturne: {
		dexId: 332,
		types: ['grass', 'dark'],
		encounterOptions: [],
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
	},
	altaria: {
		dexId: 334,
		types: ['dragon', 'flying'],
		encounterOptions: [],
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
	},
	seviper: {
		dexId: 336,
		types: ['poison'],
		encounterOptions: [],
	},
	lunatone: {
		dexId: 337,
		types: ['rock', 'psychic'],
		encounterOptions: [],
	},
	solrock: {
		dexId: 338,
		types: ['rock', 'psychic'],
		encounterOptions: [],
	},
	barboach: {
		dexId: 339,
		types: ['water', 'ground'],
		encounterOptions: [],
	},
	whiscash: {
		dexId: 340,
		types: ['water', 'ground'],
		encounterOptions: [],
	},
	corphish: {
		dexId: 341,
		types: ['water'],
		encounterOptions: [],
	},
	crawdaunt: {
		dexId: 342,
		types: ['water', 'dark'],
		encounterOptions: [],
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
	},
	lileep: {
		dexId: 345,
		types: ['rock', 'grass'],
		encounterOptions: [],
	},
	cradily: {
		dexId: 346,
		types: ['rock', 'grass'],
		encounterOptions: [],
	},
	anorith: {
		dexId: 347,
		types: ['rock', 'bug'],
		encounterOptions: [],
	},
	armaldo: {
		dexId: 348,
		types: ['rock', 'bug'],
		encounterOptions: [],
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
	},
	milotic: {
		dexId: 350,
		types: ['water'],
		encounterOptions: [],
	},
	castform: {
		dexId: 351,
		types: ['normal'],
		encounterOptions: [],
	},
	kecleon: {
		dexId: 352,
		types: ['normal'],
		encounterOptions: [],
	},
	shuppet: {
		dexId: 353,
		types: ['ghost'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	banette: {
		dexId: 354,
		types: ['ghost'],
		encounterOptions: [],
	},
	duskull: {
		dexId: 355,
		types: ['ghost'],
		encounterOptions: [],
	},
	dusclops: {
		dexId: 356,
		types: ['ghost'],
		encounterOptions: [],
	},
	tropius: {
		dexId: 357,
		berryLureMapId: 'routeN1E1',
		types: ['grass', 'flying'],
		encounterOptions: [],
	},
	chimecho: {
		dexId: 358,
		types: ['psychic'],
		encounterOptions: [],
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
	},
	wynaut: {
		dexId: 360,
		types: ['psychic'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	snorunt: {
		dexId: 361,
		types: ['ice'],
		encounterOptions: [],
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
	},
	spheal: {
		dexId: 363,
		types: ['ice', 'water'],
		encounterOptions: [],
	},
	sealeo: {
		dexId: 364,
		types: ['ice', 'water'],
		encounterOptions: [],
	},
	walrein: {
		dexId: 365,
		types: ['ice', 'water'],
		encounterOptions: [],
	},
	clamperl: {
		dexId: 366,
		types: ['water'],
		encounterOptions: [],
	},
	huntail: {
		dexId: 367,
		types: ['water'],
		encounterOptions: [],
	},
	gorebyss: {
		dexId: 368,
		types: ['water'],
		encounterOptions: [],
	},
	relicanth: {
		dexId: 369,
		types: ['water', 'rock'],
		encounterOptions: [],
	},
	luvdisc: {
		dexId: 370,
		types: ['water'],
		encounterOptions: [],
	},
	bagon: {
		dexId: 371,
		types: ['dragon'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	shelgon: {
		dexId: 372,
		swarm: 'STRONG',
		types: ['dragon'],
		encounterOptions: [],
	},
	salamence: {
		dexId: 373,
		types: ['dragon', 'flying'],
		encounterOptions: [],
	},
	beldum: {
		dexId: 374,
		types: ['steel', 'psychic'],
		encounterOptions: [],
	},
	metang: {
		dexId: 375,
		types: ['steel', 'psychic'],
		encounterOptions: [],
	},
	metagross: {
		dexId: 376,
		types: ['steel', 'psychic'],
		encounterOptions: [],
	},
	regirock: {
		dexId: 377,
		types: ['rock'],
		encounterOptions: [],
	},
	regice: {
		dexId: 378,
		types: ['ice'],
		encounterOptions: [],
	},
	registeel: {
		dexId: 379,
		types: ['steel'],
		encounterOptions: [],
	},
	latias: {
		dexId: 380,
		types: ['dragon', 'psychic'],
		encounterOptions: [],
	},
	latios: {
		dexId: 381,
		types: ['dragon', 'psychic'],
		encounterOptions: [],
	},
	kyogre: {
		dexId: 382,
		types: ['water'],
		encounterOptions: [],
	},
	groudon: {
		dexId: 383,
		types: ['ground'],
		encounterOptions: [],
	},
	rayquaza: {
		dexId: 384,
		types: ['dragon', 'flying'],
		encounterOptions: [],
	},
	jirachi: {
		dexId: 385,
		types: ['steel', 'psychic'],
		encounterOptions: [],
	},
	'deoxys-normal': {
		dexId: 386,
		types: ['psychic'],
		encounterOptions: [],
	},
	turtwig: {
		dexId: 387,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
	},
	grotle: {
		dexId: 388,
		types: ['grass'],
		encounterOptions: [],
	},
	torterra: {
		dexId: 389,
		types: ['grass', 'ground'],
		encounterOptions: [],
	},
	chimchar: {
		dexId: 390,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
	},
	monferno: {
		dexId: 391,
		types: ['fire', 'fighting'],
		encounterOptions: [],
	},
	infernape: {
		dexId: 392,
		types: ['fire', 'fighting'],
		encounterOptions: [],
	},
	piplup: {
		dexId: 393,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
	},
	prinplup: {
		dexId: 394,
		types: ['water'],
		encounterOptions: [],
	},
	empoleon: {
		dexId: 395,
		types: ['water', 'steel'],
		encounterOptions: [],
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
	},
	staravia: {
		dexId: 397,
		types: ['normal', 'flying'],
		encounterOptions: [],
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
	},
	bibarel: {
		dexId: 400,
		types: ['normal', 'water'],
		encounterOptions: [],
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
	},
	kricketune: {
		dexId: 402,
		types: ['bug'],
		encounterOptions: [],
	},
	shinx: {
		dexId: 403,
		types: ['electric'],
		encounterOptions: [],
	},
	luxio: {
		dexId: 404,
		types: ['electric'],
		encounterOptions: [],
	},
	luxray: {
		dexId: 405,
		types: ['electric'],
		encounterOptions: [],
	},
	budew: {
		dexId: 406,
		types: ['grass', 'poison'],
		honey: true,
		encounterOptions: [],
	},
	roserade: {
		dexId: 407,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	cranidos: {
		dexId: 408,
		types: ['rock'],
		encounterOptions: [],
	},
	rampardos: {
		dexId: 409,
		types: ['rock'],
		encounterOptions: [],
	},
	shieldon: {
		dexId: 410,
		types: ['rock', 'steel'],
		encounterOptions: [],
	},
	bastiodon: {
		dexId: 411,
		types: ['rock', 'steel'],
		encounterOptions: [],
	},
	burmy: {
		dexId: 412,
		types: ['bug'],
		honey: true,
		encounterOptions: [],
	},
	'wormadam-plant': {
		dexId: 413,
		types: ['bug', 'grass'],
		encounterOptions: [],
	},
	mothim: {
		dexId: 414,
		types: ['bug', 'flying'],
		encounterOptions: [],
	},
	combee: {
		dexId: 415,
		types: ['bug', 'flying'],
		honey: true,
		encounterOptions: [],
	},
	vespiquen: {
		dexId: 416,
		types: ['bug', 'flying'],
		encounterOptions: [],
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
	},
	floatzel: {
		dexId: 419,
		types: ['water'],
		encounterOptions: [],
	},
	cherubi: {
		dexId: 420,
		types: ['grass'],
		encounterOptions: [],
	},
	cherrim: {
		dexId: 421,
		types: ['grass'],
		encounterOptions: [],
	},
	shellos: {
		dexId: 422,
		types: ['water'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	gastrodon: {
		dexId: 423,
		types: ['water', 'ground'],
		encounterOptions: [],
	},
	ambipom: {
		dexId: 424,
		types: ['normal'],
		encounterOptions: [],
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
	},
	drifblim: {
		dexId: 426,
		types: ['ghost', 'flying'],
		encounterOptions: [],
	},
	buneary: {
		dexId: 427,
		types: ['normal'],
		encounterOptions: [],
	},
	lopunny: {
		dexId: 428,
		types: ['normal'],
		encounterOptions: [],
	},
	mismagius: {
		dexId: 429,
		types: ['ghost'],
		swarm: 'STRONG',
		encounterOptions: [],
	},
	honchkrow: {
		dexId: 430,
		types: ['dark', 'flying'],
		encounterOptions: [],
	},
	glameow: {
		dexId: 431,
		types: ['normal'],
		encounterOptions: [],
	},
	purugly: {
		dexId: 432,
		types: ['normal'],
		encounterOptions: [],
	},
	chingling: {
		dexId: 433,
		types: ['psychic'],
		encounterOptions: [],
	},
	stunky: {
		dexId: 434,
		berryLureMapId: 'routeE1',
		types: ['poison', 'dark'],
		encounterOptions: [],
	},
	skuntank: {
		dexId: 435,
		types: ['poison', 'dark'],
		encounterOptions: [],
	},
	bronzor: {
		dexId: 436,
		types: ['steel', 'psychic'],
		encounterOptions: [],
	},
	bronzong: {
		dexId: 437,
		types: ['steel', 'psychic'],
		encounterOptions: [],
	},
	bonsly: {
		dexId: 438,
		types: ['rock'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	'mime-jr': {
		dexId: 439,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
	},
	happiny: {
		dexId: 440,
		types: ['normal'],
		encounterOptions: [],
	},
	chatot: {
		dexId: 441,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	spiritomb: {
		dexId: 442,
		types: ['ghost', 'dark'],
		encounterOptions: [],
	},
	gible: {
		dexId: 443,
		types: ['dragon', 'ground'],
		encounterOptions: [],
	},
	gabite: {
		dexId: 444,
		types: ['dragon', 'ground'],
		encounterOptions: [],
	},
	garchomp: {
		dexId: 445,
		rampager: true,
		types: ['dragon', 'ground'],
		encounterOptions: [],
	},
	munchlax: {
		dexId: 446,
		types: ['normal'],
		honey: true,
		encounterOptions: [],
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
	},
	lucario: {
		dexId: 448,
		types: ['fighting', 'steel'],
		encounterOptions: [],
	},
	hippopotas: {
		dexId: 449,
		types: ['ground'],
		encounterOptions: [],
	},
	hippowdon: {
		dexId: 450,
		types: ['ground'],
		encounterOptions: [],
	},
	skorupi: {
		dexId: 451,
		berryLureMapId: 'routeN1E1',
		types: ['poison', 'bug'],
		encounterOptions: [],
	},
	drapion: {
		dexId: 452,
		rampager: true,
		types: ['poison', 'dark'],
		encounterOptions: [],
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
	},
	toxicroak: {
		dexId: 454,
		types: ['poison', 'fighting'],
		encounterOptions: [],
	},
	carnivine: {
		dexId: 455,
		types: ['grass'],
		encounterOptions: [],
	},
	finneon: {
		dexId: 456,
		types: ['water'],
		encounterOptions: [],
	},
	lumineon: {
		dexId: 457,
		types: ['water'],
		encounterOptions: [],
	},
	mantyke: {
		dexId: 458,
		types: ['water', 'flying'],
		encounterOptions: [],
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
	},
	magnezone: {
		dexId: 462,
		types: ['electric', 'steel'],
		encounterOptions: [],
	},
	lickilicky: {
		dexId: 463,
		types: ['normal'],
		encounterOptions: [],
	},
	rhyperior: {
		dexId: 464,
		types: ['ground', 'rock'],
		encounterOptions: [],
	},
	tangrowth: {
		dexId: 465,
		types: ['grass'],
		encounterOptions: [],
	},
	electivire: {
		dexId: 466,
		types: ['electric'],
		encounterOptions: [],
	},
	magmortar: {
		dexId: 467,
		types: ['fire'],
		encounterOptions: [],
	},
	togekiss: {
		dexId: 468,
		types: ['fairy', 'flying'],
		encounterOptions: [],
	},
	yanmega: {
		dexId: 469,
		types: ['bug', 'flying'],
		encounterOptions: [],
	},
	leafeon: {
		dexId: 470,
		types: ['grass'],
		encounterOptions: [],
	},
	glaceon: {
		dexId: 471,
		types: ['ice'],
		encounterOptions: [],
	},
	gliscor: {
		dexId: 472,
		types: ['ground', 'flying'],
		encounterOptions: [],
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
	},
	'porygon-z': {
		dexId: 474,
		types: ['normal'],
		encounterOptions: [],
	},
	gallade: {
		dexId: 475,
		swarm: 'STRONG',
		types: ['psychic', 'fighting'],
		encounterOptions: [],
	},
	probopass: {
		dexId: 476,
		types: ['rock', 'steel'],
		encounterOptions: [],
	},
	dusknoir: {
		dexId: 477,
		types: ['ghost'],
		encounterOptions: [],
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
	},
	rotom: {
		dexId: 479,
		types: ['electric', 'ghost'],
		encounterOptions: [],
	},
	uxie: {
		dexId: 480,
		types: ['psychic'],
		encounterOptions: [],
	},
	mesprit: {
		dexId: 481,
		types: ['psychic'],
		encounterOptions: [],
	},
	azelf: {
		dexId: 482,
		types: ['psychic'],
		encounterOptions: [],
	},
	dialga: {
		dexId: 483,
		types: ['steel', 'dragon'],
		encounterOptions: [],
	},
	palkia: {
		dexId: 484,
		types: ['water', 'dragon'],
		encounterOptions: [],
	},
	heatran: {
		dexId: 485,
		types: ['fire', 'steel'],
		encounterOptions: [],
	},
	regigigas: {
		dexId: 486,
		types: ['normal'],
		encounterOptions: [],
	},
	'giratina-altered': {
		dexId: 487,
		types: ['ghost', 'dragon'],
		encounterOptions: [],
	},
	cresselia: {
		dexId: 488,
		types: ['psychic'],
		encounterOptions: [],
	},
	phione: {
		dexId: 489,
		types: ['water'],
		encounterOptions: [],
	},
	manaphy: {
		dexId: 490,
		types: ['water'],
		encounterOptions: [],
	},
	darkrai: {
		dexId: 491,
		types: ['dark'],
		encounterOptions: [],
	},
	'shaymin-land': {
		dexId: 492,
		types: ['grass'],
		encounterOptions: [],
	},
	arceus: {
		dexId: 493,
		types: ['normal'],
		encounterOptions: [],
	},
	victini: {
		dexId: 494,
		types: ['psychic', 'fire'],
		encounterOptions: [],
	},
	snivy: {
		dexId: 495,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
	},
	servine: {
		dexId: 496,
		types: ['grass'],
		encounterOptions: [],
	},
	serperior: {
		dexId: 497,
		types: ['grass'],
		encounterOptions: [],
	},
	tepig: {
		dexId: 498,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
	},
	pignite: {
		dexId: 499,
		types: ['fire', 'fighting'],
		encounterOptions: [],
	},
	emboar: {
		dexId: 500,
		types: ['fire', 'fighting'],
		encounterOptions: [],
	},
	oshawott: {
		dexId: 501,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
	},
	dewott: {
		dexId: 502,
		types: ['water'],
		encounterOptions: [],
	},
	samurott: {
		dexId: 503,
		types: ['water'],
		encounterOptions: [],
	},
	patrat: {
		dexId: 504,
		types: ['normal'],
		encounterOptions: [],
	},
	watchog: {
		dexId: 505,
		types: ['normal'],
		encounterOptions: [],
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
	},
	stoutland: {
		dexId: 508,
		types: ['normal'],
		encounterOptions: [],
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
	},
	liepard: {
		dexId: 510,
		types: ['dark'],
		encounterOptions: [],
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
	},
	simisage: {
		dexId: 512,
		types: ['grass'],
		encounterOptions: [],
	},
	pansear: {
		dexId: 513,
		types: ['fire'],
		encounterOptions: [],
	},
	simisear: {
		dexId: 514,
		types: ['fire'],
		encounterOptions: [],
	},
	panpour: {
		dexId: 515,
		types: ['water'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	simipour: {
		dexId: 516,
		types: ['water'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	munna: {
		dexId: 517,
		types: ['psychic'],
		encounterOptions: [],
	},
	musharna: {
		dexId: 518,
		types: ['psychic'],
		encounterOptions: [],
	},
	pidove: {
		dexId: 519,
		types: ['normal', 'flying'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	tranquill: {
		dexId: 520,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	unfezant: {
		dexId: 521,
		types: ['normal', 'flying'],
		encounterOptions: [],
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
	},
	zebstrika: {
		dexId: 523,
		types: ['electric'],
		encounterOptions: [],
	},
	roggenrola: {
		dexId: 524,
		types: ['rock'],
		underRock: true,
		encounterOptions: [],
	},
	boldore: {
		dexId: 525,
		types: ['rock'],
		encounterOptions: [],
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
	},
	swoobat: {
		dexId: 528,
		types: ['psychic', 'flying'],
		encounterOptions: [],
	},
	drilbur: {
		dexId: 529,
		types: ['ground'],
		encounterOptions: [],
	},
	excadrill: {
		dexId: 530,
		types: ['ground', 'steel'],
		encounterOptions: [],
	},
	audino: {
		dexId: 531,
		types: ['normal'],
		encounterOptions: [],
	},
	timburr: {
		dexId: 532,
		types: ['fighting'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	gurdurr: {
		dexId: 533,
		types: ['fighting'],
		encounterOptions: [],
	},
	conkeldurr: {
		dexId: 534,
		types: ['fighting'],
		encounterOptions: [],
	},
	tympole: {
		dexId: 535,
		types: ['water'],
		encounterOptions: [],
	},
	palpitoad: {
		dexId: 536,
		types: ['water', 'ground'],
		encounterOptions: [],
	},
	seismitoad: {
		dexId: 537,
		types: ['water', 'ground'],
		encounterOptions: [],
	},
	throh: {
		dexId: 538,
		types: ['fighting'],
		encounterOptions: [],
	},
	sawk: {
		dexId: 539,
		types: ['fighting'],
		encounterOptions: [],
	},
	sewaddle: {
		dexId: 540,
		types: ['bug', 'grass'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	swadloon: {
		dexId: 541,
		types: ['bug', 'grass'],
		encounterOptions: [],
	},
	leavanny: {
		dexId: 542,
		types: ['bug', 'grass'],
		encounterOptions: [],
	},
	venipede: {
		dexId: 543,
		types: ['bug', 'poison'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	whirlipede: {
		dexId: 544,
		types: ['bug', 'poison'],
		encounterOptions: [],
	},
	scolipede: {
		dexId: 545,
		rampager: true,
		types: ['bug', 'poison'],
		encounterOptions: [],
	},
	cottonee: {
		dexId: 546,
		types: ['grass', 'fairy'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	whimsicott: {
		dexId: 547,
		types: ['grass', 'fairy'],
		encounterOptions: [],
	},
	petilil: {
		dexId: 548,
		types: ['grass'],
		honey: true,
		encounterOptions: [],
	},
	lilligant: {
		dexId: 549,
		types: ['grass'],
		encounterOptions: [],
	},
	'basculin-red-striped': {
		dexId: 550,
		types: ['water'],
		encounterOptions: [],
	},
	sandile: {
		dexId: 551,
		types: ['ground', 'dark'],
		encounterOptions: [],
	},
	krokorok: {
		dexId: 552,
		types: ['ground', 'dark'],
		encounterOptions: [],
	},
	krookodile: {
		dexId: 553,
		types: ['ground', 'dark'],
		encounterOptions: [],
	},
	darumaka: {
		dexId: 554,
		types: ['fire'],
		encounterOptions: [],
	},
	'darmanitan-standard': {
		dexId: 555,
		types: ['fire'],
		encounterOptions: [],
	},
	maractus: {
		dexId: 556,
		types: ['grass'],
		encounterOptions: [],
	},
	dwebble: {
		dexId: 557,
		types: ['bug', 'rock'],
		underRock: true,
		encounterOptions: [],
	},
	crustle: {
		dexId: 558,
		types: ['bug', 'rock'],
		encounterOptions: [],
	},
	scraggy: {
		dexId: 559,
		types: ['dark', 'fighting'],
		encounterOptions: [],
	},
	scrafty: {
		dexId: 560,
		types: ['dark', 'fighting'],
		encounterOptions: [],
	},
	sigilyph: {
		dexId: 561,
		types: ['psychic', 'flying'],
		encounterOptions: [],
	},
	yamask: {
		dexId: 562,
		types: ['ghost'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	cofagrigus: {
		dexId: 563,
		types: ['ghost'],
		encounterOptions: [],
	},
	tirtouga: {
		dexId: 564,
		types: ['water', 'rock'],
		encounterOptions: [],
	},
	carracosta: {
		dexId: 565,
		types: ['water', 'rock'],
		encounterOptions: [],
	},
	archen: {
		dexId: 566,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	archeops: {
		dexId: 567,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	trubbish: {
		dexId: 568,
		types: ['poison'],
		encounterOptions: [],
	},
	garbodor: {
		dexId: 569,
		types: ['poison'],
		encounterOptions: [],
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
	},
	minccino: {
		dexId: 572,
		types: ['normal'],
		encounterOptions: [],
	},
	cinccino: {
		dexId: 573,
		types: ['normal'],
		encounterOptions: [],
	},
	gothita: {
		dexId: 574,
		types: ['psychic'],
		encounterOptions: [],
	},
	gothorita: {
		dexId: 575,
		types: ['psychic'],
		encounterOptions: [],
	},
	gothitelle: {
		dexId: 576,
		types: ['psychic'],
		encounterOptions: [],
	},
	solosis: {
		dexId: 577,
		types: ['psychic'],
		encounterOptions: [],
	},
	duosion: {
		dexId: 578,
		types: ['psychic'],
		encounterOptions: [],
	},
	reuniclus: {
		dexId: 579,
		types: ['psychic'],
		encounterOptions: [],
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
	},
	swanna: {
		dexId: 581,
		types: ['water', 'flying'],
		encounterOptions: [],
	},
	vanillite: {
		dexId: 582,
		types: ['ice'],
		encounterOptions: [],
	},
	vanillish: {
		dexId: 583,
		types: ['ice'],
		encounterOptions: [],
	},
	vanilluxe: {
		dexId: 584,
		types: ['ice'],
		encounterOptions: [],
	},
	deerling: {
		dexId: 585,
		types: ['normal', 'grass'],
		encounterOptions: [],
	},
	sawsbuck: {
		dexId: 586,
		types: ['normal', 'grass'],
		encounterOptions: [],
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
	},
	karrablast: {
		dexId: 588,
		types: ['bug'],
		encounterOptions: [],
	},
	escavalier: {
		dexId: 589,
		types: ['bug', 'steel'],
		encounterOptions: [],
	},
	foongus: {
		dexId: 590,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	amoonguss: {
		dexId: 591,
		swarm: 'STRONG',
		types: ['grass', 'poison'],
		encounterOptions: [],
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
	},
	alomomola: {
		dexId: 594,
		types: ['water'],
		encounterOptions: [],
	},
	joltik: {
		dexId: 595,
		types: ['bug', 'electric'],
		encounterOptions: [],
	},
	galvantula: {
		dexId: 596,
		types: ['bug', 'electric'],
		encounterOptions: [],
	},
	ferroseed: {
		dexId: 597,
		types: ['grass', 'steel'],
		encounterOptions: [],
	},
	ferrothorn: {
		dexId: 598,
		types: ['grass', 'steel'],
		encounterOptions: [],
	},
	klink: {
		dexId: 599,
		types: ['steel'],
		encounterOptions: [],
	},
	klang: {
		dexId: 600,
		types: ['steel'],
		encounterOptions: [],
	},
	klinklang: {
		dexId: 601,
		types: ['steel'],
		encounterOptions: [],
	},
	tynamo: {
		dexId: 602,
		types: ['electric'],
		encounterOptions: [],
	},
	eelektrik: {
		dexId: 603,
		types: ['electric'],
		encounterOptions: [],
	},
	eelektross: {
		dexId: 604,
		types: ['electric'],
		encounterOptions: [],
	},
	elgyem: {
		dexId: 605,
		types: ['psychic'],
		encounterOptions: [],
	},
	beheeyem: {
		dexId: 606,
		types: ['psychic'],
		encounterOptions: [],
	},
	litwick: {
		dexId: 607,
		types: ['ghost', 'fire'],
		encounterOptions: [],
	},
	lampent: {
		dexId: 608,
		types: ['ghost', 'fire'],
		encounterOptions: [],
	},
	chandelure: {
		dexId: 609,
		types: ['ghost', 'fire'],
		encounterOptions: [],
	},
	axew: {
		dexId: 610,
		types: ['dragon'],
		encounterOptions: [],
	},
	fraxure: {
		dexId: 611,
		types: ['dragon'],
		encounterOptions: [],
	},
	haxorus: {
		dexId: 612,
		types: ['dragon'],
		encounterOptions: [],
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
	},
	beartic: {
		dexId: 614,
		rampager: true,
		types: ['ice'],
		encounterOptions: [],
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
	},
	accelgor: {
		dexId: 617,
		types: ['bug'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	stunfisk: {
		dexId: 618,
		types: ['ground', 'electric'],
		underRock: true,
		encounterOptions: [],
	},
	mienfoo: {
		dexId: 619,
		types: ['fighting'],
		encounterOptions: [],
	},
	mienshao: {
		dexId: 620,
		types: ['fighting'],
		encounterOptions: [],
	},
	druddigon: {
		dexId: 621,
		types: ['dragon'],
		encounterOptions: [],
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
	},
	golurk: {
		dexId: 623,
		types: ['ground', 'ghost'],
		encounterOptions: [],
	},
	pawniard: {
		dexId: 624,
		types: ['dark', 'steel'],
		encounterOptions: [],
	},
	bisharp: {
		dexId: 625,
		types: ['dark', 'steel'],
		encounterOptions: [],
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
	},
	braviary: {
		dexId: 628,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	vullaby: {
		dexId: 629,
		types: ['dark', 'flying'],
		encounterOptions: [],
	},
	mandibuzz: {
		dexId: 630,
		types: ['dark', 'flying'],
		encounterOptions: [],
	},
	heatmor: {
		dexId: 631,
		types: ['fire'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	durant: {
		dexId: 632,
		types: ['bug', 'steel'],
		encounterOptions: [],
	},
	deino: {
		dexId: 633,
		types: ['dark', 'dragon'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	zweilous: {
		dexId: 634,
		swarm: 'STRONG',
		types: ['dark', 'dragon'],
		encounterOptions: [],
	},
	hydreigon: {
		dexId: 635,
		types: ['dark', 'dragon'],
		encounterOptions: [],
	},
	larvesta: {
		dexId: 636,
		types: ['bug', 'fire'],
		encounterOptions: [],
	},
	volcarona: {
		dexId: 637,
		swarm: 'STRONG',
		types: ['bug', 'fire'],
		encounterOptions: [],
	},
	cobalion: {
		dexId: 638,
		types: ['steel', 'fighting'],
		encounterOptions: [],
	},
	terrakion: {
		dexId: 639,
		types: ['rock', 'fighting'],
		encounterOptions: [],
	},
	virizion: {
		dexId: 640,
		types: ['grass', 'fighting'],
		encounterOptions: [],
	},
	'tornadus-incarnate': {
		dexId: 641,
		types: ['flying'],
		encounterOptions: [],
	},
	'thundurus-incarnate': {
		dexId: 642,
		types: ['electric', 'flying'],
		encounterOptions: [],
	},
	reshiram: {
		dexId: 643,
		types: ['dragon', 'fire'],
		encounterOptions: [],
	},
	zekrom: {
		dexId: 644,
		types: ['dragon', 'electric'],
		encounterOptions: [],
	},
	'landorus-incarnate': {
		dexId: 645,
		types: ['ground', 'flying'],
		encounterOptions: [],
	},
	kyurem: {
		dexId: 646,
		types: ['dragon', 'ice'],
		encounterOptions: [],
	},
	'keldeo-ordinary': {
		dexId: 647,
		types: ['water', 'fighting'],
		encounterOptions: [],
	},
	'meloetta-aria': {
		dexId: 648,
		types: ['normal', 'psychic'],
		encounterOptions: [],
	},
	genesect: {
		dexId: 649,
		types: ['bug', 'steel'],
		encounterOptions: [],
	},
	chespin: {
		dexId: 650,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
	},
	quilladin: {
		dexId: 651,
		types: ['grass'],
		encounterOptions: [],
	},
	chesnaught: {
		dexId: 652,
		types: ['grass', 'fighting'],
		encounterOptions: [],
	},
	fennekin: {
		dexId: 653,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
	},
	braixen: {
		dexId: 654,
		types: ['fire'],
		encounterOptions: [],
	},
	delphox: {
		dexId: 655,
		types: ['fire', 'psychic'],
		encounterOptions: [],
	},
	froakie: {
		dexId: 656,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
	},
	frogadier: {
		dexId: 657,
		types: ['water'],
		encounterOptions: [],
	},
	greninja: {
		dexId: 658,
		types: ['water', 'dark'],
		encounterOptions: [],
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
	},
	diggersby: {
		dexId: 660,
		types: ['normal', 'ground'],
		encounterOptions: [],
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
	},
	fletchinder: {
		dexId: 662,
		types: ['fire', 'flying'],
		encounterOptions: [],
	},
	talonflame: {
		dexId: 663,
		types: ['fire', 'flying'],
		encounterOptions: [],
	},
	scatterbug: {
		dexId: 664,
		types: ['bug'],
		encounterOptions: [],
	},
	spewpa: {
		dexId: 665,
		types: ['bug'],
		encounterOptions: [],
	},
	vivillon: {
		dexId: 666,
		types: ['bug', 'flying'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	litleo: {
		dexId: 667,
		types: ['fire', 'normal'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	pyroar: {
		dexId: 668,
		types: ['fire', 'normal'],
		encounterOptions: [],
	},
	flabebe: {
		dexId: 669,
		types: ['fairy'],
		encounterOptions: [],
	},
	floette: {
		dexId: 670,
		types: ['fairy'],
		encounterOptions: [],
	},
	florges: {
		dexId: 671,
		types: ['fairy'],
		encounterOptions: [],
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
	},
	gogoat: {
		dexId: 673,
		types: ['grass'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
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
	},
	pangoro: {
		dexId: 675,
		rampager: true,
		types: ['fighting', 'dark'],
		encounterOptions: [],
	},
	furfrou: {
		dexId: 676,
		types: ['normal'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	espurr: {
		dexId: 677,
		types: ['psychic'],
		encounterOptions: [],
	},
	'meowstic-male': {
		dexId: 678,
		types: ['psychic'],
		encounterOptions: [],
	},
	honedge: {
		dexId: 679,
		types: ['steel', 'ghost'],
		encounterOptions: [],
	},
	doublade: {
		dexId: 680,
		types: ['steel', 'ghost'],
		encounterOptions: [],
	},
	'aegislash-shield': {
		dexId: 681,
		types: ['steel', 'ghost'],
		encounterOptions: [],
	},
	spritzee: {
		dexId: 682,
		types: ['fairy'],
		encounterOptions: [],
	},
	aromatisse: {
		dexId: 683,
		types: ['fairy'],
		encounterOptions: [],
	},
	swirlix: {
		dexId: 684,
		types: ['fairy'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	slurpuff: {
		dexId: 685,
		types: ['fairy'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	inkay: {
		dexId: 686,
		types: ['dark', 'psychic'],
		encounterOptions: [],
	},
	malamar: {
		dexId: 687,
		types: ['dark', 'psychic'],
		encounterOptions: [],
		rampager: true,
	},
	binacle: {
		dexId: 688,
		types: ['rock', 'water'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	barbaracle: {
		dexId: 689,
		types: ['rock', 'water'],
		encounterOptions: [],
	},
	skrelp: {
		dexId: 690,
		types: ['poison', 'water'],
		encounterOptions: [],
	},
	dragalge: {
		dexId: 691,
		types: ['poison', 'dragon'],
		encounterOptions: [],
	},
	clauncher: {
		dexId: 692,
		types: ['water'],
		encounterOptions: [],
	},
	clawitzer: {
		dexId: 693,
		types: ['water'],
		encounterOptions: [],
	},
	helioptile: {
		dexId: 694,
		types: ['electric', 'normal'],
		encounterOptions: [],
	},
	heliolisk: {
		dexId: 695,
		types: ['electric', 'normal'],
		encounterOptions: [],
	},
	tyrunt: {
		dexId: 696,
		types: ['rock', 'dragon'],
		encounterOptions: [],
	},
	tyrantrum: {
		dexId: 697,
		types: ['rock', 'dragon'],
		encounterOptions: [],
	},
	amaura: {
		dexId: 698,
		types: ['rock', 'ice'],
		encounterOptions: [],
	},
	aurorus: {
		dexId: 699,
		types: ['rock', 'ice'],
		encounterOptions: [],
	},
	sylveon: {
		dexId: 700,
		types: ['fairy'],
		encounterOptions: [],
	},
	hawlucha: {
		dexId: 701,
		types: ['fighting', 'flying'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
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
	},
	carbink: {
		dexId: 703,
		types: ['rock', 'fairy'],
		encounterOptions: [],
	},
	goomy: {
		dexId: 704,
		types: ['dragon'],
		encounterOptions: [],
	},
	sliggoo: {
		dexId: 705,
		types: ['dragon'],
		encounterOptions: [],
	},
	goodra: {
		dexId: 706,
		types: ['dragon'],
		encounterOptions: [],
	},
	klefki: {
		dexId: 707,
		types: ['steel', 'fairy'],
		encounterOptions: [],
	},
	phantump: {
		dexId: 708,
		types: ['ghost', 'grass'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	trevenant: {
		dexId: 709,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	'pumpkaboo-average': {
		dexId: 710,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	'gourgeist-average': {
		dexId: 711,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	bergmite: {
		dexId: 712,
		types: ['ice'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	avalugg: {
		dexId: 713,
		types: ['ice'],
		encounterOptions: [],
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
	},
	noivern: {
		dexId: 715,
		types: ['flying', 'dragon'],
		encounterOptions: [],
	},
	xerneas: {
		dexId: 716,
		types: ['fairy'],
		encounterOptions: [],
	},
	yveltal: {
		dexId: 717,
		types: ['dark', 'flying'],
		encounterOptions: [],
	},
	'zygarde-50': {
		dexId: 718,
		types: ['dragon', 'ground'],
		encounterOptions: [],
	},
	diancie: {
		dexId: 719,
		types: ['rock', 'fairy'],
		encounterOptions: [],
	},
	hoopa: {
		dexId: 720,
		types: ['psychic', 'ghost'],
		encounterOptions: [],
	},
	volcanion: {
		dexId: 721,
		types: ['fire', 'water'],
		encounterOptions: [],
	},
	rowlet: {
		dexId: 722,
		swarm: 'WEAK',
		types: ['grass', 'flying'],
		encounterOptions: [],
	},
	dartrix: {
		dexId: 723,
		types: ['grass', 'flying'],
		encounterOptions: [],
	},
	decidueye: {
		dexId: 724,
		types: ['grass', 'ghost'],
		encounterOptions: [],
	},
	litten: {
		dexId: 725,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
	},
	torracat: {
		dexId: 726,
		types: ['fire'],
		encounterOptions: [],
	},
	incineroar: {
		dexId: 727,
		types: ['fire', 'dark'],
		encounterOptions: [],
	},
	popplio: {
		dexId: 728,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
	},
	brionne: {
		dexId: 729,
		types: ['water'],
		encounterOptions: [],
	},
	primarina: {
		dexId: 730,
		types: ['water', 'fairy'],
		encounterOptions: [],
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
	},
	trumbeak: {
		dexId: 732,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	toucannon: {
		dexId: 733,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	yungoos: {
		dexId: 734,
		types: ['normal'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	gumshoos: {
		dexId: 735,
		types: ['normal'],
		encounterOptions: [],
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
	},
	charjabug: {
		dexId: 737,
		types: ['bug', 'electric'],
		encounterOptions: [],
	},
	vikavolt: {
		dexId: 738,
		types: ['bug', 'electric'],
		encounterOptions: [],
	},
	crabrawler: {
		dexId: 739,
		types: ['fighting'],
		encounterOptions: [],
	},
	crabominable: {
		dexId: 740,
		types: ['fighting', 'ice'],
		encounterOptions: [],
	},
	'oricorio-baile': {
		dexId: 741,
		types: ['fire', 'flying'],
		encounterOptions: [],
	},
	cutiefly: {
		dexId: 742,
		types: ['bug', 'fairy'],
		encounterOptions: [],
	},
	ribombee: {
		dexId: 743,
		types: ['bug', 'fairy'],
		encounterOptions: [],
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
	},
	'lycanroc-midday': {
		dexId: 745,
		types: ['rock'],
		encounterOptions: [],
	},
	'wishiwashi-solo': {
		dexId: 746,
		types: ['water'],
		encounterOptions: [],
	},
	mareanie: {
		dexId: 747,
		types: ['poison', 'water'],
		encounterOptions: [],
	},
	toxapex: {
		dexId: 748,
		types: ['poison', 'water'],
		encounterOptions: [],
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
	},
	mudsdale: {
		dexId: 750,
		types: ['ground'],
		encounterOptions: [],
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
	},
	fomantis: {
		dexId: 753,
		types: ['grass'],
		encounterOptions: [],
	},
	lurantis: {
		dexId: 754,
		types: ['grass'],
		encounterOptions: [],
	},
	morelull: {
		dexId: 755,
		types: ['grass', 'fairy'],
		encounterOptions: [],
	},
	shiinotic: {
		dexId: 756,
		types: ['grass', 'fairy'],
		encounterOptions: [],
	},
	salandit: {
		dexId: 757,
		types: ['poison', 'fire'],
		encounterOptions: [],
	},
	salazzle: {
		dexId: 758,
		types: ['poison', 'fire'],
		encounterOptions: [],
	},
	stufful: {
		dexId: 759,
		types: ['normal', 'fighting'],
		encounterOptions: [],
	},
	bewear: {
		dexId: 760,
		types: ['normal', 'fighting'],
		encounterOptions: [],
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
	},
	steenee: {
		dexId: 762,
		types: ['grass'],
		encounterOptions: [],
	},
	tsareena: {
		dexId: 763,
		types: ['grass'],
		encounterOptions: [],
	},
	comfey: {
		dexId: 764,
		types: ['fairy'],
		encounterOptions: [],
	},
	oranguru: {
		dexId: 765,
		rampager: true,
		types: ['normal', 'psychic'],
		encounterOptions: [],
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
	},
	wimpod: {
		dexId: 767,
		types: ['bug', 'water'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	golisopod: {
		dexId: 768,
		types: ['bug', 'water'],
		encounterOptions: [],
	},
	sandygast: {
		dexId: 769,
		types: ['ghost', 'ground'],
		encounterOptions: [],
	},
	palossand: {
		dexId: 770,
		types: ['ghost', 'ground'],
		encounterOptions: [],
	},
	pyukumuku: {
		dexId: 771,
		types: ['water'],
		encounterOptions: [],
	},
	'type-null': {
		dexId: 772,
		types: ['normal'],
		encounterOptions: [],
	},
	silvally: {
		dexId: 773,
		types: ['normal'],
		encounterOptions: [],
	},
	'minior-red-meteor': {
		dexId: 774,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	komala: {
		dexId: 775,
		types: ['normal'],
		encounterOptions: [],
	},
	turtonator: {
		dexId: 776,
		types: ['fire', 'dragon'],
		encounterOptions: [],
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
	},
	'mimikyu-disguised': {
		dexId: 778,
		types: ['ghost', 'fairy'],
		encounterOptions: [],
	},
	bruxish: {
		dexId: 779,
		types: ['water', 'psychic'],
		encounterOptions: [],
	},
	drampa: {
		dexId: 780,
		types: ['normal', 'dragon'],
		encounterOptions: [],
	},
	dhelmise: {
		dexId: 781,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	'jangmo-o': {
		dexId: 782,
		types: ['dragon'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	'hakamo-o': {
		dexId: 783,
		types: ['dragon', 'fighting'],
		encounterOptions: [],
	},
	'kommo-o': {
		dexId: 784,
		rampager: true,
		types: ['dragon', 'fighting'],
		encounterOptions: [],
	},
	'tapu-koko': {
		dexId: 785,
		types: ['electric', 'fairy'],
		encounterOptions: [],
	},
	'tapu-lele': {
		dexId: 786,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
	},
	'tapu-bulu': {
		dexId: 787,
		types: ['grass', 'fairy'],
		encounterOptions: [],
	},
	'tapu-fini': {
		dexId: 788,
		types: ['water', 'fairy'],
		encounterOptions: [],
	},
	cosmog: {
		dexId: 789,
		types: ['psychic'],
		encounterOptions: [],
	},
	cosmoem: {
		dexId: 790,
		types: ['psychic'],
		encounterOptions: [],
	},
	solgaleo: {
		dexId: 791,
		types: ['psychic', 'steel'],
		encounterOptions: [],
	},
	lunala: {
		dexId: 792,
		types: ['psychic', 'ghost'],
		encounterOptions: [],
	},
	nihilego: {
		dexId: 793,
		swarm: 'SPACE_DISTORTION',
		types: ['rock', 'poison'],
		encounterOptions: [],
	},
	buzzwole: {
		dexId: 794,
		swarm: 'SPACE_DISTORTION',
		types: ['bug', 'fighting'],
		encounterOptions: [],
	},
	pheromosa: {
		dexId: 795,
		swarm: 'SPACE_DISTORTION',
		types: ['bug', 'fighting'],
		encounterOptions: [],
	},
	xurkitree: {
		dexId: 796,
		swarm: 'SPACE_DISTORTION',
		types: ['electric'],
		encounterOptions: [],
	},
	celesteela: {
		dexId: 797,
		swarm: 'SPACE_DISTORTION',
		types: ['steel', 'flying'],
		encounterOptions: [],
	},
	kartana: {
		dexId: 798,
		swarm: 'SPACE_DISTORTION',
		types: ['grass', 'steel'],
		encounterOptions: [],
	},
	guzzlord: {
		dexId: 799,
		swarm: 'SPACE_DISTORTION',
		types: ['dark', 'dragon'],
		encounterOptions: [],
	},
	necrozma: {
		dexId: 800,
		types: ['psychic'],
		encounterOptions: [],
	},
	magearna: {
		dexId: 801,
		types: ['steel', 'fairy'],
		encounterOptions: [],
	},
	marshadow: {
		dexId: 802,
		types: ['fighting', 'ghost'],
		encounterOptions: [],
	},
	poipole: {
		dexId: 803,
		swarm: 'SPACE_DISTORTION',
		types: ['poison'],
		encounterOptions: [],
	},
	naganadel: {
		dexId: 804,
		types: ['poison', 'dragon'],
		encounterOptions: [],
	},
	stakataka: {
		dexId: 805,
		swarm: 'SPACE_DISTORTION',
		types: ['rock', 'steel'],
		encounterOptions: [],
	},
	blacephalon: {
		dexId: 806,
		swarm: 'SPACE_DISTORTION',
		types: ['fire', 'ghost'],
		encounterOptions: [],
	},
	zeraora: {
		dexId: 807,
		types: ['electric'],
		encounterOptions: [],
	},
	meltan: {
		dexId: 808,
		types: ['steel'],
		encounterOptions: [],
	},
	melmetal: {
		dexId: 809,
		types: ['steel'],
		encounterOptions: [],
	},
	grookey: {
		dexId: 810,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
	},
	thwackey: {
		dexId: 811,
		types: ['grass'],
		encounterOptions: [],
	},
	rillaboom: {
		dexId: 812,
		types: ['grass'],
		encounterOptions: [],
	},
	scorbunny: {
		dexId: 813,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
	},
	raboot: {
		dexId: 814,
		types: ['fire'],
		encounterOptions: [],
	},
	cinderace: {
		dexId: 815,
		types: ['fire'],
		encounterOptions: [],
	},
	sobble: {
		dexId: 816,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
	},
	drizzile: {
		dexId: 817,
		types: ['water'],
		encounterOptions: [],
	},
	inteleon: {
		dexId: 818,
		types: ['water'],
		encounterOptions: [],
	},
	skwovet: {
		dexId: 819,
		types: ['normal'],
		encounterOptions: [],
	},
	greedent: {
		dexId: 820,
		types: ['normal'],
		encounterOptions: [],
	},
	rookidee: {
		dexId: 821,
		types: ['flying'],
		encounterOptions: [],
	},
	corvisquire: {
		dexId: 822,
		types: ['flying'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	corviknight: {
		dexId: 823,
		types: ['flying', 'steel'],
		encounterOptions: [],
	},
	blipbug: {
		dexId: 824,
		types: ['bug'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	dottler: {
		dexId: 825,
		types: ['bug', 'psychic'],
		encounterOptions: [],
	},
	orbeetle: {
		dexId: 826,
		types: ['bug', 'psychic'],
		encounterOptions: [],
	},
	nickit: {
		dexId: 827,
		types: ['dark'],
		encounterOptions: [],
	},
	thievul: {
		dexId: 828,
		types: ['dark'],
		encounterOptions: [],
	},
	gossifleur: {
		dexId: 829,
		types: ['grass'],
		encounterOptions: [],
	},
	eldegoss: {
		dexId: 830,
		types: ['grass'],
		encounterOptions: [],
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
	},
	dubwool: {
		dexId: 832,
		types: ['normal'],
		encounterOptions: [],
	},
	chewtle: {
		dexId: 833,
		types: ['water'],
		encounterOptions: [],
	},
	drednaw: {
		dexId: 834,
		types: ['water', 'rock'],
		encounterOptions: [],
	},
	yamper: {
		dexId: 835,
		berryLureMapId: 'routeS1E1',
		types: ['electric'],
		encounterOptions: [],
	},
	boltund: {
		dexId: 836,
		types: ['electric'],
		encounterOptions: [],
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
	},
	carkol: {
		dexId: 838,
		types: ['rock', 'fire'],
		encounterOptions: [],
	},
	coalossal: {
		dexId: 839,
		types: ['rock', 'fire'],
		encounterOptions: [],
	},
	applin: {
		dexId: 840,
		types: ['grass', 'dragon'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	flapple: {
		dexId: 841,
		types: ['grass', 'dragon'],
		encounterOptions: [],
	},
	appletun: {
		dexId: 842,
		types: ['grass', 'dragon'],
		encounterOptions: [],
	},
	silicobra: {
		dexId: 843,
		types: ['ground'],
		encounterOptions: [],
	},
	sandaconda: {
		dexId: 844,
		types: ['ground'],
		encounterOptions: [],
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
	},
	arrokuda: {
		dexId: 846,
		types: ['water'],
		encounterOptions: [],
	},
	barraskewda: {
		dexId: 847,
		types: ['water'],
		encounterOptions: [],
	},
	toxel: {
		dexId: 848,
		types: ['electric', 'poison'],
		encounterOptions: [],
	},
	'toxtricity-amped': {
		dexId: 849,
		types: ['electric', 'poison'],
		encounterOptions: [],
	},
	sizzlipede: {
		dexId: 850,
		types: ['fire', 'bug'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	centiskorch: {
		dexId: 851,
		types: ['fire', 'bug'],
		encounterOptions: [],
	},
	clobbopus: {
		dexId: 852,
		types: ['fighting'],
		encounterOptions: [],
	},
	grapploct: {
		dexId: 853,
		types: ['fighting'],
		encounterOptions: [],
	},
	sinistea: {
		dexId: 854,
		types: ['ghost'],
		encounterOptions: [],
	},
	polteageist: {
		dexId: 855,
		types: ['ghost'],
		encounterOptions: [],
	},
	hatenna: {
		dexId: 856,
		types: ['psychic'],
		encounterOptions: [],
	},
	hattrem: {
		dexId: 857,
		types: ['psychic'],
		encounterOptions: [],
	},
	hatterene: {
		dexId: 858,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
	},
	impidimp: {
		dexId: 859,
		types: ['dark', 'fairy'],
		encounterOptions: [],
	},
	morgrem: {
		dexId: 860,
		types: ['dark', 'fairy'],
		encounterOptions: [],
	},
	grimmsnarl: {
		dexId: 861,
		types: ['dark', 'fairy'],
		encounterOptions: [],
	},
	obstagoon: {
		dexId: 862,
		types: ['dark', 'normal'],
		encounterOptions: [],
	},
	perrserker: {
		dexId: 863,
		types: ['steel'],
		encounterOptions: [],
	},
	cursola: {
		dexId: 864,
		types: ['ghost'],
		encounterOptions: [],
	},
	sirfetchd: {
		dexId: 865,
		types: ['fighting'],
		encounterOptions: [],
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
	},
	runerigus: {
		dexId: 867,
		types: ['ground', 'ghost'],
		encounterOptions: [],
	},
	milcery: {
		dexId: 868,
		types: ['fairy'],
		encounterOptions: [],
	},
	alcremie: {
		dexId: 869,
		types: ['fairy'],
		encounterOptions: [],
	},
	falinks: {
		dexId: 870,
		types: ['fighting'],
		encounterOptions: [],
	},
	pincurchin: {
		dexId: 871,
		types: ['electric'],
		encounterOptions: [],
	},
	snom: {
		dexId: 872,
		types: ['ice', 'bug'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	frosmoth: {
		dexId: 873,
		types: ['ice', 'bug'],
		encounterOptions: [],
	},
	stonjourner: {
		dexId: 874,
		types: ['rock'],
		encounterOptions: [],
	},
	'eiscue-ice': {
		dexId: 875,
		types: ['ice'],
		encounterOptions: [],
	},
	'indeedee-male': {
		dexId: 876,
		types: ['psychic', 'normal'],
		encounterOptions: [],
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
	},
	cufant: {
		dexId: 878,
		types: ['steel'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	copperajah: {
		dexId: 879,
		types: ['steel'],
		encounterOptions: [],
	},
	dracozolt: {
		dexId: 880,
		types: ['electric', 'dragon'],
		encounterOptions: [],
	},
	arctozolt: {
		dexId: 881,
		types: ['electric', 'ice'],
		encounterOptions: [],
	},
	dracovish: {
		dexId: 882,
		types: ['water', 'dragon'],
		encounterOptions: [],
	},
	arctovish: {
		dexId: 883,
		types: ['water', 'ice'],
		encounterOptions: [],
	},
	duraludon: {
		dexId: 884,
		types: ['steel', 'dragon'],
		encounterOptions: [],
	},
	dreepy: {
		dexId: 885,
		types: ['dragon', 'ghost'],
		encounterOptions: [],
	},
	drakloak: {
		dexId: 886,
		types: ['dragon', 'ghost'],
		encounterOptions: [],
	},
	dragapult: {
		dexId: 887,
		types: ['dragon', 'ghost'],
		encounterOptions: [],
	},
	zacian: {
		dexId: 888,
		types: ['fairy'],
		encounterOptions: [],
	},
	zamazenta: {
		dexId: 889,
		types: ['fighting'],
		encounterOptions: [],
	},
	eternatus: {
		dexId: 890,
		types: ['poison', 'dragon'],
		encounterOptions: [],
	},
	kubfu: {
		dexId: 891,
		types: ['fighting'],
		encounterOptions: [],
	},
	'urshifu-single-strike': {
		dexId: 892,
		types: ['fighting', 'dark'],
		encounterOptions: [],
	},
	zarude: {
		dexId: 893,
		types: ['dark', 'grass'],
		encounterOptions: [],
	},
	regieleki: {
		dexId: 894,
		types: ['electric'],
		encounterOptions: [],
	},
	regidrago: {
		dexId: 895,
		types: ['dragon'],
		encounterOptions: [],
	},
	glastrier: {
		dexId: 896,
		types: ['ice'],
		encounterOptions: [],
	},
	spectrier: {
		dexId: 897,
		types: ['ghost'],
		encounterOptions: [],
	},
	calyrex: {
		dexId: 898,
		types: ['psychic', 'grass'],
		encounterOptions: [],
	},
	wyrdeer: {
		dexId: 899,
		types: ['normal', 'psychic'],
		encounterOptions: [],
	},
	kleavor: {
		dexId: 900,
		types: ['bug', 'rock'],
		encounterOptions: [],
	},
	ursaluna: {
		dexId: 901,
		types: ['ground', 'normal'],
		encounterOptions: [],
	},
	'basculegion-male': {
		dexId: 902,
		types: ['water', 'ghost'],
		encounterOptions: [],
	},
	sneasler: {
		dexId: 903,
		types: ['fighting', 'poison'],
		encounterOptions: [],
	},
	overqwil: {
		dexId: 904,
		types: ['dark', 'poison'],
		encounterOptions: [],
	},
	'enamorus-incarnate': {
		dexId: 905,
		types: ['fairy', 'flying'],
		encounterOptions: [],
	},
	sprigatito: {
		dexId: 906,
		swarm: 'WEAK',
		types: ['grass'],
		encounterOptions: [],
	},
	floragato: {
		dexId: 907,
		types: ['grass'],
		encounterOptions: [],
	},
	meowscarada: {
		dexId: 908,
		types: ['grass', 'dark'],
		encounterOptions: [],
	},
	fuecoco: {
		dexId: 909,
		swarm: 'WEAK',
		types: ['fire'],
		encounterOptions: [],
	},
	crocalor: {
		dexId: 910,
		types: ['fire'],
		encounterOptions: [],
	},
	skeledirge: {
		dexId: 911,
		types: ['fire', 'ghost'],
		encounterOptions: [],
	},
	quaxly: {
		dexId: 912,
		swarm: 'WEAK',
		types: ['water'],
		encounterOptions: [],
	},
	quaxwell: {
		dexId: 913,
		types: ['water'],
		encounterOptions: [],
	},
	quaquaval: {
		dexId: 914,
		types: ['water', 'fighting'],
		encounterOptions: [],
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
	},
	'oinkologne-male': {
		dexId: 916,
		types: ['normal'],
		encounterOptions: [],
	},
	tarountula: {
		dexId: 917,
		types: ['bug'],
		encounterOptions: [],
	},
	spidops: {
		dexId: 918,
		types: ['bug'],
		encounterOptions: [],
	},
	nymble: {
		dexId: 919,
		types: ['bug'],
		encounterOptions: [],
	},
	lokix: {
		dexId: 920,
		types: ['bug', 'dark'],
		encounterOptions: [],
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
	},
	pawmo: {
		dexId: 922,
		types: ['electric', 'fighting'],
		encounterOptions: [],
	},
	pawmot: {
		dexId: 923,
		types: ['electric', 'fighting'],
		encounterOptions: [],
	},
	tandemaus: {
		dexId: 924,
		types: ['normal'],
		encounterOptions: [],
	},
	'maushold-family-of-four': {
		dexId: 925,
		types: ['normal'],
		encounterOptions: [],
	},
	fidough: {
		dexId: 926,
		types: ['fairy'],
		encounterOptions: [],
	},
	dachsbun: {
		dexId: 927,
		types: ['fairy'],
		encounterOptions: [],
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
	},
	dolliv: {
		dexId: 929,
		types: ['grass', 'normal'],
		encounterOptions: [],
	},
	arboliva: {
		dexId: 930,
		types: ['grass', 'normal'],
		encounterOptions: [],
	},
	'squawkabilly-green-plumage': {
		dexId: 931,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	nacli: {
		dexId: 932,
		types: ['rock'],
		underRock: true,
		encounterOptions: [],
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
	},
	garganacl: {
		dexId: 934,
		types: ['rock'],
		encounterOptions: [],
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
	},
	armarouge: {
		dexId: 936,
		types: ['fire', 'psychic'],
		encounterOptions: [],
	},
	ceruledge: {
		dexId: 937,
		types: ['fire', 'ghost'],
		encounterOptions: [],
	},
	tadbulb: {
		dexId: 938,
		types: ['electric'],
		encounterOptions: [],
	},
	bellibolt: {
		dexId: 939,
		types: ['electric'],
		encounterOptions: [],
	},
	wattrel: {
		dexId: 940,
		types: ['electric', 'flying'],
		encounterOptions: [],
	},
	kilowattrel: {
		dexId: 941,
		types: ['electric', 'flying'],
		encounterOptions: [],
	},
	maschiff: {
		dexId: 942,
		types: ['dark'],
		encounterOptions: [],
	},
	mabosstiff: {
		dexId: 943,
		types: ['dark'],
		encounterOptions: [],
	},
	shroodle: {
		dexId: 944,
		types: ['poison', 'normal'],
		encounterOptions: [],
	},
	grafaiai: {
		dexId: 945,
		types: ['poison', 'normal'],
		encounterOptions: [],
	},
	bramblin: {
		dexId: 946,
		types: ['grass', 'ghost'],
		encounterOptions: [],
	},
	brambleghast: {
		dexId: 947,
		types: ['grass', 'ghost'],
		encounterOptions: [],
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
	},
	toedscruel: {
		dexId: 949,
		types: ['ground', 'grass'],
		encounterOptions: [],
	},
	klawf: {
		dexId: 950,
		types: ['rock'],
		underRock: true,
		encounterOptions: [],
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
	},
	scovillain: {
		dexId: 952,
		types: ['grass', 'fire'],
		encounterOptions: [],
	},
	rellor: {
		dexId: 953,
		types: ['bug'],
		encounterOptions: [],
	},
	rabsca: {
		dexId: 954,
		types: ['bug', 'psychic'],
		encounterOptions: [],
	},
	flittle: {
		dexId: 955,
		types: ['psychic'],
		encounterOptions: [],
	},
	espathra: {
		dexId: 956,
		types: ['psychic'],
		encounterOptions: [],
	},
	tinkatink: {
		dexId: 957,
		types: ['fairy', 'steel'],
		encounterOptions: [],
	},
	tinkatuff: {
		dexId: 958,
		types: ['fairy', 'steel'],
		encounterOptions: [],
	},
	tinkaton: {
		dexId: 959,
		types: ['fairy', 'steel'],
		encounterOptions: [],
	},
	wiglett: {
		dexId: 960,
		types: ['water'],
		encounterOptions: [],
	},
	wugtrio: {
		dexId: 961,
		types: ['water'],
		encounterOptions: [],
	},
	bombirdier: {
		dexId: 962,
		types: ['flying', 'dark'],
		encounterOptions: [],
	},
	finizen: {
		dexId: 963,
		types: ['water'],
		encounterOptions: [],
	},
	'palafin-zero': {
		dexId: 964,
		types: ['water'],
		encounterOptions: [],
	},
	varoom: {
		dexId: 965,
		types: ['steel', 'poison'],
		encounterOptions: [],
	},
	revavroom: {
		dexId: 966,
		types: ['steel', 'poison'],
		encounterOptions: [],
	},
	cyclizar: {
		dexId: 967,
		swarm: 'STRONG',
		types: ['dragon', 'normal'],
		encounterOptions: [],
	},
	orthworm: {
		dexId: 968,
		types: ['steel'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
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
	},
	houndstone: {
		dexId: 972,
		types: ['ghost'],
		encounterOptions: [],
	},
	flamigo: {
		dexId: 973,
		types: ['flying', 'fighting'],
		encounterOptions: [],
	},
	cetoddle: {
		dexId: 974,
		types: ['ice'],
		encounterOptions: [],
	},
	cetitan: {
		dexId: 975,
		types: ['ice'],
		encounterOptions: [],
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
	},
	dondozo: {
		dexId: 977,
		types: ['water'],
		encounterOptions: [],
	},
	'tatsugiri-curly': {
		dexId: 978,
		types: ['dragon', 'water'],
		encounterOptions: [],
	},
	annihilape: {
		dexId: 979,
		types: ['fighting', 'ghost'],
		encounterOptions: [],
	},
	clodsire: {
		dexId: 980,
		types: ['poison', 'ground'],
		encounterOptions: [],
	},
	farigiraf: {
		dexId: 981,
		types: ['normal', 'psychic'],
		encounterOptions: [],
	},
	'dudunsparce-two-segment': {
		dexId: 982,
		types: ['normal'],
		encounterOptions: [],
	},
	kingambit: {
		dexId: 983,
		types: ['dark', 'steel'],
		encounterOptions: [],
	},
	'great-tusk': {
		dexId: 984,
		swarm: 'PAST_DISTORTION',
		types: ['ground', 'fighting'],
		encounterOptions: [],
	},
	'scream-tail': {
		dexId: 985,
		swarm: 'PAST_DISTORTION',
		types: ['fairy', 'psychic'],
		encounterOptions: [],
	},
	'brute-bonnet': {
		dexId: 986,
		swarm: 'PAST_DISTORTION',
		types: ['grass', 'dark'],
		encounterOptions: [],
	},
	'flutter-mane': {
		dexId: 987,
		swarm: 'PAST_DISTORTION',
		types: ['ghost', 'fairy'],
		encounterOptions: [],
	},
	'slither-wing': {
		dexId: 988,
		swarm: 'PAST_DISTORTION',
		types: ['bug', 'fighting'],
		encounterOptions: [],
	},
	'sandy-shocks': {
		dexId: 989,
		swarm: 'PAST_DISTORTION',
		types: ['electric', 'ground'],
		encounterOptions: [],
	},
	'iron-treads': {
		dexId: 990,
		swarm: 'FUTURE_DISTORTION',
		types: ['ground', 'steel'],
		encounterOptions: [],
	},
	'iron-bundle': {
		dexId: 991,
		swarm: 'FUTURE_DISTORTION',
		types: ['ice', 'water'],
		encounterOptions: [],
	},
	'iron-hands': {
		dexId: 992,
		swarm: 'FUTURE_DISTORTION',
		types: ['fighting', 'electric'],
		encounterOptions: [],
	},
	'iron-jugulis': {
		dexId: 993,
		swarm: 'FUTURE_DISTORTION',
		types: ['dark', 'flying'],
		encounterOptions: [],
	},
	'iron-moth': {
		dexId: 994,
		swarm: 'FUTURE_DISTORTION',
		types: ['fire', 'poison'],
		encounterOptions: [],
	},
	'iron-thorns': {
		dexId: 995,
		swarm: 'FUTURE_DISTORTION',
		types: ['rock', 'electric'],
		encounterOptions: [],
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
	},
	baxcalibur: {
		dexId: 998,
		types: ['dragon', 'ice'],
		encounterOptions: [],
	},
	gimmighoul: {
		dexId: 999,
		types: ['ghost'],
		encounterOptions: [],
	},
	gholdengo: {
		dexId: 1000,
		types: ['steel', 'ghost'],
		encounterOptions: [],
	},
	'wo-chien': {
		dexId: 1001,
		types: ['dark', 'grass'],
		encounterOptions: [],
	},
	'chien-pao': {
		dexId: 1002,
		types: ['dark', 'ice'],
		encounterOptions: [],
	},
	'ting-lu': {
		dexId: 1003,
		types: ['dark', 'ground'],
		encounterOptions: [],
	},
	'chi-yu': {
		dexId: 1004,
		types: ['dark', 'fire'],
		encounterOptions: [],
	},
	'roaring-moon': {
		dexId: 1005,
		swarm: 'PAST_DISTORTION',
		types: ['dragon', 'dark'],
		encounterOptions: [],
	},
	'iron-valiant': {
		dexId: 1006,
		swarm: 'FUTURE_DISTORTION',
		types: ['fairy', 'fighting'],
		encounterOptions: [],
	},
	koraidon: {
		dexId: 1007,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
	},
	miraidon: {
		dexId: 1008,
		types: ['electric', 'dragon'],
		encounterOptions: [],
	},
	'walking-wake': {
		dexId: 1009,
		types: ['water', 'dragon'],
		encounterOptions: [],
	},
	'iron-leaves': {
		dexId: 1010,
		types: ['grass', 'psychic'],
		encounterOptions: [],
	},
	dipplin: {
		dexId: 1011,
		types: ['grass', 'dragon'],
		encounterOptions: [],
	},
	poltchageist: {
		dexId: 1012,
		types: ['grass', 'ghost'],
		encounterOptions: [],
	},
	sinistcha: {
		dexId: 1013,
		types: ['grass', 'ghost'],
		encounterOptions: [],
	},
	okidogi: {
		dexId: 1014,
		types: ['poison', 'fighting'],
		encounterOptions: [],
	},
	munkidori: {
		dexId: 1015,
		types: ['poison', 'psychic'],
		encounterOptions: [],
	},
	fezandipiti: {
		dexId: 1016,
		types: ['poison', 'fairy'],
		encounterOptions: [],
	},
	ogerpon: {
		dexId: 1017,
		types: ['grass'],
		encounterOptions: [],
	},
	archaludon: {
		dexId: 1018,
		types: ['steel', 'dragon'],
		encounterOptions: [],
	},
	hydrapple: {
		dexId: 1019,
		types: ['grass', 'dragon'],
		encounterOptions: [],
	},
	'gouging-fire': {
		dexId: 1020,
		types: ['fire', 'dragon'],
		encounterOptions: [],
	},
	'raging-bolt': {
		dexId: 1021,
		types: ['electric', 'dragon'],
		encounterOptions: [],
	},
	'iron-boulder': {
		dexId: 1022,
		types: ['rock', 'psychic'],
		encounterOptions: [],
	},
	'iron-crown': {
		dexId: 1023,
		types: ['steel', 'psychic'],
		encounterOptions: [],
	},
	terapagos: {
		dexId: 1024,
		types: ['normal'],
		encounterOptions: [],
	},
	pecharunt: {
		dexId: 1025,
		types: ['poison', 'ghost'],
		encounterOptions: [],
	},
	'deoxys-attack': {
		dexId: 10001,
		types: ['psychic'],
		encounterOptions: [],
	},
	'deoxys-defense': {
		dexId: 10002,
		types: ['psychic'],
		encounterOptions: [],
	},
	'deoxys-speed': {
		dexId: 10003,
		types: ['psychic'],
		encounterOptions: [],
	},
	'wormadam-sandy': {
		dexId: 10004,
		types: ['bug', 'ground'],
		encounterOptions: [],
	},
	'wormadam-trash': {
		dexId: 10005,
		types: ['bug', 'steel'],
		encounterOptions: [],
	},
	'shaymin-sky': {
		dexId: 10006,
		types: ['grass', 'flying'],
		encounterOptions: [],
	},
	'giratina-origin': {
		dexId: 10007,
		types: ['ghost', 'dragon'],
		encounterOptions: [],
	},
	'rotom-heat': {
		dexId: 10008,
		types: ['electric', 'fire'],
		encounterOptions: [],
	},
	'rotom-wash': {
		dexId: 10009,
		types: ['electric', 'water'],
		encounterOptions: [],
	},
	'rotom-frost': {
		dexId: 10010,
		types: ['electric', 'ice'],
		encounterOptions: [],
	},
	'rotom-fan': {
		dexId: 10011,
		types: ['electric', 'flying'],
		encounterOptions: [],
	},
	'rotom-mow': {
		dexId: 10012,
		types: ['electric', 'grass'],
		encounterOptions: [],
	},
	'castform-sunny': {
		dexId: 10013,
		types: ['fire'],
		encounterOptions: [],
	},
	'castform-rainy': {
		dexId: 10014,
		types: ['water'],
		encounterOptions: [],
	},
	'castform-snowy': {
		dexId: 10015,
		types: ['ice'],
		encounterOptions: [],
	},
	'basculin-blue-striped': {
		dexId: 10016,
		types: ['water'],
		encounterOptions: [],
	},
	'darmanitan-zen': {
		dexId: 10017,
		types: ['fire', 'psychic'],
		encounterOptions: [],
	},
	'meloetta-pirouette': {
		dexId: 10018,
		types: ['normal', 'fighting'],
		encounterOptions: [],
	},
	'tornadus-therian': {
		dexId: 10019,
		types: ['flying'],
		encounterOptions: [],
	},
	'thundurus-therian': {
		dexId: 10020,
		types: ['electric', 'flying'],
		encounterOptions: [],
	},
	'landorus-therian': {
		dexId: 10021,
		types: ['ground', 'flying'],
		encounterOptions: [],
	},
	'kyurem-black': {
		dexId: 10022,
		types: ['dragon', 'ice'],
		encounterOptions: [],
	},
	'kyurem-white': {
		dexId: 10023,
		types: ['dragon', 'ice'],
		encounterOptions: [],
	},
	'keldeo-resolute': {
		dexId: 10024,
		types: ['water', 'fighting'],
		encounterOptions: [],
	},
	'meowstic-female': {
		dexId: 10025,
		types: ['psychic'],
		encounterOptions: [],
	},
	'aegislash-blade': {
		dexId: 10026,
		types: ['steel', 'ghost'],
		encounterOptions: [],
	},
	'pumpkaboo-small': {
		dexId: 10027,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	'pumpkaboo-large': {
		dexId: 10028,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	'pumpkaboo-super': {
		dexId: 10029,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	'gourgeist-small': {
		dexId: 10030,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	'gourgeist-large': {
		dexId: 10031,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	'gourgeist-super': {
		dexId: 10032,
		types: ['ghost', 'grass'],
		encounterOptions: [],
	},
	'venusaur-mega': {
		dexId: 10033,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	'charizard-mega-x': {
		dexId: 10034,
		types: ['fire', 'dragon'],
		encounterOptions: [],
	},
	'charizard-mega-y': {
		dexId: 10035,
		types: ['fire', 'flying'],
		encounterOptions: [],
	},
	'blastoise-mega': {
		dexId: 10036,
		types: ['water'],
		encounterOptions: [],
	},
	'alakazam-mega': {
		dexId: 10037,
		types: ['psychic'],
		encounterOptions: [],
	},
	'gengar-mega': {
		dexId: 10038,
		types: ['ghost', 'poison'],
		encounterOptions: [],
	},
	'kangaskhan-mega': {
		dexId: 10039,
		types: ['normal'],
		encounterOptions: [],
	},
	'pinsir-mega': {
		dexId: 10040,
		types: ['bug', 'flying'],
		encounterOptions: [],
	},
	'gyarados-mega': {
		dexId: 10041,
		types: ['water', 'dark'],
		encounterOptions: [],
	},
	'aerodactyl-mega': {
		dexId: 10042,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'mewtwo-mega-x': {
		dexId: 10043,
		types: ['psychic', 'fighting'],
		encounterOptions: [],
	},
	'mewtwo-mega-y': {
		dexId: 10044,
		types: ['psychic'],
		encounterOptions: [],
	},
	'ampharos-mega': {
		dexId: 10045,
		types: ['electric', 'dragon'],
		encounterOptions: [],
	},
	'scizor-mega': {
		dexId: 10046,
		types: ['bug', 'steel'],
		encounterOptions: [],
	},
	'heracross-mega': {
		dexId: 10047,
		types: ['bug', 'fighting'],
		encounterOptions: [],
	},
	'houndoom-mega': {
		dexId: 10048,
		types: ['dark', 'fire'],
		encounterOptions: [],
	},
	'tyranitar-mega': {
		dexId: 10049,
		types: ['rock', 'dark'],
		encounterOptions: [],
	},
	'blaziken-mega': {
		dexId: 10050,
		types: ['fire', 'fighting'],
		encounterOptions: [],
	},
	'gardevoir-mega': {
		dexId: 10051,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
	},
	'mawile-mega': {
		dexId: 10052,
		types: ['steel', 'fairy'],
		encounterOptions: [],
	},
	'aggron-mega': {
		dexId: 10053,
		types: ['steel'],
		encounterOptions: [],
	},
	'medicham-mega': {
		dexId: 10054,
		types: ['fighting', 'psychic'],
		encounterOptions: [],
	},
	'manectric-mega': {
		dexId: 10055,
		types: ['electric'],
		encounterOptions: [],
	},
	'banette-mega': {
		dexId: 10056,
		types: ['ghost'],
		encounterOptions: [],
	},
	'absol-mega': {
		dexId: 10057,
		types: ['dark'],
		encounterOptions: [],
	},
	'garchomp-mega': {
		dexId: 10058,
		types: ['dragon', 'ground'],
		encounterOptions: [],
	},
	'lucario-mega': {
		dexId: 10059,
		types: ['fighting', 'steel'],
		encounterOptions: [],
	},
	'abomasnow-mega': {
		dexId: 10060,
		types: ['grass', 'ice'],
		encounterOptions: [],
	},
	'floette-eternal': {
		dexId: 10061,
		types: ['fairy'],
		encounterOptions: [],
	},
	'latias-mega': {
		dexId: 10062,
		types: ['dragon', 'psychic'],
		encounterOptions: [],
	},
	'latios-mega': {
		dexId: 10063,
		types: ['dragon', 'psychic'],
		encounterOptions: [],
	},
	'swampert-mega': {
		dexId: 10064,
		types: ['water', 'ground'],
		encounterOptions: [],
	},
	'sceptile-mega': {
		dexId: 10065,
		types: ['grass', 'dragon'],
		encounterOptions: [],
	},
	'sableye-mega': {
		dexId: 10066,
		types: ['dark', 'ghost'],
		encounterOptions: [],
	},
	'altaria-mega': {
		dexId: 10067,
		types: ['dragon', 'fairy'],
		encounterOptions: [],
	},
	'gallade-mega': {
		dexId: 10068,
		types: ['psychic', 'fighting'],
		encounterOptions: [],
	},
	'audino-mega': {
		dexId: 10069,
		types: ['normal', 'fairy'],
		encounterOptions: [],
	},
	'sharpedo-mega': {
		dexId: 10070,
		types: ['water', 'dark'],
		encounterOptions: [],
	},
	'slowbro-mega': {
		dexId: 10071,
		types: ['water', 'psychic'],
		encounterOptions: [],
	},
	'steelix-mega': {
		dexId: 10072,
		types: ['steel', 'ground'],
		encounterOptions: [],
	},
	'pidgeot-mega': {
		dexId: 10073,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	'glalie-mega': {
		dexId: 10074,
		types: ['ice'],
		encounterOptions: [],
	},
	'diancie-mega': {
		dexId: 10075,
		types: ['rock', 'fairy'],
		encounterOptions: [],
	},
	'metagross-mega': {
		dexId: 10076,
		types: ['steel', 'psychic'],
		encounterOptions: [],
	},
	'kyogre-primal': {
		dexId: 10077,
		types: ['water'],
		encounterOptions: [],
	},
	'groudon-primal': {
		dexId: 10078,
		types: ['ground', 'fire'],
		encounterOptions: [],
	},
	'rayquaza-mega': {
		dexId: 10079,
		types: ['dragon', 'flying'],
		encounterOptions: [],
	},
	'pikachu-rock-star': {
		dexId: 10080,
		types: ['electric'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	'pikachu-belle': {
		dexId: 10081,
		types: ['electric'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	'pikachu-pop-star': {
		dexId: 10082,
		types: ['electric'],
		berryLureMapId: 'routeE1',
		encounterOptions: [],
	},
	'pikachu-phd': {
		dexId: 10083,
		types: ['electric'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
	},
	'pikachu-libre': {
		dexId: 10084,
		types: ['electric'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	'pikachu-cosplay': {
		dexId: 10085,
		types: ['electric'],
		honey: true,
		encounterOptions: [],
	},
	'hoopa-unbound': {
		dexId: 10086,
		types: ['psychic', 'dark'],
		encounterOptions: [],
	},
	'camerupt-mega': {
		dexId: 10087,
		types: ['fire', 'ground'],
		encounterOptions: [],
	},
	'lopunny-mega': {
		dexId: 10088,
		types: ['normal', 'fighting'],
		encounterOptions: [],
	},
	'salamence-mega': {
		dexId: 10089,
		types: ['dragon', 'flying'],
		encounterOptions: [],
	},
	'beedrill-mega': {
		dexId: 10090,
		types: ['bug', 'poison'],
		encounterOptions: [],
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
	},
	'raticate-alola': {
		dexId: 10092,
		types: ['dark', 'normal'],
		encounterOptions: [],
	},
	'raticate-totem-alola': {
		dexId: 10093,
		types: ['dark', 'normal'],
		encounterOptions: [],
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
	},
	'raichu-alola': {
		dexId: 10100,
		types: ['electric', 'psychic'],
		encounterOptions: [],
	},
	'sandshrew-alola': {
		dexId: 10101,
		types: ['ice', 'steel'],
		encounterOptions: [],
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
	},
	'dugtrio-alola': {
		dexId: 10106,
		types: ['ground', 'steel'],
		encounterOptions: [],
	},
	'meowth-alola': {
		dexId: 10107,
		types: ['dark'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
	},
	'persian-alola': {
		dexId: 10108,
		types: ['dark'],
		encounterOptions: [],
	},
	'geodude-alola': {
		dexId: 10109,
		types: ['rock', 'electric'],
		underRock: true,
		encounterOptions: [],
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
	},
	'golem-alola': {
		dexId: 10111,
		types: ['rock', 'electric'],
		encounterOptions: [],
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
	},
	'muk-alola': {
		dexId: 10113,
		types: ['poison', 'dark'],
		encounterOptions: [],
	},
	'exeggutor-alola': {
		dexId: 10114,
		types: ['grass', 'dragon'],
		encounterOptions: [],
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
	},
	'greninja-battle-bond': {
		dexId: 10116,
		types: ['water', 'dark'],
		encounterOptions: [],
	},
	'greninja-ash': {
		dexId: 10117,
		types: ['water', 'dark'],
		encounterOptions: [],
	},
	'zygarde-10-power-construct': {
		dexId: 10118,
		types: ['dragon', 'ground'],
		encounterOptions: [],
	},
	'zygarde-50-power-construct': {
		dexId: 10119,
		types: ['dragon', 'ground'],
		encounterOptions: [],
	},
	'zygarde-complete': {
		dexId: 10120,
		types: ['dragon', 'ground'],
		encounterOptions: [],
	},
	'gumshoos-totem': {
		dexId: 10121,
		types: ['normal'],
		encounterOptions: [],
	},
	'vikavolt-totem': {
		dexId: 10122,
		types: ['bug', 'electric'],
		encounterOptions: [],
	},
	'oricorio-pom-pom': {
		dexId: 10123,
		types: ['electric', 'flying'],
		encounterOptions: [],
	},
	'oricorio-pau': {
		dexId: 10124,
		types: ['psychic', 'flying'],
		encounterOptions: [],
	},
	'oricorio-sensu': {
		dexId: 10125,
		types: ['ghost', 'flying'],
		encounterOptions: [],
	},
	'lycanroc-midnight': {
		dexId: 10126,
		types: ['rock'],
		rampager: true,
		encounterOptions: [],
	},
	'wishiwashi-school': {
		dexId: 10127,
		types: ['water'],
		encounterOptions: [],
	},
	'lurantis-totem': {
		dexId: 10128,
		types: ['grass'],
		encounterOptions: [],
	},
	'salazzle-totem': {
		dexId: 10129,
		types: ['poison', 'fire'],
		encounterOptions: [],
	},
	'minior-orange-meteor': {
		dexId: 10130,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-yellow-meteor': {
		dexId: 10131,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-green-meteor': {
		dexId: 10132,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-blue-meteor': {
		dexId: 10133,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-indigo-meteor': {
		dexId: 10134,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-violet-meteor': {
		dexId: 10135,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-red': {
		dexId: 10136,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-orange': {
		dexId: 10137,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-yellow': {
		dexId: 10138,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-green': {
		dexId: 10139,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-blue': {
		dexId: 10140,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-indigo': {
		dexId: 10141,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'minior-violet': {
		dexId: 10142,
		types: ['rock', 'flying'],
		encounterOptions: [],
	},
	'mimikyu-busted': {
		dexId: 10143,
		types: ['ghost', 'fairy'],
		encounterOptions: [],
	},
	'mimikyu-totem-disguised': {
		dexId: 10144,
		types: ['ghost', 'fairy'],
		encounterOptions: [],
	},
	'mimikyu-totem-busted': {
		dexId: 10145,
		types: ['ghost', 'fairy'],
		encounterOptions: [],
	},
	'kommo-o-totem': {
		dexId: 10146,
		types: ['dragon', 'fighting'],
		encounterOptions: [],
	},
	'magearna-original': {
		dexId: 10147,
		types: ['steel', 'fairy'],
		encounterOptions: [],
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
	},
	'marowak-totem': {
		dexId: 10149,
		types: ['fire', 'ghost'],
		encounterOptions: [],
	},
	'ribombee-totem': {
		dexId: 10150,
		types: ['bug', 'fairy'],
		encounterOptions: [],
	},
	'rockruff-own-tempo': {
		dexId: 10151,
		types: ['rock'],
		encounterOptions: [],
	},
	'lycanroc-dusk': {
		dexId: 10152,
		types: ['rock'],
		encounterOptions: [],
	},
	'araquanid-totem': {
		dexId: 10153,
		types: ['water', 'bug'],
		encounterOptions: [],
	},
	'togedemaru-totem': {
		dexId: 10154,
		types: ['electric', 'steel'],
		encounterOptions: [],
	},
	'necrozma-dusk': {
		dexId: 10155,
		types: ['psychic', 'steel'],
		encounterOptions: [],
	},
	'necrozma-dawn': {
		dexId: 10156,
		types: ['psychic', 'ghost'],
		encounterOptions: [],
	},
	'necrozma-ultra': {
		dexId: 10157,
		types: ['psychic', 'dragon'],
		encounterOptions: [],
	},
	'pikachu-starter': {
		dexId: 10158,
		types: ['electric'],
		encounterOptions: [],
	},
	'eevee-starter': {
		dexId: 10159,
		types: ['normal'],
		encounterOptions: [],
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
	},
	'meowth-galar': {
		dexId: 10161,
		types: ['steel'],
		berryLureMapId: 'routeN1E1',
		encounterOptions: [],
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
	},
	'rapidash-galar': {
		dexId: 10163,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
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
	},
	'slowbro-galar': {
		dexId: 10165,
		types: ['poison', 'psychic'],
		encounterOptions: [],
	},
	'farfetchd-galar': {
		dexId: 10166,
		types: ['fighting'],
		encounterOptions: [],
	},
	'weezing-galar': {
		dexId: 10167,
		types: ['poison', 'fairy'],
		encounterOptions: [],
	},
	'mr-mime-galar': {
		dexId: 10168,
		types: ['ice', 'psychic'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	'articuno-galar': {
		dexId: 10169,
		types: ['psychic', 'flying'],
		encounterOptions: [],
	},
	'zapdos-galar': {
		dexId: 10170,
		types: ['fighting', 'flying'],
		encounterOptions: [],
	},
	'moltres-galar': {
		dexId: 10171,
		types: ['dark', 'flying'],
		encounterOptions: [],
	},
	'slowking-galar': {
		dexId: 10172,
		types: ['poison', 'psychic'],
		encounterOptions: [],
	},
	'corsola-galar': {
		dexId: 10173,
		types: ['ghost'],
		encounterOptions: [],
	},
	'zigzagoon-galar': {
		dexId: 10174,
		types: ['dark', 'normal'],
		berryLureMapId: 'routeN1',
		encounterOptions: [],
	},
	'linoone-galar': {
		dexId: 10175,
		types: ['dark', 'normal'],
		encounterOptions: [],
	},
	'darumaka-galar': {
		dexId: 10176,
		types: ['ice'],
		encounterOptions: [],
	},
	'darmanitan-galar-standard': {
		dexId: 10177,
		types: ['ice'],
		encounterOptions: [],
	},
	'darmanitan-galar-zen': {
		dexId: 10178,
		types: ['ice', 'fire'],
		encounterOptions: [],
	},
	'yamask-galar': {
		dexId: 10179,
		types: ['ground', 'ghost'],
		encounterOptions: [],
	},
	'stunfisk-galar': {
		dexId: 10180,
		types: ['ground', 'steel'],
		encounterOptions: [],
	},
	'zygarde-10': {
		dexId: 10181,
		types: ['dragon', 'ground'],
		encounterOptions: [],
	},
	'cramorant-gulping': {
		dexId: 10182,
		types: ['flying', 'water'],
		encounterOptions: [],
	},
	'cramorant-gorging': {
		dexId: 10183,
		types: ['flying', 'water'],
		encounterOptions: [],
	},
	'toxtricity-low-key': {
		dexId: 10184,
		types: ['electric', 'poison'],
		encounterOptions: [],
	},
	'eiscue-noice': {
		dexId: 10185,
		types: ['ice'],
		encounterOptions: [],
	},
	'indeedee-female': {
		dexId: 10186,
		types: ['psychic', 'normal'],
		encounterOptions: [],
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
	},
	'zacian-crowned': {
		dexId: 10188,
		types: ['fairy', 'steel'],
		encounterOptions: [],
	},
	'zamazenta-crowned': {
		dexId: 10189,
		types: ['fighting', 'steel'],
		encounterOptions: [],
	},
	'eternatus-eternamax': {
		dexId: 10190,
		types: ['poison', 'dragon'],
		encounterOptions: [],
	},
	'urshifu-rapid-strike': {
		dexId: 10191,
		types: ['fighting', 'water'],
		encounterOptions: [],
	},
	'zarude-dada': {
		dexId: 10192,
		types: ['dark', 'grass'],
		encounterOptions: [],
	},
	'calyrex-ice': {
		dexId: 10193,
		types: ['psychic', 'ice'],
		encounterOptions: [],
	},
	'calyrex-shadow': {
		dexId: 10194,
		types: ['psychic', 'ghost'],
		encounterOptions: [],
	},
	'venusaur-gmax': {
		dexId: 10195,
		types: ['grass', 'poison'],
		encounterOptions: [],
	},
	'charizard-gmax': {
		dexId: 10196,
		types: ['fire', 'flying'],
		encounterOptions: [],
	},
	'blastoise-gmax': {
		dexId: 10197,
		types: ['water'],
		encounterOptions: [],
	},
	'butterfree-gmax': {
		dexId: 10198,
		types: ['bug', 'flying'],
		encounterOptions: [],
	},
	'pikachu-gmax': {
		dexId: 10199,
		types: ['electric'],
		encounterOptions: [],
	},
	'meowth-gmax': {
		dexId: 10200,
		types: ['normal'],
		encounterOptions: [],
	},
	'machamp-gmax': {
		dexId: 10201,
		types: ['fighting'],
		encounterOptions: [],
	},
	'gengar-gmax': {
		dexId: 10202,
		types: ['ghost', 'poison'],
		encounterOptions: [],
	},
	'kingler-gmax': {
		dexId: 10203,
		types: ['water'],
		encounterOptions: [],
	},
	'lapras-gmax': {
		dexId: 10204,
		types: ['water', 'ice'],
		encounterOptions: [],
	},
	'eevee-gmax': {
		dexId: 10205,
		types: ['normal'],
		encounterOptions: [],
	},
	'snorlax-gmax': {
		dexId: 10206,
		types: ['normal'],
		encounterOptions: [],
	},
	'garbodor-gmax': {
		dexId: 10207,
		types: ['poison'],
		encounterOptions: [],
	},
	'melmetal-gmax': {
		dexId: 10208,
		types: ['steel'],
		encounterOptions: [],
	},
	'rillaboom-gmax': {
		dexId: 10209,
		types: ['grass'],
		encounterOptions: [],
	},
	'cinderace-gmax': {
		dexId: 10210,
		types: ['fire'],
		encounterOptions: [],
	},
	'inteleon-gmax': {
		dexId: 10211,
		types: ['water'],
		encounterOptions: [],
	},
	'corviknight-gmax': {
		dexId: 10212,
		types: ['flying', 'steel'],
		encounterOptions: [],
	},
	'orbeetle-gmax': {
		dexId: 10213,
		types: ['bug', 'psychic'],
		encounterOptions: [],
	},
	'drednaw-gmax': {
		dexId: 10214,
		types: ['water', 'rock'],
		encounterOptions: [],
	},
	'coalossal-gmax': {
		dexId: 10215,
		types: ['rock', 'fire'],
		encounterOptions: [],
	},
	'flapple-gmax': {
		dexId: 10216,
		types: ['grass', 'dragon'],
		encounterOptions: [],
	},
	'appletun-gmax': {
		dexId: 10217,
		types: ['grass', 'dragon'],
		encounterOptions: [],
	},
	'sandaconda-gmax': {
		dexId: 10218,
		types: ['ground'],
		encounterOptions: [],
	},
	'toxtricity-amped-gmax': {
		dexId: 10219,
		types: ['electric', 'poison'],
		encounterOptions: [],
	},
	'centiskorch-gmax': {
		dexId: 10220,
		types: ['fire', 'bug'],
		encounterOptions: [],
	},
	'hatterene-gmax': {
		dexId: 10221,
		types: ['psychic', 'fairy'],
		encounterOptions: [],
	},
	'grimmsnarl-gmax': {
		dexId: 10222,
		types: ['dark', 'fairy'],
		encounterOptions: [],
	},
	'alcremie-gmax': {
		dexId: 10223,
		types: ['fairy'],
		encounterOptions: [],
	},
	'copperajah-gmax': {
		dexId: 10224,
		types: ['steel'],
		encounterOptions: [],
	},
	'duraludon-gmax': {
		dexId: 10225,
		types: ['steel', 'dragon'],
		encounterOptions: [],
	},
	'urshifu-single-strike-gmax': {
		dexId: 10226,
		types: ['fighting', 'dark'],
		encounterOptions: [],
	},
	'urshifu-rapid-strike-gmax': {
		dexId: 10227,
		types: ['fighting', 'water'],
		encounterOptions: [],
	},
	'toxtricity-low-key-gmax': {
		dexId: 10228,
		types: ['electric', 'poison'],
		encounterOptions: [],
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
	},
	'arcanine-hisui': {
		dexId: 10230,
		types: ['fire', 'rock'],
		encounterOptions: [],
	},
	'voltorb-hisui': {
		dexId: 10231,
		types: ['electric', 'grass'],
		encounterOptions: [],
	},
	'electrode-hisui': {
		dexId: 10232,
		types: ['electric', 'grass'],
		encounterOptions: [],
	},
	'typhlosion-hisui': {
		dexId: 10233,
		types: ['fire', 'ghost'],
		encounterOptions: [],
	},
	'qwilfish-hisui': {
		dexId: 10234,
		types: ['dark', 'poison'],
		berryLureMapId: 'routeS1E1',
		encounterOptions: [],
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
	},
	'samurott-hisui': {
		dexId: 10236,
		types: ['water', 'dark'],
		encounterOptions: [],
	},
	'lilligant-hisui': {
		dexId: 10237,
		types: ['grass', 'fighting'],
		encounterOptions: [],
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
	},
	'zoroark-hisui': {
		dexId: 10239,
		types: ['normal', 'ghost'],
		encounterOptions: [],
	},
	'braviary-hisui': {
		dexId: 10240,
		types: ['psychic', 'flying'],
		encounterOptions: [],
	},
	'sliggoo-hisui': {
		dexId: 10241,
		types: ['steel', 'dragon'],
		encounterOptions: [],
	},
	'goodra-hisui': {
		dexId: 10242,
		types: ['steel', 'dragon'],
		encounterOptions: [],
	},
	'avalugg-hisui': {
		dexId: 10243,
		types: ['ice', 'rock'],
		berryLureMapId: 'routeS1W1',
		encounterOptions: [],
	},
	'decidueye-hisui': {
		dexId: 10244,
		types: ['grass', 'fighting'],
		encounterOptions: [],
	},
	'dialga-origin': {
		dexId: 10245,
		types: ['steel', 'dragon'],
		encounterOptions: [],
	},
	'palkia-origin': {
		dexId: 10246,
		types: ['water', 'dragon'],
		encounterOptions: [],
	},
	'basculin-white-striped': {
		dexId: 10247,
		types: ['water'],
		encounterOptions: [],
	},
	'basculegion-female': {
		dexId: 10248,
		types: ['water', 'ghost'],
		encounterOptions: [],
	},
	'enamorus-therian': {
		dexId: 10249,
		types: ['fairy', 'flying'],
		encounterOptions: [],
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
	},
	'oinkologne-female': {
		dexId: 10254,
		types: ['normal'],
		encounterOptions: [],
	},
	'dudunsparce-three-segment': {
		dexId: 10255,
		types: ['normal'],
		encounterOptions: [],
	},
	'palafin-hero': {
		dexId: 10256,
		types: ['water'],
		encounterOptions: [],
	},
	'maushold-family-of-three': {
		dexId: 10257,
		types: ['normal'],
		encounterOptions: [],
	},
	'tatsugiri-droopy': {
		dexId: 10258,
		types: ['dragon', 'water'],
		encounterOptions: [],
	},
	'tatsugiri-stretchy': {
		dexId: 10259,
		types: ['dragon', 'water'],
		encounterOptions: [],
	},
	'squawkabilly-blue-plumage': {
		dexId: 10260,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	'squawkabilly-yellow-plumage': {
		dexId: 10261,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	'squawkabilly-white-plumage': {
		dexId: 10262,
		types: ['normal', 'flying'],
		encounterOptions: [],
	},
	'gimmighoul-roaming': {
		dexId: 10263,
		types: ['ghost'],
		encounterOptions: [],
	},
	'koraidon-limited-build': {
		dexId: 10264,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
	},
	'koraidon-sprinting-build': {
		dexId: 10265,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
	},
	'koraidon-swimming-build': {
		dexId: 10266,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
	},
	'koraidon-gliding-build': {
		dexId: 10267,
		types: ['fighting', 'dragon'],
		encounterOptions: [],
	},
	'miraidon-low-power-mode': {
		dexId: 10268,
		types: ['electric', 'dragon'],
		encounterOptions: [],
	},
	'miraidon-drive-mode': {
		dexId: 10269,
		types: ['electric', 'dragon'],
		encounterOptions: [],
	},
	'miraidon-aquatic-mode': {
		dexId: 10270,
		types: ['electric', 'dragon'],
		encounterOptions: [],
	},
	'miraidon-glide-mode': {
		dexId: 10271,
		types: ['electric', 'dragon'],
		encounterOptions: [],
	},
	'ursaluna-bloodmoon': {
		dexId: 10272,
		types: ['ground', 'normal'],
		encounterOptions: [],
	},
	'ogerpon-wellspring-mask': {
		dexId: 10273,
		types: ['grass', 'water'],
		encounterOptions: [],
	},
	'ogerpon-hearthflame-mask': {
		dexId: 10274,
		types: ['grass', 'fire'],
		encounterOptions: [],
	},
	'ogerpon-cornerstone-mask': {
		dexId: 10275,
		types: ['grass', 'rock'],
		encounterOptions: [],
	},
	'terapagos-terastal': {
		dexId: 10276,
		types: ['normal'],
		encounterOptions: [],
	},
	'terapagos-stellar': {
		dexId: 10277,
		types: ['normal'],
		encounterOptions: [],
	},
};
