import { getRandomEntry } from '../functions/filterTargets';
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
};

export const internalDex: Record<PokemonName, InternalDexEntry> = {
	bulbasaur: {
		dexId: 1,
	},
	ivysaur: {
		dexId: 2,
	},
	venusaur: {
		dexId: 3,
	},
	charmander: {
		dexId: 4,
	},
	charmeleon: {
		dexId: 5,
	},
	charizard: {
		dexId: 6,
	},
	squirtle: {
		dexId: 7,
	},
	wartortle: {
		dexId: 8,
	},
	blastoise: {
		dexId: 9,
	},
	caterpie: {
		dexId: 10,
	},
	metapod: {
		dexId: 11,
	},
	butterfree: {
		dexId: 12,
	},
	weedle: {
		dexId: 13,
	},
	kakuna: {
		dexId: 14,
	},
	beedrill: {
		dexId: 15,
	},
	pidgey: {
		dexId: 16,
	},
	pidgeotto: {
		dexId: 17,
	},
	pidgeot: {
		dexId: 18,
	},
	rattata: {
		dexId: 19,
	},
	raticate: {
		dexId: 20,
	},
	spearow: {
		dexId: 21,
	},
	fearow: {
		dexId: 22,
	},
	ekans: {
		dexId: 23,
	},
	arbok: {
		dexId: 24,
	},
	pikachu: {
		dexId: 25,
	},
	raichu: {
		dexId: 26,
	},
	sandshrew: {
		dexId: 27,
	},
	sandslash: {
		dexId: 28,
	},
	'nidoran-f': {
		dexId: 29,
	},
	nidorina: {
		dexId: 30,
	},
	nidoqueen: {
		dexId: 31,
	},
	'nidoran-m': {
		dexId: 32,
	},
	nidorino: {
		dexId: 33,
	},
	nidoking: {
		dexId: 34,
	},
	clefairy: {
		dexId: 35,
	},
	clefable: {
		dexId: 36,
	},
	vulpix: {
		dexId: 37,
	},
	ninetales: {
		dexId: 38,
	},
	jigglypuff: {
		dexId: 39,
	},
	wigglytuff: {
		dexId: 40,
		swarm: 'STRONG',
	},
	zubat: {
		dexId: 41,
	},
	golbat: {
		dexId: 42,
	},
	oddish: {
		dexId: 43,
	},
	gloom: {
		dexId: 44,
	},
	vileplume: {
		dexId: 45,
	},
	paras: {
		dexId: 46,
	},
	parasect: {
		dexId: 47,
	},
	venonat: {
		dexId: 48,
	},
	venomoth: {
		dexId: 49,
	},
	diglett: {
		dexId: 50,
	},
	dugtrio: {
		dexId: 51,
	},
	meowth: {
		dexId: 52,
	},
	persian: {
		dexId: 53,
	},
	psyduck: {
		dexId: 54,
	},
	golduck: {
		dexId: 55,
	},
	mankey: {
		dexId: 56,
	},
	primeape: {
		dexId: 57,
		rampager: true,
	},
	growlithe: {
		dexId: 58,
	},
	arcanine: {
		dexId: 59,
		rampager: true,
	},
	poliwag: {
		dexId: 60,
	},
	poliwhirl: {
		dexId: 61,
	},
	poliwrath: {
		dexId: 62,
	},
	abra: {
		dexId: 63,
	},
	kadabra: {
		dexId: 64,
	},
	alakazam: {
		dexId: 65,
		rampager: true,
	},
	machop: {
		dexId: 66,
	},
	machoke: {
		dexId: 67,
	},
	machamp: {
		dexId: 68,
		rampager: true,
	},
	bellsprout: {
		dexId: 69,
	},
	weepinbell: {
		dexId: 70,
	},
	victreebel: {
		dexId: 71,
	},
	tentacool: {
		dexId: 72,
	},
	tentacruel: {
		dexId: 73,
	},
	geodude: {
		dexId: 74,
	},
	graveler: {
		dexId: 75,
	},
	golem: {
		dexId: 76,
	},
	ponyta: {
		dexId: 77,
	},
	rapidash: {
		dexId: 78,
	},
	slowpoke: {
		dexId: 79,
	},
	slowbro: {
		dexId: 80,
	},
	magnemite: {
		dexId: 81,
	},
	magneton: {
		dexId: 82,
		swarm: 'STRONG',
	},
	farfetchd: {
		dexId: 83,
	},
	doduo: {
		dexId: 84,
	},
	dodrio: {
		dexId: 85,
	},
	seel: {
		dexId: 86,
	},
	dewgong: {
		dexId: 87,
	},
	grimer: {
		dexId: 88,
	},
	muk: {
		dexId: 89,
	},
	shellder: {
		dexId: 90,
	},
	cloyster: {
		dexId: 91,
	},
	gastly: {
		dexId: 92,
	},
	haunter: {
		dexId: 93,
	},
	gengar: {
		dexId: 94,
		rampager: true,
	},
	onix: {
		dexId: 95,
	},
	drowzee: {
		dexId: 96,
	},
	hypno: {
		dexId: 97,
	},
	krabby: {
		dexId: 98,
	},
	kingler: {
		dexId: 99,
	},
	voltorb: {
		dexId: 100,
	},
	electrode: {
		dexId: 101,
	},
	exeggcute: {
		dexId: 102,
	},
	exeggutor: {
		dexId: 103,
	},
	cubone: {
		dexId: 104,
	},
	marowak: {
		dexId: 105,
	},
	hitmonlee: {
		dexId: 106,
	},
	hitmonchan: {
		dexId: 107,
	},
	lickitung: {
		dexId: 108,
	},
	koffing: {
		dexId: 109,
	},
	weezing: {
		dexId: 110,
	},
	rhyhorn: {
		dexId: 111,
	},
	rhydon: {
		dexId: 112,
	},
	chansey: {
		dexId: 113,
	},
	tangela: {
		dexId: 114,
	},
	kangaskhan: {
		dexId: 115,
	},
	horsea: {
		dexId: 116,
	},
	seadra: {
		dexId: 117,
	},
	goldeen: {
		dexId: 118,
	},
	seaking: {
		dexId: 119,
	},
	staryu: {
		dexId: 120,
	},
	starmie: {
		dexId: 121,
	},
	'mr-mime': {
		dexId: 122,
	},
	scyther: {
		dexId: 123,
	},
	jynx: {
		dexId: 124,
	},
	electabuzz: {
		dexId: 125,
	},
	magmar: {
		dexId: 126,
	},
	pinsir: {
		dexId: 127,
		rampager: true,
	},
	tauros: {
		dexId: 128,
	},
	magikarp: {
		dexId: 129,
	},
	gyarados: {
		dexId: 130,
	},
	lapras: {
		dexId: 131,
	},
	ditto: {
		dexId: 132,
	},
	eevee: {
		dexId: 133,
	},
	vaporeon: {
		dexId: 134,
	},
	jolteon: {
		dexId: 135,
	},
	flareon: {
		dexId: 136,
	},
	porygon: {
		dexId: 137,
	},
	omanyte: {
		dexId: 138,
	},
	omastar: {
		dexId: 139,
	},
	kabuto: {
		dexId: 140,
	},
	kabutops: {
		dexId: 141,
	},
	aerodactyl: {
		dexId: 142,
	},
	snorlax: {
		dexId: 143,
	},
	articuno: {
		dexId: 144,
	},
	zapdos: {
		dexId: 145,
	},
	moltres: {
		dexId: 146,
	},
	dratini: {
		dexId: 147,
	},
	dragonair: {
		dexId: 148,
	},
	dragonite: {
		dexId: 149,
		rampager: true,
	},
	mewtwo: {
		dexId: 150,
	},
	mew: {
		dexId: 151,
	},
	chikorita: {
		dexId: 152,
		swarm: 'WEAK',
	},
	bayleef: {
		dexId: 153,
	},
	meganium: {
		dexId: 154,
	},
	cyndaquil: {
		dexId: 155,
		swarm: 'WEAK',
	},
	quilava: {
		dexId: 156,
	},
	typhlosion: {
		dexId: 157,
	},
	totodile: {
		dexId: 158,
		swarm: 'WEAK',
	},
	croconaw: {
		dexId: 159,
	},
	feraligatr: {
		dexId: 160,
	},
	sentret: {
		dexId: 161,
	},
	furret: {
		dexId: 162,
	},
	hoothoot: {
		dexId: 163,
	},
	noctowl: {
		dexId: 164,
	},
	ledyba: {
		dexId: 165,
	},
	ledian: {
		dexId: 166,
	},
	spinarak: {
		dexId: 167,
	},
	ariados: {
		dexId: 168,
	},
	crobat: {
		dexId: 169,
		rampager: true,
	},
	chinchou: {
		dexId: 170,
	},
	lanturn: {
		dexId: 171,
	},
	pichu: {
		dexId: 172,
	},
	cleffa: {
		dexId: 173,
	},
	igglybuff: {
		dexId: 174,
	},
	togepi: {
		dexId: 175,
	},
	togetic: {
		dexId: 176,
	},
	natu: {
		dexId: 177,
	},
	xatu: {
		dexId: 178,
	},
	mareep: {
		dexId: 179,
	},
	flaaffy: {
		dexId: 180,
	},
	ampharos: {
		dexId: 181,
	},
	bellossom: {
		dexId: 182,
	},
	marill: {
		dexId: 183,
	},
	azumarill: {
		dexId: 184,
	},
	sudowoodo: {
		dexId: 185,
	},
	politoed: {
		dexId: 186,
	},
	hoppip: {
		dexId: 187,
	},
	skiploom: {
		dexId: 188,
	},
	jumpluff: {
		dexId: 189,
	},
	aipom: {
		dexId: 190,
	},
	sunkern: {
		dexId: 191,
	},
	sunflora: {
		dexId: 192,
	},
	yanma: {
		dexId: 193,
	},
	wooper: {
		dexId: 194,
	},
	quagsire: {
		dexId: 195,
	},
	espeon: {
		dexId: 196,
	},
	umbreon: {
		dexId: 197,
	},
	murkrow: {
		dexId: 198,
	},
	slowking: {
		dexId: 199,
	},
	misdreavus: {
		dexId: 200,
		swarm: 'STRONG',
	},
	unown: {
		dexId: 201,
	},
	wobbuffet: {
		dexId: 202,
	},
	girafarig: {
		dexId: 203,
	},
	pineco: {
		dexId: 204,
	},
	forretress: {
		dexId: 205,
	},
	dunsparce: {
		dexId: 206,
	},
	gligar: {
		dexId: 207,
	},
	steelix: {
		dexId: 208,
		rampager: true,
	},
	snubbull: {
		dexId: 209,
	},
	granbull: {
		dexId: 210,
	},
	qwilfish: {
		dexId: 211,
	},
	scizor: {
		dexId: 212,
	},
	shuckle: {
		dexId: 213,
	},
	heracross: {
		dexId: 214,
		rampager: true,
	},
	sneasel: {
		dexId: 215,
	},
	teddiursa: {
		dexId: 216,
	},
	ursaring: {
		dexId: 217,
		rampager: true,
	},
	slugma: {
		dexId: 218,
	},
	magcargo: {
		dexId: 219,
	},
	swinub: {
		dexId: 220,
	},
	piloswine: {
		dexId: 221,
	},
	corsola: {
		dexId: 222,
	},
	remoraid: {
		dexId: 223,
	},
	octillery: {
		dexId: 224,
	},
	delibird: {
		dexId: 225,
		swarm: 'STRONG',
	},
	mantine: {
		dexId: 226,
	},
	skarmory: {
		dexId: 227,
	},
	houndour: {
		dexId: 228,
	},
	houndoom: {
		dexId: 229,
	},
	kingdra: {
		dexId: 230,
	},
	phanpy: {
		dexId: 231,
	},
	donphan: {
		dexId: 232,
		swarm: 'STRONG',
	},
	porygon2: {
		dexId: 233,
	},
	stantler: {
		dexId: 234,
	},
	smeargle: {
		dexId: 235,
	},
	tyrogue: {
		dexId: 236,
	},
	hitmontop: {
		dexId: 237,
	},
	smoochum: {
		dexId: 238,
	},
	elekid: {
		dexId: 239,
	},
	magby: {
		dexId: 240,
	},
	miltank: {
		dexId: 241,
	},
	blissey: {
		dexId: 242,
	},
	raikou: {
		dexId: 243,
	},
	entei: {
		dexId: 244,
	},
	suicune: {
		dexId: 245,
	},
	larvitar: {
		dexId: 246,
	},
	pupitar: {
		dexId: 247,
		swarm: 'STRONG',
	},
	tyranitar: {
		dexId: 248,
		rampager: true,
	},
	lugia: {
		dexId: 249,
	},
	'ho-oh': {
		dexId: 250,
	},
	celebi: {
		dexId: 251,
	},
	treecko: {
		dexId: 252,
		swarm: 'WEAK',
	},
	grovyle: {
		dexId: 253,
	},
	sceptile: {
		dexId: 254,
	},
	torchic: {
		dexId: 255,
		swarm: 'WEAK',
	},
	combusken: {
		dexId: 256,
	},
	blaziken: {
		dexId: 257,
	},
	mudkip: {
		dexId: 258,
		swarm: 'WEAK',
	},
	marshtomp: {
		dexId: 259,
	},
	swampert: {
		dexId: 260,
	},
	poochyena: {
		dexId: 261,
	},
	mightyena: {
		dexId: 262,
	},
	zigzagoon: {
		dexId: 263,
	},
	linoone: {
		dexId: 264,
	},
	wurmple: {
		dexId: 265,
	},
	silcoon: {
		dexId: 266,
	},
	beautifly: {
		dexId: 267,
	},
	cascoon: {
		dexId: 268,
	},
	dustox: {
		dexId: 269,
	},
	lotad: {
		dexId: 270,
	},
	lombre: {
		dexId: 271,
	},
	ludicolo: {
		dexId: 272,
	},
	seedot: {
		dexId: 273,
	},
	nuzleaf: {
		dexId: 274,
	},
	shiftry: {
		dexId: 275,
	},
	taillow: {
		dexId: 276,
	},
	swellow: {
		dexId: 277,
	},
	wingull: {
		dexId: 278,
	},
	pelipper: {
		dexId: 279,
	},
	ralts: {
		dexId: 280,
	},
	kirlia: {
		dexId: 281,
		swarm: 'STRONG',
	},
	gardevoir: {
		dexId: 282,
	},
	surskit: {
		dexId: 283,
	},
	masquerain: {
		dexId: 284,
	},
	shroomish: {
		dexId: 285,
	},
	breloom: {
		dexId: 286,
	},
	slakoth: {
		dexId: 287,
	},
	vigoroth: {
		dexId: 288,
	},
	slaking: {
		dexId: 289,
		rampager: true,
	},
	nincada: {
		dexId: 290,
	},
	ninjask: {
		dexId: 291,
	},
	shedinja: {
		dexId: 292,
	},
	whismur: {
		dexId: 293,
	},
	loudred: {
		dexId: 294,
	},
	exploud: {
		dexId: 295,
	},
	makuhita: {
		dexId: 296,
	},
	hariyama: {
		dexId: 297,
		swarm: 'STRONG',
	},
	azurill: {
		dexId: 298,
	},
	nosepass: {
		dexId: 299,
	},
	skitty: {
		dexId: 300,
	},
	delcatty: {
		dexId: 301,
	},
	sableye: {
		dexId: 302,
	},
	mawile: {
		dexId: 303,
	},
	aron: {
		dexId: 304,
	},
	lairon: {
		dexId: 305,
	},
	aggron: {
		dexId: 306,
	},
	meditite: {
		dexId: 307,
	},
	medicham: {
		dexId: 308,
	},
	electrike: {
		dexId: 309,
	},
	manectric: {
		dexId: 310,
	},
	plusle: {
		dexId: 311,
	},
	minun: {
		dexId: 312,
	},
	volbeat: {
		dexId: 313,
	},
	illumise: {
		dexId: 314,
	},
	roselia: {
		dexId: 315,
	},
	gulpin: {
		dexId: 316,
	},
	swalot: {
		dexId: 317,
	},
	carvanha: {
		dexId: 318,
	},
	sharpedo: {
		dexId: 319,
	},
	wailmer: {
		dexId: 320,
	},
	wailord: {
		dexId: 321,
	},
	numel: {
		dexId: 322,
	},
	camerupt: {
		dexId: 323,
	},
	torkoal: {
		dexId: 324,
	},
	spoink: {
		dexId: 325,
	},
	grumpig: {
		dexId: 326,
	},
	spinda: {
		dexId: 327,
	},
	trapinch: {
		dexId: 328,
	},
	vibrava: {
		dexId: 329,
	},
	flygon: {
		dexId: 330,
	},
	cacnea: {
		dexId: 331,
	},
	cacturne: {
		dexId: 332,
	},
	swablu: {
		dexId: 333,
	},
	altaria: {
		dexId: 334,
	},
	zangoose: {
		dexId: 335,
	},
	seviper: {
		dexId: 336,
	},
	lunatone: {
		dexId: 337,
	},
	solrock: {
		dexId: 338,
	},
	barboach: {
		dexId: 339,
	},
	whiscash: {
		dexId: 340,
	},
	corphish: {
		dexId: 341,
	},
	crawdaunt: {
		dexId: 342,
	},
	baltoy: {
		dexId: 343,
	},
	claydol: {
		dexId: 344,
	},
	lileep: {
		dexId: 345,
	},
	cradily: {
		dexId: 346,
	},
	anorith: {
		dexId: 347,
	},
	armaldo: {
		dexId: 348,
	},
	feebas: {
		dexId: 349,
	},
	milotic: {
		dexId: 350,
	},
	castform: {
		dexId: 351,
	},
	kecleon: {
		dexId: 352,
	},
	shuppet: {
		dexId: 353,
	},
	banette: {
		dexId: 354,
	},
	duskull: {
		dexId: 355,
	},
	dusclops: {
		dexId: 356,
	},
	tropius: {
		dexId: 357,
	},
	chimecho: {
		dexId: 358,
	},
	absol: {
		dexId: 359,
	},
	wynaut: {
		dexId: 360,
	},
	snorunt: {
		dexId: 361,
	},
	glalie: {
		dexId: 362,
	},
	spheal: {
		dexId: 363,
	},
	sealeo: {
		dexId: 364,
	},
	walrein: {
		dexId: 365,
	},
	clamperl: {
		dexId: 366,
	},
	huntail: {
		dexId: 367,
	},
	gorebyss: {
		dexId: 368,
	},
	relicanth: {
		dexId: 369,
	},
	luvdisc: {
		dexId: 370,
	},
	bagon: {
		dexId: 371,
	},
	shelgon: {
		dexId: 372,
		swarm: 'STRONG',
	},
	salamence: {
		dexId: 373,
	},
	beldum: {
		dexId: 374,
	},
	metang: {
		dexId: 375,
	},
	metagross: {
		dexId: 376,
	},
	regirock: {
		dexId: 377,
	},
	regice: {
		dexId: 378,
	},
	registeel: {
		dexId: 379,
	},
	latias: {
		dexId: 380,
	},
	latios: {
		dexId: 381,
	},
	kyogre: {
		dexId: 382,
	},
	groudon: {
		dexId: 383,
	},
	rayquaza: {
		dexId: 384,
	},
	jirachi: {
		dexId: 385,
	},
	'deoxys-normal': {
		dexId: 386,
	},
	turtwig: {
		dexId: 387,
		swarm: 'WEAK',
	},
	grotle: {
		dexId: 388,
	},
	torterra: {
		dexId: 389,
	},
	chimchar: {
		dexId: 390,
		swarm: 'WEAK',
	},
	monferno: {
		dexId: 391,
	},
	infernape: {
		dexId: 392,
	},
	piplup: {
		dexId: 393,
		swarm: 'WEAK',
	},
	prinplup: {
		dexId: 394,
	},
	empoleon: {
		dexId: 395,
	},
	starly: {
		dexId: 396,
	},
	staravia: {
		dexId: 397,
	},
	staraptor: {
		dexId: 398,
	},
	bidoof: {
		dexId: 399,
	},
	bibarel: {
		dexId: 400,
	},
	kricketot: {
		dexId: 401,
	},
	kricketune: {
		dexId: 402,
	},
	shinx: {
		dexId: 403,
	},
	luxio: {
		dexId: 404,
	},
	luxray: {
		dexId: 405,
	},
	budew: {
		dexId: 406,
	},
	roserade: {
		dexId: 407,
	},
	cranidos: {
		dexId: 408,
	},
	rampardos: {
		dexId: 409,
	},
	shieldon: {
		dexId: 410,
	},
	bastiodon: {
		dexId: 411,
	},
	burmy: {
		dexId: 412,
	},
	'wormadam-plant': {
		dexId: 413,
	},
	mothim: {
		dexId: 414,
	},
	combee: {
		dexId: 415,
	},
	vespiquen: {
		dexId: 416,
	},
	pachirisu: {
		dexId: 417,
	},
	buizel: {
		dexId: 418,
	},
	floatzel: {
		dexId: 419,
	},
	cherubi: {
		dexId: 420,
	},
	cherrim: {
		dexId: 421,
	},
	shellos: {
		dexId: 422,
	},
	gastrodon: {
		dexId: 423,
	},
	ambipom: {
		dexId: 424,
	},
	drifloon: {
		dexId: 425,
	},
	drifblim: {
		dexId: 426,
	},
	buneary: {
		dexId: 427,
	},
	lopunny: {
		dexId: 428,
	},
	mismagius: {
		dexId: 429,
	},
	honchkrow: {
		dexId: 430,
	},
	glameow: {
		dexId: 431,
	},
	purugly: {
		dexId: 432,
	},
	chingling: {
		dexId: 433,
	},
	stunky: {
		dexId: 434,
	},
	skuntank: {
		dexId: 435,
	},
	bronzor: {
		dexId: 436,
	},
	bronzong: {
		dexId: 437,
	},
	bonsly: {
		dexId: 438,
	},
	'mime-jr': {
		dexId: 439,
	},
	happiny: {
		dexId: 440,
	},
	chatot: {
		dexId: 441,
	},
	spiritomb: {
		dexId: 442,
	},
	gible: {
		dexId: 443,
	},
	gabite: {
		dexId: 444,
	},
	garchomp: {
		dexId: 445,
		rampager: true,
	},
	munchlax: {
		dexId: 446,
	},
	riolu: {
		dexId: 447,
	},
	lucario: {
		dexId: 448,
	},
	hippopotas: {
		dexId: 449,
	},
	hippowdon: {
		dexId: 450,
	},
	skorupi: {
		dexId: 451,
	},
	drapion: {
		dexId: 452,
		rampager: true,
	},
	croagunk: {
		dexId: 453,
	},
	toxicroak: {
		dexId: 454,
	},
	carnivine: {
		dexId: 455,
	},
	finneon: {
		dexId: 456,
	},
	lumineon: {
		dexId: 457,
	},
	mantyke: {
		dexId: 458,
	},
	snover: {
		dexId: 459,
	},
	abomasnow: {
		dexId: 460,
	},
	weavile: {
		dexId: 461,
	},
	magnezone: {
		dexId: 462,
	},
	lickilicky: {
		dexId: 463,
	},
	rhyperior: {
		dexId: 464,
	},
	tangrowth: {
		dexId: 465,
	},
	electivire: {
		dexId: 466,
	},
	magmortar: {
		dexId: 467,
	},
	togekiss: {
		dexId: 468,
	},
	yanmega: {
		dexId: 469,
	},
	leafeon: {
		dexId: 470,
	},
	glaceon: {
		dexId: 471,
	},
	gliscor: {
		dexId: 472,
	},
	mamoswine: {
		dexId: 473,
	},
	'porygon-z': {
		dexId: 474,
	},
	gallade: {
		dexId: 475,
	},
	probopass: {
		dexId: 476,
	},
	dusknoir: {
		dexId: 477,
	},
	froslass: {
		dexId: 478,
	},
	rotom: {
		dexId: 479,
	},
	uxie: {
		dexId: 480,
	},
	mesprit: {
		dexId: 481,
	},
	azelf: {
		dexId: 482,
	},
	dialga: {
		dexId: 483,
	},
	palkia: {
		dexId: 484,
	},
	heatran: {
		dexId: 485,
	},
	regigigas: {
		dexId: 486,
	},
	'giratina-altered': {
		dexId: 487,
	},
	cresselia: {
		dexId: 488,
	},
	phione: {
		dexId: 489,
	},
	manaphy: {
		dexId: 490,
	},
	darkrai: {
		dexId: 491,
	},
	'shaymin-land': {
		dexId: 492,
	},
	arceus: {
		dexId: 493,
	},
	victini: {
		dexId: 494,
	},
	snivy: {
		dexId: 495,
		swarm: 'WEAK',
	},
	servine: {
		dexId: 496,
	},
	serperior: {
		dexId: 497,
	},
	tepig: {
		dexId: 498,
		swarm: 'WEAK',
	},
	pignite: {
		dexId: 499,
	},
	emboar: {
		dexId: 500,
	},
	oshawott: {
		dexId: 501,
		swarm: 'WEAK',
	},
	dewott: {
		dexId: 502,
	},
	samurott: {
		dexId: 503,
	},
	patrat: {
		dexId: 504,
	},
	watchog: {
		dexId: 505,
	},
	lillipup: {
		dexId: 506,
	},
	herdier: {
		dexId: 507,
	},
	stoutland: {
		dexId: 508,
	},
	purrloin: {
		dexId: 509,
	},
	liepard: {
		dexId: 510,
	},
	pansage: {
		dexId: 511,
	},
	simisage: {
		dexId: 512,
	},
	pansear: {
		dexId: 513,
	},
	simisear: {
		dexId: 514,
	},
	panpour: {
		dexId: 515,
	},
	simipour: {
		dexId: 516,
	},
	munna: {
		dexId: 517,
	},
	musharna: {
		dexId: 518,
	},
	pidove: {
		dexId: 519,
	},
	tranquill: {
		dexId: 520,
	},
	unfezant: {
		dexId: 521,
	},
	blitzle: {
		dexId: 522,
	},
	zebstrika: {
		dexId: 523,
	},
	roggenrola: {
		dexId: 524,
	},
	boldore: {
		dexId: 525,
	},
	gigalith: {
		dexId: 526,
	},
	woobat: {
		dexId: 527,
	},
	swoobat: {
		dexId: 528,
	},
	drilbur: {
		dexId: 529,
	},
	excadrill: {
		dexId: 530,
	},
	audino: {
		dexId: 531,
	},
	timburr: {
		dexId: 532,
	},
	gurdurr: {
		dexId: 533,
	},
	conkeldurr: {
		dexId: 534,
	},
	tympole: {
		dexId: 535,
	},
	palpitoad: {
		dexId: 536,
	},
	seismitoad: {
		dexId: 537,
	},
	throh: {
		dexId: 538,
	},
	sawk: {
		dexId: 539,
	},
	sewaddle: {
		dexId: 540,
	},
	swadloon: {
		dexId: 541,
	},
	leavanny: {
		dexId: 542,
	},
	venipede: {
		dexId: 543,
	},
	whirlipede: {
		dexId: 544,
	},
	scolipede: {
		dexId: 545,
		rampager: true,
	},
	cottonee: {
		dexId: 546,
	},
	whimsicott: {
		dexId: 547,
	},
	petilil: {
		dexId: 548,
	},
	lilligant: {
		dexId: 549,
	},
	'basculin-red-striped': {
		dexId: 550,
	},
	sandile: {
		dexId: 551,
	},
	krokorok: {
		dexId: 552,
	},
	krookodile: {
		dexId: 553,
	},
	darumaka: {
		dexId: 554,
	},
	'darmanitan-standard': {
		dexId: 555,
	},
	maractus: {
		dexId: 556,
	},
	dwebble: {
		dexId: 557,
	},
	crustle: {
		dexId: 558,
	},
	scraggy: {
		dexId: 559,
	},
	scrafty: {
		dexId: 560,
	},
	sigilyph: {
		dexId: 561,
	},
	yamask: {
		dexId: 562,
	},
	cofagrigus: {
		dexId: 563,
	},
	tirtouga: {
		dexId: 564,
	},
	carracosta: {
		dexId: 565,
	},
	archen: {
		dexId: 566,
	},
	archeops: {
		dexId: 567,
	},
	trubbish: {
		dexId: 568,
	},
	garbodor: {
		dexId: 569,
	},
	zorua: {
		dexId: 570,
	},
	zoroark: {
		dexId: 571,
	},
	minccino: {
		dexId: 572,
	},
	cinccino: {
		dexId: 573,
	},
	gothita: {
		dexId: 574,
	},
	gothorita: {
		dexId: 575,
	},
	gothitelle: {
		dexId: 576,
	},
	solosis: {
		dexId: 577,
	},
	duosion: {
		dexId: 578,
	},
	reuniclus: {
		dexId: 579,
	},
	ducklett: {
		dexId: 580,
	},
	swanna: {
		dexId: 581,
	},
	vanillite: {
		dexId: 582,
	},
	vanillish: {
		dexId: 583,
	},
	vanilluxe: {
		dexId: 584,
	},
	deerling: {
		dexId: 585,
	},
	sawsbuck: {
		dexId: 586,
	},
	emolga: {
		dexId: 587,
	},
	karrablast: {
		dexId: 588,
	},
	escavalier: {
		dexId: 589,
	},
	foongus: {
		dexId: 590,
	},
	amoonguss: {
		dexId: 591,
		swarm: 'STRONG',
	},
	frillish: {
		dexId: 592,
	},
	jellicent: {
		dexId: 593,
	},
	alomomola: {
		dexId: 594,
	},
	joltik: {
		dexId: 595,
	},
	galvantula: {
		dexId: 596,
	},
	ferroseed: {
		dexId: 597,
	},
	ferrothorn: {
		dexId: 598,
	},
	klink: {
		dexId: 599,
	},
	klang: {
		dexId: 600,
	},
	klinklang: {
		dexId: 601,
	},
	tynamo: {
		dexId: 602,
	},
	eelektrik: {
		dexId: 603,
	},
	eelektross: {
		dexId: 604,
	},
	elgyem: {
		dexId: 605,
	},
	beheeyem: {
		dexId: 606,
	},
	litwick: {
		dexId: 607,
	},
	lampent: {
		dexId: 608,
	},
	chandelure: {
		dexId: 609,
	},
	axew: {
		dexId: 610,
	},
	fraxure: {
		dexId: 611,
	},
	haxorus: {
		dexId: 612,
	},
	cubchoo: {
		dexId: 613,
	},
	beartic: {
		dexId: 614,
		rampager: true,
	},
	cryogonal: {
		dexId: 615,
	},
	shelmet: {
		dexId: 616,
	},
	accelgor: {
		dexId: 617,
	},
	stunfisk: {
		dexId: 618,
	},
	mienfoo: {
		dexId: 619,
	},
	mienshao: {
		dexId: 620,
	},
	druddigon: {
		dexId: 621,
	},
	golett: {
		dexId: 622,
	},
	golurk: {
		dexId: 623,
	},
	pawniard: {
		dexId: 624,
	},
	bisharp: {
		dexId: 625,
	},
	bouffalant: {
		dexId: 626,
	},
	rufflet: {
		dexId: 627,
	},
	braviary: {
		dexId: 628,
	},
	vullaby: {
		dexId: 629,
	},
	mandibuzz: {
		dexId: 630,
	},
	heatmor: {
		dexId: 631,
	},
	durant: {
		dexId: 632,
	},
	deino: {
		dexId: 633,
	},
	zweilous: {
		dexId: 634,
		swarm: 'STRONG',
	},
	hydreigon: {
		dexId: 635,
	},
	larvesta: {
		dexId: 636,
	},
	volcarona: {
		dexId: 637,
		swarm: 'STRONG',
	},
	cobalion: {
		dexId: 638,
	},
	terrakion: {
		dexId: 639,
	},
	virizion: {
		dexId: 640,
	},
	'tornadus-incarnate': {
		dexId: 641,
	},
	'thundurus-incarnate': {
		dexId: 642,
	},
	reshiram: {
		dexId: 643,
	},
	zekrom: {
		dexId: 644,
	},
	'landorus-incarnate': {
		dexId: 645,
	},
	kyurem: {
		dexId: 646,
	},
	'keldeo-ordinary': {
		dexId: 647,
	},
	'meloetta-aria': {
		dexId: 648,
	},
	genesect: {
		dexId: 649,
	},
	chespin: {
		dexId: 650,
		swarm: 'WEAK',
	},
	quilladin: {
		dexId: 651,
	},
	chesnaught: {
		dexId: 652,
	},
	fennekin: {
		dexId: 653,
		swarm: 'WEAK',
	},
	braixen: {
		dexId: 654,
	},
	delphox: {
		dexId: 655,
	},
	froakie: {
		dexId: 656,
		swarm: 'WEAK',
	},
	frogadier: {
		dexId: 657,
	},
	greninja: {
		dexId: 658,
	},
	bunnelby: {
		dexId: 659,
	},
	diggersby: {
		dexId: 660,
	},
	fletchling: {
		dexId: 661,
	},
	fletchinder: {
		dexId: 662,
	},
	talonflame: {
		dexId: 663,
	},
	scatterbug: {
		dexId: 664,
	},
	spewpa: {
		dexId: 665,
	},
	vivillon: {
		dexId: 666,
	},
	litleo: {
		dexId: 667,
	},
	pyroar: {
		dexId: 668,
	},
	flabebe: {
		dexId: 669,
	},
	floette: {
		dexId: 670,
	},
	florges: {
		dexId: 671,
	},
	skiddo: {
		dexId: 672,
	},
	gogoat: {
		dexId: 673,
	},
	pancham: {
		dexId: 674,
	},
	pangoro: {
		dexId: 675,
		rampager: true,
	},
	furfrou: {
		dexId: 676,
	},
	espurr: {
		dexId: 677,
	},
	'meowstic-male': {
		dexId: 678,
	},
	honedge: {
		dexId: 679,
	},
	doublade: {
		dexId: 680,
	},
	'aegislash-shield': {
		dexId: 681,
	},
	spritzee: {
		dexId: 682,
	},
	aromatisse: {
		dexId: 683,
	},
	swirlix: {
		dexId: 684,
	},
	slurpuff: {
		dexId: 685,
	},
	inkay: {
		dexId: 686,
	},
	malamar: {
		dexId: 687,
	},
	binacle: {
		dexId: 688,
	},
	barbaracle: {
		dexId: 689,
	},
	skrelp: {
		dexId: 690,
	},
	dragalge: {
		dexId: 691,
	},
	clauncher: {
		dexId: 692,
	},
	clawitzer: {
		dexId: 693,
	},
	helioptile: {
		dexId: 694,
	},
	heliolisk: {
		dexId: 695,
	},
	tyrunt: {
		dexId: 696,
	},
	tyrantrum: {
		dexId: 697,
	},
	amaura: {
		dexId: 698,
	},
	aurorus: {
		dexId: 699,
	},
	sylveon: {
		dexId: 700,
	},
	hawlucha: {
		dexId: 701,
	},
	dedenne: {
		dexId: 702,
	},
	carbink: {
		dexId: 703,
	},
	goomy: {
		dexId: 704,
	},
	sliggoo: {
		dexId: 705,
	},
	goodra: {
		dexId: 706,
	},
	klefki: {
		dexId: 707,
	},
	phantump: {
		dexId: 708,
	},
	trevenant: {
		dexId: 709,
	},
	'pumpkaboo-average': {
		dexId: 710,
	},
	'gourgeist-average': {
		dexId: 711,
	},
	bergmite: {
		dexId: 712,
	},
	avalugg: {
		dexId: 713,
	},
	noibat: {
		dexId: 714,
	},
	noivern: {
		dexId: 715,
	},
	xerneas: {
		dexId: 716,
	},
	yveltal: {
		dexId: 717,
	},
	'zygarde-50': {
		dexId: 718,
	},
	diancie: {
		dexId: 719,
	},
	hoopa: {
		dexId: 720,
	},
	volcanion: {
		dexId: 721,
	},
	rowlet: {
		dexId: 722,
		swarm: 'WEAK',
	},
	dartrix: {
		dexId: 723,
	},
	decidueye: {
		dexId: 724,
	},
	litten: {
		dexId: 725,
		swarm: 'WEAK',
	},
	torracat: {
		dexId: 726,
	},
	incineroar: {
		dexId: 727,
	},
	popplio: {
		dexId: 728,
		swarm: 'WEAK',
	},
	brionne: {
		dexId: 729,
	},
	primarina: {
		dexId: 730,
	},
	pikipek: {
		dexId: 731,
	},
	trumbeak: {
		dexId: 732,
	},
	toucannon: {
		dexId: 733,
	},
	yungoos: {
		dexId: 734,
	},
	gumshoos: {
		dexId: 735,
	},
	grubbin: {
		dexId: 736,
	},
	charjabug: {
		dexId: 737,
	},
	vikavolt: {
		dexId: 738,
	},
	crabrawler: {
		dexId: 739,
	},
	crabominable: {
		dexId: 740,
	},
	'oricorio-baile': {
		dexId: 741,
	},
	cutiefly: {
		dexId: 742,
	},
	ribombee: {
		dexId: 743,
	},
	rockruff: {
		dexId: 744,
	},
	'lycanroc-midday': {
		dexId: 745,
	},
	'wishiwashi-solo': {
		dexId: 746,
	},
	mareanie: {
		dexId: 747,
	},
	toxapex: {
		dexId: 748,
	},
	mudbray: {
		dexId: 749,
	},
	mudsdale: {
		dexId: 750,
	},
	dewpider: {
		dexId: 751,
	},
	araquanid: {
		dexId: 752,
	},
	fomantis: {
		dexId: 753,
	},
	lurantis: {
		dexId: 754,
	},
	morelull: {
		dexId: 755,
	},
	shiinotic: {
		dexId: 756,
	},
	salandit: {
		dexId: 757,
	},
	salazzle: {
		dexId: 758,
	},
	stufful: {
		dexId: 759,
	},
	bewear: {
		dexId: 760,
	},
	bounsweet: {
		dexId: 761,
	},
	steenee: {
		dexId: 762,
	},
	tsareena: {
		dexId: 763,
	},
	comfey: {
		dexId: 764,
	},
	oranguru: {
		dexId: 765,
		rampager: true,
	},
	passimian: {
		dexId: 766,
	},
	wimpod: {
		dexId: 767,
	},
	golisopod: {
		dexId: 768,
	},
	sandygast: {
		dexId: 769,
	},
	palossand: {
		dexId: 770,
	},
	pyukumuku: {
		dexId: 771,
	},
	'type-null': {
		dexId: 772,
	},
	silvally: {
		dexId: 773,
	},
	'minior-red-meteor': {
		dexId: 774,
	},
	komala: {
		dexId: 775,
	},
	turtonator: {
		dexId: 776,
	},
	togedemaru: {
		dexId: 777,
	},
	'mimikyu-disguised': {
		dexId: 778,
	},
	bruxish: {
		dexId: 779,
	},
	drampa: {
		dexId: 780,
	},
	dhelmise: {
		dexId: 781,
	},
	'jangmo-o': {
		dexId: 782,
	},
	'hakamo-o': {
		dexId: 783,
	},
	'kommo-o': {
		dexId: 784,
		rampager: true,
	},
	'tapu-koko': {
		dexId: 785,
	},
	'tapu-lele': {
		dexId: 786,
	},
	'tapu-bulu': {
		dexId: 787,
	},
	'tapu-fini': {
		dexId: 788,
	},
	cosmog: {
		dexId: 789,
	},
	cosmoem: {
		dexId: 790,
	},
	solgaleo: {
		dexId: 791,
	},
	lunala: {
		dexId: 792,
	},
	nihilego: {
		dexId: 793,
		swarm: 'SPACE_DISTORTION',
	},
	buzzwole: {
		dexId: 794,
		swarm: 'SPACE_DISTORTION',
	},
	pheromosa: {
		dexId: 795,
		swarm: 'SPACE_DISTORTION',
	},
	xurkitree: {
		dexId: 796,
		swarm: 'SPACE_DISTORTION',
	},
	celesteela: {
		dexId: 797,
		swarm: 'SPACE_DISTORTION',
	},
	kartana: {
		dexId: 798,
		swarm: 'SPACE_DISTORTION',
	},
	guzzlord: {
		dexId: 799,
		swarm: 'SPACE_DISTORTION',
	},
	necrozma: {
		dexId: 800,
	},
	magearna: {
		dexId: 801,
	},
	marshadow: {
		dexId: 802,
	},
	poipole: {
		dexId: 803,
		swarm: 'SPACE_DISTORTION',
	},
	naganadel: {
		dexId: 804,
	},
	stakataka: {
		dexId: 805,
		swarm: 'SPACE_DISTORTION',
	},
	blacephalon: {
		dexId: 806,
		swarm: 'SPACE_DISTORTION',
	},
	zeraora: {
		dexId: 807,
	},
	meltan: {
		dexId: 808,
	},
	melmetal: {
		dexId: 809,
	},
	grookey: {
		dexId: 810,
		swarm: 'WEAK',
	},
	thwackey: {
		dexId: 811,
	},
	rillaboom: {
		dexId: 812,
	},
	scorbunny: {
		dexId: 813,
		swarm: 'WEAK',
	},
	raboot: {
		dexId: 814,
	},
	cinderace: {
		dexId: 815,
	},
	sobble: {
		dexId: 816,
		swarm: 'WEAK',
	},
	drizzile: {
		dexId: 817,
	},
	inteleon: {
		dexId: 818,
	},
	skwovet: {
		dexId: 819,
	},
	greedent: {
		dexId: 820,
	},
	rookidee: {
		dexId: 821,
	},
	corvisquire: {
		dexId: 822,
	},
	corviknight: {
		dexId: 823,
	},
	blipbug: {
		dexId: 824,
	},
	dottler: {
		dexId: 825,
	},
	orbeetle: {
		dexId: 826,
	},
	nickit: {
		dexId: 827,
	},
	thievul: {
		dexId: 828,
	},
	gossifleur: {
		dexId: 829,
	},
	eldegoss: {
		dexId: 830,
	},
	wooloo: {
		dexId: 831,
	},
	dubwool: {
		dexId: 832,
	},
	chewtle: {
		dexId: 833,
	},
	drednaw: {
		dexId: 834,
	},
	yamper: {
		dexId: 835,
	},
	boltund: {
		dexId: 836,
	},
	rolycoly: {
		dexId: 837,
	},
	carkol: {
		dexId: 838,
	},
	coalossal: {
		dexId: 839,
	},
	applin: {
		dexId: 840,
	},
	flapple: {
		dexId: 841,
	},
	appletun: {
		dexId: 842,
	},
	silicobra: {
		dexId: 843,
	},
	sandaconda: {
		dexId: 844,
	},
	cramorant: {
		dexId: 845,
	},
	arrokuda: {
		dexId: 846,
	},
	barraskewda: {
		dexId: 847,
	},
	toxel: {
		dexId: 848,
	},
	'toxtricity-amped': {
		dexId: 849,
	},
	sizzlipede: {
		dexId: 850,
	},
	centiskorch: {
		dexId: 851,
	},
	clobbopus: {
		dexId: 852,
	},
	grapploct: {
		dexId: 853,
	},
	sinistea: {
		dexId: 854,
	},
	polteageist: {
		dexId: 855,
	},
	hatenna: {
		dexId: 856,
	},
	hattrem: {
		dexId: 857,
	},
	hatterene: {
		dexId: 858,
	},
	impidimp: {
		dexId: 859,
	},
	morgrem: {
		dexId: 860,
	},
	grimmsnarl: {
		dexId: 861,
	},
	obstagoon: {
		dexId: 862,
	},
	perrserker: {
		dexId: 863,
	},
	cursola: {
		dexId: 864,
	},
	sirfetchd: {
		dexId: 865,
	},
	'mr-rime': {
		dexId: 866,
	},
	runerigus: {
		dexId: 867,
	},
	milcery: {
		dexId: 868,
	},
	alcremie: {
		dexId: 869,
	},
	falinks: {
		dexId: 870,
	},
	pincurchin: {
		dexId: 871,
	},
	snom: {
		dexId: 872,
	},
	frosmoth: {
		dexId: 873,
	},
	stonjourner: {
		dexId: 874,
	},
	'eiscue-ice': {
		dexId: 875,
	},
	'indeedee-male': {
		dexId: 876,
	},
	'morpeko-full-belly': {
		dexId: 877,
	},
	cufant: {
		dexId: 878,
	},
	copperajah: {
		dexId: 879,
	},
	dracozolt: {
		dexId: 880,
	},
	arctozolt: {
		dexId: 881,
	},
	dracovish: {
		dexId: 882,
	},
	arctovish: {
		dexId: 883,
	},
	duraludon: {
		dexId: 884,
	},
	dreepy: {
		dexId: 885,
	},
	drakloak: {
		dexId: 886,
	},
	dragapult: {
		dexId: 887,
	},
	zacian: {
		dexId: 888,
	},
	zamazenta: {
		dexId: 889,
	},
	eternatus: {
		dexId: 890,
	},
	kubfu: {
		dexId: 891,
	},
	'urshifu-single-strike': {
		dexId: 892,
	},
	zarude: {
		dexId: 893,
	},
	regieleki: {
		dexId: 894,
	},
	regidrago: {
		dexId: 895,
	},
	glastrier: {
		dexId: 896,
	},
	spectrier: {
		dexId: 897,
	},
	calyrex: {
		dexId: 898,
	},
	wyrdeer: {
		dexId: 899,
	},
	kleavor: {
		dexId: 900,
	},
	ursaluna: {
		dexId: 901,
	},
	'basculegion-male': {
		dexId: 902,
	},
	sneasler: {
		dexId: 903,
	},
	overqwil: {
		dexId: 904,
	},
	'enamorus-incarnate': {
		dexId: 905,
	},
	sprigatito: {
		dexId: 906,
		swarm: 'WEAK',
	},
	floragato: {
		dexId: 907,
	},
	meowscarada: {
		dexId: 908,
	},
	fuecoco: {
		dexId: 909,
		swarm: 'WEAK',
	},
	crocalor: {
		dexId: 910,
	},
	skeledirge: {
		dexId: 911,
	},
	quaxly: {
		dexId: 912,
		swarm: 'WEAK',
	},
	quaxwell: {
		dexId: 913,
	},
	quaquaval: {
		dexId: 914,
	},
	lechonk: {
		dexId: 915,
	},
	'oinkologne-male': {
		dexId: 916,
	},
	tarountula: {
		dexId: 917,
	},
	spidops: {
		dexId: 918,
	},
	nymble: {
		dexId: 919,
	},
	lokix: {
		dexId: 920,
	},
	pawmi: {
		dexId: 921,
	},
	pawmo: {
		dexId: 922,
	},
	pawmot: {
		dexId: 923,
	},
	tandemaus: {
		dexId: 924,
	},
	'maushold-family-of-four': {
		dexId: 925,
	},
	fidough: {
		dexId: 926,
	},
	dachsbun: {
		dexId: 927,
	},
	smoliv: {
		dexId: 928,
	},
	dolliv: {
		dexId: 929,
	},
	arboliva: {
		dexId: 930,
	},
	'squawkabilly-green-plumage': {
		dexId: 931,
	},
	nacli: {
		dexId: 932,
	},
	naclstack: {
		dexId: 933,
	},
	garganacl: {
		dexId: 934,
	},
	charcadet: {
		dexId: 935,
	},
	armarouge: {
		dexId: 936,
	},
	ceruledge: {
		dexId: 937,
	},
	tadbulb: {
		dexId: 938,
	},
	bellibolt: {
		dexId: 939,
	},
	wattrel: {
		dexId: 940,
	},
	kilowattrel: {
		dexId: 941,
	},
	maschiff: {
		dexId: 942,
	},
	mabosstiff: {
		dexId: 943,
	},
	shroodle: {
		dexId: 944,
	},
	grafaiai: {
		dexId: 945,
	},
	bramblin: {
		dexId: 946,
	},
	brambleghast: {
		dexId: 947,
	},
	toedscool: {
		dexId: 948,
	},
	toedscruel: {
		dexId: 949,
	},
	klawf: {
		dexId: 950,
	},
	capsakid: {
		dexId: 951,
	},
	scovillain: {
		dexId: 952,
	},
	rellor: {
		dexId: 953,
	},
	rabsca: {
		dexId: 954,
	},
	flittle: {
		dexId: 955,
	},
	espathra: {
		dexId: 956,
	},
	tinkatink: {
		dexId: 957,
	},
	tinkatuff: {
		dexId: 958,
	},
	tinkaton: {
		dexId: 959,
	},
	wiglett: {
		dexId: 960,
	},
	wugtrio: {
		dexId: 961,
	},
	bombirdier: {
		dexId: 962,
	},
	finizen: {
		dexId: 963,
	},
	'palafin-zero': {
		dexId: 964,
	},
	varoom: {
		dexId: 965,
	},
	revavroom: {
		dexId: 966,
	},
	cyclizar: {
		dexId: 967,
		swarm: 'STRONG',
	},
	orthworm: {
		dexId: 968,
	},
	glimmet: {
		dexId: 969,
	},
	glimmora: {
		dexId: 970,
	},
	greavard: {
		dexId: 971,
	},
	houndstone: {
		dexId: 972,
	},
	flamigo: {
		dexId: 973,
	},
	cetoddle: {
		dexId: 974,
	},
	cetitan: {
		dexId: 975,
	},
	veluza: {
		dexId: 976,
	},
	dondozo: {
		dexId: 977,
	},
	'tatsugiri-curly': {
		dexId: 978,
	},
	annihilape: {
		dexId: 979,
	},
	clodsire: {
		dexId: 980,
	},
	farigiraf: {
		dexId: 981,
	},
	'dudunsparce-two-segment': {
		dexId: 982,
	},
	kingambit: {
		dexId: 983,
	},
	'great-tusk': {
		dexId: 984,
		swarm: 'PAST_DISTORTION',
	},
	'scream-tail': {
		dexId: 985,
		swarm: 'PAST_DISTORTION',
	},
	'brute-bonnet': {
		dexId: 986,
		swarm: 'PAST_DISTORTION',
	},
	'flutter-mane': {
		dexId: 987,
		swarm: 'PAST_DISTORTION',
	},
	'slither-wing': {
		dexId: 988,
		swarm: 'PAST_DISTORTION',
	},
	'sandy-shocks': {
		dexId: 989,
		swarm: 'PAST_DISTORTION',
	},
	'iron-treads': {
		dexId: 990,
		swarm: 'FUTURE_DISTORTION',
	},
	'iron-bundle': {
		dexId: 991,
		swarm: 'FUTURE_DISTORTION',
	},
	'iron-hands': {
		dexId: 992,
		swarm: 'FUTURE_DISTORTION',
	},
	'iron-jugulis': {
		dexId: 993,
		swarm: 'FUTURE_DISTORTION',
	},
	'iron-moth': {
		dexId: 994,
		swarm: 'FUTURE_DISTORTION',
	},
	'iron-thorns': {
		dexId: 995,
		swarm: 'FUTURE_DISTORTION',
	},
	frigibax: {
		dexId: 996,
	},
	arctibax: {
		dexId: 997,
	},
	baxcalibur: {
		dexId: 998,
	},
	gimmighoul: {
		dexId: 999,
	},
	gholdengo: {
		dexId: 1000,
	},
	'wo-chien': {
		dexId: 1001,
	},
	'chien-pao': {
		dexId: 1002,
	},
	'ting-lu': {
		dexId: 1003,
	},
	'chi-yu': {
		dexId: 1004,
	},
	'roaring-moon': {
		dexId: 1005,
		swarm: 'PAST_DISTORTION',
	},
	'iron-valiant': {
		dexId: 1006,
		swarm: 'FUTURE_DISTORTION',
	},
	koraidon: {
		dexId: 1007,
	},
	miraidon: {
		dexId: 1008,
	},
	'walking-wake': {
		dexId: 1009,
	},
	'iron-leaves': {
		dexId: 1010,
	},
	dipplin: {
		dexId: 1011,
	},
	poltchageist: {
		dexId: 1012,
	},
	sinistcha: {
		dexId: 1013,
	},
	okidogi: {
		dexId: 1014,
	},
	munkidori: {
		dexId: 1015,
	},
	fezandipiti: {
		dexId: 1016,
	},
	ogerpon: {
		dexId: 1017,
	},
	archaludon: {
		dexId: 1018,
	},
	hydrapple: {
		dexId: 1019,
	},
	'gouging-fire': {
		dexId: 1020,
	},
	'raging-bolt': {
		dexId: 1021,
	},
	'iron-boulder': {
		dexId: 1022,
	},
	'iron-crown': {
		dexId: 1023,
	},
	terapagos: {
		dexId: 1024,
	},
	pecharunt: {
		dexId: 1025,
	},
	'deoxys-attack': {
		dexId: 10001,
	},
	'deoxys-defense': {
		dexId: 10002,
	},
	'deoxys-speed': {
		dexId: 10003,
	},
	'wormadam-sandy': {
		dexId: 10004,
	},
	'wormadam-trash': {
		dexId: 10005,
	},
	'shaymin-sky': {
		dexId: 10006,
	},
	'giratina-origin': {
		dexId: 10007,
	},
	'rotom-heat': {
		dexId: 10008,
	},
	'rotom-wash': {
		dexId: 10009,
	},
	'rotom-frost': {
		dexId: 10010,
	},
	'rotom-fan': {
		dexId: 10011,
	},
	'rotom-mow': {
		dexId: 10012,
	},
	'castform-sunny': {
		dexId: 10013,
	},
	'castform-rainy': {
		dexId: 10014,
	},
	'castform-snowy': {
		dexId: 10015,
	},
	'basculin-blue-striped': {
		dexId: 10016,
	},
	'darmanitan-zen': {
		dexId: 10017,
	},
	'meloetta-pirouette': {
		dexId: 10018,
	},
	'tornadus-therian': {
		dexId: 10019,
	},
	'thundurus-therian': {
		dexId: 10020,
	},
	'landorus-therian': {
		dexId: 10021,
	},
	'kyurem-black': {
		dexId: 10022,
	},
	'kyurem-white': {
		dexId: 10023,
	},
	'keldeo-resolute': {
		dexId: 10024,
	},
	'meowstic-female': {
		dexId: 10025,
	},
	'aegislash-blade': {
		dexId: 10026,
	},
	'pumpkaboo-small': {
		dexId: 10027,
	},
	'pumpkaboo-large': {
		dexId: 10028,
	},
	'pumpkaboo-super': {
		dexId: 10029,
	},
	'gourgeist-small': {
		dexId: 10030,
	},
	'gourgeist-large': {
		dexId: 10031,
	},
	'gourgeist-super': {
		dexId: 10032,
	},
	'venusaur-mega': {
		dexId: 10033,
	},
	'charizard-mega-x': {
		dexId: 10034,
	},
	'charizard-mega-y': {
		dexId: 10035,
	},
	'blastoise-mega': {
		dexId: 10036,
	},
	'alakazam-mega': {
		dexId: 10037,
	},
	'gengar-mega': {
		dexId: 10038,
	},
	'kangaskhan-mega': {
		dexId: 10039,
	},
	'pinsir-mega': {
		dexId: 10040,
	},
	'gyarados-mega': {
		dexId: 10041,
	},
	'aerodactyl-mega': {
		dexId: 10042,
	},
	'mewtwo-mega-x': {
		dexId: 10043,
	},
	'mewtwo-mega-y': {
		dexId: 10044,
	},
	'ampharos-mega': {
		dexId: 10045,
	},
	'scizor-mega': {
		dexId: 10046,
	},
	'heracross-mega': {
		dexId: 10047,
	},
	'houndoom-mega': {
		dexId: 10048,
	},
	'tyranitar-mega': {
		dexId: 10049,
	},
	'blaziken-mega': {
		dexId: 10050,
	},
	'gardevoir-mega': {
		dexId: 10051,
	},
	'mawile-mega': {
		dexId: 10052,
	},
	'aggron-mega': {
		dexId: 10053,
	},
	'medicham-mega': {
		dexId: 10054,
	},
	'manectric-mega': {
		dexId: 10055,
	},
	'banette-mega': {
		dexId: 10056,
	},
	'absol-mega': {
		dexId: 10057,
	},
	'garchomp-mega': {
		dexId: 10058,
	},
	'lucario-mega': {
		dexId: 10059,
	},
	'abomasnow-mega': {
		dexId: 10060,
	},
	'floette-eternal': {
		dexId: 10061,
	},
	'latias-mega': {
		dexId: 10062,
	},
	'latios-mega': {
		dexId: 10063,
	},
	'swampert-mega': {
		dexId: 10064,
	},
	'sceptile-mega': {
		dexId: 10065,
	},
	'sableye-mega': {
		dexId: 10066,
	},
	'altaria-mega': {
		dexId: 10067,
	},
	'gallade-mega': {
		dexId: 10068,
	},
	'audino-mega': {
		dexId: 10069,
	},
	'sharpedo-mega': {
		dexId: 10070,
	},
	'slowbro-mega': {
		dexId: 10071,
	},
	'steelix-mega': {
		dexId: 10072,
	},
	'pidgeot-mega': {
		dexId: 10073,
	},
	'glalie-mega': {
		dexId: 10074,
	},
	'diancie-mega': {
		dexId: 10075,
	},
	'metagross-mega': {
		dexId: 10076,
	},
	'kyogre-primal': {
		dexId: 10077,
	},
	'groudon-primal': {
		dexId: 10078,
	},
	'rayquaza-mega': {
		dexId: 10079,
	},
	'pikachu-rock-star': {
		dexId: 10080,
	},
	'pikachu-belle': {
		dexId: 10081,
	},
	'pikachu-pop-star': {
		dexId: 10082,
	},
	'pikachu-phd': {
		dexId: 10083,
	},
	'pikachu-libre': {
		dexId: 10084,
	},
	'pikachu-cosplay': {
		dexId: 10085,
	},
	'hoopa-unbound': {
		dexId: 10086,
	},
	'camerupt-mega': {
		dexId: 10087,
	},
	'lopunny-mega': {
		dexId: 10088,
	},
	'salamence-mega': {
		dexId: 10089,
	},
	'beedrill-mega': {
		dexId: 10090,
	},
	'rattata-alola': {
		dexId: 10091,
	},
	'raticate-alola': {
		dexId: 10092,
	},
	'raticate-totem-alola': {
		dexId: 10093,
	},
	'pikachu-original-cap': {
		dexId: 10094,
	},
	'pikachu-hoenn-cap': {
		dexId: 10095,
	},
	'pikachu-sinnoh-cap': {
		dexId: 10096,
	},
	'pikachu-unova-cap': {
		dexId: 10097,
	},
	'pikachu-kalos-cap': {
		dexId: 10098,
	},
	'pikachu-alola-cap': {
		dexId: 10099,
	},
	'raichu-alola': {
		dexId: 10100,
	},
	'sandshrew-alola': {
		dexId: 10101,
	},
	'sandslash-alola': {
		dexId: 10102,
	},
	'vulpix-alola': {
		dexId: 10103,
	},
	'ninetales-alola': {
		dexId: 10104,
	},
	'diglett-alola': {
		dexId: 10105,
	},
	'dugtrio-alola': {
		dexId: 10106,
	},
	'meowth-alola': {
		dexId: 10107,
	},
	'persian-alola': {
		dexId: 10108,
	},
	'geodude-alola': {
		dexId: 10109,
	},
	'graveler-alola': {
		dexId: 10110,
	},
	'golem-alola': {
		dexId: 10111,
	},
	'grimer-alola': {
		dexId: 10112,
	},
	'muk-alola': {
		dexId: 10113,
	},
	'exeggutor-alola': {
		dexId: 10114,
	},
	'marowak-alola': {
		dexId: 10115,
	},
	'greninja-battle-bond': {
		dexId: 10116,
	},
	'greninja-ash': {
		dexId: 10117,
	},
	'zygarde-10-power-construct': {
		dexId: 10118,
	},
	'zygarde-50-power-construct': {
		dexId: 10119,
	},
	'zygarde-complete': {
		dexId: 10120,
	},
	'gumshoos-totem': {
		dexId: 10121,
	},
	'vikavolt-totem': {
		dexId: 10122,
	},
	'oricorio-pom-pom': {
		dexId: 10123,
	},
	'oricorio-pau': {
		dexId: 10124,
	},
	'oricorio-sensu': {
		dexId: 10125,
	},
	'lycanroc-midnight': {
		dexId: 10126,
	},
	'wishiwashi-school': {
		dexId: 10127,
	},
	'lurantis-totem': {
		dexId: 10128,
	},
	'salazzle-totem': {
		dexId: 10129,
	},
	'minior-orange-meteor': {
		dexId: 10130,
	},
	'minior-yellow-meteor': {
		dexId: 10131,
	},
	'minior-green-meteor': {
		dexId: 10132,
	},
	'minior-blue-meteor': {
		dexId: 10133,
	},
	'minior-indigo-meteor': {
		dexId: 10134,
	},
	'minior-violet-meteor': {
		dexId: 10135,
	},
	'minior-red': {
		dexId: 10136,
	},
	'minior-orange': {
		dexId: 10137,
	},
	'minior-yellow': {
		dexId: 10138,
	},
	'minior-green': {
		dexId: 10139,
	},
	'minior-blue': {
		dexId: 10140,
	},
	'minior-indigo': {
		dexId: 10141,
	},
	'minior-violet': {
		dexId: 10142,
	},
	'mimikyu-busted': {
		dexId: 10143,
	},
	'mimikyu-totem-disguised': {
		dexId: 10144,
	},
	'mimikyu-totem-busted': {
		dexId: 10145,
	},
	'kommo-o-totem': {
		dexId: 10146,
	},
	'magearna-original': {
		dexId: 10147,
	},
	'pikachu-partner-cap': {
		dexId: 10148,
	},
	'marowak-totem': {
		dexId: 10149,
	},
	'ribombee-totem': {
		dexId: 10150,
	},
	'rockruff-own-tempo': {
		dexId: 10151,
	},
	'lycanroc-dusk': {
		dexId: 10152,
	},
	'araquanid-totem': {
		dexId: 10153,
	},
	'togedemaru-totem': {
		dexId: 10154,
	},
	'necrozma-dusk': {
		dexId: 10155,
	},
	'necrozma-dawn': {
		dexId: 10156,
	},
	'necrozma-ultra': {
		dexId: 10157,
	},
	'pikachu-starter': {
		dexId: 10158,
	},
	'eevee-starter': {
		dexId: 10159,
	},
	'pikachu-world-cap': {
		dexId: 10160,
	},
	'meowth-galar': {
		dexId: 10161,
	},
	'ponyta-galar': {
		dexId: 10162,
	},
	'rapidash-galar': {
		dexId: 10163,
	},
	'slowpoke-galar': {
		dexId: 10164,
	},
	'slowbro-galar': {
		dexId: 10165,
	},
	'farfetchd-galar': {
		dexId: 10166,
	},
	'weezing-galar': {
		dexId: 10167,
	},
	'mr-mime-galar': {
		dexId: 10168,
	},
	'articuno-galar': {
		dexId: 10169,
	},
	'zapdos-galar': {
		dexId: 10170,
	},
	'moltres-galar': {
		dexId: 10171,
	},
	'slowking-galar': {
		dexId: 10172,
	},
	'corsola-galar': {
		dexId: 10173,
	},
	'zigzagoon-galar': {
		dexId: 10174,
	},
	'linoone-galar': {
		dexId: 10175,
	},
	'darumaka-galar': {
		dexId: 10176,
	},
	'darmanitan-galar-standard': {
		dexId: 10177,
	},
	'darmanitan-galar-zen': {
		dexId: 10178,
	},
	'yamask-galar': {
		dexId: 10179,
	},
	'stunfisk-galar': {
		dexId: 10180,
	},
	'zygarde-10': {
		dexId: 10181,
	},
	'cramorant-gulping': {
		dexId: 10182,
	},
	'cramorant-gorging': {
		dexId: 10183,
	},
	'toxtricity-low-key': {
		dexId: 10184,
	},
	'eiscue-noice': {
		dexId: 10185,
	},
	'indeedee-female': {
		dexId: 10186,
	},
	'morpeko-hangry': {
		dexId: 10187,
	},
	'zacian-crowned': {
		dexId: 10188,
	},
	'zamazenta-crowned': {
		dexId: 10189,
	},
	'eternatus-eternamax': {
		dexId: 10190,
	},
	'urshifu-rapid-strike': {
		dexId: 10191,
	},
	'zarude-dada': {
		dexId: 10192,
	},
	'calyrex-ice': {
		dexId: 10193,
	},
	'calyrex-shadow': {
		dexId: 10194,
	},
	'venusaur-gmax': {
		dexId: 10195,
	},
	'charizard-gmax': {
		dexId: 10196,
	},
	'blastoise-gmax': {
		dexId: 10197,
	},
	'butterfree-gmax': {
		dexId: 10198,
	},
	'pikachu-gmax': {
		dexId: 10199,
	},
	'meowth-gmax': {
		dexId: 10200,
	},
	'machamp-gmax': {
		dexId: 10201,
	},
	'gengar-gmax': {
		dexId: 10202,
	},
	'kingler-gmax': {
		dexId: 10203,
	},
	'lapras-gmax': {
		dexId: 10204,
	},
	'eevee-gmax': {
		dexId: 10205,
	},
	'snorlax-gmax': {
		dexId: 10206,
	},
	'garbodor-gmax': {
		dexId: 10207,
	},
	'melmetal-gmax': {
		dexId: 10208,
	},
	'rillaboom-gmax': {
		dexId: 10209,
	},
	'cinderace-gmax': {
		dexId: 10210,
	},
	'inteleon-gmax': {
		dexId: 10211,
	},
	'corviknight-gmax': {
		dexId: 10212,
	},
	'orbeetle-gmax': {
		dexId: 10213,
	},
	'drednaw-gmax': {
		dexId: 10214,
	},
	'coalossal-gmax': {
		dexId: 10215,
	},
	'flapple-gmax': {
		dexId: 10216,
	},
	'appletun-gmax': {
		dexId: 10217,
	},
	'sandaconda-gmax': {
		dexId: 10218,
	},
	'toxtricity-amped-gmax': {
		dexId: 10219,
	},
	'centiskorch-gmax': {
		dexId: 10220,
	},
	'hatterene-gmax': {
		dexId: 10221,
	},
	'grimmsnarl-gmax': {
		dexId: 10222,
	},
	'alcremie-gmax': {
		dexId: 10223,
	},
	'copperajah-gmax': {
		dexId: 10224,
	},
	'duraludon-gmax': {
		dexId: 10225,
	},
	'urshifu-single-strike-gmax': {
		dexId: 10226,
	},
	'urshifu-rapid-strike-gmax': {
		dexId: 10227,
	},
	'toxtricity-low-key-gmax': {
		dexId: 10228,
	},
	'growlithe-hisui': {
		dexId: 10229,
	},
	'arcanine-hisui': {
		dexId: 10230,
	},
	'voltorb-hisui': {
		dexId: 10231,
	},
	'electrode-hisui': {
		dexId: 10232,
	},
	'typhlosion-hisui': {
		dexId: 10233,
	},
	'qwilfish-hisui': {
		dexId: 10234,
	},
	'sneasel-hisui': {
		dexId: 10235,
	},
	'samurott-hisui': {
		dexId: 10236,
	},
	'lilligant-hisui': {
		dexId: 10237,
	},
	'zorua-hisui': {
		dexId: 10238,
	},
	'zoroark-hisui': {
		dexId: 10239,
	},
	'braviary-hisui': {
		dexId: 10240,
	},
	'sliggoo-hisui': {
		dexId: 10241,
	},
	'goodra-hisui': {
		dexId: 10242,
	},
	'avalugg-hisui': {
		dexId: 10243,
	},
	'decidueye-hisui': {
		dexId: 10244,
	},
	'dialga-origin': {
		dexId: 10245,
	},
	'palkia-origin': {
		dexId: 10246,
	},
	'basculin-white-striped': {
		dexId: 10247,
	},
	'basculegion-female': {
		dexId: 10248,
	},
	'enamorus-therian': {
		dexId: 10249,
	},
	'tauros-paldea-combat-breed': {
		dexId: 10250,
	},
	'tauros-paldea-blaze-breed': {
		dexId: 10251,
	},
	'tauros-paldea-aqua-breed': {
		dexId: 10252,
	},
	'wooper-paldea': {
		dexId: 10253,
	},
	'oinkologne-female': {
		dexId: 10254,
	},
	'dudunsparce-three-segment': {
		dexId: 10255,
	},
	'palafin-hero': {
		dexId: 10256,
	},
	'maushold-family-of-three': {
		dexId: 10257,
	},
	'tatsugiri-droopy': {
		dexId: 10258,
	},
	'tatsugiri-stretchy': {
		dexId: 10259,
	},
	'squawkabilly-blue-plumage': {
		dexId: 10260,
	},
	'squawkabilly-yellow-plumage': {
		dexId: 10261,
	},
	'squawkabilly-white-plumage': {
		dexId: 10262,
	},
	'gimmighoul-roaming': {
		dexId: 10263,
	},
	'koraidon-limited-build': {
		dexId: 10264,
	},
	'koraidon-sprinting-build': {
		dexId: 10265,
	},
	'koraidon-swimming-build': {
		dexId: 10266,
	},
	'koraidon-gliding-build': {
		dexId: 10267,
	},
	'miraidon-low-power-mode': {
		dexId: 10268,
	},
	'miraidon-drive-mode': {
		dexId: 10269,
	},
	'miraidon-aquatic-mode': {
		dexId: 10270,
	},
	'miraidon-glide-mode': {
		dexId: 10271,
	},
	'ursaluna-bloodmoon': {
		dexId: 10272,
	},
	'ogerpon-wellspring-mask': {
		dexId: 10273,
	},
	'ogerpon-hearthflame-mask': {
		dexId: 10274,
	},
	'ogerpon-cornerstone-mask': {
		dexId: 10275,
	},
	'terapagos-terastal': {
		dexId: 10276,
	},
	'terapagos-stellar': {
		dexId: 10277,
	},
};

export const getRampagers = () => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.rampager)
		.map(([key]) => key) as PokemonName[];
};
export const getSwarmOptions = (type: SwarmType) => {
	return Object.entries(internalDex)
		.filter(([, value]) => value.swarm === type)
		.map(([key]) => key) as PokemonName[];
};

export const getRandomSwarmMon = (type: SwarmType): PokemonName => {
	return getRandomEntry(getSwarmOptions(type));
};
