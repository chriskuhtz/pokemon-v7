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
export type InternalDexEntry = {
	dexId: number;
	rampager?: boolean;
	swarm?: SwarmType;
	berryLureMapId?: MapId;
	types: PokemonType[];
	honey?: boolean;
	underRock?: boolean;
	encounterOptions?: {
		timeOfDay: TimeOfDay | 'ALL_DAY';
		minXp: number;
		maxXp: number;
		rarity: 'common' | 'medium' | 'rare' | 'ultra-rare';
		area: 'LAND' | 'WATER';
	}[];
};

export const internalDex: Record<PokemonName, InternalDexEntry> = {
	bulbasaur: {
		dexId: 1,
		types: ['grass', 'poison'],
	},
	ivysaur: {
		dexId: 2,
		types: ['grass', 'poison'],
	},
	venusaur: {
		dexId: 3,
		types: ['grass', 'poison'],
	},
	charmander: {
		dexId: 4,
		types: ['fire'],
	},
	charmeleon: {
		dexId: 5,
		types: ['fire'],
	},
	charizard: {
		dexId: 6,
		types: ['fire', 'flying'],
	},
	squirtle: {
		dexId: 7,
		types: ['water'],
	},
	wartortle: {
		dexId: 8,
		types: ['water'],
	},
	blastoise: {
		dexId: 9,
		types: ['water'],
	},
	caterpie: {
		dexId: 10,
		types: ['bug'],
	},
	metapod: {
		dexId: 11,
		types: ['bug'],
	},
	butterfree: {
		dexId: 12,
		types: ['bug', 'flying'],
		berryLureMapId: 'routeN1E1',
	},
	weedle: {
		dexId: 13,
		types: ['bug', 'poison'],
	},
	kakuna: {
		dexId: 14,
		types: ['bug', 'poison'],
	},
	beedrill: {
		dexId: 15,
		types: ['bug', 'poison'],
	},
	pidgey: {
		dexId: 16,
		types: ['normal', 'flying'],
	},
	pidgeotto: {
		dexId: 17,
		types: ['normal', 'flying'],
	},
	pidgeot: {
		dexId: 18,
		types: ['normal', 'flying'],
	},
	rattata: {
		dexId: 19,
		types: ['normal'],
	},
	raticate: {
		dexId: 20,
		types: ['normal'],
	},
	spearow: {
		dexId: 21,
		types: ['normal', 'flying'],
	},
	fearow: {
		dexId: 22,
		types: ['normal', 'flying'],
	},
	ekans: {
		dexId: 23,
		types: ['poison'],
	},
	arbok: {
		dexId: 24,
		types: ['poison'],
	},
	pikachu: {
		dexId: 25,
		types: ['electric'],
	},
	raichu: {
		dexId: 26,
		types: ['electric'],
	},
	sandshrew: {
		dexId: 27,
		types: ['ground'],
	},
	sandslash: {
		dexId: 28,
		types: ['ground'],
	},
	'nidoran-f': {
		dexId: 29,
		types: ['poison'],
	},
	nidorina: {
		dexId: 30,
		types: ['poison'],
	},
	nidoqueen: {
		dexId: 31,
		types: ['poison', 'ground'],
	},
	'nidoran-m': {
		dexId: 32,
		types: ['poison'],
	},
	nidorino: {
		dexId: 33,
		types: ['poison'],
	},
	nidoking: {
		dexId: 34,
		types: ['poison', 'ground'],
	},
	clefairy: {
		dexId: 35,
		types: ['fairy'],
	},
	clefable: {
		dexId: 36,
		types: ['fairy'],
	},
	vulpix: {
		dexId: 37,
		types: ['fire'],
		berryLureMapId: 'routeN1',
	},
	ninetales: {
		dexId: 38,
		types: ['fire'],
	},
	jigglypuff: {
		dexId: 39,
		types: ['normal', 'fairy'],
	},
	wigglytuff: {
		dexId: 40,
		swarm: 'STRONG',
		types: ['normal', 'fairy'],
	},
	zubat: {
		dexId: 41,
		types: ['poison', 'flying'],
	},
	golbat: {
		dexId: 42,
		types: ['poison', 'flying'],
	},
	oddish: {
		dexId: 43,
		types: ['grass', 'poison'],
	},
	gloom: {
		dexId: 44,
		types: ['grass', 'poison'],
	},
	vileplume: {
		dexId: 45,
		types: ['grass', 'poison'],
	},
	paras: {
		dexId: 46,
		types: ['bug', 'grass'],
		berryLureMapId: 'routeS1E1',
	},
	parasect: {
		dexId: 47,
		types: ['bug', 'grass'],
	},
	venonat: {
		dexId: 48,
		types: ['bug', 'poison'],
		berryLureMapId: 'routeN1E1',
	},
	venomoth: {
		dexId: 49,
		types: ['bug', 'poison'],
	},
	diglett: {
		dexId: 50,
		types: ['ground'],
	},
	dugtrio: {
		dexId: 51,
		types: ['ground'],
	},
	meowth: {
		dexId: 52,
		types: ['normal'],
	},
	persian: {
		dexId: 53,
		types: ['normal'],
	},
	psyduck: {
		dexId: 54,
		types: ['water'],
	},
	golduck: {
		dexId: 55,
		types: ['water'],
	},
	mankey: {
		dexId: 56,
		types: ['fighting'],
		honey: true,
	},
	primeape: {
		dexId: 57,
		rampager: true,
		types: ['fighting'],
	},
	growlithe: {
		dexId: 58,
		types: ['fire'],
	},
	arcanine: {
		dexId: 59,
		rampager: true,
		types: ['fire'],
	},
	poliwag: {
		dexId: 60,
		types: ['water'],
	},
	poliwhirl: {
		dexId: 61,
		types: ['water'],
	},
	poliwrath: {
		dexId: 62,
		types: ['water', 'fighting'],
	},
	abra: {
		dexId: 63,
		types: ['psychic'],
		berryLureMapId: 'routeN1E1',
	},
	kadabra: {
		dexId: 64,
		types: ['psychic'],
	},
	alakazam: {
		dexId: 65,
		rampager: true,
		types: ['psychic'],
	},
	machop: {
		dexId: 66,
		types: ['fighting'],
	},
	machoke: {
		dexId: 67,
		types: ['fighting'],
	},
	machamp: {
		dexId: 68,
		rampager: true,
		types: ['fighting'],
	},
	bellsprout: {
		dexId: 69,
		types: ['grass', 'poison'],
		berryLureMapId: 'routeN1',
	},
	weepinbell: {
		dexId: 70,
		types: ['grass', 'poison'],
	},
	victreebel: {
		dexId: 71,
		types: ['grass', 'poison'],
	},
	tentacool: {
		dexId: 72,
		types: ['water', 'poison'],
	},
	tentacruel: {
		dexId: 73,
		types: ['water', 'poison'],
	},
	geodude: {
		dexId: 74,
		types: ['rock', 'ground'],
		underRock: true,
	},
	graveler: {
		dexId: 75,
		types: ['rock', 'ground'],
	},
	golem: {
		dexId: 76,
		types: ['rock', 'ground'],
	},
	ponyta: {
		dexId: 77,
		types: ['fire'],
	},
	rapidash: {
		dexId: 78,
		types: ['fire'],
	},
	slowpoke: {
		dexId: 79,
		types: ['water', 'psychic'],
	},
	slowbro: {
		dexId: 80,
		types: ['water', 'psychic'],
	},
	magnemite: {
		dexId: 81,
		types: ['electric', 'steel'],
	},
	magneton: {
		dexId: 82,
		swarm: 'STRONG',
		types: ['electric', 'steel'],
	},
	farfetchd: {
		dexId: 83,
		types: ['normal', 'flying'],
	},
	doduo: {
		dexId: 84,
		types: ['normal', 'flying'],
		berryLureMapId: 'routeS1E1',
	},
	dodrio: {
		dexId: 85,
		types: ['normal', 'flying'],
	},
	seel: {
		dexId: 86,
		types: ['water'],
	},
	dewgong: {
		dexId: 87,
		types: ['water', 'ice'],
	},
	grimer: {
		dexId: 88,
		types: ['poison'],
		berryLureMapId: 'routeN1',
	},
	muk: {
		dexId: 89,
		types: ['poison'],
	},
	shellder: {
		dexId: 90,
		types: ['water'],
	},
	cloyster: {
		dexId: 91,
		types: ['water', 'ice'],
	},
	gastly: {
		dexId: 92,
		types: ['ghost', 'poison'],
	},
	haunter: {
		dexId: 93,
		types: ['ghost', 'poison'],
		berryLureMapId: 'routeE1',
	},
	gengar: {
		dexId: 94,
		rampager: true,
		types: ['ghost', 'poison'],
	},
	onix: {
		dexId: 95,
		types: ['rock', 'ground'],
	},
	drowzee: {
		dexId: 96,
		types: ['psychic'],
	},
	hypno: {
		dexId: 97,
		types: ['psychic'],
	},
	krabby: {
		dexId: 98,
		types: ['water'],
	},
	kingler: {
		dexId: 99,
		types: ['water'],
	},
	voltorb: {
		dexId: 100,
		types: ['electric'],
	},
	electrode: {
		dexId: 101,
		types: ['electric'],
	},
	exeggcute: {
		dexId: 102,
		types: ['grass', 'psychic'],
		honey: true,
	},
	exeggutor: {
		dexId: 103,
		types: ['grass', 'psychic'],
	},
	cubone: {
		dexId: 104,
		types: ['ground'],
	},
	marowak: {
		dexId: 105,
		types: ['ground'],
		berryLureMapId: 'routeE1',
	},
	hitmonlee: {
		dexId: 106,
		types: ['fighting'],
	},
	hitmonchan: {
		dexId: 107,
		types: ['fighting'],
	},
	lickitung: {
		dexId: 108,
		types: ['normal'],
	},
	koffing: {
		dexId: 109,
		types: ['poison'],
	},
	weezing: {
		dexId: 110,
		types: ['poison'],
		berryLureMapId: 'routeE1',
	},
	rhyhorn: {
		dexId: 111,
		types: ['ground', 'rock'],
		berryLureMapId: 'routeS1E1',
	},
	rhydon: {
		dexId: 112,
		types: ['ground', 'rock'],
		berryLureMapId: 'routeS1W1',
	},
	chansey: {
		dexId: 113,
		types: ['normal'],
	},
	tangela: {
		dexId: 114,
		types: ['grass'],
	},
	kangaskhan: {
		dexId: 115,
		types: ['normal'],
	},
	horsea: {
		dexId: 116,
		types: ['water'],
	},
	seadra: {
		dexId: 117,
		types: ['water'],
	},
	goldeen: {
		dexId: 118,
		types: ['water'],
	},
	seaking: {
		dexId: 119,
		types: ['water'],
	},
	staryu: {
		dexId: 120,
		types: ['water'],
	},
	starmie: {
		dexId: 121,
		types: ['water', 'psychic'],
	},
	'mr-mime': {
		dexId: 122,
		types: ['psychic', 'fairy'],
		berryLureMapId: 'routeE1',
	},
	scyther: {
		dexId: 123,
		types: ['bug', 'flying'],
	},
	jynx: {
		dexId: 124,
		types: ['ice', 'psychic'],
	},
	electabuzz: {
		dexId: 125,
		types: ['electric'],
	},
	magmar: {
		dexId: 126,
		types: ['fire'],
		berryLureMapId: 'routeS1E1',
	},
	pinsir: {
		dexId: 127,
		rampager: true,
		types: ['bug'],
	},
	tauros: {
		dexId: 128,
		types: ['normal'],
	},
	magikarp: {
		dexId: 129,
		types: ['water'],
	},
	gyarados: {
		dexId: 130,
		types: ['water', 'flying'],
	},
	lapras: {
		dexId: 131,
		types: ['water', 'ice'],
	},
	ditto: {
		dexId: 132,
		types: ['normal'],
	},
	eevee: {
		dexId: 133,
		types: ['normal'],
	},
	vaporeon: {
		dexId: 134,
		types: ['water'],
	},
	jolteon: {
		dexId: 135,
		types: ['electric'],
	},
	flareon: {
		dexId: 136,
		types: ['fire'],
	},
	porygon: {
		dexId: 137,
		types: ['normal'],
	},
	omanyte: {
		dexId: 138,
		types: ['rock', 'water'],
	},
	omastar: {
		dexId: 139,
		types: ['rock', 'water'],
	},
	kabuto: {
		dexId: 140,
		types: ['rock', 'water'],
	},
	kabutops: {
		dexId: 141,
		types: ['rock', 'water'],
	},
	aerodactyl: {
		dexId: 142,
		types: ['rock', 'flying'],
	},
	snorlax: {
		dexId: 143,
		types: ['normal'],
	},
	articuno: {
		dexId: 144,
		types: ['ice', 'flying'],
	},
	zapdos: {
		dexId: 145,
		types: ['electric', 'flying'],
	},
	moltres: {
		dexId: 146,
		types: ['fire', 'flying'],
	},
	dratini: {
		dexId: 147,
		types: ['dragon'],
		berryLureMapId: 'routeS1E1',
	},
	dragonair: {
		dexId: 148,
		types: ['dragon'],
	},
	dragonite: {
		dexId: 149,
		rampager: true,
		types: ['dragon', 'flying'],
	},
	mewtwo: {
		dexId: 150,
		types: ['psychic'],
	},
	mew: {
		dexId: 151,
		types: ['psychic'],
	},
	chikorita: {
		dexId: 152,
		swarm: 'WEAK',
		types: ['grass'],
	},
	bayleef: {
		dexId: 153,
		types: ['grass'],
	},
	meganium: {
		dexId: 154,
		types: ['grass'],
	},
	cyndaquil: {
		dexId: 155,
		swarm: 'WEAK',
		types: ['fire'],
	},
	quilava: {
		dexId: 156,
		types: ['fire'],
	},
	typhlosion: {
		dexId: 157,
		types: ['fire'],
	},
	totodile: {
		dexId: 158,
		swarm: 'WEAK',
		types: ['water'],
	},
	croconaw: {
		dexId: 159,
		types: ['water'],
	},
	feraligatr: {
		dexId: 160,
		types: ['water'],
	},
	sentret: {
		dexId: 161,
		types: ['normal'],
	},
	furret: {
		dexId: 162,
		types: ['normal'],
	},
	hoothoot: {
		dexId: 163,
		types: ['normal', 'flying'],
	},
	noctowl: {
		dexId: 164,
		types: ['normal', 'flying'],
	},
	ledyba: {
		dexId: 165,
		types: ['bug', 'flying'],
	},
	ledian: {
		dexId: 166,
		types: ['bug', 'flying'],
	},
	spinarak: {
		dexId: 167,
		types: ['bug', 'poison'],
	},
	ariados: {
		dexId: 168,
		types: ['bug', 'poison'],
	},
	crobat: {
		dexId: 169,
		rampager: true,
		types: ['poison', 'flying'],
	},
	chinchou: {
		dexId: 170,
		types: ['water', 'electric'],
	},
	lanturn: {
		dexId: 171,
		types: ['water', 'electric'],
	},
	pichu: {
		dexId: 172,
		types: ['electric'],
	},
	cleffa: {
		dexId: 173,
		types: ['fairy'],
	},
	igglybuff: {
		dexId: 174,
		types: ['normal', 'fairy'],
	},
	togepi: {
		dexId: 175,
		types: ['fairy'],
	},
	togetic: {
		dexId: 176,
		types: ['fairy', 'flying'],
	},
	natu: {
		dexId: 177,
		types: ['psychic', 'flying'],
		berryLureMapId: 'routeN1',
	},
	xatu: {
		dexId: 178,
		types: ['psychic', 'flying'],
	},
	mareep: {
		dexId: 179,
		types: ['electric'],
	},
	flaaffy: {
		dexId: 180,
		types: ['electric'],
	},
	ampharos: {
		dexId: 181,
		types: ['electric'],
	},
	bellossom: {
		dexId: 182,
		types: ['grass'],
	},
	marill: {
		dexId: 183,
		types: ['water', 'fairy'],
		berryLureMapId: 'routeN1',
	},
	azumarill: {
		dexId: 184,
		types: ['water', 'fairy'],
	},
	sudowoodo: {
		dexId: 185,
		types: ['rock'],
	},
	politoed: {
		dexId: 186,
		types: ['water'],
	},
	hoppip: {
		dexId: 187,
		types: ['grass', 'flying'],
	},
	skiploom: {
		dexId: 188,
		types: ['grass', 'flying'],
	},
	jumpluff: {
		dexId: 189,
		types: ['grass', 'flying'],
	},
	aipom: {
		dexId: 190,
		types: ['normal'],
		honey: true,
	},
	sunkern: {
		dexId: 191,
		types: ['grass'],
	},
	sunflora: {
		dexId: 192,
		types: ['grass'],
	},
	yanma: {
		dexId: 193,
		types: ['bug', 'flying'],
	},
	wooper: {
		dexId: 194,
		types: ['water', 'ground'],
	},
	quagsire: {
		dexId: 195,
		types: ['water', 'ground'],
		berryLureMapId: 'routeE1',
	},
	espeon: {
		dexId: 196,
		types: ['psychic'],
	},
	umbreon: {
		dexId: 197,
		types: ['dark'],
	},
	murkrow: {
		dexId: 198,
		types: ['dark', 'flying'],
	},
	slowking: {
		dexId: 199,
		types: ['water', 'psychic'],
	},
	misdreavus: {
		dexId: 200,
		swarm: 'STRONG',
		types: ['ghost'],
	},
	unown: {
		dexId: 201,
		types: ['psychic'],
	},
	wobbuffet: {
		dexId: 202,
		types: ['psychic'],
	},
	girafarig: {
		dexId: 203,
		types: ['normal', 'psychic'],
		berryLureMapId: 'routeS1W1',
	},
	pineco: {
		dexId: 204,
		types: ['bug'],
		honey: true,
	},
	forretress: {
		dexId: 205,
		types: ['bug', 'steel'],
	},
	dunsparce: {
		dexId: 206,
		types: ['normal'],
		berryLureMapId: 'routeN1',
	},
	gligar: {
		dexId: 207,
		types: ['ground', 'flying'],
	},
	steelix: {
		dexId: 208,
		rampager: true,
		types: ['steel', 'ground'],
	},
	snubbull: {
		dexId: 209,
		types: ['fairy'],
		berryLureMapId: 'routeS1E1',
	},
	granbull: {
		dexId: 210,
		types: ['fairy'],
	},
	qwilfish: {
		dexId: 211,
		types: ['water', 'poison'],
	},
	scizor: {
		dexId: 212,
		types: ['bug', 'steel'],
	},
	shuckle: {
		dexId: 213,
		types: ['bug', 'rock'],
		underRock: true,
	},
	heracross: {
		dexId: 214,
		types: ['bug', 'fighting'],
		honey: true,
	},
	sneasel: {
		dexId: 215,
		types: ['dark', 'ice'],
	},
	teddiursa: {
		dexId: 216,
		types: ['normal'],
	},
	ursaring: {
		dexId: 217,
		rampager: true,
		types: ['normal'],
	},
	slugma: {
		dexId: 218,
		types: ['fire'],
		berryLureMapId: 'routeE1',
	},
	magcargo: {
		dexId: 219,
		types: ['fire', 'rock'],
	},
	swinub: {
		dexId: 220,
		types: ['ice', 'ground'],
		underRock: true,
	},
	piloswine: {
		dexId: 221,
		types: ['ice', 'ground'],
	},
	corsola: {
		dexId: 222,
		types: ['water', 'rock'],
	},
	remoraid: {
		dexId: 223,
		types: ['water'],
	},
	octillery: {
		dexId: 224,
		types: ['water'],
	},
	delibird: {
		dexId: 225,
		swarm: 'STRONG',
		types: ['ice', 'flying'],
	},
	mantine: {
		dexId: 226,
		types: ['water', 'flying'],
	},
	skarmory: {
		dexId: 227,
		types: ['steel', 'flying'],
	},
	houndour: {
		dexId: 228,
		types: ['dark', 'fire'],
	},
	houndoom: {
		dexId: 229,
		types: ['dark', 'fire'],
	},
	kingdra: {
		dexId: 230,
		types: ['water', 'dragon'],
	},
	phanpy: {
		dexId: 231,
		types: ['ground'],
		berryLureMapId: 'routeN1',
	},
	donphan: {
		dexId: 232,
		swarm: 'STRONG',
		types: ['ground'],
	},
	porygon2: {
		dexId: 233,
		types: ['normal'],
	},
	stantler: {
		dexId: 234,
		types: ['normal'],
	},
	smeargle: {
		dexId: 235,
		types: ['normal'],
	},
	tyrogue: {
		dexId: 236,
		types: ['fighting'],
		berryLureMapId: 'routeE1',
	},
	hitmontop: {
		dexId: 237,
		types: ['fighting'],
	},
	smoochum: {
		dexId: 238,
		types: ['ice', 'psychic'],
	},
	elekid: {
		dexId: 239,
		types: ['electric'],
	},
	magby: {
		dexId: 240,
		types: ['fire'],
	},
	miltank: {
		dexId: 241,
		types: ['normal'],
		berryLureMapId: 'routeN1E1',
	},
	blissey: {
		dexId: 242,
		types: ['normal'],
	},
	raikou: {
		dexId: 243,
		types: ['electric'],
	},
	entei: {
		dexId: 244,
		types: ['fire'],
	},
	suicune: {
		dexId: 245,
		types: ['water'],
	},
	larvitar: {
		dexId: 246,
		types: ['rock', 'ground'],
	},
	pupitar: {
		dexId: 247,
		swarm: 'STRONG',
		types: ['rock', 'ground'],
	},
	tyranitar: {
		dexId: 248,
		rampager: true,
		types: ['rock', 'dark'],
	},
	lugia: {
		dexId: 249,
		types: ['psychic', 'flying'],
	},
	'ho-oh': {
		dexId: 250,
		types: ['fire', 'flying'],
	},
	celebi: {
		dexId: 251,
		types: ['psychic', 'grass'],
	},
	treecko: {
		dexId: 252,
		swarm: 'WEAK',
		types: ['grass'],
	},
	grovyle: {
		dexId: 253,
		types: ['grass'],
	},
	sceptile: {
		dexId: 254,
		types: ['grass'],
	},
	torchic: {
		dexId: 255,
		swarm: 'WEAK',
		types: ['fire'],
	},
	combusken: {
		dexId: 256,
		types: ['fire', 'fighting'],
	},
	blaziken: {
		dexId: 257,
		types: ['fire', 'fighting'],
	},
	mudkip: {
		dexId: 258,
		swarm: 'WEAK',
		types: ['water'],
	},
	marshtomp: {
		dexId: 259,
		types: ['water', 'ground'],
	},
	swampert: {
		dexId: 260,
		types: ['water', 'ground'],
	},
	poochyena: {
		dexId: 261,
		types: ['dark'],
	},
	mightyena: {
		dexId: 262,
		types: ['dark'],
	},
	zigzagoon: {
		dexId: 263,
		types: ['normal'],
	},
	linoone: {
		dexId: 264,
		types: ['normal'],
	},
	wurmple: {
		dexId: 265,
		types: ['bug'],
	},
	silcoon: {
		dexId: 266,
		types: ['bug'],
	},
	beautifly: {
		dexId: 267,
		types: ['bug', 'flying'],
	},
	cascoon: {
		dexId: 268,
		types: ['bug'],
	},
	dustox: {
		dexId: 269,
		types: ['bug', 'poison'],
	},
	lotad: {
		dexId: 270,
		types: ['water', 'grass'],
	},
	lombre: {
		dexId: 271,
		types: ['water', 'grass'],
	},
	ludicolo: {
		dexId: 272,
		types: ['water', 'grass'],
	},
	seedot: {
		dexId: 273,
		types: ['grass'],
	},
	nuzleaf: {
		dexId: 274,
		types: ['grass', 'dark'],
		berryLureMapId: 'routeE1',
	},
	shiftry: {
		dexId: 275,
		types: ['grass', 'dark'],
	},
	taillow: {
		dexId: 276,
		types: ['normal', 'flying'],
	},
	swellow: {
		dexId: 277,
		types: ['normal', 'flying'],
	},
	wingull: {
		dexId: 278,
		types: ['water', 'flying'],
	},
	pelipper: {
		dexId: 279,
		types: ['water', 'flying'],
	},
	ralts: {
		dexId: 280,
		types: ['psychic', 'fairy'],
	},
	kirlia: {
		dexId: 281,
		swarm: 'STRONG',
		types: ['psychic', 'fairy'],
	},
	gardevoir: {
		dexId: 282,
		types: ['psychic', 'fairy'],
	},
	surskit: {
		dexId: 283,
		types: ['bug', 'water'],
	},
	masquerain: {
		dexId: 284,
		types: ['bug', 'flying'],
	},
	shroomish: {
		dexId: 285,
		types: ['grass'],
		berryLureMapId: 'routeN1E1',
	},
	breloom: {
		dexId: 286,
		types: ['grass', 'fighting'],
	},
	slakoth: {
		dexId: 287,
		types: ['normal'],
	},
	vigoroth: {
		dexId: 288,
		types: ['normal'],
	},
	slaking: {
		dexId: 289,
		rampager: true,
		types: ['normal'],
	},
	nincada: {
		dexId: 290,
		types: ['bug', 'ground'],
		berryLureMapId: 'routeN1E1',
	},
	ninjask: {
		dexId: 291,
		types: ['bug', 'flying'],
	},
	shedinja: {
		dexId: 292,
		types: ['bug', 'ghost'],
		berryLureMapId: 'routeS1E1',
	},
	whismur: {
		dexId: 293,
		types: ['normal'],
		underRock: true,
	},
	loudred: {
		dexId: 294,
		types: ['normal'],
	},
	exploud: {
		dexId: 295,
		types: ['normal'],
	},
	makuhita: {
		dexId: 296,
		types: ['fighting'],
		berryLureMapId: 'routeS1E1',
	},
	hariyama: {
		dexId: 297,
		swarm: 'STRONG',
		types: ['fighting'],
	},
	azurill: {
		dexId: 298,
		types: ['normal', 'fairy'],
	},
	nosepass: {
		dexId: 299,
		types: ['rock'],
		berryLureMapId: 'routeE1',
	},
	skitty: {
		dexId: 300,
		types: ['normal'],
	},
	delcatty: {
		dexId: 301,
		types: ['normal'],
	},
	sableye: {
		dexId: 302,
		types: ['dark', 'ghost'],
	},
	mawile: {
		dexId: 303,
		types: ['steel', 'fairy'],
		berryLureMapId: 'routeE1',
	},
	aron: {
		dexId: 304,
		types: ['steel', 'rock'],
	},
	lairon: {
		dexId: 305,
		types: ['steel', 'rock'],
	},
	aggron: {
		dexId: 306,
		types: ['steel', 'rock'],
	},
	meditite: {
		dexId: 307,
		types: ['fighting', 'psychic'],
	},
	medicham: {
		dexId: 308,
		types: ['fighting', 'psychic'],
	},
	electrike: {
		dexId: 309,
		types: ['electric'],
	},
	manectric: {
		dexId: 310,
		types: ['electric'],
	},
	plusle: {
		dexId: 311,
		types: ['electric'],
	},
	minun: {
		dexId: 312,
		types: ['electric'],
	},
	volbeat: {
		dexId: 313,
		types: ['bug'],
	},
	illumise: {
		dexId: 314,
		types: ['bug'],
	},
	roselia: {
		dexId: 315,
		types: ['grass', 'poison'],
	},
	gulpin: {
		dexId: 316,
		types: ['poison'],
	},
	swalot: {
		dexId: 317,
		types: ['poison'],
	},
	carvanha: {
		dexId: 318,
		types: ['water', 'dark'],
	},
	sharpedo: {
		dexId: 319,
		types: ['water', 'dark'],
	},
	wailmer: {
		dexId: 320,
		types: ['water'],
	},
	wailord: {
		dexId: 321,
		types: ['water'],
	},
	numel: {
		dexId: 322,
		types: ['fire', 'ground'],
	},
	camerupt: {
		dexId: 323,
		types: ['fire', 'ground'],
	},
	torkoal: {
		dexId: 324,
		types: ['fire'],
	},
	spoink: {
		dexId: 325,
		types: ['psychic'],
	},
	grumpig: {
		dexId: 326,
		types: ['psychic'],
	},
	spinda: {
		dexId: 327,
		types: ['normal'],
	},
	trapinch: {
		dexId: 328,
		types: ['ground'],
		berryLureMapId: 'routeS1W1',
	},
	vibrava: {
		dexId: 329,
		types: ['ground', 'dragon'],
	},
	flygon: {
		dexId: 330,
		types: ['ground', 'dragon'],
	},
	cacnea: {
		dexId: 331,
		types: ['grass'],
	},
	cacturne: {
		dexId: 332,
		types: ['grass', 'dark'],
	},
	swablu: {
		dexId: 333,
		types: ['normal', 'flying'],
	},
	altaria: {
		dexId: 334,
		types: ['dragon', 'flying'],
	},
	zangoose: {
		dexId: 335,
		types: ['normal'],
	},
	seviper: {
		dexId: 336,
		types: ['poison'],
	},
	lunatone: {
		dexId: 337,
		types: ['rock', 'psychic'],
	},
	solrock: {
		dexId: 338,
		types: ['rock', 'psychic'],
	},
	barboach: {
		dexId: 339,
		types: ['water', 'ground'],
	},
	whiscash: {
		dexId: 340,
		types: ['water', 'ground'],
	},
	corphish: {
		dexId: 341,
		types: ['water'],
	},
	crawdaunt: {
		dexId: 342,
		types: ['water', 'dark'],
	},
	baltoy: {
		dexId: 343,
		types: ['ground', 'psychic'],
	},
	claydol: {
		dexId: 344,
		types: ['ground', 'psychic'],
	},
	lileep: {
		dexId: 345,
		types: ['rock', 'grass'],
	},
	cradily: {
		dexId: 346,
		types: ['rock', 'grass'],
	},
	anorith: {
		dexId: 347,
		types: ['rock', 'bug'],
	},
	armaldo: {
		dexId: 348,
		types: ['rock', 'bug'],
	},
	feebas: {
		dexId: 349,
		types: ['water'],
	},
	milotic: {
		dexId: 350,
		types: ['water'],
	},
	castform: {
		dexId: 351,
		types: ['normal'],
	},
	kecleon: {
		dexId: 352,
		types: ['normal'],
	},
	shuppet: {
		dexId: 353,
		types: ['ghost'],
		berryLureMapId: 'routeN1E1',
	},
	banette: {
		dexId: 354,
		types: ['ghost'],
	},
	duskull: {
		dexId: 355,
		types: ['ghost'],
	},
	dusclops: {
		dexId: 356,
		types: ['ghost'],
	},
	tropius: {
		dexId: 357,
		types: ['grass', 'flying'],
	},
	chimecho: {
		dexId: 358,
		types: ['psychic'],
	},
	absol: {
		dexId: 359,
		types: ['dark'],
		berryLureMapId: 'routeE1',
	},
	wynaut: {
		dexId: 360,
		types: ['psychic'],
	},
	snorunt: {
		dexId: 361,
		types: ['ice'],
	},
	glalie: {
		dexId: 362,
		types: ['ice'],
	},
	spheal: {
		dexId: 363,
		types: ['ice', 'water'],
	},
	sealeo: {
		dexId: 364,
		types: ['ice', 'water'],
	},
	walrein: {
		dexId: 365,
		types: ['ice', 'water'],
	},
	clamperl: {
		dexId: 366,
		types: ['water'],
	},
	huntail: {
		dexId: 367,
		types: ['water'],
	},
	gorebyss: {
		dexId: 368,
		types: ['water'],
	},
	relicanth: {
		dexId: 369,
		types: ['water', 'rock'],
	},
	luvdisc: {
		dexId: 370,
		types: ['water'],
	},
	bagon: {
		dexId: 371,
		types: ['dragon'],
		berryLureMapId: 'routeE1',
	},
	shelgon: {
		dexId: 372,
		swarm: 'STRONG',
		types: ['dragon'],
	},
	salamence: {
		dexId: 373,
		types: ['dragon', 'flying'],
	},
	beldum: {
		dexId: 374,
		types: ['steel', 'psychic'],
	},
	metang: {
		dexId: 375,
		types: ['steel', 'psychic'],
	},
	metagross: {
		dexId: 376,
		types: ['steel', 'psychic'],
	},
	regirock: {
		dexId: 377,
		types: ['rock'],
	},
	regice: {
		dexId: 378,
		types: ['ice'],
	},
	registeel: {
		dexId: 379,
		types: ['steel'],
	},
	latias: {
		dexId: 380,
		types: ['dragon', 'psychic'],
	},
	latios: {
		dexId: 381,
		types: ['dragon', 'psychic'],
	},
	kyogre: {
		dexId: 382,
		types: ['water'],
	},
	groudon: {
		dexId: 383,
		types: ['ground'],
	},
	rayquaza: {
		dexId: 384,
		types: ['dragon', 'flying'],
	},
	jirachi: {
		dexId: 385,
		types: ['steel', 'psychic'],
	},
	'deoxys-normal': {
		dexId: 386,
		types: ['psychic'],
	},
	turtwig: {
		dexId: 387,
		swarm: 'WEAK',
		types: ['grass'],
	},
	grotle: {
		dexId: 388,
		types: ['grass'],
	},
	torterra: {
		dexId: 389,
		types: ['grass', 'ground'],
	},
	chimchar: {
		dexId: 390,
		swarm: 'WEAK',
		types: ['fire'],
	},
	monferno: {
		dexId: 391,
		types: ['fire', 'fighting'],
	},
	infernape: {
		dexId: 392,
		types: ['fire', 'fighting'],
	},
	piplup: {
		dexId: 393,
		swarm: 'WEAK',
		types: ['water'],
	},
	prinplup: {
		dexId: 394,
		types: ['water'],
	},
	empoleon: {
		dexId: 395,
		types: ['water', 'steel'],
	},
	starly: {
		dexId: 396,
		types: ['normal', 'flying'],
	},
	staravia: {
		dexId: 397,
		types: ['normal', 'flying'],
	},
	staraptor: {
		dexId: 398,
		types: ['normal', 'flying'],
	},
	bidoof: {
		dexId: 399,
		types: ['normal'],
	},
	bibarel: {
		dexId: 400,
		types: ['normal', 'water'],
	},
	kricketot: {
		dexId: 401,
		types: ['bug'],
		berryLureMapId: 'routeN1E1',
	},
	kricketune: {
		dexId: 402,
		types: ['bug'],
	},
	shinx: {
		dexId: 403,
		types: ['electric'],
	},
	luxio: {
		dexId: 404,
		types: ['electric'],
	},
	luxray: {
		dexId: 405,
		types: ['electric'],
	},
	budew: {
		dexId: 406,
		types: ['grass', 'poison'],
		honey: true,
	},
	roserade: {
		dexId: 407,
		types: ['grass', 'poison'],
	},
	cranidos: {
		dexId: 408,
		types: ['rock'],
	},
	rampardos: {
		dexId: 409,
		types: ['rock'],
	},
	shieldon: {
		dexId: 410,
		types: ['rock', 'steel'],
	},
	bastiodon: {
		dexId: 411,
		types: ['rock', 'steel'],
	},
	burmy: {
		dexId: 412,
		types: ['bug'],
		honey: true,
	},
	'wormadam-plant': {
		dexId: 413,
		types: ['bug', 'grass'],
	},
	mothim: {
		dexId: 414,
		types: ['bug', 'flying'],
	},
	combee: {
		dexId: 415,
		types: ['bug', 'flying'],
		honey: true,
	},
	vespiquen: {
		dexId: 416,
		types: ['bug', 'flying'],
	},
	pachirisu: {
		dexId: 417,
		types: ['electric'],
	},
	buizel: {
		dexId: 418,
		types: ['water'],
	},
	floatzel: {
		dexId: 419,
		types: ['water'],
	},
	cherubi: {
		dexId: 420,
		types: ['grass'],
	},
	cherrim: {
		dexId: 421,
		types: ['grass'],
	},
	shellos: {
		dexId: 422,
		types: ['water'],
		berryLureMapId: 'routeN1',
	},
	gastrodon: {
		dexId: 423,
		types: ['water', 'ground'],
	},
	ambipom: {
		dexId: 424,
		types: ['normal'],
	},
	drifloon: {
		dexId: 425,
		types: ['ghost', 'flying'],
	},
	drifblim: {
		dexId: 426,
		types: ['ghost', 'flying'],
	},
	buneary: {
		dexId: 427,
		types: ['normal'],
	},
	lopunny: {
		dexId: 428,
		types: ['normal'],
	},
	mismagius: {
		dexId: 429,
		types: ['ghost'],
	},
	honchkrow: {
		dexId: 430,
		types: ['dark', 'flying'],
	},
	glameow: {
		dexId: 431,
		types: ['normal'],
	},
	purugly: {
		dexId: 432,
		types: ['normal'],
	},
	chingling: {
		dexId: 433,
		types: ['psychic'],
	},
	stunky: {
		dexId: 434,
		types: ['poison', 'dark'],
	},
	skuntank: {
		dexId: 435,
		types: ['poison', 'dark'],
	},
	bronzor: {
		dexId: 436,
		types: ['steel', 'psychic'],
	},
	bronzong: {
		dexId: 437,
		types: ['steel', 'psychic'],
	},
	bonsly: {
		dexId: 438,
		types: ['rock'],
		berryLureMapId: 'routeN1',
	},
	'mime-jr': {
		dexId: 439,
		types: ['psychic', 'fairy'],
	},
	happiny: {
		dexId: 440,
		types: ['normal'],
	},
	chatot: {
		dexId: 441,
		types: ['normal', 'flying'],
	},
	spiritomb: {
		dexId: 442,
		types: ['ghost', 'dark'],
	},
	gible: {
		dexId: 443,
		types: ['dragon', 'ground'],
	},
	gabite: {
		dexId: 444,
		types: ['dragon', 'ground'],
	},
	garchomp: {
		dexId: 445,
		rampager: true,
		types: ['dragon', 'ground'],
	},
	munchlax: {
		dexId: 446,
		types: ['normal'],
		honey: true,
	},
	riolu: {
		dexId: 447,
		types: ['fighting'],
	},
	lucario: {
		dexId: 448,
		types: ['fighting', 'steel'],
	},
	hippopotas: {
		dexId: 449,
		types: ['ground'],
	},
	hippowdon: {
		dexId: 450,
		types: ['ground'],
	},
	skorupi: {
		dexId: 451,
		types: ['poison', 'bug'],
	},
	drapion: {
		dexId: 452,
		rampager: true,
		types: ['poison', 'dark'],
	},
	croagunk: {
		dexId: 453,
		types: ['poison', 'fighting'],
	},
	toxicroak: {
		dexId: 454,
		types: ['poison', 'fighting'],
	},
	carnivine: {
		dexId: 455,
		types: ['grass'],
	},
	finneon: {
		dexId: 456,
		types: ['water'],
	},
	lumineon: {
		dexId: 457,
		types: ['water'],
	},
	mantyke: {
		dexId: 458,
		types: ['water', 'flying'],
	},
	snover: {
		dexId: 459,
		types: ['grass', 'ice'],
	},
	abomasnow: {
		dexId: 460,
		types: ['grass', 'ice'],
	},
	weavile: {
		dexId: 461,
		types: ['dark', 'ice'],
	},
	magnezone: {
		dexId: 462,
		types: ['electric', 'steel'],
	},
	lickilicky: {
		dexId: 463,
		types: ['normal'],
	},
	rhyperior: {
		dexId: 464,
		types: ['ground', 'rock'],
	},
	tangrowth: {
		dexId: 465,
		types: ['grass'],
	},
	electivire: {
		dexId: 466,
		types: ['electric'],
	},
	magmortar: {
		dexId: 467,
		types: ['fire'],
	},
	togekiss: {
		dexId: 468,
		types: ['fairy', 'flying'],
	},
	yanmega: {
		dexId: 469,
		types: ['bug', 'flying'],
	},
	leafeon: {
		dexId: 470,
		types: ['grass'],
	},
	glaceon: {
		dexId: 471,
		types: ['ice'],
	},
	gliscor: {
		dexId: 472,
		types: ['ground', 'flying'],
	},
	mamoswine: {
		dexId: 473,
		types: ['ice', 'ground'],
	},
	'porygon-z': {
		dexId: 474,
		types: ['normal'],
	},
	gallade: {
		dexId: 475,
		types: ['psychic', 'fighting'],
	},
	probopass: {
		dexId: 476,
		types: ['rock', 'steel'],
	},
	dusknoir: {
		dexId: 477,
		types: ['ghost'],
	},
	froslass: {
		dexId: 478,
		types: ['ice', 'ghost'],
	},
	rotom: {
		dexId: 479,
		types: ['electric', 'ghost'],
	},
	uxie: {
		dexId: 480,
		types: ['psychic'],
	},
	mesprit: {
		dexId: 481,
		types: ['psychic'],
	},
	azelf: {
		dexId: 482,
		types: ['psychic'],
	},
	dialga: {
		dexId: 483,
		types: ['steel', 'dragon'],
	},
	palkia: {
		dexId: 484,
		types: ['water', 'dragon'],
	},
	heatran: {
		dexId: 485,
		types: ['fire', 'steel'],
	},
	regigigas: {
		dexId: 486,
		types: ['normal'],
	},
	'giratina-altered': {
		dexId: 487,
		types: ['ghost', 'dragon'],
	},
	cresselia: {
		dexId: 488,
		types: ['psychic'],
	},
	phione: {
		dexId: 489,
		types: ['water'],
	},
	manaphy: {
		dexId: 490,
		types: ['water'],
	},
	darkrai: {
		dexId: 491,
		types: ['dark'],
	},
	'shaymin-land': {
		dexId: 492,
		types: ['grass'],
	},
	arceus: {
		dexId: 493,
		types: ['normal'],
	},
	victini: {
		dexId: 494,
		types: ['psychic', 'fire'],
	},
	snivy: {
		dexId: 495,
		swarm: 'WEAK',
		types: ['grass'],
	},
	servine: {
		dexId: 496,
		types: ['grass'],
	},
	serperior: {
		dexId: 497,
		types: ['grass'],
	},
	tepig: {
		dexId: 498,
		swarm: 'WEAK',
		types: ['fire'],
	},
	pignite: {
		dexId: 499,
		types: ['fire', 'fighting'],
	},
	emboar: {
		dexId: 500,
		types: ['fire', 'fighting'],
	},
	oshawott: {
		dexId: 501,
		swarm: 'WEAK',
		types: ['water'],
	},
	dewott: {
		dexId: 502,
		types: ['water'],
	},
	samurott: {
		dexId: 503,
		types: ['water'],
	},
	patrat: {
		dexId: 504,
		types: ['normal'],
	},
	watchog: {
		dexId: 505,
		types: ['normal'],
	},
	lillipup: {
		dexId: 506,
		types: ['normal'],
	},
	herdier: {
		dexId: 507,
		types: ['normal'],
	},
	stoutland: {
		dexId: 508,
		types: ['normal'],
	},
	purrloin: {
		dexId: 509,
		types: ['dark'],
	},
	liepard: {
		dexId: 510,
		types: ['dark'],
	},
	pansage: {
		dexId: 511,
		types: ['grass'],
	},
	simisage: {
		dexId: 512,
		types: ['grass'],
	},
	pansear: {
		dexId: 513,
		types: ['fire'],
	},
	simisear: {
		dexId: 514,
		types: ['fire'],
	},
	panpour: {
		dexId: 515,
		types: ['water'],
		berryLureMapId: 'routeS1E1',
	},
	simipour: {
		dexId: 516,
		types: ['water'],
		berryLureMapId: 'routeS1W1',
	},
	munna: {
		dexId: 517,
		types: ['psychic'],
	},
	musharna: {
		dexId: 518,
		types: ['psychic'],
	},
	pidove: {
		dexId: 519,
		types: ['normal', 'flying'],
		berryLureMapId: 'routeN1',
	},
	tranquill: {
		dexId: 520,
		types: ['normal', 'flying'],
	},
	unfezant: {
		dexId: 521,
		types: ['normal', 'flying'],
	},
	blitzle: {
		dexId: 522,
		types: ['electric'],
	},
	zebstrika: {
		dexId: 523,
		types: ['electric'],
	},
	roggenrola: {
		dexId: 524,
		types: ['rock'],
		underRock: true,
	},
	boldore: {
		dexId: 525,
		types: ['rock'],
	},
	gigalith: {
		dexId: 526,
		types: ['rock'],
	},
	woobat: {
		dexId: 527,
		types: ['psychic', 'flying'],
	},
	swoobat: {
		dexId: 528,
		types: ['psychic', 'flying'],
	},
	drilbur: {
		dexId: 529,
		types: ['ground'],
	},
	excadrill: {
		dexId: 530,
		types: ['ground', 'steel'],
	},
	audino: {
		dexId: 531,
		types: ['normal'],
	},
	timburr: {
		dexId: 532,
		types: ['fighting'],
		berryLureMapId: 'routeN1',
	},
	gurdurr: {
		dexId: 533,
		types: ['fighting'],
	},
	conkeldurr: {
		dexId: 534,
		types: ['fighting'],
	},
	tympole: {
		dexId: 535,
		types: ['water'],
	},
	palpitoad: {
		dexId: 536,
		types: ['water', 'ground'],
	},
	seismitoad: {
		dexId: 537,
		types: ['water', 'ground'],
	},
	throh: {
		dexId: 538,
		types: ['fighting'],
	},
	sawk: {
		dexId: 539,
		types: ['fighting'],
	},
	sewaddle: {
		dexId: 540,
		types: ['bug', 'grass'],
		berryLureMapId: 'routeN1E1',
	},
	swadloon: {
		dexId: 541,
		types: ['bug', 'grass'],
	},
	leavanny: {
		dexId: 542,
		types: ['bug', 'grass'],
	},
	venipede: {
		dexId: 543,
		types: ['bug', 'poison'],
		berryLureMapId: 'routeS1E1',
	},
	whirlipede: {
		dexId: 544,
		types: ['bug', 'poison'],
	},
	scolipede: {
		dexId: 545,
		rampager: true,
		types: ['bug', 'poison'],
	},
	cottonee: {
		dexId: 546,
		types: ['grass', 'fairy'],
		berryLureMapId: 'routeN1E1',
	},
	whimsicott: {
		dexId: 547,
		types: ['grass', 'fairy'],
	},
	petilil: {
		dexId: 548,
		types: ['grass'],
		honey: true,
	},
	lilligant: {
		dexId: 549,
		types: ['grass'],
	},
	'basculin-red-striped': {
		dexId: 550,
		types: ['water'],
	},
	sandile: {
		dexId: 551,
		types: ['ground', 'dark'],
	},
	krokorok: {
		dexId: 552,
		types: ['ground', 'dark'],
	},
	krookodile: {
		dexId: 553,
		types: ['ground', 'dark'],
	},
	darumaka: {
		dexId: 554,
		types: ['fire'],
	},
	'darmanitan-standard': {
		dexId: 555,
		types: ['fire'],
	},
	maractus: {
		dexId: 556,
		types: ['grass'],
	},
	dwebble: {
		dexId: 557,
		types: ['bug', 'rock'],
		underRock: true,
	},
	crustle: {
		dexId: 558,
		types: ['bug', 'rock'],
	},
	scraggy: {
		dexId: 559,
		types: ['dark', 'fighting'],
	},
	scrafty: {
		dexId: 560,
		types: ['dark', 'fighting'],
	},
	sigilyph: {
		dexId: 561,
		types: ['psychic', 'flying'],
	},
	yamask: {
		dexId: 562,
		types: ['ghost'],
		berryLureMapId: 'routeS1W1',
	},
	cofagrigus: {
		dexId: 563,
		types: ['ghost'],
	},
	tirtouga: {
		dexId: 564,
		types: ['water', 'rock'],
	},
	carracosta: {
		dexId: 565,
		types: ['water', 'rock'],
	},
	archen: {
		dexId: 566,
		types: ['rock', 'flying'],
	},
	archeops: {
		dexId: 567,
		types: ['rock', 'flying'],
	},
	trubbish: {
		dexId: 568,
		types: ['poison'],
	},
	garbodor: {
		dexId: 569,
		types: ['poison'],
	},
	zorua: {
		dexId: 570,
		types: ['dark'],
	},
	zoroark: {
		dexId: 571,
		types: ['dark'],
	},
	minccino: {
		dexId: 572,
		types: ['normal'],
	},
	cinccino: {
		dexId: 573,
		types: ['normal'],
	},
	gothita: {
		dexId: 574,
		types: ['psychic'],
	},
	gothorita: {
		dexId: 575,
		types: ['psychic'],
	},
	gothitelle: {
		dexId: 576,
		types: ['psychic'],
	},
	solosis: {
		dexId: 577,
		types: ['psychic'],
	},
	duosion: {
		dexId: 578,
		types: ['psychic'],
	},
	reuniclus: {
		dexId: 579,
		types: ['psychic'],
	},
	ducklett: {
		dexId: 580,
		types: ['water', 'flying'],
	},
	swanna: {
		dexId: 581,
		types: ['water', 'flying'],
	},
	vanillite: {
		dexId: 582,
		types: ['ice'],
	},
	vanillish: {
		dexId: 583,
		types: ['ice'],
	},
	vanilluxe: {
		dexId: 584,
		types: ['ice'],
	},
	deerling: {
		dexId: 585,
		types: ['normal', 'grass'],
	},
	sawsbuck: {
		dexId: 586,
		types: ['normal', 'grass'],
	},
	emolga: {
		dexId: 587,
		types: ['electric', 'flying'],
	},
	karrablast: {
		dexId: 588,
		types: ['bug'],
	},
	escavalier: {
		dexId: 589,
		types: ['bug', 'steel'],
	},
	foongus: {
		dexId: 590,
		types: ['grass', 'poison'],
	},
	amoonguss: {
		dexId: 591,
		swarm: 'STRONG',
		types: ['grass', 'poison'],
	},
	frillish: {
		dexId: 592,
		types: ['water', 'ghost'],
	},
	jellicent: {
		dexId: 593,
		types: ['water', 'ghost'],
	},
	alomomola: {
		dexId: 594,
		types: ['water'],
	},
	joltik: {
		dexId: 595,
		types: ['bug', 'electric'],
	},
	galvantula: {
		dexId: 596,
		types: ['bug', 'electric'],
	},
	ferroseed: {
		dexId: 597,
		types: ['grass', 'steel'],
	},
	ferrothorn: {
		dexId: 598,
		types: ['grass', 'steel'],
	},
	klink: {
		dexId: 599,
		types: ['steel'],
	},
	klang: {
		dexId: 600,
		types: ['steel'],
	},
	klinklang: {
		dexId: 601,
		types: ['steel'],
	},
	tynamo: {
		dexId: 602,
		types: ['electric'],
	},
	eelektrik: {
		dexId: 603,
		types: ['electric'],
	},
	eelektross: {
		dexId: 604,
		types: ['electric'],
	},
	elgyem: {
		dexId: 605,
		types: ['psychic'],
	},
	beheeyem: {
		dexId: 606,
		types: ['psychic'],
	},
	litwick: {
		dexId: 607,
		types: ['ghost', 'fire'],
	},
	lampent: {
		dexId: 608,
		types: ['ghost', 'fire'],
	},
	chandelure: {
		dexId: 609,
		types: ['ghost', 'fire'],
	},
	axew: {
		dexId: 610,
		types: ['dragon'],
	},
	fraxure: {
		dexId: 611,
		types: ['dragon'],
	},
	haxorus: {
		dexId: 612,
		types: ['dragon'],
	},
	cubchoo: {
		dexId: 613,
		types: ['ice'],
	},
	beartic: {
		dexId: 614,
		rampager: true,
		types: ['ice'],
	},
	cryogonal: {
		dexId: 615,
		types: ['ice'],
	},
	shelmet: {
		dexId: 616,
		types: ['bug'],
	},
	accelgor: {
		dexId: 617,
		types: ['bug'],
		berryLureMapId: 'routeS1W1',
	},
	stunfisk: {
		dexId: 618,
		types: ['ground', 'electric'],
		underRock: true,
	},
	mienfoo: {
		dexId: 619,
		types: ['fighting'],
	},
	mienshao: {
		dexId: 620,
		types: ['fighting'],
	},
	druddigon: {
		dexId: 621,
		types: ['dragon'],
	},
	golett: {
		dexId: 622,
		types: ['ground', 'ghost'],
	},
	golurk: {
		dexId: 623,
		types: ['ground', 'ghost'],
	},
	pawniard: {
		dexId: 624,
		types: ['dark', 'steel'],
	},
	bisharp: {
		dexId: 625,
		types: ['dark', 'steel'],
	},
	bouffalant: {
		dexId: 626,
		types: ['normal'],
	},
	rufflet: {
		dexId: 627,
		types: ['normal', 'flying'],
	},
	braviary: {
		dexId: 628,
		types: ['normal', 'flying'],
	},
	vullaby: {
		dexId: 629,
		types: ['dark', 'flying'],
	},
	mandibuzz: {
		dexId: 630,
		types: ['dark', 'flying'],
	},
	heatmor: {
		dexId: 631,
		types: ['fire'],
		berryLureMapId: 'routeS1W1',
	},
	durant: {
		dexId: 632,
		types: ['bug', 'steel'],
	},
	deino: {
		dexId: 633,
		types: ['dark', 'dragon'],
		berryLureMapId: 'routeS1W1',
	},
	zweilous: {
		dexId: 634,
		swarm: 'STRONG',
		types: ['dark', 'dragon'],
	},
	hydreigon: {
		dexId: 635,
		types: ['dark', 'dragon'],
	},
	larvesta: {
		dexId: 636,
		types: ['bug', 'fire'],
	},
	volcarona: {
		dexId: 637,
		swarm: 'STRONG',
		types: ['bug', 'fire'],
	},
	cobalion: {
		dexId: 638,
		types: ['steel', 'fighting'],
	},
	terrakion: {
		dexId: 639,
		types: ['rock', 'fighting'],
	},
	virizion: {
		dexId: 640,
		types: ['grass', 'fighting'],
	},
	'tornadus-incarnate': {
		dexId: 641,
		types: ['flying'],
	},
	'thundurus-incarnate': {
		dexId: 642,
		types: ['electric', 'flying'],
	},
	reshiram: {
		dexId: 643,
		types: ['dragon', 'fire'],
	},
	zekrom: {
		dexId: 644,
		types: ['dragon', 'electric'],
	},
	'landorus-incarnate': {
		dexId: 645,
		types: ['ground', 'flying'],
	},
	kyurem: {
		dexId: 646,
		types: ['dragon', 'ice'],
	},
	'keldeo-ordinary': {
		dexId: 647,
		types: ['water', 'fighting'],
	},
	'meloetta-aria': {
		dexId: 648,
		types: ['normal', 'psychic'],
	},
	genesect: {
		dexId: 649,
		types: ['bug', 'steel'],
	},
	chespin: {
		dexId: 650,
		swarm: 'WEAK',
		types: ['grass'],
	},
	quilladin: {
		dexId: 651,
		types: ['grass'],
	},
	chesnaught: {
		dexId: 652,
		types: ['grass', 'fighting'],
	},
	fennekin: {
		dexId: 653,
		swarm: 'WEAK',
		types: ['fire'],
	},
	braixen: {
		dexId: 654,
		types: ['fire'],
	},
	delphox: {
		dexId: 655,
		types: ['fire', 'psychic'],
	},
	froakie: {
		dexId: 656,
		swarm: 'WEAK',
		types: ['water'],
	},
	frogadier: {
		dexId: 657,
		types: ['water'],
	},
	greninja: {
		dexId: 658,
		types: ['water', 'dark'],
	},
	bunnelby: {
		dexId: 659,
		types: ['normal'],
		berryLureMapId: 'routeS1E1',
	},
	diggersby: {
		dexId: 660,
		types: ['normal', 'ground'],
	},
	fletchling: {
		dexId: 661,
		types: ['normal', 'flying'],
	},
	fletchinder: {
		dexId: 662,
		types: ['fire', 'flying'],
	},
	talonflame: {
		dexId: 663,
		types: ['fire', 'flying'],
	},
	scatterbug: {
		dexId: 664,
		types: ['bug'],
	},
	spewpa: {
		dexId: 665,
		types: ['bug'],
	},
	vivillon: {
		dexId: 666,
		types: ['bug', 'flying'],
		berryLureMapId: 'routeS1E1',
	},
	litleo: {
		dexId: 667,
		types: ['fire', 'normal'],
	},
	pyroar: {
		dexId: 668,
		types: ['fire', 'normal'],
	},
	flabebe: {
		dexId: 669,
		types: ['fairy'],
	},
	floette: {
		dexId: 670,
		types: ['fairy'],
	},
	florges: {
		dexId: 671,
		types: ['fairy'],
	},
	skiddo: {
		dexId: 672,
		types: ['grass'],
	},
	gogoat: {
		dexId: 673,
		types: ['grass'],
		berryLureMapId: 'routeS1E1',
	},
	pancham: {
		dexId: 674,
		types: ['fighting'],
	},
	pangoro: {
		dexId: 675,
		rampager: true,
		types: ['fighting', 'dark'],
	},
	furfrou: {
		dexId: 676,
		types: ['normal'],
		berryLureMapId: 'routeE1',
	},
	espurr: {
		dexId: 677,
		types: ['psychic'],
	},
	'meowstic-male': {
		dexId: 678,
		types: ['psychic'],
	},
	honedge: {
		dexId: 679,
		types: ['steel', 'ghost'],
	},
	doublade: {
		dexId: 680,
		types: ['steel', 'ghost'],
	},
	'aegislash-shield': {
		dexId: 681,
		types: ['steel', 'ghost'],
	},
	spritzee: {
		dexId: 682,
		types: ['fairy'],
	},
	aromatisse: {
		dexId: 683,
		types: ['fairy'],
	},
	swirlix: {
		dexId: 684,
		types: ['fairy'],
		berryLureMapId: 'routeE1',
	},
	slurpuff: {
		dexId: 685,
		types: ['fairy'],
		berryLureMapId: 'routeS1W1',
	},
	inkay: {
		dexId: 686,
		types: ['dark', 'psychic'],
	},
	malamar: {
		dexId: 687,
		types: ['dark', 'psychic'],
	},
	binacle: {
		dexId: 688,
		types: ['rock', 'water'],
		berryLureMapId: 'routeE1',
	},
	barbaracle: {
		dexId: 689,
		types: ['rock', 'water'],
	},
	skrelp: {
		dexId: 690,
		types: ['poison', 'water'],
	},
	dragalge: {
		dexId: 691,
		types: ['poison', 'dragon'],
	},
	clauncher: {
		dexId: 692,
		types: ['water'],
	},
	clawitzer: {
		dexId: 693,
		types: ['water'],
	},
	helioptile: {
		dexId: 694,
		types: ['electric', 'normal'],
	},
	heliolisk: {
		dexId: 695,
		types: ['electric', 'normal'],
	},
	tyrunt: {
		dexId: 696,
		types: ['rock', 'dragon'],
	},
	tyrantrum: {
		dexId: 697,
		types: ['rock', 'dragon'],
	},
	amaura: {
		dexId: 698,
		types: ['rock', 'ice'],
	},
	aurorus: {
		dexId: 699,
		types: ['rock', 'ice'],
	},
	sylveon: {
		dexId: 700,
		types: ['fairy'],
	},
	hawlucha: {
		dexId: 701,
		types: ['fighting', 'flying'],
		berryLureMapId: 'routeS1W1',
	},
	dedenne: {
		dexId: 702,
		types: ['electric', 'fairy'],
	},
	carbink: {
		dexId: 703,
		types: ['rock', 'fairy'],
	},
	goomy: {
		dexId: 704,
		types: ['dragon'],
	},
	sliggoo: {
		dexId: 705,
		types: ['dragon'],
	},
	goodra: {
		dexId: 706,
		types: ['dragon'],
	},
	klefki: {
		dexId: 707,
		types: ['steel', 'fairy'],
	},
	phantump: {
		dexId: 708,
		types: ['ghost', 'grass'],
		berryLureMapId: 'routeN1',
	},
	trevenant: {
		dexId: 709,
		types: ['ghost', 'grass'],
	},
	'pumpkaboo-average': {
		dexId: 710,
		types: ['ghost', 'grass'],
	},
	'gourgeist-average': {
		dexId: 711,
		types: ['ghost', 'grass'],
	},
	bergmite: {
		dexId: 712,
		types: ['ice'],
		berryLureMapId: 'routeE1',
	},
	avalugg: {
		dexId: 713,
		types: ['ice'],
	},
	noibat: {
		dexId: 714,
		types: ['flying', 'dragon'],
	},
	noivern: {
		dexId: 715,
		types: ['flying', 'dragon'],
	},
	xerneas: {
		dexId: 716,
		types: ['fairy'],
	},
	yveltal: {
		dexId: 717,
		types: ['dark', 'flying'],
	},
	'zygarde-50': {
		dexId: 718,
		types: ['dragon', 'ground'],
	},
	diancie: {
		dexId: 719,
		types: ['rock', 'fairy'],
	},
	hoopa: {
		dexId: 720,
		types: ['psychic', 'ghost'],
	},
	volcanion: {
		dexId: 721,
		types: ['fire', 'water'],
	},
	rowlet: {
		dexId: 722,
		swarm: 'WEAK',
		types: ['grass', 'flying'],
	},
	dartrix: {
		dexId: 723,
		types: ['grass', 'flying'],
	},
	decidueye: {
		dexId: 724,
		types: ['grass', 'ghost'],
	},
	litten: {
		dexId: 725,
		swarm: 'WEAK',
		types: ['fire'],
	},
	torracat: {
		dexId: 726,
		types: ['fire'],
	},
	incineroar: {
		dexId: 727,
		types: ['fire', 'dark'],
	},
	popplio: {
		dexId: 728,
		swarm: 'WEAK',
		types: ['water'],
	},
	brionne: {
		dexId: 729,
		types: ['water'],
	},
	primarina: {
		dexId: 730,
		types: ['water', 'fairy'],
	},
	pikipek: {
		dexId: 731,
		types: ['normal', 'flying'],
	},
	trumbeak: {
		dexId: 732,
		types: ['normal', 'flying'],
	},
	toucannon: {
		dexId: 733,
		types: ['normal', 'flying'],
	},
	yungoos: {
		dexId: 734,
		types: ['normal'],
		berryLureMapId: 'routeS1W1',
	},
	gumshoos: {
		dexId: 735,
		types: ['normal'],
	},
	grubbin: {
		dexId: 736,
		types: ['bug'],
	},
	charjabug: {
		dexId: 737,
		types: ['bug', 'electric'],
	},
	vikavolt: {
		dexId: 738,
		types: ['bug', 'electric'],
	},
	crabrawler: {
		dexId: 739,
		types: ['fighting'],
	},
	crabominable: {
		dexId: 740,
		types: ['fighting', 'ice'],
	},
	'oricorio-baile': {
		dexId: 741,
		types: ['fire', 'flying'],
	},
	cutiefly: {
		dexId: 742,
		types: ['bug', 'fairy'],
	},
	ribombee: {
		dexId: 743,
		types: ['bug', 'fairy'],
	},
	rockruff: {
		dexId: 744,
		types: ['rock'],
	},
	'lycanroc-midday': {
		dexId: 745,
		types: ['rock'],
	},
	'wishiwashi-solo': {
		dexId: 746,
		types: ['water'],
	},
	mareanie: {
		dexId: 747,
		types: ['poison', 'water'],
	},
	toxapex: {
		dexId: 748,
		types: ['poison', 'water'],
	},
	mudbray: {
		dexId: 749,
		types: ['ground'],
	},
	mudsdale: {
		dexId: 750,
		types: ['ground'],
	},
	dewpider: {
		dexId: 751,
		types: ['water', 'bug'],
		berryLureMapId: 'routeN1E1',
	},
	araquanid: {
		dexId: 752,
		types: ['water', 'bug'],
	},
	fomantis: {
		dexId: 753,
		types: ['grass'],
	},
	lurantis: {
		dexId: 754,
		types: ['grass'],
	},
	morelull: {
		dexId: 755,
		types: ['grass', 'fairy'],
	},
	shiinotic: {
		dexId: 756,
		types: ['grass', 'fairy'],
	},
	salandit: {
		dexId: 757,
		types: ['poison', 'fire'],
	},
	salazzle: {
		dexId: 758,
		types: ['poison', 'fire'],
	},
	stufful: {
		dexId: 759,
		types: ['normal', 'fighting'],
	},
	bewear: {
		dexId: 760,
		types: ['normal', 'fighting'],
	},
	bounsweet: {
		dexId: 761,
		types: ['grass'],
	},
	steenee: {
		dexId: 762,
		types: ['grass'],
	},
	tsareena: {
		dexId: 763,
		types: ['grass'],
	},
	comfey: {
		dexId: 764,
		types: ['fairy'],
	},
	oranguru: {
		dexId: 765,
		rampager: true,
		types: ['normal', 'psychic'],
	},
	passimian: {
		dexId: 766,
		types: ['fighting'],
	},
	wimpod: {
		dexId: 767,
		types: ['bug', 'water'],
	},
	golisopod: {
		dexId: 768,
		types: ['bug', 'water'],
	},
	sandygast: {
		dexId: 769,
		types: ['ghost', 'ground'],
	},
	palossand: {
		dexId: 770,
		types: ['ghost', 'ground'],
	},
	pyukumuku: {
		dexId: 771,
		types: ['water'],
	},
	'type-null': {
		dexId: 772,
		types: ['normal'],
	},
	silvally: {
		dexId: 773,
		types: ['normal'],
	},
	'minior-red-meteor': {
		dexId: 774,
		types: ['rock', 'flying'],
	},
	komala: {
		dexId: 775,
		types: ['normal'],
	},
	turtonator: {
		dexId: 776,
		types: ['fire', 'dragon'],
	},
	togedemaru: {
		dexId: 777,
		types: ['electric', 'steel'],
		berryLureMapId: 'routeS1E1',
	},
	'mimikyu-disguised': {
		dexId: 778,
		types: ['ghost', 'fairy'],
	},
	bruxish: {
		dexId: 779,
		types: ['water', 'psychic'],
	},
	drampa: {
		dexId: 780,
		types: ['normal', 'dragon'],
	},
	dhelmise: {
		dexId: 781,
		types: ['ghost', 'grass'],
	},
	'jangmo-o': {
		dexId: 782,
		types: ['dragon'],
		berryLureMapId: 'routeN1E1',
	},
	'hakamo-o': {
		dexId: 783,
		types: ['dragon', 'fighting'],
	},
	'kommo-o': {
		dexId: 784,
		rampager: true,
		types: ['dragon', 'fighting'],
	},
	'tapu-koko': {
		dexId: 785,
		types: ['electric', 'fairy'],
	},
	'tapu-lele': {
		dexId: 786,
		types: ['psychic', 'fairy'],
	},
	'tapu-bulu': {
		dexId: 787,
		types: ['grass', 'fairy'],
	},
	'tapu-fini': {
		dexId: 788,
		types: ['water', 'fairy'],
	},
	cosmog: {
		dexId: 789,
		types: ['psychic'],
	},
	cosmoem: {
		dexId: 790,
		types: ['psychic'],
	},
	solgaleo: {
		dexId: 791,
		types: ['psychic', 'steel'],
	},
	lunala: {
		dexId: 792,
		types: ['psychic', 'ghost'],
	},
	nihilego: {
		dexId: 793,
		swarm: 'SPACE_DISTORTION',
		types: ['rock', 'poison'],
	},
	buzzwole: {
		dexId: 794,
		swarm: 'SPACE_DISTORTION',
		types: ['bug', 'fighting'],
	},
	pheromosa: {
		dexId: 795,
		swarm: 'SPACE_DISTORTION',
		types: ['bug', 'fighting'],
	},
	xurkitree: {
		dexId: 796,
		swarm: 'SPACE_DISTORTION',
		types: ['electric'],
	},
	celesteela: {
		dexId: 797,
		swarm: 'SPACE_DISTORTION',
		types: ['steel', 'flying'],
	},
	kartana: {
		dexId: 798,
		swarm: 'SPACE_DISTORTION',
		types: ['grass', 'steel'],
	},
	guzzlord: {
		dexId: 799,
		swarm: 'SPACE_DISTORTION',
		types: ['dark', 'dragon'],
	},
	necrozma: {
		dexId: 800,
		types: ['psychic'],
	},
	magearna: {
		dexId: 801,
		types: ['steel', 'fairy'],
	},
	marshadow: {
		dexId: 802,
		types: ['fighting', 'ghost'],
	},
	poipole: {
		dexId: 803,
		swarm: 'SPACE_DISTORTION',
		types: ['poison'],
	},
	naganadel: {
		dexId: 804,
		types: ['poison', 'dragon'],
	},
	stakataka: {
		dexId: 805,
		swarm: 'SPACE_DISTORTION',
		types: ['rock', 'steel'],
	},
	blacephalon: {
		dexId: 806,
		swarm: 'SPACE_DISTORTION',
		types: ['fire', 'ghost'],
	},
	zeraora: {
		dexId: 807,
		types: ['electric'],
	},
	meltan: {
		dexId: 808,
		types: ['steel'],
	},
	melmetal: {
		dexId: 809,
		types: ['steel'],
	},
	grookey: {
		dexId: 810,
		swarm: 'WEAK',
		types: ['grass'],
	},
	thwackey: {
		dexId: 811,
		types: ['grass'],
	},
	rillaboom: {
		dexId: 812,
		types: ['grass'],
	},
	scorbunny: {
		dexId: 813,
		swarm: 'WEAK',
		types: ['fire'],
	},
	raboot: {
		dexId: 814,
		types: ['fire'],
	},
	cinderace: {
		dexId: 815,
		types: ['fire'],
	},
	sobble: {
		dexId: 816,
		swarm: 'WEAK',
		types: ['water'],
	},
	drizzile: {
		dexId: 817,
		types: ['water'],
	},
	inteleon: {
		dexId: 818,
		types: ['water'],
	},
	skwovet: {
		dexId: 819,
		types: ['normal'],
	},
	greedent: {
		dexId: 820,
		types: ['normal'],
	},
	rookidee: {
		dexId: 821,
		types: ['flying'],
	},
	corvisquire: {
		dexId: 822,
		types: ['flying'],
		berryLureMapId: 'routeE1',
	},
	corviknight: {
		dexId: 823,
		types: ['flying', 'steel'],
	},
	blipbug: {
		dexId: 824,
		types: ['bug'],
		berryLureMapId: 'routeN1',
	},
	dottler: {
		dexId: 825,
		types: ['bug', 'psychic'],
	},
	orbeetle: {
		dexId: 826,
		types: ['bug', 'psychic'],
	},
	nickit: {
		dexId: 827,
		types: ['dark'],
	},
	thievul: {
		dexId: 828,
		types: ['dark'],
	},
	gossifleur: {
		dexId: 829,
		types: ['grass'],
	},
	eldegoss: {
		dexId: 830,
		types: ['grass'],
	},
	wooloo: {
		dexId: 831,
		types: ['normal'],
	},
	dubwool: {
		dexId: 832,
		types: ['normal'],
	},
	chewtle: {
		dexId: 833,
		types: ['water'],
	},
	drednaw: {
		dexId: 834,
		types: ['water', 'rock'],
	},
	yamper: {
		dexId: 835,
		types: ['electric'],
	},
	boltund: {
		dexId: 836,
		types: ['electric'],
	},
	rolycoly: {
		dexId: 837,
		types: ['rock'],
	},
	carkol: {
		dexId: 838,
		types: ['rock', 'fire'],
	},
	coalossal: {
		dexId: 839,
		types: ['rock', 'fire'],
	},
	applin: {
		dexId: 840,
		types: ['grass', 'dragon'],
		berryLureMapId: 'routeN1',
	},
	flapple: {
		dexId: 841,
		types: ['grass', 'dragon'],
	},
	appletun: {
		dexId: 842,
		types: ['grass', 'dragon'],
	},
	silicobra: {
		dexId: 843,
		types: ['ground'],
	},
	sandaconda: {
		dexId: 844,
		types: ['ground'],
	},
	cramorant: {
		dexId: 845,
		types: ['flying', 'water'],
	},
	arrokuda: {
		dexId: 846,
		types: ['water'],
	},
	barraskewda: {
		dexId: 847,
		types: ['water'],
	},
	toxel: {
		dexId: 848,
		types: ['electric', 'poison'],
	},
	'toxtricity-amped': {
		dexId: 849,
		types: ['electric', 'poison'],
	},
	sizzlipede: {
		dexId: 850,
		types: ['fire', 'bug'],
		berryLureMapId: 'routeN1E1',
	},
	centiskorch: {
		dexId: 851,
		types: ['fire', 'bug'],
	},
	clobbopus: {
		dexId: 852,
		types: ['fighting'],
	},
	grapploct: {
		dexId: 853,
		types: ['fighting'],
	},
	sinistea: {
		dexId: 854,
		types: ['ghost'],
	},
	polteageist: {
		dexId: 855,
		types: ['ghost'],
	},
	hatenna: {
		dexId: 856,
		types: ['psychic'],
	},
	hattrem: {
		dexId: 857,
		types: ['psychic'],
	},
	hatterene: {
		dexId: 858,
		types: ['psychic', 'fairy'],
	},
	impidimp: {
		dexId: 859,
		types: ['dark', 'fairy'],
	},
	morgrem: {
		dexId: 860,
		types: ['dark', 'fairy'],
	},
	grimmsnarl: {
		dexId: 861,
		types: ['dark', 'fairy'],
	},
	obstagoon: {
		dexId: 862,
		types: ['dark', 'normal'],
	},
	perrserker: {
		dexId: 863,
		types: ['steel'],
	},
	cursola: {
		dexId: 864,
		types: ['ghost'],
	},
	sirfetchd: {
		dexId: 865,
		types: ['fighting'],
	},
	'mr-rime': {
		dexId: 866,
		types: ['ice', 'psychic'],
	},
	runerigus: {
		dexId: 867,
		types: ['ground', 'ghost'],
	},
	milcery: {
		dexId: 868,
		types: ['fairy'],
	},
	alcremie: {
		dexId: 869,
		types: ['fairy'],
	},
	falinks: {
		dexId: 870,
		types: ['fighting'],
	},
	pincurchin: {
		dexId: 871,
		types: ['electric'],
	},
	snom: {
		dexId: 872,
		types: ['ice', 'bug'],
		berryLureMapId: 'routeN1E1',
	},
	frosmoth: {
		dexId: 873,
		types: ['ice', 'bug'],
	},
	stonjourner: {
		dexId: 874,
		types: ['rock'],
	},
	'eiscue-ice': {
		dexId: 875,
		types: ['ice'],
	},
	'indeedee-male': {
		dexId: 876,
		types: ['psychic', 'normal'],
	},
	'morpeko-full-belly': {
		dexId: 877,
		types: ['electric', 'dark'],
	},
	cufant: {
		dexId: 878,
		types: ['steel'],
		berryLureMapId: 'routeN1',
	},
	copperajah: {
		dexId: 879,
		types: ['steel'],
	},
	dracozolt: {
		dexId: 880,
		types: ['electric', 'dragon'],
	},
	arctozolt: {
		dexId: 881,
		types: ['electric', 'ice'],
	},
	dracovish: {
		dexId: 882,
		types: ['water', 'dragon'],
	},
	arctovish: {
		dexId: 883,
		types: ['water', 'ice'],
	},
	duraludon: {
		dexId: 884,
		types: ['steel', 'dragon'],
	},
	dreepy: {
		dexId: 885,
		types: ['dragon', 'ghost'],
	},
	drakloak: {
		dexId: 886,
		types: ['dragon', 'ghost'],
	},
	dragapult: {
		dexId: 887,
		types: ['dragon', 'ghost'],
	},
	zacian: {
		dexId: 888,
		types: ['fairy'],
	},
	zamazenta: {
		dexId: 889,
		types: ['fighting'],
	},
	eternatus: {
		dexId: 890,
		types: ['poison', 'dragon'],
	},
	kubfu: {
		dexId: 891,
		types: ['fighting'],
	},
	'urshifu-single-strike': {
		dexId: 892,
		types: ['fighting', 'dark'],
	},
	zarude: {
		dexId: 893,
		types: ['dark', 'grass'],
	},
	regieleki: {
		dexId: 894,
		types: ['electric'],
	},
	regidrago: {
		dexId: 895,
		types: ['dragon'],
	},
	glastrier: {
		dexId: 896,
		types: ['ice'],
	},
	spectrier: {
		dexId: 897,
		types: ['ghost'],
	},
	calyrex: {
		dexId: 898,
		types: ['psychic', 'grass'],
	},
	wyrdeer: {
		dexId: 899,
		types: ['normal', 'psychic'],
	},
	kleavor: {
		dexId: 900,
		types: ['bug', 'rock'],
	},
	ursaluna: {
		dexId: 901,
		types: ['ground', 'normal'],
	},
	'basculegion-male': {
		dexId: 902,
		types: ['water', 'ghost'],
	},
	sneasler: {
		dexId: 903,
		types: ['fighting', 'poison'],
	},
	overqwil: {
		dexId: 904,
		types: ['dark', 'poison'],
	},
	'enamorus-incarnate': {
		dexId: 905,
		types: ['fairy', 'flying'],
	},
	sprigatito: {
		dexId: 906,
		swarm: 'WEAK',
		types: ['grass'],
	},
	floragato: {
		dexId: 907,
		types: ['grass'],
	},
	meowscarada: {
		dexId: 908,
		types: ['grass', 'dark'],
	},
	fuecoco: {
		dexId: 909,
		swarm: 'WEAK',
		types: ['fire'],
	},
	crocalor: {
		dexId: 910,
		types: ['fire'],
	},
	skeledirge: {
		dexId: 911,
		types: ['fire', 'ghost'],
	},
	quaxly: {
		dexId: 912,
		swarm: 'WEAK',
		types: ['water'],
	},
	quaxwell: {
		dexId: 913,
		types: ['water'],
	},
	quaquaval: {
		dexId: 914,
		types: ['water', 'fighting'],
	},
	lechonk: {
		dexId: 915,
		types: ['normal'],
	},
	'oinkologne-male': {
		dexId: 916,
		types: ['normal'],
	},
	tarountula: {
		dexId: 917,
		types: ['bug'],
	},
	spidops: {
		dexId: 918,
		types: ['bug'],
	},
	nymble: {
		dexId: 919,
		types: ['bug'],
	},
	lokix: {
		dexId: 920,
		types: ['bug', 'dark'],
	},
	pawmi: {
		dexId: 921,
		types: ['electric'],
	},
	pawmo: {
		dexId: 922,
		types: ['electric', 'fighting'],
	},
	pawmot: {
		dexId: 923,
		types: ['electric', 'fighting'],
	},
	tandemaus: {
		dexId: 924,
		types: ['normal'],
	},
	'maushold-family-of-four': {
		dexId: 925,
		types: ['normal'],
	},
	fidough: {
		dexId: 926,
		types: ['fairy'],
	},
	dachsbun: {
		dexId: 927,
		types: ['fairy'],
	},
	smoliv: {
		dexId: 928,
		types: ['grass', 'normal'],
	},
	dolliv: {
		dexId: 929,
		types: ['grass', 'normal'],
	},
	arboliva: {
		dexId: 930,
		types: ['grass', 'normal'],
	},
	'squawkabilly-green-plumage': {
		dexId: 931,
		types: ['normal', 'flying'],
	},
	nacli: {
		dexId: 932,
		types: ['rock'],
		underRock: true,
	},
	naclstack: {
		dexId: 933,
		types: ['rock'],
	},
	garganacl: {
		dexId: 934,
		types: ['rock'],
	},
	charcadet: {
		dexId: 935,
		types: ['fire'],
	},
	armarouge: {
		dexId: 936,
		types: ['fire', 'psychic'],
	},
	ceruledge: {
		dexId: 937,
		types: ['fire', 'ghost'],
	},
	tadbulb: {
		dexId: 938,
		types: ['electric'],
	},
	bellibolt: {
		dexId: 939,
		types: ['electric'],
	},
	wattrel: {
		dexId: 940,
		types: ['electric', 'flying'],
	},
	kilowattrel: {
		dexId: 941,
		types: ['electric', 'flying'],
	},
	maschiff: {
		dexId: 942,
		types: ['dark'],
	},
	mabosstiff: {
		dexId: 943,
		types: ['dark'],
	},
	shroodle: {
		dexId: 944,
		types: ['poison', 'normal'],
	},
	grafaiai: {
		dexId: 945,
		types: ['poison', 'normal'],
	},
	bramblin: {
		dexId: 946,
		types: ['grass', 'ghost'],
	},
	brambleghast: {
		dexId: 947,
		types: ['grass', 'ghost'],
	},
	toedscool: {
		dexId: 948,
		types: ['ground', 'grass'],
	},
	toedscruel: {
		dexId: 949,
		types: ['ground', 'grass'],
	},
	klawf: {
		dexId: 950,
		types: ['rock'],
		underRock: true,
	},
	capsakid: {
		dexId: 951,
		types: ['grass'],
	},
	scovillain: {
		dexId: 952,
		types: ['grass', 'fire'],
	},
	rellor: {
		dexId: 953,
		types: ['bug'],
	},
	rabsca: {
		dexId: 954,
		types: ['bug', 'psychic'],
	},
	flittle: {
		dexId: 955,
		types: ['psychic'],
	},
	espathra: {
		dexId: 956,
		types: ['psychic'],
	},
	tinkatink: {
		dexId: 957,
		types: ['fairy', 'steel'],
	},
	tinkatuff: {
		dexId: 958,
		types: ['fairy', 'steel'],
	},
	tinkaton: {
		dexId: 959,
		types: ['fairy', 'steel'],
	},
	wiglett: {
		dexId: 960,
		types: ['water'],
	},
	wugtrio: {
		dexId: 961,
		types: ['water'],
	},
	bombirdier: {
		dexId: 962,
		types: ['flying', 'dark'],
	},
	finizen: {
		dexId: 963,
		types: ['water'],
	},
	'palafin-zero': {
		dexId: 964,
		types: ['water'],
	},
	varoom: {
		dexId: 965,
		types: ['steel', 'poison'],
	},
	revavroom: {
		dexId: 966,
		types: ['steel', 'poison'],
	},
	cyclizar: {
		dexId: 967,
		swarm: 'STRONG',
		types: ['dragon', 'normal'],
	},
	orthworm: {
		dexId: 968,
		types: ['steel'],
		berryLureMapId: 'routeS1W1',
	},
	glimmet: {
		dexId: 969,
		types: ['rock', 'poison'],
	},
	glimmora: {
		dexId: 970,
		types: ['rock', 'poison'],
	},
	greavard: {
		dexId: 971,
		types: ['ghost'],
	},
	houndstone: {
		dexId: 972,
		types: ['ghost'],
	},
	flamigo: {
		dexId: 973,
		types: ['flying', 'fighting'],
	},
	cetoddle: {
		dexId: 974,
		types: ['ice'],
	},
	cetitan: {
		dexId: 975,
		types: ['ice'],
	},
	veluza: {
		dexId: 976,
		types: ['water', 'psychic'],
	},
	dondozo: {
		dexId: 977,
		types: ['water'],
	},
	'tatsugiri-curly': {
		dexId: 978,
		types: ['dragon', 'water'],
	},
	annihilape: {
		dexId: 979,
		types: ['fighting', 'ghost'],
	},
	clodsire: {
		dexId: 980,
		types: ['poison', 'ground'],
	},
	farigiraf: {
		dexId: 981,
		types: ['normal', 'psychic'],
	},
	'dudunsparce-two-segment': {
		dexId: 982,
		types: ['normal'],
	},
	kingambit: {
		dexId: 983,
		types: ['dark', 'steel'],
	},
	'great-tusk': {
		dexId: 984,
		swarm: 'PAST_DISTORTION',
		types: ['ground', 'fighting'],
	},
	'scream-tail': {
		dexId: 985,
		swarm: 'PAST_DISTORTION',
		types: ['fairy', 'psychic'],
	},
	'brute-bonnet': {
		dexId: 986,
		swarm: 'PAST_DISTORTION',
		types: ['grass', 'dark'],
	},
	'flutter-mane': {
		dexId: 987,
		swarm: 'PAST_DISTORTION',
		types: ['ghost', 'fairy'],
	},
	'slither-wing': {
		dexId: 988,
		swarm: 'PAST_DISTORTION',
		types: ['bug', 'fighting'],
	},
	'sandy-shocks': {
		dexId: 989,
		swarm: 'PAST_DISTORTION',
		types: ['electric', 'ground'],
	},
	'iron-treads': {
		dexId: 990,
		swarm: 'FUTURE_DISTORTION',
		types: ['ground', 'steel'],
	},
	'iron-bundle': {
		dexId: 991,
		swarm: 'FUTURE_DISTORTION',
		types: ['ice', 'water'],
	},
	'iron-hands': {
		dexId: 992,
		swarm: 'FUTURE_DISTORTION',
		types: ['fighting', 'electric'],
	},
	'iron-jugulis': {
		dexId: 993,
		swarm: 'FUTURE_DISTORTION',
		types: ['dark', 'flying'],
	},
	'iron-moth': {
		dexId: 994,
		swarm: 'FUTURE_DISTORTION',
		types: ['fire', 'poison'],
	},
	'iron-thorns': {
		dexId: 995,
		swarm: 'FUTURE_DISTORTION',
		types: ['rock', 'electric'],
	},
	frigibax: {
		dexId: 996,
		types: ['dragon', 'ice'],
	},
	arctibax: {
		dexId: 997,
		types: ['dragon', 'ice'],
	},
	baxcalibur: {
		dexId: 998,
		types: ['dragon', 'ice'],
	},
	gimmighoul: {
		dexId: 999,
		types: ['ghost'],
	},
	gholdengo: {
		dexId: 1000,
		types: ['steel', 'ghost'],
	},
	'wo-chien': {
		dexId: 1001,
		types: ['dark', 'grass'],
	},
	'chien-pao': {
		dexId: 1002,
		types: ['dark', 'ice'],
	},
	'ting-lu': {
		dexId: 1003,
		types: ['dark', 'ground'],
	},
	'chi-yu': {
		dexId: 1004,
		types: ['dark', 'fire'],
	},
	'roaring-moon': {
		dexId: 1005,
		swarm: 'PAST_DISTORTION',
		types: ['dragon', 'dark'],
	},
	'iron-valiant': {
		dexId: 1006,
		swarm: 'FUTURE_DISTORTION',
		types: ['fairy', 'fighting'],
	},
	koraidon: {
		dexId: 1007,
		types: ['fighting', 'dragon'],
	},
	miraidon: {
		dexId: 1008,
		types: ['electric', 'dragon'],
	},
	'walking-wake': {
		dexId: 1009,
		types: ['water', 'dragon'],
	},
	'iron-leaves': {
		dexId: 1010,
		types: ['grass', 'psychic'],
	},
	dipplin: {
		dexId: 1011,
		types: ['grass', 'dragon'],
	},
	poltchageist: {
		dexId: 1012,
		types: ['grass', 'ghost'],
	},
	sinistcha: {
		dexId: 1013,
		types: ['grass', 'ghost'],
	},
	okidogi: {
		dexId: 1014,
		types: ['poison', 'fighting'],
	},
	munkidori: {
		dexId: 1015,
		types: ['poison', 'psychic'],
	},
	fezandipiti: {
		dexId: 1016,
		types: ['poison', 'fairy'],
	},
	ogerpon: {
		dexId: 1017,
		types: ['grass'],
	},
	archaludon: {
		dexId: 1018,
		types: ['steel', 'dragon'],
	},
	hydrapple: {
		dexId: 1019,
		types: ['grass', 'dragon'],
	},
	'gouging-fire': {
		dexId: 1020,
		types: ['fire', 'dragon'],
	},
	'raging-bolt': {
		dexId: 1021,
		types: ['electric', 'dragon'],
	},
	'iron-boulder': {
		dexId: 1022,
		types: ['rock', 'psychic'],
	},
	'iron-crown': {
		dexId: 1023,
		types: ['steel', 'psychic'],
	},
	terapagos: {
		dexId: 1024,
		types: ['normal'],
	},
	pecharunt: {
		dexId: 1025,
		types: ['poison', 'ghost'],
	},
	'deoxys-attack': {
		dexId: 10001,
		types: ['psychic'],
	},
	'deoxys-defense': {
		dexId: 10002,
		types: ['psychic'],
	},
	'deoxys-speed': {
		dexId: 10003,
		types: ['psychic'],
	},
	'wormadam-sandy': {
		dexId: 10004,
		types: ['bug', 'ground'],
	},
	'wormadam-trash': {
		dexId: 10005,
		types: ['bug', 'steel'],
	},
	'shaymin-sky': {
		dexId: 10006,
		types: ['grass', 'flying'],
	},
	'giratina-origin': {
		dexId: 10007,
		types: ['ghost', 'dragon'],
	},
	'rotom-heat': {
		dexId: 10008,
		types: ['electric', 'fire'],
	},
	'rotom-wash': {
		dexId: 10009,
		types: ['electric', 'water'],
	},
	'rotom-frost': {
		dexId: 10010,
		types: ['electric', 'ice'],
	},
	'rotom-fan': {
		dexId: 10011,
		types: ['electric', 'flying'],
	},
	'rotom-mow': {
		dexId: 10012,
		types: ['electric', 'grass'],
	},
	'castform-sunny': {
		dexId: 10013,
		types: ['fire'],
	},
	'castform-rainy': {
		dexId: 10014,
		types: ['water'],
	},
	'castform-snowy': {
		dexId: 10015,
		types: ['ice'],
	},
	'basculin-blue-striped': {
		dexId: 10016,
		types: ['water'],
	},
	'darmanitan-zen': {
		dexId: 10017,
		types: ['fire', 'psychic'],
	},
	'meloetta-pirouette': {
		dexId: 10018,
		types: ['normal', 'fighting'],
	},
	'tornadus-therian': {
		dexId: 10019,
		types: ['flying'],
	},
	'thundurus-therian': {
		dexId: 10020,
		types: ['electric', 'flying'],
	},
	'landorus-therian': {
		dexId: 10021,
		types: ['ground', 'flying'],
	},
	'kyurem-black': {
		dexId: 10022,
		types: ['dragon', 'ice'],
	},
	'kyurem-white': {
		dexId: 10023,
		types: ['dragon', 'ice'],
	},
	'keldeo-resolute': {
		dexId: 10024,
		types: ['water', 'fighting'],
	},
	'meowstic-female': {
		dexId: 10025,
		types: ['psychic'],
	},
	'aegislash-blade': {
		dexId: 10026,
		types: ['steel', 'ghost'],
	},
	'pumpkaboo-small': {
		dexId: 10027,
		types: ['ghost', 'grass'],
	},
	'pumpkaboo-large': {
		dexId: 10028,
		types: ['ghost', 'grass'],
	},
	'pumpkaboo-super': {
		dexId: 10029,
		types: ['ghost', 'grass'],
	},
	'gourgeist-small': {
		dexId: 10030,
		types: ['ghost', 'grass'],
	},
	'gourgeist-large': {
		dexId: 10031,
		types: ['ghost', 'grass'],
	},
	'gourgeist-super': {
		dexId: 10032,
		types: ['ghost', 'grass'],
	},
	'venusaur-mega': {
		dexId: 10033,
		types: ['grass', 'poison'],
	},
	'charizard-mega-x': {
		dexId: 10034,
		types: ['fire', 'dragon'],
	},
	'charizard-mega-y': {
		dexId: 10035,
		types: ['fire', 'flying'],
	},
	'blastoise-mega': {
		dexId: 10036,
		types: ['water'],
	},
	'alakazam-mega': {
		dexId: 10037,
		types: ['psychic'],
	},
	'gengar-mega': {
		dexId: 10038,
		types: ['ghost', 'poison'],
	},
	'kangaskhan-mega': {
		dexId: 10039,
		types: ['normal'],
	},
	'pinsir-mega': {
		dexId: 10040,
		types: ['bug', 'flying'],
	},
	'gyarados-mega': {
		dexId: 10041,
		types: ['water', 'dark'],
	},
	'aerodactyl-mega': {
		dexId: 10042,
		types: ['rock', 'flying'],
	},
	'mewtwo-mega-x': {
		dexId: 10043,
		types: ['psychic', 'fighting'],
	},
	'mewtwo-mega-y': {
		dexId: 10044,
		types: ['psychic'],
	},
	'ampharos-mega': {
		dexId: 10045,
		types: ['electric', 'dragon'],
	},
	'scizor-mega': {
		dexId: 10046,
		types: ['bug', 'steel'],
	},
	'heracross-mega': {
		dexId: 10047,
		types: ['bug', 'fighting'],
	},
	'houndoom-mega': {
		dexId: 10048,
		types: ['dark', 'fire'],
	},
	'tyranitar-mega': {
		dexId: 10049,
		types: ['rock', 'dark'],
	},
	'blaziken-mega': {
		dexId: 10050,
		types: ['fire', 'fighting'],
	},
	'gardevoir-mega': {
		dexId: 10051,
		types: ['psychic', 'fairy'],
	},
	'mawile-mega': {
		dexId: 10052,
		types: ['steel', 'fairy'],
	},
	'aggron-mega': {
		dexId: 10053,
		types: ['steel'],
	},
	'medicham-mega': {
		dexId: 10054,
		types: ['fighting', 'psychic'],
	},
	'manectric-mega': {
		dexId: 10055,
		types: ['electric'],
	},
	'banette-mega': {
		dexId: 10056,
		types: ['ghost'],
	},
	'absol-mega': {
		dexId: 10057,
		types: ['dark'],
	},
	'garchomp-mega': {
		dexId: 10058,
		types: ['dragon', 'ground'],
	},
	'lucario-mega': {
		dexId: 10059,
		types: ['fighting', 'steel'],
	},
	'abomasnow-mega': {
		dexId: 10060,
		types: ['grass', 'ice'],
	},
	'floette-eternal': {
		dexId: 10061,
		types: ['fairy'],
	},
	'latias-mega': {
		dexId: 10062,
		types: ['dragon', 'psychic'],
	},
	'latios-mega': {
		dexId: 10063,
		types: ['dragon', 'psychic'],
	},
	'swampert-mega': {
		dexId: 10064,
		types: ['water', 'ground'],
	},
	'sceptile-mega': {
		dexId: 10065,
		types: ['grass', 'dragon'],
	},
	'sableye-mega': {
		dexId: 10066,
		types: ['dark', 'ghost'],
	},
	'altaria-mega': {
		dexId: 10067,
		types: ['dragon', 'fairy'],
	},
	'gallade-mega': {
		dexId: 10068,
		types: ['psychic', 'fighting'],
	},
	'audino-mega': {
		dexId: 10069,
		types: ['normal', 'fairy'],
	},
	'sharpedo-mega': {
		dexId: 10070,
		types: ['water', 'dark'],
	},
	'slowbro-mega': {
		dexId: 10071,
		types: ['water', 'psychic'],
	},
	'steelix-mega': {
		dexId: 10072,
		types: ['steel', 'ground'],
	},
	'pidgeot-mega': {
		dexId: 10073,
		types: ['normal', 'flying'],
	},
	'glalie-mega': {
		dexId: 10074,
		types: ['ice'],
	},
	'diancie-mega': {
		dexId: 10075,
		types: ['rock', 'fairy'],
	},
	'metagross-mega': {
		dexId: 10076,
		types: ['steel', 'psychic'],
	},
	'kyogre-primal': {
		dexId: 10077,
		types: ['water'],
	},
	'groudon-primal': {
		dexId: 10078,
		types: ['ground', 'fire'],
	},
	'rayquaza-mega': {
		dexId: 10079,
		types: ['dragon', 'flying'],
	},
	'pikachu-rock-star': {
		dexId: 10080,
		types: ['electric'],
		berryLureMapId: 'routeN1',
	},
	'pikachu-belle': {
		dexId: 10081,
		types: ['electric'],
		berryLureMapId: 'routeN1E1',
	},
	'pikachu-pop-star': {
		dexId: 10082,
		types: ['electric'],
		berryLureMapId: 'routeE1',
	},
	'pikachu-phd': {
		dexId: 10083,
		types: ['electric'],
		berryLureMapId: 'routeS1E1',
	},
	'pikachu-libre': {
		dexId: 10084,
		types: ['electric'],
		berryLureMapId: 'routeS1W1',
	},
	'pikachu-cosplay': {
		dexId: 10085,
		types: ['electric'],
		honey: true,
	},
	'hoopa-unbound': {
		dexId: 10086,
		types: ['psychic', 'dark'],
	},
	'camerupt-mega': {
		dexId: 10087,
		types: ['fire', 'ground'],
	},
	'lopunny-mega': {
		dexId: 10088,
		types: ['normal', 'fighting'],
	},
	'salamence-mega': {
		dexId: 10089,
		types: ['dragon', 'flying'],
	},
	'beedrill-mega': {
		dexId: 10090,
		types: ['bug', 'poison'],
	},
	'rattata-alola': {
		dexId: 10091,
		types: ['dark', 'normal'],
		berryLureMapId: 'routeN1',
	},
	'raticate-alola': {
		dexId: 10092,
		types: ['dark', 'normal'],
	},
	'raticate-totem-alola': {
		dexId: 10093,
		types: ['dark', 'normal'],
	},
	'pikachu-original-cap': {
		dexId: 10094,
		types: ['electric'],
	},
	'pikachu-hoenn-cap': {
		dexId: 10095,
		types: ['electric'],
	},
	'pikachu-sinnoh-cap': {
		dexId: 10096,
		types: ['electric'],
	},
	'pikachu-unova-cap': {
		dexId: 10097,
		types: ['electric'],
	},
	'pikachu-kalos-cap': {
		dexId: 10098,
		types: ['electric'],
	},
	'pikachu-alola-cap': {
		dexId: 10099,
		types: ['electric'],
	},
	'raichu-alola': {
		dexId: 10100,
		types: ['electric', 'psychic'],
	},
	'sandshrew-alola': {
		dexId: 10101,
		types: ['ice', 'steel'],
	},
	'sandslash-alola': {
		dexId: 10102,
		types: ['ice', 'steel'],
	},
	'vulpix-alola': {
		dexId: 10103,
		types: ['ice'],
		berryLureMapId: 'routeN1',
	},
	'ninetales-alola': {
		dexId: 10104,
		types: ['ice', 'fairy'],
	},
	'diglett-alola': {
		dexId: 10105,
		types: ['ground', 'steel'],
	},
	'dugtrio-alola': {
		dexId: 10106,
		types: ['ground', 'steel'],
	},
	'meowth-alola': {
		dexId: 10107,
		types: ['dark'],
		berryLureMapId: 'routeN1E1',
	},
	'persian-alola': {
		dexId: 10108,
		types: ['dark'],
	},
	'geodude-alola': {
		dexId: 10109,
		types: ['rock', 'electric'],
		underRock: true,
	},
	'graveler-alola': {
		dexId: 10110,
		types: ['rock', 'electric'],
	},
	'golem-alola': {
		dexId: 10111,
		types: ['rock', 'electric'],
	},
	'grimer-alola': {
		dexId: 10112,
		types: ['poison', 'dark'],
		berryLureMapId: 'routeS1E1',
	},
	'muk-alola': {
		dexId: 10113,
		types: ['poison', 'dark'],
	},
	'exeggutor-alola': {
		dexId: 10114,
		types: ['grass', 'dragon'],
	},
	'marowak-alola': {
		dexId: 10115,
		types: ['fire', 'ghost'],
	},
	'greninja-battle-bond': {
		dexId: 10116,
		types: ['water', 'dark'],
	},
	'greninja-ash': {
		dexId: 10117,
		types: ['water', 'dark'],
	},
	'zygarde-10-power-construct': {
		dexId: 10118,
		types: ['dragon', 'ground'],
	},
	'zygarde-50-power-construct': {
		dexId: 10119,
		types: ['dragon', 'ground'],
	},
	'zygarde-complete': {
		dexId: 10120,
		types: ['dragon', 'ground'],
	},
	'gumshoos-totem': {
		dexId: 10121,
		types: ['normal'],
	},
	'vikavolt-totem': {
		dexId: 10122,
		types: ['bug', 'electric'],
	},
	'oricorio-pom-pom': {
		dexId: 10123,
		types: ['electric', 'flying'],
	},
	'oricorio-pau': {
		dexId: 10124,
		types: ['psychic', 'flying'],
	},
	'oricorio-sensu': {
		dexId: 10125,
		types: ['ghost', 'flying'],
	},
	'lycanroc-midnight': {
		dexId: 10126,
		types: ['rock'],
	},
	'wishiwashi-school': {
		dexId: 10127,
		types: ['water'],
	},
	'lurantis-totem': {
		dexId: 10128,
		types: ['grass'],
	},
	'salazzle-totem': {
		dexId: 10129,
		types: ['poison', 'fire'],
	},
	'minior-orange-meteor': {
		dexId: 10130,
		types: ['rock', 'flying'],
	},
	'minior-yellow-meteor': {
		dexId: 10131,
		types: ['rock', 'flying'],
	},
	'minior-green-meteor': {
		dexId: 10132,
		types: ['rock', 'flying'],
	},
	'minior-blue-meteor': {
		dexId: 10133,
		types: ['rock', 'flying'],
	},
	'minior-indigo-meteor': {
		dexId: 10134,
		types: ['rock', 'flying'],
	},
	'minior-violet-meteor': {
		dexId: 10135,
		types: ['rock', 'flying'],
	},
	'minior-red': {
		dexId: 10136,
		types: ['rock', 'flying'],
	},
	'minior-orange': {
		dexId: 10137,
		types: ['rock', 'flying'],
	},
	'minior-yellow': {
		dexId: 10138,
		types: ['rock', 'flying'],
	},
	'minior-green': {
		dexId: 10139,
		types: ['rock', 'flying'],
	},
	'minior-blue': {
		dexId: 10140,
		types: ['rock', 'flying'],
	},
	'minior-indigo': {
		dexId: 10141,
		types: ['rock', 'flying'],
	},
	'minior-violet': {
		dexId: 10142,
		types: ['rock', 'flying'],
	},
	'mimikyu-busted': {
		dexId: 10143,
		types: ['ghost', 'fairy'],
	},
	'mimikyu-totem-disguised': {
		dexId: 10144,
		types: ['ghost', 'fairy'],
	},
	'mimikyu-totem-busted': {
		dexId: 10145,
		types: ['ghost', 'fairy'],
	},
	'kommo-o-totem': {
		dexId: 10146,
		types: ['dragon', 'fighting'],
	},
	'magearna-original': {
		dexId: 10147,
		types: ['steel', 'fairy'],
	},
	'pikachu-partner-cap': {
		dexId: 10148,
		types: ['electric'],
	},
	'marowak-totem': {
		dexId: 10149,
		types: ['fire', 'ghost'],
	},
	'ribombee-totem': {
		dexId: 10150,
		types: ['bug', 'fairy'],
	},
	'rockruff-own-tempo': {
		dexId: 10151,
		types: ['rock'],
	},
	'lycanroc-dusk': {
		dexId: 10152,
		types: ['rock'],
	},
	'araquanid-totem': {
		dexId: 10153,
		types: ['water', 'bug'],
	},
	'togedemaru-totem': {
		dexId: 10154,
		types: ['electric', 'steel'],
	},
	'necrozma-dusk': {
		dexId: 10155,
		types: ['psychic', 'steel'],
	},
	'necrozma-dawn': {
		dexId: 10156,
		types: ['psychic', 'ghost'],
	},
	'necrozma-ultra': {
		dexId: 10157,
		types: ['psychic', 'dragon'],
	},
	'pikachu-starter': {
		dexId: 10158,
		types: ['electric'],
	},
	'eevee-starter': {
		dexId: 10159,
		types: ['normal'],
	},
	'pikachu-world-cap': {
		dexId: 10160,
		types: ['electric'],
	},
	'meowth-galar': {
		dexId: 10161,
		types: ['steel'],
		berryLureMapId: 'routeN1E1',
	},
	'ponyta-galar': {
		dexId: 10162,
		types: ['psychic'],
	},
	'rapidash-galar': {
		dexId: 10163,
		types: ['psychic', 'fairy'],
	},
	'slowpoke-galar': {
		dexId: 10164,
		types: ['psychic'],
	},
	'slowbro-galar': {
		dexId: 10165,
		types: ['poison', 'psychic'],
	},
	'farfetchd-galar': {
		dexId: 10166,
		types: ['fighting'],
	},
	'weezing-galar': {
		dexId: 10167,
		types: ['poison', 'fairy'],
	},
	'mr-mime-galar': {
		dexId: 10168,
		types: ['ice', 'psychic'],
	},
	'articuno-galar': {
		dexId: 10169,
		types: ['psychic', 'flying'],
	},
	'zapdos-galar': {
		dexId: 10170,
		types: ['fighting', 'flying'],
	},
	'moltres-galar': {
		dexId: 10171,
		types: ['dark', 'flying'],
	},
	'slowking-galar': {
		dexId: 10172,
		types: ['poison', 'psychic'],
	},
	'corsola-galar': {
		dexId: 10173,
		types: ['ghost'],
	},
	'zigzagoon-galar': {
		dexId: 10174,
		types: ['dark', 'normal'],
	},
	'linoone-galar': {
		dexId: 10175,
		types: ['dark', 'normal'],
	},
	'darumaka-galar': {
		dexId: 10176,
		types: ['ice'],
	},
	'darmanitan-galar-standard': {
		dexId: 10177,
		types: ['ice'],
	},
	'darmanitan-galar-zen': {
		dexId: 10178,
		types: ['ice', 'fire'],
	},
	'yamask-galar': {
		dexId: 10179,
		types: ['ground', 'ghost'],
	},
	'stunfisk-galar': {
		dexId: 10180,
		types: ['ground', 'steel'],
	},
	'zygarde-10': {
		dexId: 10181,
		types: ['dragon', 'ground'],
	},
	'cramorant-gulping': {
		dexId: 10182,
		types: ['flying', 'water'],
	},
	'cramorant-gorging': {
		dexId: 10183,
		types: ['flying', 'water'],
	},
	'toxtricity-low-key': {
		dexId: 10184,
		types: ['electric', 'poison'],
	},
	'eiscue-noice': {
		dexId: 10185,
		types: ['ice'],
	},
	'indeedee-female': {
		dexId: 10186,
		types: ['psychic', 'normal'],
	},
	'morpeko-hangry': {
		dexId: 10187,
		types: ['electric', 'dark'],
	},
	'zacian-crowned': {
		dexId: 10188,
		types: ['fairy', 'steel'],
	},
	'zamazenta-crowned': {
		dexId: 10189,
		types: ['fighting', 'steel'],
	},
	'eternatus-eternamax': {
		dexId: 10190,
		types: ['poison', 'dragon'],
	},
	'urshifu-rapid-strike': {
		dexId: 10191,
		types: ['fighting', 'water'],
	},
	'zarude-dada': {
		dexId: 10192,
		types: ['dark', 'grass'],
	},
	'calyrex-ice': {
		dexId: 10193,
		types: ['psychic', 'ice'],
	},
	'calyrex-shadow': {
		dexId: 10194,
		types: ['psychic', 'ghost'],
	},
	'venusaur-gmax': {
		dexId: 10195,
		types: ['grass', 'poison'],
	},
	'charizard-gmax': {
		dexId: 10196,
		types: ['fire', 'flying'],
	},
	'blastoise-gmax': {
		dexId: 10197,
		types: ['water'],
	},
	'butterfree-gmax': {
		dexId: 10198,
		types: ['bug', 'flying'],
	},
	'pikachu-gmax': {
		dexId: 10199,
		types: ['electric'],
	},
	'meowth-gmax': {
		dexId: 10200,
		types: ['normal'],
	},
	'machamp-gmax': {
		dexId: 10201,
		types: ['fighting'],
	},
	'gengar-gmax': {
		dexId: 10202,
		types: ['ghost', 'poison'],
	},
	'kingler-gmax': {
		dexId: 10203,
		types: ['water'],
	},
	'lapras-gmax': {
		dexId: 10204,
		types: ['water', 'ice'],
	},
	'eevee-gmax': {
		dexId: 10205,
		types: ['normal'],
	},
	'snorlax-gmax': {
		dexId: 10206,
		types: ['normal'],
	},
	'garbodor-gmax': {
		dexId: 10207,
		types: ['poison'],
	},
	'melmetal-gmax': {
		dexId: 10208,
		types: ['steel'],
	},
	'rillaboom-gmax': {
		dexId: 10209,
		types: ['grass'],
	},
	'cinderace-gmax': {
		dexId: 10210,
		types: ['fire'],
	},
	'inteleon-gmax': {
		dexId: 10211,
		types: ['water'],
	},
	'corviknight-gmax': {
		dexId: 10212,
		types: ['flying', 'steel'],
	},
	'orbeetle-gmax': {
		dexId: 10213,
		types: ['bug', 'psychic'],
	},
	'drednaw-gmax': {
		dexId: 10214,
		types: ['water', 'rock'],
	},
	'coalossal-gmax': {
		dexId: 10215,
		types: ['rock', 'fire'],
	},
	'flapple-gmax': {
		dexId: 10216,
		types: ['grass', 'dragon'],
	},
	'appletun-gmax': {
		dexId: 10217,
		types: ['grass', 'dragon'],
	},
	'sandaconda-gmax': {
		dexId: 10218,
		types: ['ground'],
	},
	'toxtricity-amped-gmax': {
		dexId: 10219,
		types: ['electric', 'poison'],
	},
	'centiskorch-gmax': {
		dexId: 10220,
		types: ['fire', 'bug'],
	},
	'hatterene-gmax': {
		dexId: 10221,
		types: ['psychic', 'fairy'],
	},
	'grimmsnarl-gmax': {
		dexId: 10222,
		types: ['dark', 'fairy'],
	},
	'alcremie-gmax': {
		dexId: 10223,
		types: ['fairy'],
	},
	'copperajah-gmax': {
		dexId: 10224,
		types: ['steel'],
	},
	'duraludon-gmax': {
		dexId: 10225,
		types: ['steel', 'dragon'],
	},
	'urshifu-single-strike-gmax': {
		dexId: 10226,
		types: ['fighting', 'dark'],
	},
	'urshifu-rapid-strike-gmax': {
		dexId: 10227,
		types: ['fighting', 'water'],
	},
	'toxtricity-low-key-gmax': {
		dexId: 10228,
		types: ['electric', 'poison'],
	},
	'growlithe-hisui': {
		dexId: 10229,
		types: ['fire', 'rock'],
		berryLureMapId: 'routeN1E1',
	},
	'arcanine-hisui': {
		dexId: 10230,
		types: ['fire', 'rock'],
	},
	'voltorb-hisui': {
		dexId: 10231,
		types: ['electric', 'grass'],
	},
	'electrode-hisui': {
		dexId: 10232,
		types: ['electric', 'grass'],
	},
	'typhlosion-hisui': {
		dexId: 10233,
		types: ['fire', 'ghost'],
	},
	'qwilfish-hisui': {
		dexId: 10234,
		types: ['dark', 'poison'],
	},
	'sneasel-hisui': {
		dexId: 10235,
		types: ['fighting', 'poison'],
	},
	'samurott-hisui': {
		dexId: 10236,
		types: ['water', 'dark'],
	},
	'lilligant-hisui': {
		dexId: 10237,
		types: ['grass', 'fighting'],
	},
	'zorua-hisui': {
		dexId: 10238,
		types: ['normal', 'ghost'],
	},
	'zoroark-hisui': {
		dexId: 10239,
		types: ['normal', 'ghost'],
	},
	'braviary-hisui': {
		dexId: 10240,
		types: ['psychic', 'flying'],
	},
	'sliggoo-hisui': {
		dexId: 10241,
		types: ['steel', 'dragon'],
	},
	'goodra-hisui': {
		dexId: 10242,
		types: ['steel', 'dragon'],
	},
	'avalugg-hisui': {
		dexId: 10243,
		types: ['ice', 'rock'],
		berryLureMapId: 'routeS1W1',
	},
	'decidueye-hisui': {
		dexId: 10244,
		types: ['grass', 'fighting'],
	},
	'dialga-origin': {
		dexId: 10245,
		types: ['steel', 'dragon'],
	},
	'palkia-origin': {
		dexId: 10246,
		types: ['water', 'dragon'],
	},
	'basculin-white-striped': {
		dexId: 10247,
		types: ['water'],
	},
	'basculegion-female': {
		dexId: 10248,
		types: ['water', 'ghost'],
	},
	'enamorus-therian': {
		dexId: 10249,
		types: ['fairy', 'flying'],
	},
	'tauros-paldea-combat-breed': {
		dexId: 10250,
		types: ['fighting'],
	},
	'tauros-paldea-blaze-breed': {
		dexId: 10251,
		types: ['fighting', 'fire'],
	},
	'tauros-paldea-aqua-breed': {
		dexId: 10252,
		types: ['fighting', 'water'],
	},
	'wooper-paldea': {
		dexId: 10253,
		types: ['poison', 'ground'],
	},
	'oinkologne-female': {
		dexId: 10254,
		types: ['normal'],
	},
	'dudunsparce-three-segment': {
		dexId: 10255,
		types: ['normal'],
	},
	'palafin-hero': {
		dexId: 10256,
		types: ['water'],
	},
	'maushold-family-of-three': {
		dexId: 10257,
		types: ['normal'],
	},
	'tatsugiri-droopy': {
		dexId: 10258,
		types: ['dragon', 'water'],
	},
	'tatsugiri-stretchy': {
		dexId: 10259,
		types: ['dragon', 'water'],
	},
	'squawkabilly-blue-plumage': {
		dexId: 10260,
		types: ['normal', 'flying'],
	},
	'squawkabilly-yellow-plumage': {
		dexId: 10261,
		types: ['normal', 'flying'],
	},
	'squawkabilly-white-plumage': {
		dexId: 10262,
		types: ['normal', 'flying'],
	},
	'gimmighoul-roaming': {
		dexId: 10263,
		types: ['ghost'],
	},
	'koraidon-limited-build': {
		dexId: 10264,
		types: ['fighting', 'dragon'],
	},
	'koraidon-sprinting-build': {
		dexId: 10265,
		types: ['fighting', 'dragon'],
	},
	'koraidon-swimming-build': {
		dexId: 10266,
		types: ['fighting', 'dragon'],
	},
	'koraidon-gliding-build': {
		dexId: 10267,
		types: ['fighting', 'dragon'],
	},
	'miraidon-low-power-mode': {
		dexId: 10268,
		types: ['electric', 'dragon'],
	},
	'miraidon-drive-mode': {
		dexId: 10269,
		types: ['electric', 'dragon'],
	},
	'miraidon-aquatic-mode': {
		dexId: 10270,
		types: ['electric', 'dragon'],
	},
	'miraidon-glide-mode': {
		dexId: 10271,
		types: ['electric', 'dragon'],
	},
	'ursaluna-bloodmoon': {
		dexId: 10272,
		types: ['ground', 'normal'],
	},
	'ogerpon-wellspring-mask': {
		dexId: 10273,
		types: ['grass', 'water'],
	},
	'ogerpon-hearthflame-mask': {
		dexId: 10274,
		types: ['grass', 'fire'],
	},
	'ogerpon-cornerstone-mask': {
		dexId: 10275,
		types: ['grass', 'rock'],
	},
	'terapagos-terastal': {
		dexId: 10276,
		types: ['normal'],
	},
	'terapagos-stellar': {
		dexId: 10277,
		types: ['normal'],
	},
};
