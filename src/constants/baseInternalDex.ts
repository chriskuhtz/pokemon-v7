import { InternalDexEntry } from '../interfaces/Pokedex';
import { PokemonName } from './pokemonNames';

export const baseInternalDex: Record<PokemonName, InternalDexEntry> = {
	bulbasaur: {
		dexId: 1,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	ivysaur: {
		dexId: 2,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	venusaur: {
		dexId: 3,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	charmander: {
		dexId: 4,
		types: ['fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	charmeleon: {
		dexId: 5,
		types: ['fire'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	charizard: {
		dexId: 6,
		types: ['fire', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	squirtle: {
		dexId: 7,
		types: ['water'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	wartortle: {
		dexId: 8,
		types: ['water'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	blastoise: {
		dexId: 9,
		types: ['water'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	caterpie: {
		dexId: 10,
		types: ['bug'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	metapod: {
		dexId: 11,
		types: ['bug'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	butterfree: {
		dexId: 12,
		types: ['bug', 'flying'],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	weedle: {
		dexId: 13,
		types: ['bug', 'poison'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	kakuna: {
		dexId: 14,
		types: ['bug', 'poison'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	beedrill: {
		dexId: 15,
		types: ['bug', 'poison'],
		evs: {
			attack: 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	pidgey: {
		dexId: 16,
		types: ['normal', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	pidgeotto: {
		dexId: 17,
		types: ['normal', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	pidgeot: {
		dexId: 18,
		types: ['normal', 'flying'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	rattata: {
		dexId: 19,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	raticate: {
		dexId: 20,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	spearow: {
		dexId: 21,
		types: ['normal', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	fearow: {
		dexId: 22,
		types: ['normal', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	ekans: {
		dexId: 23,
		types: ['poison'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	arbok: {
		dexId: 24,
		types: ['poison'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	pikachu: {
		dexId: 25,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	raichu: {
		dexId: 26,
		types: ['electric'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	sandshrew: {
		dexId: 27,
		types: ['ground'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	sandslash: {
		dexId: 28,
		types: ['ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'nidoran-f': {
		dexId: 29,
		types: ['poison'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	nidorina: {
		dexId: 30,
		types: ['poison'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	nidoqueen: {
		dexId: 31,
		types: ['poison', 'ground'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'nidoran-m': {
		dexId: 32,
		types: ['poison'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	nidorino: {
		dexId: 33,
		types: ['poison'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	nidoking: {
		dexId: 34,
		types: ['poison', 'ground'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	clefairy: {
		dexId: 35,
		types: ['fairy'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	clefable: {
		dexId: 36,
		types: ['fairy'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	vulpix: {
		dexId: 37,
		types: ['fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	ninetales: {
		dexId: 38,
		types: ['fire'],
		evs: {
			'special-defense': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	jigglypuff: {
		dexId: 39,
		types: ['normal', 'fairy'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	wigglytuff: {
		dexId: 40,
		types: ['normal', 'fairy'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	zubat: {
		dexId: 41,
		types: ['poison', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	golbat: {
		dexId: 42,
		types: ['poison', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	oddish: {
		dexId: 43,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	gloom: {
		dexId: 44,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	vileplume: {
		dexId: 45,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	paras: {
		dexId: 46,
		types: ['bug', 'grass'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	parasect: {
		dexId: 47,
		types: ['bug', 'grass'],
		evs: {
			attack: 2,
			defense: 1,
		},
		encounterOptions: [],
	},
	venonat: {
		dexId: 48,
		types: ['bug', 'poison'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	venomoth: {
		dexId: 49,
		types: ['bug', 'poison'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	diglett: {
		dexId: 50,
		types: ['ground'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	dugtrio: {
		dexId: 51,
		types: ['ground'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	meowth: {
		dexId: 52,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	persian: {
		dexId: 53,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	psyduck: {
		dexId: 54,
		types: ['water'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	golduck: {
		dexId: 55,
		types: ['water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	mankey: {
		dexId: 56,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	primeape: {
		dexId: 57,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	growlithe: {
		dexId: 58,
		types: ['fire'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	arcanine: {
		dexId: 59,
		types: ['fire'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	poliwag: {
		dexId: 60,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	poliwhirl: {
		dexId: 61,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	poliwrath: {
		dexId: 62,
		types: ['water', 'fighting'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	abra: {
		dexId: 63,
		types: ['psychic'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	kadabra: {
		dexId: 64,
		types: ['psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	alakazam: {
		dexId: 65,
		types: ['psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	machop: {
		dexId: 66,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	machoke: {
		dexId: 67,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	machamp: {
		dexId: 68,
		types: ['fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	bellsprout: {
		dexId: 69,
		types: ['grass', 'poison'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	weepinbell: {
		dexId: 70,
		types: ['grass', 'poison'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	victreebel: {
		dexId: 71,
		types: ['grass', 'poison'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	tentacool: {
		dexId: 72,
		types: ['water', 'poison'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	tentacruel: {
		dexId: 73,
		types: ['water', 'poison'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	geodude: {
		dexId: 74,
		types: ['rock', 'ground'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	graveler: {
		dexId: 75,
		types: ['rock', 'ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	golem: {
		dexId: 76,
		types: ['rock', 'ground'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	ponyta: {
		dexId: 77,
		types: ['fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	rapidash: {
		dexId: 78,
		types: ['fire'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	slowpoke: {
		dexId: 79,
		types: ['water', 'psychic'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	slowbro: {
		dexId: 80,
		types: ['water', 'psychic'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	magnemite: {
		dexId: 81,
		types: ['electric', 'steel'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	magneton: {
		dexId: 82,
		types: ['electric', 'steel'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	farfetchd: {
		dexId: 83,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	doduo: {
		dexId: 84,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	dodrio: {
		dexId: 85,
		types: ['normal', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	seel: {
		dexId: 86,
		types: ['water'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	dewgong: {
		dexId: 87,
		types: ['water', 'ice'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	grimer: {
		dexId: 88,
		types: ['poison'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	muk: {
		dexId: 89,
		types: ['poison'],
		evs: {
			hp: 1,
			attack: 1,
		},
		encounterOptions: [],
	},
	shellder: {
		dexId: 90,
		types: ['water'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	cloyster: {
		dexId: 91,
		types: ['water', 'ice'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	gastly: {
		dexId: 92,
		types: ['ghost', 'poison'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	haunter: {
		dexId: 93,
		types: ['ghost', 'poison'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	gengar: {
		dexId: 94,
		types: ['ghost', 'poison'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	onix: {
		dexId: 95,
		types: ['rock', 'ground'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	drowzee: {
		dexId: 96,
		types: ['psychic'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	hypno: {
		dexId: 97,
		types: ['psychic'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	krabby: {
		dexId: 98,
		types: ['water'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	kingler: {
		dexId: 99,
		types: ['water'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	voltorb: {
		dexId: 100,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	electrode: {
		dexId: 101,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	exeggcute: {
		dexId: 102,
		types: ['grass', 'psychic'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	exeggutor: {
		dexId: 103,
		types: ['grass', 'psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	cubone: {
		dexId: 104,
		types: ['ground'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	marowak: {
		dexId: 105,
		types: ['ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	hitmonlee: {
		dexId: 106,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	hitmonchan: {
		dexId: 107,
		types: ['fighting'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	lickitung: {
		dexId: 108,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	koffing: {
		dexId: 109,
		types: ['poison'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	weezing: {
		dexId: 110,
		types: ['poison'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	rhyhorn: {
		dexId: 111,
		types: ['ground', 'rock'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	rhydon: {
		dexId: 112,
		types: ['ground', 'rock'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	chansey: {
		dexId: 113,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	tangela: {
		dexId: 114,
		types: ['grass'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	kangaskhan: {
		dexId: 115,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	horsea: {
		dexId: 116,
		types: ['water'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	seadra: {
		dexId: 117,
		types: ['water'],
		evs: {
			defense: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	goldeen: {
		dexId: 118,
		types: ['water'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	seaking: {
		dexId: 119,
		types: ['water'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	staryu: {
		dexId: 120,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	starmie: {
		dexId: 121,
		types: ['water', 'psychic'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'mr-mime': {
		dexId: 122,
		types: ['psychic', 'fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	scyther: {
		dexId: 123,
		types: ['bug', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	jynx: {
		dexId: 124,
		types: ['ice', 'psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	electabuzz: {
		dexId: 125,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	magmar: {
		dexId: 126,
		types: ['fire'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	pinsir: {
		dexId: 127,
		types: ['bug'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	tauros: {
		dexId: 128,
		types: ['normal'],
		evs: {
			attack: 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	magikarp: {
		dexId: 129,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	gyarados: {
		dexId: 130,
		types: ['water', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	lapras: {
		dexId: 131,
		types: ['water', 'ice'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	ditto: {
		dexId: 132,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	eevee: {
		dexId: 133,
		types: ['normal'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	vaporeon: {
		dexId: 134,
		types: ['water'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	jolteon: {
		dexId: 135,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	flareon: {
		dexId: 136,
		types: ['fire'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	porygon: {
		dexId: 137,
		types: ['normal'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	omanyte: {
		dexId: 138,
		types: ['rock', 'water'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	omastar: {
		dexId: 139,
		types: ['rock', 'water'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	kabuto: {
		dexId: 140,
		types: ['rock', 'water'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	kabutops: {
		dexId: 141,
		types: ['rock', 'water'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	aerodactyl: {
		dexId: 142,
		types: ['rock', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	snorlax: {
		dexId: 143,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	articuno: {
		dexId: 144,
		types: ['ice', 'flying'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	zapdos: {
		dexId: 145,
		types: ['electric', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	moltres: {
		dexId: 146,
		types: ['fire', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	dratini: {
		dexId: 147,
		types: ['dragon'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	dragonair: {
		dexId: 148,
		types: ['dragon'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	dragonite: {
		dexId: 149,
		types: ['dragon', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	mewtwo: {
		dexId: 150,
		types: ['psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	mew: {
		dexId: 151,
		types: ['psychic'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	chikorita: {
		dexId: 152,
		types: ['grass'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	bayleef: {
		dexId: 153,
		types: ['grass'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	meganium: {
		dexId: 154,
		types: ['grass'],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	cyndaquil: {
		dexId: 155,
		types: ['fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	quilava: {
		dexId: 156,
		types: ['fire'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	typhlosion: {
		dexId: 157,
		types: ['fire'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	totodile: {
		dexId: 158,
		types: ['water'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	croconaw: {
		dexId: 159,
		types: ['water'],
		evs: {
			attack: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	feraligatr: {
		dexId: 160,
		types: ['water'],
		evs: {
			attack: 2,
			defense: 1,
		},
		encounterOptions: [],
	},
	sentret: {
		dexId: 161,
		types: ['normal'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	furret: {
		dexId: 162,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	hoothoot: {
		dexId: 163,
		types: ['normal', 'flying'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	noctowl: {
		dexId: 164,
		types: ['normal', 'flying'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	ledyba: {
		dexId: 165,
		types: ['bug', 'flying'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	ledian: {
		dexId: 166,
		types: ['bug', 'flying'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	spinarak: {
		dexId: 167,
		types: ['bug', 'poison'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	ariados: {
		dexId: 168,
		types: ['bug', 'poison'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	crobat: {
		dexId: 169,
		types: ['poison', 'flying'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	chinchou: {
		dexId: 170,
		types: ['water', 'electric'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	lanturn: {
		dexId: 171,
		types: ['water', 'electric'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	pichu: {
		dexId: 172,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	cleffa: {
		dexId: 173,
		types: ['fairy'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	igglybuff: {
		dexId: 174,
		types: ['normal', 'fairy'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	togepi: {
		dexId: 175,
		types: ['fairy'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	togetic: {
		dexId: 176,
		types: ['fairy', 'flying'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	natu: {
		dexId: 177,
		types: ['psychic', 'flying'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	xatu: {
		dexId: 178,
		types: ['psychic', 'flying'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	mareep: {
		dexId: 179,
		types: ['electric'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	flaaffy: {
		dexId: 180,
		types: ['electric'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	ampharos: {
		dexId: 181,
		types: ['electric'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	bellossom: {
		dexId: 182,
		types: ['grass'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	marill: {
		dexId: 183,
		types: ['water', 'fairy'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	azumarill: {
		dexId: 184,
		types: ['water', 'fairy'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	sudowoodo: {
		dexId: 185,
		types: ['rock'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	politoed: {
		dexId: 186,
		types: ['water'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	hoppip: {
		dexId: 187,
		types: ['grass', 'flying'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	skiploom: {
		dexId: 188,
		types: ['grass', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	jumpluff: {
		dexId: 189,
		types: ['grass', 'flying'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	aipom: {
		dexId: 190,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	sunkern: {
		dexId: 191,
		types: ['grass'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	sunflora: {
		dexId: 192,
		types: ['grass'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	yanma: {
		dexId: 193,
		types: ['bug', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	wooper: {
		dexId: 194,
		types: ['water', 'ground'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	quagsire: {
		dexId: 195,
		types: ['water', 'ground'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	espeon: {
		dexId: 196,
		types: ['psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	umbreon: {
		dexId: 197,
		types: ['dark'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	murkrow: {
		dexId: 198,
		types: ['dark', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	slowking: {
		dexId: 199,
		types: ['water', 'psychic'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	misdreavus: {
		dexId: 200,
		types: ['ghost'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	unown: {
		dexId: 201,
		types: ['psychic'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	wobbuffet: {
		dexId: 202,
		types: ['psychic'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	girafarig: {
		dexId: 203,
		types: ['normal', 'psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	pineco: {
		dexId: 204,
		types: ['bug'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	forretress: {
		dexId: 205,
		types: ['bug', 'steel'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	dunsparce: {
		dexId: 206,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	gligar: {
		dexId: 207,
		types: ['ground', 'flying'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	steelix: {
		dexId: 208,
		types: ['steel', 'ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	snubbull: {
		dexId: 209,
		types: ['fairy'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	granbull: {
		dexId: 210,
		types: ['fairy'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	qwilfish: {
		dexId: 211,
		types: ['water', 'poison'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	scizor: {
		dexId: 212,
		types: ['bug', 'steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	shuckle: {
		dexId: 213,
		types: ['bug', 'rock'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	heracross: {
		dexId: 214,
		types: ['bug', 'fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	sneasel: {
		dexId: 215,
		types: ['dark', 'ice'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	teddiursa: {
		dexId: 216,
		types: ['normal'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	ursaring: {
		dexId: 217,
		types: ['normal'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	slugma: {
		dexId: 218,
		types: ['fire'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	magcargo: {
		dexId: 219,
		types: ['fire', 'rock'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	swinub: {
		dexId: 220,
		types: ['ice', 'ground'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	piloswine: {
		dexId: 221,
		types: ['ice', 'ground'],
		evs: {
			hp: 1,
			attack: 1,
		},
		encounterOptions: [],
	},
	corsola: {
		dexId: 222,
		types: ['water', 'rock'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	remoraid: {
		dexId: 223,
		types: ['water'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	octillery: {
		dexId: 224,
		types: ['water'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	delibird: {
		dexId: 225,
		types: ['ice', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	mantine: {
		dexId: 226,
		types: ['water', 'flying'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	skarmory: {
		dexId: 227,
		types: ['steel', 'flying'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	houndour: {
		dexId: 228,
		types: ['dark', 'fire'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	houndoom: {
		dexId: 229,
		types: ['dark', 'fire'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	kingdra: {
		dexId: 230,
		types: ['water', 'dragon'],
		evs: {
			attack: 1,
			'special-attack': 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	phanpy: {
		dexId: 231,
		types: ['ground'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	donphan: {
		dexId: 232,
		types: ['ground'],
		evs: {
			attack: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	porygon2: {
		dexId: 233,
		types: ['normal'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	stantler: {
		dexId: 234,
		types: ['normal'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	smeargle: {
		dexId: 235,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	tyrogue: {
		dexId: 236,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	hitmontop: {
		dexId: 237,
		types: ['fighting'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	smoochum: {
		dexId: 238,
		types: ['ice', 'psychic'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	elekid: {
		dexId: 239,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	magby: {
		dexId: 240,
		types: ['fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	miltank: {
		dexId: 241,
		types: ['normal'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	blissey: {
		dexId: 242,
		types: ['normal'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	raikou: {
		dexId: 243,
		types: ['electric'],
		evs: {
			'special-attack': 1,
			speed: 2,
		},
		encounterOptions: [],
	},
	entei: {
		dexId: 244,
		types: ['fire'],
		evs: {
			hp: 1,
			attack: 2,
		},
		encounterOptions: [],
	},
	suicune: {
		dexId: 245,
		types: ['water'],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	larvitar: {
		dexId: 246,
		types: ['rock', 'ground'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	pupitar: {
		dexId: 247,
		types: ['rock', 'ground'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	tyranitar: {
		dexId: 248,
		types: ['rock', 'dark'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	lugia: {
		dexId: 249,
		types: ['psychic', 'flying'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	'ho-oh': {
		dexId: 250,
		types: ['fire', 'flying'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	celebi: {
		dexId: 251,
		types: ['psychic', 'grass'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	treecko: {
		dexId: 252,
		types: ['grass'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	grovyle: {
		dexId: 253,
		types: ['grass'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	sceptile: {
		dexId: 254,
		types: ['grass'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	torchic: {
		dexId: 255,
		types: ['fire'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	combusken: {
		dexId: 256,
		types: ['fire', 'fighting'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	blaziken: {
		dexId: 257,
		types: ['fire', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	mudkip: {
		dexId: 258,
		types: ['water'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	marshtomp: {
		dexId: 259,
		types: ['water', 'ground'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	swampert: {
		dexId: 260,
		types: ['water', 'ground'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	poochyena: {
		dexId: 261,
		types: ['dark'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	mightyena: {
		dexId: 262,
		types: ['dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	zigzagoon: {
		dexId: 263,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	linoone: {
		dexId: 264,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	wurmple: {
		dexId: 265,
		types: ['bug'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	silcoon: {
		dexId: 266,
		types: ['bug'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	beautifly: {
		dexId: 267,
		types: ['bug', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	cascoon: {
		dexId: 268,
		types: ['bug'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	dustox: {
		dexId: 269,
		types: ['bug', 'poison'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	lotad: {
		dexId: 270,
		types: ['water', 'grass'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	lombre: {
		dexId: 271,
		types: ['water', 'grass'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	ludicolo: {
		dexId: 272,
		types: ['water', 'grass'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	seedot: {
		dexId: 273,
		types: ['grass'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	nuzleaf: {
		dexId: 274,
		types: ['grass', 'dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	shiftry: {
		dexId: 275,
		types: ['grass', 'dark'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	taillow: {
		dexId: 276,
		types: ['normal', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	swellow: {
		dexId: 277,
		types: ['normal', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	wingull: {
		dexId: 278,
		types: ['water', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	pelipper: {
		dexId: 279,
		types: ['water', 'flying'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	ralts: {
		dexId: 280,
		types: ['psychic', 'fairy'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	kirlia: {
		dexId: 281,
		types: ['psychic', 'fairy'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	gardevoir: {
		dexId: 282,
		types: ['psychic', 'fairy'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	surskit: {
		dexId: 283,
		types: ['bug', 'water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	masquerain: {
		dexId: 284,
		types: ['bug', 'flying'],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	shroomish: {
		dexId: 285,
		types: ['grass'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	breloom: {
		dexId: 286,
		types: ['grass', 'fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	slakoth: {
		dexId: 287,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	vigoroth: {
		dexId: 288,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	slaking: {
		dexId: 289,
		types: ['normal'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	nincada: {
		dexId: 290,
		types: ['bug', 'ground'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	ninjask: {
		dexId: 291,
		types: ['bug', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	shedinja: {
		dexId: 292,
		types: ['bug', 'ghost'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	whismur: {
		dexId: 293,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	loudred: {
		dexId: 294,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	exploud: {
		dexId: 295,
		types: ['normal'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	makuhita: {
		dexId: 296,
		types: ['fighting'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	hariyama: {
		dexId: 297,
		types: ['fighting'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	azurill: {
		dexId: 298,
		types: ['normal', 'fairy'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	nosepass: {
		dexId: 299,
		types: ['rock'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	skitty: {
		dexId: 300,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	delcatty: {
		dexId: 301,
		types: ['normal'],
		evs: {
			hp: 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	sableye: {
		dexId: 302,
		types: ['dark', 'ghost'],
		evs: {
			attack: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	mawile: {
		dexId: 303,
		types: ['steel', 'fairy'],
		evs: {
			attack: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	aron: {
		dexId: 304,
		types: ['steel', 'rock'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	lairon: {
		dexId: 305,
		types: ['steel', 'rock'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	aggron: {
		dexId: 306,
		types: ['steel', 'rock'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	meditite: {
		dexId: 307,
		types: ['fighting', 'psychic'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	medicham: {
		dexId: 308,
		types: ['fighting', 'psychic'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	electrike: {
		dexId: 309,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	manectric: {
		dexId: 310,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	plusle: {
		dexId: 311,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	minun: {
		dexId: 312,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	volbeat: {
		dexId: 313,
		types: ['bug'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	illumise: {
		dexId: 314,
		types: ['bug'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	roselia: {
		dexId: 315,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	gulpin: {
		dexId: 316,
		types: ['poison'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	swalot: {
		dexId: 317,
		types: ['poison'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	carvanha: {
		dexId: 318,
		types: ['water', 'dark'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	sharpedo: {
		dexId: 319,
		types: ['water', 'dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	wailmer: {
		dexId: 320,
		types: ['water'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	wailord: {
		dexId: 321,
		types: ['water'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	numel: {
		dexId: 322,
		types: ['fire', 'ground'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	camerupt: {
		dexId: 323,
		types: ['fire', 'ground'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	torkoal: {
		dexId: 324,
		types: ['fire'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	spoink: {
		dexId: 325,
		types: ['psychic'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	grumpig: {
		dexId: 326,
		types: ['psychic'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	spinda: {
		dexId: 327,
		types: ['normal'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	trapinch: {
		dexId: 328,
		types: ['ground'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	vibrava: {
		dexId: 329,
		types: ['ground', 'dragon'],
		evs: {
			attack: 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	flygon: {
		dexId: 330,
		types: ['ground', 'dragon'],
		evs: {
			attack: 1,
			speed: 2,
		},
		encounterOptions: [],
	},
	cacnea: {
		dexId: 331,
		types: ['grass'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	cacturne: {
		dexId: 332,
		types: ['grass', 'dark'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	swablu: {
		dexId: 333,
		types: ['normal', 'flying'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	altaria: {
		dexId: 334,
		types: ['dragon', 'flying'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	zangoose: {
		dexId: 335,
		types: ['normal'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	seviper: {
		dexId: 336,
		types: ['poison'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	lunatone: {
		dexId: 337,
		types: ['rock', 'psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	solrock: {
		dexId: 338,
		types: ['rock', 'psychic'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	barboach: {
		dexId: 339,
		types: ['water', 'ground'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	whiscash: {
		dexId: 340,
		types: ['water', 'ground'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	corphish: {
		dexId: 341,
		types: ['water'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	crawdaunt: {
		dexId: 342,
		types: ['water', 'dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	baltoy: {
		dexId: 343,
		types: ['ground', 'psychic'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	claydol: {
		dexId: 344,
		types: ['ground', 'psychic'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	lileep: {
		dexId: 345,
		types: ['rock', 'grass'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	cradily: {
		dexId: 346,
		types: ['rock', 'grass'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	anorith: {
		dexId: 347,
		types: ['rock', 'bug'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	armaldo: {
		dexId: 348,
		types: ['rock', 'bug'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	feebas: {
		dexId: 349,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	milotic: {
		dexId: 350,
		types: ['water'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	castform: {
		dexId: 351,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	kecleon: {
		dexId: 352,
		types: ['normal'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	shuppet: {
		dexId: 353,
		types: ['ghost'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	banette: {
		dexId: 354,
		types: ['ghost'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	duskull: {
		dexId: 355,
		types: ['ghost'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	dusclops: {
		dexId: 356,
		types: ['ghost'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	tropius: {
		dexId: 357,
		types: ['grass', 'flying'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	chimecho: {
		dexId: 358,
		types: ['psychic'],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	absol: {
		dexId: 359,
		types: ['dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	wynaut: {
		dexId: 360,
		types: ['psychic'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	snorunt: {
		dexId: 361,
		types: ['ice'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	glalie: {
		dexId: 362,
		types: ['ice'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	spheal: {
		dexId: 363,
		types: ['ice', 'water'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	sealeo: {
		dexId: 364,
		types: ['ice', 'water'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	walrein: {
		dexId: 365,
		types: ['ice', 'water'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	clamperl: {
		dexId: 366,
		types: ['water'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	huntail: {
		dexId: 367,
		types: ['water'],
		evs: {
			attack: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	gorebyss: {
		dexId: 368,
		types: ['water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	relicanth: {
		dexId: 369,
		types: ['water', 'rock'],
		evs: {
			hp: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	luvdisc: {
		dexId: 370,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	bagon: {
		dexId: 371,
		types: ['dragon'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	shelgon: {
		dexId: 372,
		types: ['dragon'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	salamence: {
		dexId: 373,
		types: ['dragon', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	beldum: {
		dexId: 374,
		types: ['steel', 'psychic'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	metang: {
		dexId: 375,
		types: ['steel', 'psychic'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	metagross: {
		dexId: 376,
		types: ['steel', 'psychic'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	regirock: {
		dexId: 377,
		types: ['rock'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	regice: {
		dexId: 378,
		types: ['ice'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	registeel: {
		dexId: 379,
		types: ['steel'],
		evs: {
			defense: 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	latias: {
		dexId: 380,
		types: ['dragon', 'psychic'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	latios: {
		dexId: 381,
		types: ['dragon', 'psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	kyogre: {
		dexId: 382,
		types: ['water'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	groudon: {
		dexId: 383,
		types: ['ground'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	rayquaza: {
		dexId: 384,
		types: ['dragon', 'flying'],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	jirachi: {
		dexId: 385,
		types: ['steel', 'psychic'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'deoxys-normal': {
		dexId: 386,
		types: ['psychic'],
		evs: {
			attack: 1,
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	turtwig: {
		dexId: 387,
		types: ['grass'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	grotle: {
		dexId: 388,
		types: ['grass'],
		evs: {
			attack: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	torterra: {
		dexId: 389,
		types: ['grass', 'ground'],
		evs: {
			attack: 2,
			defense: 1,
		},
		encounterOptions: [],
	},
	chimchar: {
		dexId: 390,
		types: ['fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	monferno: {
		dexId: 391,
		types: ['fire', 'fighting'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	infernape: {
		dexId: 392,
		types: ['fire', 'fighting'],
		evs: {
			attack: 1,
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	piplup: {
		dexId: 393,
		types: ['water'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	prinplup: {
		dexId: 394,
		types: ['water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	empoleon: {
		dexId: 395,
		types: ['water', 'steel'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	starly: {
		dexId: 396,
		types: ['normal', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	staravia: {
		dexId: 397,
		types: ['normal', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	staraptor: {
		dexId: 398,
		types: ['normal', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	bidoof: {
		dexId: 399,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	bibarel: {
		dexId: 400,
		types: ['normal', 'water'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	kricketot: {
		dexId: 401,
		types: ['bug'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	kricketune: {
		dexId: 402,
		types: ['bug'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	shinx: {
		dexId: 403,
		types: ['electric'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	luxio: {
		dexId: 404,
		types: ['electric'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	luxray: {
		dexId: 405,
		types: ['electric'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	budew: {
		dexId: 406,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	roserade: {
		dexId: 407,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	cranidos: {
		dexId: 408,
		types: ['rock'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	rampardos: {
		dexId: 409,
		types: ['rock'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	shieldon: {
		dexId: 410,
		types: ['rock', 'steel'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	bastiodon: {
		dexId: 411,
		types: ['rock', 'steel'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	burmy: {
		dexId: 412,
		types: ['bug'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'wormadam-plant': {
		dexId: 413,
		types: ['bug', 'grass'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	mothim: {
		dexId: 414,
		types: ['bug', 'flying'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	combee: {
		dexId: 415,
		types: ['bug', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	vespiquen: {
		dexId: 416,
		types: ['bug', 'flying'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	pachirisu: {
		dexId: 417,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	buizel: {
		dexId: 418,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	floatzel: {
		dexId: 419,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	cherubi: {
		dexId: 420,
		types: ['grass'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	cherrim: {
		dexId: 421,
		types: ['grass'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	shellos: {
		dexId: 422,
		types: ['water'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	gastrodon: {
		dexId: 423,
		types: ['water', 'ground'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	ambipom: {
		dexId: 424,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	drifloon: {
		dexId: 425,
		types: ['ghost', 'flying'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	drifblim: {
		dexId: 426,
		types: ['ghost', 'flying'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	buneary: {
		dexId: 427,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	lopunny: {
		dexId: 428,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	mismagius: {
		dexId: 429,
		types: ['ghost'],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	honchkrow: {
		dexId: 430,
		types: ['dark', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	glameow: {
		dexId: 431,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	purugly: {
		dexId: 432,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	chingling: {
		dexId: 433,
		types: ['psychic'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	stunky: {
		dexId: 434,
		types: ['poison', 'dark'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	skuntank: {
		dexId: 435,
		types: ['poison', 'dark'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	bronzor: {
		dexId: 436,
		types: ['steel', 'psychic'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	bronzong: {
		dexId: 437,
		types: ['steel', 'psychic'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	bonsly: {
		dexId: 438,
		types: ['rock'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	'mime-jr': {
		dexId: 439,
		types: ['psychic', 'fairy'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	happiny: {
		dexId: 440,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	chatot: {
		dexId: 441,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	spiritomb: {
		dexId: 442,
		types: ['ghost', 'dark'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	gible: {
		dexId: 443,
		types: ['dragon', 'ground'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	gabite: {
		dexId: 444,
		types: ['dragon', 'ground'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	garchomp: {
		dexId: 445,
		types: ['dragon', 'ground'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	munchlax: {
		dexId: 446,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	riolu: {
		dexId: 447,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	lucario: {
		dexId: 448,
		types: ['fighting', 'steel'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	hippopotas: {
		dexId: 449,
		types: ['ground'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	hippowdon: {
		dexId: 450,
		types: ['ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	skorupi: {
		dexId: 451,
		types: ['poison', 'bug'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	drapion: {
		dexId: 452,
		types: ['poison', 'dark'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	croagunk: {
		dexId: 453,
		types: ['poison', 'fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	toxicroak: {
		dexId: 454,
		types: ['poison', 'fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	carnivine: {
		dexId: 455,
		types: ['grass'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	finneon: {
		dexId: 456,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	lumineon: {
		dexId: 457,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	mantyke: {
		dexId: 458,
		types: ['water', 'flying'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	snover: {
		dexId: 459,
		types: ['grass', 'ice'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	abomasnow: {
		dexId: 460,
		types: ['grass', 'ice'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	weavile: {
		dexId: 461,
		types: ['dark', 'ice'],
		evs: {
			attack: 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	magnezone: {
		dexId: 462,
		types: ['electric', 'steel'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	lickilicky: {
		dexId: 463,
		types: ['normal'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	rhyperior: {
		dexId: 464,
		types: ['ground', 'rock'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	tangrowth: {
		dexId: 465,
		types: ['grass'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	electivire: {
		dexId: 466,
		types: ['electric'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	magmortar: {
		dexId: 467,
		types: ['fire'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	togekiss: {
		dexId: 468,
		types: ['fairy', 'flying'],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	yanmega: {
		dexId: 469,
		types: ['bug', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	leafeon: {
		dexId: 470,
		types: ['grass'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	glaceon: {
		dexId: 471,
		types: ['ice'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	gliscor: {
		dexId: 472,
		types: ['ground', 'flying'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	mamoswine: {
		dexId: 473,
		types: ['ice', 'ground'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'porygon-z': {
		dexId: 474,
		types: ['normal'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	gallade: {
		dexId: 475,
		types: ['psychic', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	probopass: {
		dexId: 476,
		types: ['rock', 'steel'],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	dusknoir: {
		dexId: 477,
		types: ['ghost'],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	froslass: {
		dexId: 478,
		types: ['ice', 'ghost'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	rotom: {
		dexId: 479,
		types: ['electric', 'ghost'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	uxie: {
		dexId: 480,
		types: ['psychic'],
		evs: {
			defense: 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	mesprit: {
		dexId: 481,
		types: ['psychic'],
		evs: {
			attack: 1,
			'special-attack': 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	azelf: {
		dexId: 482,
		types: ['psychic'],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	dialga: {
		dexId: 483,
		types: ['steel', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	palkia: {
		dexId: 484,
		types: ['water', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	heatran: {
		dexId: 485,
		types: ['fire', 'steel'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	regigigas: {
		dexId: 486,
		types: ['normal'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'giratina-altered': {
		dexId: 487,
		types: ['ghost', 'dragon'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	cresselia: {
		dexId: 488,
		types: ['psychic'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	phione: {
		dexId: 489,
		types: ['water'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	manaphy: {
		dexId: 490,
		types: ['water'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	darkrai: {
		dexId: 491,
		types: ['dark'],
		evs: {
			'special-attack': 2,
			speed: 1,
		},
		encounterOptions: [],
	},
	'shaymin-land': {
		dexId: 492,
		types: ['grass'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	arceus: {
		dexId: 493,
		types: ['normal'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	victini: {
		dexId: 494,
		types: ['psychic', 'fire'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	snivy: {
		dexId: 495,
		types: ['grass'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	servine: {
		dexId: 496,
		types: ['grass'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	serperior: {
		dexId: 497,
		types: ['grass'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	tepig: {
		dexId: 498,
		types: ['fire'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	pignite: {
		dexId: 499,
		types: ['fire', 'fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	emboar: {
		dexId: 500,
		types: ['fire', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	oshawott: {
		dexId: 501,
		types: ['water'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	dewott: {
		dexId: 502,
		types: ['water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	samurott: {
		dexId: 503,
		types: ['water'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	patrat: {
		dexId: 504,
		types: ['normal'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	watchog: {
		dexId: 505,
		types: ['normal'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	lillipup: {
		dexId: 506,
		types: ['normal'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	herdier: {
		dexId: 507,
		types: ['normal'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	stoutland: {
		dexId: 508,
		types: ['normal'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	purrloin: {
		dexId: 509,
		types: ['dark'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	liepard: {
		dexId: 510,
		types: ['dark'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	pansage: {
		dexId: 511,
		types: ['grass'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	simisage: {
		dexId: 512,
		types: ['grass'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	pansear: {
		dexId: 513,
		types: ['fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	simisear: {
		dexId: 514,
		types: ['fire'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	panpour: {
		dexId: 515,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	simipour: {
		dexId: 516,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	munna: {
		dexId: 517,
		types: ['psychic'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	musharna: {
		dexId: 518,
		types: ['psychic'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	pidove: {
		dexId: 519,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	tranquill: {
		dexId: 520,
		types: ['normal', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	unfezant: {
		dexId: 521,
		types: ['normal', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	blitzle: {
		dexId: 522,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	zebstrika: {
		dexId: 523,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	roggenrola: {
		dexId: 524,
		types: ['rock'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	boldore: {
		dexId: 525,
		types: ['rock'],
		evs: {
			attack: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	gigalith: {
		dexId: 526,
		types: ['rock'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	woobat: {
		dexId: 527,
		types: ['psychic', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	swoobat: {
		dexId: 528,
		types: ['psychic', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	drilbur: {
		dexId: 529,
		types: ['ground'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	excadrill: {
		dexId: 530,
		types: ['ground', 'steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	audino: {
		dexId: 531,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	timburr: {
		dexId: 532,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	gurdurr: {
		dexId: 533,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	conkeldurr: {
		dexId: 534,
		types: ['fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	tympole: {
		dexId: 535,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	palpitoad: {
		dexId: 536,
		types: ['water', 'ground'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	seismitoad: {
		dexId: 537,
		types: ['water', 'ground'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	throh: {
		dexId: 538,
		types: ['fighting'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	sawk: {
		dexId: 539,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	sewaddle: {
		dexId: 540,
		types: ['bug', 'grass'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	swadloon: {
		dexId: 541,
		types: ['bug', 'grass'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	leavanny: {
		dexId: 542,
		types: ['bug', 'grass'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	venipede: {
		dexId: 543,
		types: ['bug', 'poison'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	whirlipede: {
		dexId: 544,
		types: ['bug', 'poison'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	scolipede: {
		dexId: 545,
		types: ['bug', 'poison'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	cottonee: {
		dexId: 546,
		types: ['grass', 'fairy'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	whimsicott: {
		dexId: 547,
		types: ['grass', 'fairy'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	petilil: {
		dexId: 548,
		types: ['grass'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	lilligant: {
		dexId: 549,
		types: ['grass'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'basculin-red-striped': {
		dexId: 550,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	sandile: {
		dexId: 551,
		types: ['ground', 'dark'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	krokorok: {
		dexId: 552,
		types: ['ground', 'dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	krookodile: {
		dexId: 553,
		types: ['ground', 'dark'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	darumaka: {
		dexId: 554,
		types: ['fire'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'darmanitan-standard': {
		dexId: 555,
		types: ['fire'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	maractus: {
		dexId: 556,
		types: ['grass'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	dwebble: {
		dexId: 557,
		types: ['bug', 'rock'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	crustle: {
		dexId: 558,
		types: ['bug', 'rock'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	scraggy: {
		dexId: 559,
		types: ['dark', 'fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	scrafty: {
		dexId: 560,
		types: ['dark', 'fighting'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	sigilyph: {
		dexId: 561,
		types: ['psychic', 'flying'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	yamask: {
		dexId: 562,
		types: ['ghost'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	cofagrigus: {
		dexId: 563,
		types: ['ghost'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	tirtouga: {
		dexId: 564,
		types: ['water', 'rock'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	carracosta: {
		dexId: 565,
		types: ['water', 'rock'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	archen: {
		dexId: 566,
		types: ['rock', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	archeops: {
		dexId: 567,
		types: ['rock', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	trubbish: {
		dexId: 568,
		types: ['poison'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	garbodor: {
		dexId: 569,
		types: ['poison'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	zorua: {
		dexId: 570,
		types: ['dark'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	zoroark: {
		dexId: 571,
		types: ['dark'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	minccino: {
		dexId: 572,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	cinccino: {
		dexId: 573,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	gothita: {
		dexId: 574,
		types: ['psychic'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	gothorita: {
		dexId: 575,
		types: ['psychic'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	gothitelle: {
		dexId: 576,
		types: ['psychic'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	solosis: {
		dexId: 577,
		types: ['psychic'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	duosion: {
		dexId: 578,
		types: ['psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	reuniclus: {
		dexId: 579,
		types: ['psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	ducklett: {
		dexId: 580,
		types: ['water', 'flying'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	swanna: {
		dexId: 581,
		types: ['water', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	vanillite: {
		dexId: 582,
		types: ['ice'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	vanillish: {
		dexId: 583,
		types: ['ice'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	vanilluxe: {
		dexId: 584,
		types: ['ice'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	deerling: {
		dexId: 585,
		types: ['normal', 'grass'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	sawsbuck: {
		dexId: 586,
		types: ['normal', 'grass'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	emolga: {
		dexId: 587,
		types: ['electric', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	karrablast: {
		dexId: 588,
		types: ['bug'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	escavalier: {
		dexId: 589,
		types: ['bug', 'steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	foongus: {
		dexId: 590,
		types: ['grass', 'poison'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	amoonguss: {
		dexId: 591,
		types: ['grass', 'poison'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	frillish: {
		dexId: 592,
		types: ['water', 'ghost'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	jellicent: {
		dexId: 593,
		types: ['water', 'ghost'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	alomomola: {
		dexId: 594,
		types: ['water'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	joltik: {
		dexId: 595,
		types: ['bug', 'electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	galvantula: {
		dexId: 596,
		types: ['bug', 'electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	ferroseed: {
		dexId: 597,
		types: ['grass', 'steel'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	ferrothorn: {
		dexId: 598,
		types: ['grass', 'steel'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	klink: {
		dexId: 599,
		types: ['steel'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	klang: {
		dexId: 600,
		types: ['steel'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	klinklang: {
		dexId: 601,
		types: ['steel'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	tynamo: {
		dexId: 602,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	eelektrik: {
		dexId: 603,
		types: ['electric'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	eelektross: {
		dexId: 604,
		types: ['electric'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	elgyem: {
		dexId: 605,
		types: ['psychic'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	beheeyem: {
		dexId: 606,
		types: ['psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	litwick: {
		dexId: 607,
		types: ['ghost', 'fire'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	lampent: {
		dexId: 608,
		types: ['ghost', 'fire'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	chandelure: {
		dexId: 609,
		types: ['ghost', 'fire'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	axew: {
		dexId: 610,
		types: ['dragon'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	fraxure: {
		dexId: 611,
		types: ['dragon'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	haxorus: {
		dexId: 612,
		types: ['dragon'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	cubchoo: {
		dexId: 613,
		types: ['ice'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	beartic: {
		dexId: 614,
		types: ['ice'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	cryogonal: {
		dexId: 615,
		types: ['ice'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	shelmet: {
		dexId: 616,
		types: ['bug'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	accelgor: {
		dexId: 617,
		types: ['bug'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	stunfisk: {
		dexId: 618,
		types: ['ground', 'electric'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	mienfoo: {
		dexId: 619,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	mienshao: {
		dexId: 620,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	druddigon: {
		dexId: 621,
		types: ['dragon'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	golett: {
		dexId: 622,
		types: ['ground', 'ghost'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	golurk: {
		dexId: 623,
		types: ['ground', 'ghost'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	pawniard: {
		dexId: 624,
		types: ['dark', 'steel'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	bisharp: {
		dexId: 625,
		types: ['dark', 'steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	bouffalant: {
		dexId: 626,
		types: ['normal'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	rufflet: {
		dexId: 627,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	braviary: {
		dexId: 628,
		types: ['normal', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	vullaby: {
		dexId: 629,
		types: ['dark', 'flying'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	mandibuzz: {
		dexId: 630,
		types: ['dark', 'flying'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	heatmor: {
		dexId: 631,
		types: ['fire'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	durant: {
		dexId: 632,
		types: ['bug', 'steel'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	deino: {
		dexId: 633,
		types: ['dark', 'dragon'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	zweilous: {
		dexId: 634,
		types: ['dark', 'dragon'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	hydreigon: {
		dexId: 635,
		types: ['dark', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	larvesta: {
		dexId: 636,
		types: ['bug', 'fire'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	volcarona: {
		dexId: 637,
		types: ['bug', 'fire'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	cobalion: {
		dexId: 638,
		types: ['steel', 'fighting'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	terrakion: {
		dexId: 639,
		types: ['rock', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	virizion: {
		dexId: 640,
		types: ['grass', 'fighting'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	'tornadus-incarnate': {
		dexId: 641,
		types: ['flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'thundurus-incarnate': {
		dexId: 642,
		types: ['electric', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	reshiram: {
		dexId: 643,
		types: ['dragon', 'fire'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	zekrom: {
		dexId: 644,
		types: ['dragon', 'electric'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'landorus-incarnate': {
		dexId: 645,
		types: ['ground', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	kyurem: {
		dexId: 646,
		types: ['dragon', 'ice'],
		evs: {
			hp: 1,
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'keldeo-ordinary': {
		dexId: 647,
		types: ['water', 'fighting'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'meloetta-aria': {
		dexId: 648,
		types: ['normal', 'psychic'],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	genesect: {
		dexId: 649,
		types: ['bug', 'steel'],
		evs: {
			attack: 1,
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	chespin: {
		dexId: 650,
		types: ['grass'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	quilladin: {
		dexId: 651,
		types: ['grass'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	chesnaught: {
		dexId: 652,
		types: ['grass', 'fighting'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	fennekin: {
		dexId: 653,
		types: ['fire'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	braixen: {
		dexId: 654,
		types: ['fire'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	delphox: {
		dexId: 655,
		types: ['fire', 'psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	froakie: {
		dexId: 656,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	frogadier: {
		dexId: 657,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	greninja: {
		dexId: 658,
		types: ['water', 'dark'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	bunnelby: {
		dexId: 659,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	diggersby: {
		dexId: 660,
		types: ['normal', 'ground'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	fletchling: {
		dexId: 661,
		types: ['normal', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	fletchinder: {
		dexId: 662,
		types: ['fire', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	talonflame: {
		dexId: 663,
		types: ['fire', 'flying'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	scatterbug: {
		dexId: 664,
		types: ['bug'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	spewpa: {
		dexId: 665,
		types: ['bug'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	vivillon: {
		dexId: 666,
		types: ['bug', 'flying'],
		evs: {
			hp: 1,
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	litleo: {
		dexId: 667,
		types: ['fire', 'normal'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	pyroar: {
		dexId: 668,
		types: ['fire', 'normal'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	flabebe: {
		dexId: 669,
		types: ['fairy'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	floette: {
		dexId: 670,
		types: ['fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	florges: {
		dexId: 671,
		types: ['fairy'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	skiddo: {
		dexId: 672,
		types: ['grass'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	gogoat: {
		dexId: 673,
		types: ['grass'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	pancham: {
		dexId: 674,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	pangoro: {
		dexId: 675,
		types: ['fighting', 'dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	furfrou: {
		dexId: 676,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	espurr: {
		dexId: 677,
		types: ['psychic'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'meowstic-male': {
		dexId: 678,
		types: ['psychic'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	honedge: {
		dexId: 679,
		types: ['steel', 'ghost'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	doublade: {
		dexId: 680,
		types: ['steel', 'ghost'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'aegislash-shield': {
		dexId: 681,
		types: ['steel', 'ghost'],
		evs: {
			defense: 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	spritzee: {
		dexId: 682,
		types: ['fairy'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	aromatisse: {
		dexId: 683,
		types: ['fairy'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	swirlix: {
		dexId: 684,
		types: ['fairy'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	slurpuff: {
		dexId: 685,
		types: ['fairy'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	inkay: {
		dexId: 686,
		types: ['dark', 'psychic'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	malamar: {
		dexId: 687,
		types: ['dark', 'psychic'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	binacle: {
		dexId: 688,
		types: ['rock', 'water'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	barbaracle: {
		dexId: 689,
		types: ['rock', 'water'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	skrelp: {
		dexId: 690,
		types: ['poison', 'water'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	dragalge: {
		dexId: 691,
		types: ['poison', 'dragon'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	clauncher: {
		dexId: 692,
		types: ['water'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	clawitzer: {
		dexId: 693,
		types: ['water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	helioptile: {
		dexId: 694,
		types: ['electric', 'normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	heliolisk: {
		dexId: 695,
		types: ['electric', 'normal'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	tyrunt: {
		dexId: 696,
		types: ['rock', 'dragon'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	tyrantrum: {
		dexId: 697,
		types: ['rock', 'dragon'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	amaura: {
		dexId: 698,
		types: ['rock', 'ice'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	aurorus: {
		dexId: 699,
		types: ['rock', 'ice'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	sylveon: {
		dexId: 700,
		types: ['fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	hawlucha: {
		dexId: 701,
		types: ['fighting', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	dedenne: {
		dexId: 702,
		types: ['electric', 'fairy'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	carbink: {
		dexId: 703,
		types: ['rock', 'fairy'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	goomy: {
		dexId: 704,
		types: ['dragon'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	sliggoo: {
		dexId: 705,
		types: ['dragon'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	goodra: {
		dexId: 706,
		types: ['dragon'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	klefki: {
		dexId: 707,
		types: ['steel', 'fairy'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	phantump: {
		dexId: 708,
		types: ['ghost', 'grass'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	trevenant: {
		dexId: 709,
		types: ['ghost', 'grass'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'pumpkaboo-average': {
		dexId: 710,
		types: ['ghost', 'grass'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	'gourgeist-average': {
		dexId: 711,
		types: ['ghost', 'grass'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	bergmite: {
		dexId: 712,
		types: ['ice'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	avalugg: {
		dexId: 713,
		types: ['ice'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	noibat: {
		dexId: 714,
		types: ['flying', 'dragon'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	noivern: {
		dexId: 715,
		types: ['flying', 'dragon'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	xerneas: {
		dexId: 716,
		types: ['fairy'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	yveltal: {
		dexId: 717,
		types: ['dark', 'flying'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'zygarde-50': {
		dexId: 718,
		types: ['dragon', 'ground'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	diancie: {
		dexId: 719,
		types: ['rock', 'fairy'],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	hoopa: {
		dexId: 720,
		types: ['psychic', 'ghost'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	volcanion: {
		dexId: 721,
		types: ['fire', 'water'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	rowlet: {
		dexId: 722,
		types: ['grass', 'flying'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	dartrix: {
		dexId: 723,
		types: ['grass', 'flying'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	decidueye: {
		dexId: 724,
		types: ['grass', 'ghost'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	litten: {
		dexId: 725,
		types: ['fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	torracat: {
		dexId: 726,
		types: ['fire'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	incineroar: {
		dexId: 727,
		types: ['fire', 'dark'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	popplio: {
		dexId: 728,
		types: ['water'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	brionne: {
		dexId: 729,
		types: ['water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	primarina: {
		dexId: 730,
		types: ['water', 'fairy'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	pikipek: {
		dexId: 731,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	trumbeak: {
		dexId: 732,
		types: ['normal', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	toucannon: {
		dexId: 733,
		types: ['normal', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	yungoos: {
		dexId: 734,
		types: ['normal'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	gumshoos: {
		dexId: 735,
		types: ['normal'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	grubbin: {
		dexId: 736,
		types: ['bug'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	charjabug: {
		dexId: 737,
		types: ['bug', 'electric'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	vikavolt: {
		dexId: 738,
		types: ['bug', 'electric'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	crabrawler: {
		dexId: 739,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	crabominable: {
		dexId: 740,
		types: ['fighting', 'ice'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'oricorio-baile': {
		dexId: 741,
		types: ['fire', 'flying'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	cutiefly: {
		dexId: 742,
		types: ['bug', 'fairy'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	ribombee: {
		dexId: 743,
		types: ['bug', 'fairy'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	rockruff: {
		dexId: 744,
		types: ['rock'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'lycanroc-midday': {
		dexId: 745,
		types: ['rock'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'wishiwashi-solo': {
		dexId: 746,
		types: ['water'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	mareanie: {
		dexId: 747,
		types: ['poison', 'water'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	toxapex: {
		dexId: 748,
		types: ['poison', 'water'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	mudbray: {
		dexId: 749,
		types: ['ground'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	mudsdale: {
		dexId: 750,
		types: ['ground'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	dewpider: {
		dexId: 751,
		types: ['water', 'bug'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	araquanid: {
		dexId: 752,
		types: ['water', 'bug'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	fomantis: {
		dexId: 753,
		types: ['grass'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	lurantis: {
		dexId: 754,
		types: ['grass'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	morelull: {
		dexId: 755,
		types: ['grass', 'fairy'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	shiinotic: {
		dexId: 756,
		types: ['grass', 'fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	salandit: {
		dexId: 757,
		types: ['poison', 'fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	salazzle: {
		dexId: 758,
		types: ['poison', 'fire'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	stufful: {
		dexId: 759,
		types: ['normal', 'fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	bewear: {
		dexId: 760,
		types: ['normal', 'fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	bounsweet: {
		dexId: 761,
		types: ['grass'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	steenee: {
		dexId: 762,
		types: ['grass'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	tsareena: {
		dexId: 763,
		types: ['grass'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	comfey: {
		dexId: 764,
		types: ['fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	oranguru: {
		dexId: 765,
		types: ['normal', 'psychic'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	passimian: {
		dexId: 766,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	wimpod: {
		dexId: 767,
		types: ['bug', 'water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	golisopod: {
		dexId: 768,
		types: ['bug', 'water'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	sandygast: {
		dexId: 769,
		types: ['ghost', 'ground'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	palossand: {
		dexId: 770,
		types: ['ghost', 'ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	pyukumuku: {
		dexId: 771,
		types: ['water'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'type-null': {
		dexId: 772,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	silvally: {
		dexId: 773,
		types: ['normal'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'minior-red-meteor': {
		dexId: 774,
		types: ['rock', 'flying'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	komala: {
		dexId: 775,
		types: ['normal'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	turtonator: {
		dexId: 776,
		types: ['fire', 'dragon'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	togedemaru: {
		dexId: 777,
		types: ['electric', 'steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'mimikyu-disguised': {
		dexId: 778,
		types: ['ghost', 'fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	bruxish: {
		dexId: 779,
		types: ['water', 'psychic'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	drampa: {
		dexId: 780,
		types: ['normal', 'dragon'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	dhelmise: {
		dexId: 781,
		types: ['ghost', 'grass'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'jangmo-o': {
		dexId: 782,
		types: ['dragon'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	'hakamo-o': {
		dexId: 783,
		types: ['dragon', 'fighting'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'kommo-o': {
		dexId: 784,
		types: ['dragon', 'fighting'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'tapu-koko': {
		dexId: 785,
		types: ['electric', 'fairy'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'tapu-lele': {
		dexId: 786,
		types: ['psychic', 'fairy'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'tapu-bulu': {
		dexId: 787,
		types: ['grass', 'fairy'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'tapu-fini': {
		dexId: 788,
		types: ['water', 'fairy'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	cosmog: {
		dexId: 789,
		types: ['psychic'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	cosmoem: {
		dexId: 790,
		types: ['psychic'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	solgaleo: {
		dexId: 791,
		types: ['psychic', 'steel'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	lunala: {
		dexId: 792,
		types: ['psychic', 'ghost'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	nihilego: {
		dexId: 793,
		types: ['rock', 'poison'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	buzzwole: {
		dexId: 794,
		types: ['bug', 'fighting'],
		evs: {
			attack: 1,
			defense: 2,
		},
		encounterOptions: [],
	},
	pheromosa: {
		dexId: 795,
		types: ['bug', 'fighting'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	xurkitree: {
		dexId: 796,
		types: ['electric'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	celesteela: {
		dexId: 797,
		types: ['steel', 'flying'],
		evs: {
			attack: 1,
			defense: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	kartana: {
		dexId: 798,
		types: ['grass', 'steel'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	guzzlord: {
		dexId: 799,
		types: ['dark', 'dragon'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	necrozma: {
		dexId: 800,
		types: ['psychic'],
		evs: {
			attack: 1,
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	magearna: {
		dexId: 801,
		types: ['steel', 'fairy'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	marshadow: {
		dexId: 802,
		types: ['fighting', 'ghost'],
		evs: {
			attack: 2,
			speed: 1,
		},
		encounterOptions: [],
	},
	poipole: {
		dexId: 803,
		types: ['poison'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	naganadel: {
		dexId: 804,
		types: ['poison', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	stakataka: {
		dexId: 805,
		types: ['rock', 'steel'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	blacephalon: {
		dexId: 806,
		types: ['fire', 'ghost'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	zeraora: {
		dexId: 807,
		types: ['electric'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	meltan: {
		dexId: 808,
		types: ['steel'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	melmetal: {
		dexId: 809,
		types: ['steel'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	grookey: {
		dexId: 810,
		types: ['grass'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	thwackey: {
		dexId: 811,
		types: ['grass'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	rillaboom: {
		dexId: 812,
		types: ['grass'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	scorbunny: {
		dexId: 813,
		types: ['fire'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	raboot: {
		dexId: 814,
		types: ['fire'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	cinderace: {
		dexId: 815,
		types: ['fire'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	sobble: {
		dexId: 816,
		types: ['water'],
		evs: {
			'special-defense': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	drizzile: {
		dexId: 817,
		types: ['water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	inteleon: {
		dexId: 818,
		types: ['water'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	skwovet: {
		dexId: 819,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	greedent: {
		dexId: 820,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	rookidee: {
		dexId: 821,
		types: ['flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	corvisquire: {
		dexId: 822,
		types: ['flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	corviknight: {
		dexId: 823,
		types: ['flying', 'steel'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	blipbug: {
		dexId: 824,
		types: ['bug'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	dottler: {
		dexId: 825,
		types: ['bug', 'psychic'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	orbeetle: {
		dexId: 826,
		types: ['bug', 'psychic'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	nickit: {
		dexId: 827,
		types: ['dark'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	thievul: {
		dexId: 828,
		types: ['dark'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	gossifleur: {
		dexId: 829,
		types: ['grass'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	eldegoss: {
		dexId: 830,
		types: ['grass'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	wooloo: {
		dexId: 831,
		types: ['normal'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	dubwool: {
		dexId: 832,
		types: ['normal'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	chewtle: {
		dexId: 833,
		types: ['water'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	drednaw: {
		dexId: 834,
		types: ['water', 'rock'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	yamper: {
		dexId: 835,
		types: ['electric'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	boltund: {
		dexId: 836,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	rolycoly: {
		dexId: 837,
		types: ['rock'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	carkol: {
		dexId: 838,
		types: ['rock', 'fire'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	coalossal: {
		dexId: 839,
		types: ['rock', 'fire'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	applin: {
		dexId: 840,
		types: ['grass', 'dragon'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	flapple: {
		dexId: 841,
		types: ['grass', 'dragon'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	appletun: {
		dexId: 842,
		types: ['grass', 'dragon'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	silicobra: {
		dexId: 843,
		types: ['ground'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	sandaconda: {
		dexId: 844,
		types: ['ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	cramorant: {
		dexId: 845,
		types: ['flying', 'water'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	arrokuda: {
		dexId: 846,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	barraskewda: {
		dexId: 847,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	toxel: {
		dexId: 848,
		types: ['electric', 'poison'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'toxtricity-amped': {
		dexId: 849,
		types: ['electric', 'poison'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	sizzlipede: {
		dexId: 850,
		types: ['fire', 'bug'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	centiskorch: {
		dexId: 851,
		types: ['fire', 'bug'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	clobbopus: {
		dexId: 852,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	grapploct: {
		dexId: 853,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	sinistea: {
		dexId: 854,
		types: ['ghost'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	polteageist: {
		dexId: 855,
		types: ['ghost'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	hatenna: {
		dexId: 856,
		types: ['psychic'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	hattrem: {
		dexId: 857,
		types: ['psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	hatterene: {
		dexId: 858,
		types: ['psychic', 'fairy'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	impidimp: {
		dexId: 859,
		types: ['dark', 'fairy'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	morgrem: {
		dexId: 860,
		types: ['dark', 'fairy'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	grimmsnarl: {
		dexId: 861,
		types: ['dark', 'fairy'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	obstagoon: {
		dexId: 862,
		types: ['dark', 'normal'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	perrserker: {
		dexId: 863,
		types: ['steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	cursola: {
		dexId: 864,
		types: ['ghost'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	sirfetchd: {
		dexId: 865,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'mr-rime': {
		dexId: 866,
		types: ['ice', 'psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	runerigus: {
		dexId: 867,
		types: ['ground', 'ghost'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	milcery: {
		dexId: 868,
		types: ['fairy'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	alcremie: {
		dexId: 869,
		types: ['fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	falinks: {
		dexId: 870,
		types: ['fighting'],
		evs: {
			attack: 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	pincurchin: {
		dexId: 871,
		types: ['electric'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	snom: {
		dexId: 872,
		types: ['ice', 'bug'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	frosmoth: {
		dexId: 873,
		types: ['ice', 'bug'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	stonjourner: {
		dexId: 874,
		types: ['rock'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'eiscue-ice': {
		dexId: 875,
		types: ['ice'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'indeedee-male': {
		dexId: 876,
		types: ['psychic', 'normal'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'morpeko-full-belly': {
		dexId: 877,
		types: ['electric', 'dark'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	cufant: {
		dexId: 878,
		types: ['steel'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	copperajah: {
		dexId: 879,
		types: ['steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	dracozolt: {
		dexId: 880,
		types: ['electric', 'dragon'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	arctozolt: {
		dexId: 881,
		types: ['electric', 'ice'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	dracovish: {
		dexId: 882,
		types: ['water', 'dragon'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	arctovish: {
		dexId: 883,
		types: ['water', 'ice'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	duraludon: {
		dexId: 884,
		types: ['steel', 'dragon'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	dreepy: {
		dexId: 885,
		types: ['dragon', 'ghost'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	drakloak: {
		dexId: 886,
		types: ['dragon', 'ghost'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	dragapult: {
		dexId: 887,
		types: ['dragon', 'ghost'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	zacian: {
		dexId: 888,
		types: ['fairy'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	zamazenta: {
		dexId: 889,
		types: ['fighting'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	eternatus: {
		dexId: 890,
		types: ['poison', 'dragon'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	kubfu: {
		dexId: 891,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'urshifu-single-strike': {
		dexId: 892,
		types: ['fighting', 'dark'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	zarude: {
		dexId: 893,
		types: ['dark', 'grass'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	regieleki: {
		dexId: 894,
		types: ['electric'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	regidrago: {
		dexId: 895,
		types: ['dragon'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	glastrier: {
		dexId: 896,
		types: ['ice'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	spectrier: {
		dexId: 897,
		types: ['ghost'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	calyrex: {
		dexId: 898,
		types: ['psychic', 'grass'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	wyrdeer: {
		dexId: 899,
		types: ['normal', 'psychic'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	kleavor: {
		dexId: 900,
		types: ['bug', 'rock'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	ursaluna: {
		dexId: 901,
		types: ['ground', 'normal'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'basculegion-male': {
		dexId: 902,
		types: ['water', 'ghost'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	sneasler: {
		dexId: 903,
		types: ['fighting', 'poison'],
		evs: {
			attack: 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	overqwil: {
		dexId: 904,
		types: ['dark', 'poison'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'enamorus-incarnate': {
		dexId: 905,
		types: ['fairy', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	sprigatito: {
		dexId: 906,
		types: ['grass'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	floragato: {
		dexId: 907,
		types: ['grass'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	meowscarada: {
		dexId: 908,
		types: ['grass', 'dark'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	fuecoco: {
		dexId: 909,
		types: ['fire'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	crocalor: {
		dexId: 910,
		types: ['fire'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	skeledirge: {
		dexId: 911,
		types: ['fire', 'ghost'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	quaxly: {
		dexId: 912,
		types: ['water'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	quaxwell: {
		dexId: 913,
		types: ['water'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	quaquaval: {
		dexId: 914,
		types: ['water', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	lechonk: {
		dexId: 915,
		types: ['normal'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	'oinkologne-male': {
		dexId: 916,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	tarountula: {
		dexId: 917,
		types: ['bug'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	spidops: {
		dexId: 918,
		types: ['bug'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	nymble: {
		dexId: 919,
		types: ['bug'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	lokix: {
		dexId: 920,
		types: ['bug', 'dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	pawmi: {
		dexId: 921,
		types: ['electric'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	pawmo: {
		dexId: 922,
		types: ['electric', 'fighting'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	pawmot: {
		dexId: 923,
		types: ['electric', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	tandemaus: {
		dexId: 924,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'maushold-family-of-four': {
		dexId: 925,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	fidough: {
		dexId: 926,
		types: ['fairy'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	dachsbun: {
		dexId: 927,
		types: ['fairy'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	smoliv: {
		dexId: 928,
		types: ['grass', 'normal'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	dolliv: {
		dexId: 929,
		types: ['grass', 'normal'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	arboliva: {
		dexId: 930,
		types: ['grass', 'normal'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'squawkabilly-green-plumage': {
		dexId: 931,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	nacli: {
		dexId: 932,
		types: ['rock'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	naclstack: {
		dexId: 933,
		types: ['rock'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	garganacl: {
		dexId: 934,
		types: ['rock'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	charcadet: {
		dexId: 935,
		types: ['fire'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	armarouge: {
		dexId: 936,
		types: ['fire', 'psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	ceruledge: {
		dexId: 937,
		types: ['fire', 'ghost'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	tadbulb: {
		dexId: 938,
		types: ['electric'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	bellibolt: {
		dexId: 939,
		types: ['electric'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	wattrel: {
		dexId: 940,
		types: ['electric', 'flying'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	kilowattrel: {
		dexId: 941,
		types: ['electric', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	maschiff: {
		dexId: 942,
		types: ['dark'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	mabosstiff: {
		dexId: 943,
		types: ['dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	shroodle: {
		dexId: 944,
		types: ['poison', 'normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	grafaiai: {
		dexId: 945,
		types: ['poison', 'normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	bramblin: {
		dexId: 946,
		types: ['grass', 'ghost'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	brambleghast: {
		dexId: 947,
		types: ['grass', 'ghost'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	toedscool: {
		dexId: 948,
		types: ['ground', 'grass'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	toedscruel: {
		dexId: 949,
		types: ['ground', 'grass'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	klawf: {
		dexId: 950,
		types: ['rock'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	capsakid: {
		dexId: 951,
		types: ['grass'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	scovillain: {
		dexId: 952,
		types: ['grass', 'fire'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	rellor: {
		dexId: 953,
		types: ['bug'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	rabsca: {
		dexId: 954,
		types: ['bug', 'psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	flittle: {
		dexId: 955,
		types: ['psychic'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	espathra: {
		dexId: 956,
		types: ['psychic'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	tinkatink: {
		dexId: 957,
		types: ['fairy', 'steel'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	tinkatuff: {
		dexId: 958,
		types: ['fairy', 'steel'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	tinkaton: {
		dexId: 959,
		types: ['fairy', 'steel'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	wiglett: {
		dexId: 960,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	wugtrio: {
		dexId: 961,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	bombirdier: {
		dexId: 962,
		types: ['flying', 'dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	finizen: {
		dexId: 963,
		types: ['water'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'palafin-zero': {
		dexId: 964,
		types: ['water'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	varoom: {
		dexId: 965,
		types: ['steel', 'poison'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	revavroom: {
		dexId: 966,
		types: ['steel', 'poison'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	cyclizar: {
		dexId: 967,
		types: ['dragon', 'normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	orthworm: {
		dexId: 968,
		types: ['steel'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	glimmet: {
		dexId: 969,
		types: ['rock', 'poison'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	glimmora: {
		dexId: 970,
		types: ['rock', 'poison'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	greavard: {
		dexId: 971,
		types: ['ghost'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	houndstone: {
		dexId: 972,
		types: ['ghost'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	flamigo: {
		dexId: 973,
		types: ['flying', 'fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	cetoddle: {
		dexId: 974,
		types: ['ice'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	cetitan: {
		dexId: 975,
		types: ['ice'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	veluza: {
		dexId: 976,
		types: ['water', 'psychic'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	dondozo: {
		dexId: 977,
		types: ['water'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'tatsugiri-curly': {
		dexId: 978,
		types: ['dragon', 'water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	annihilape: {
		dexId: 979,
		types: ['fighting', 'ghost'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	clodsire: {
		dexId: 980,
		types: ['poison', 'ground'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	farigiraf: {
		dexId: 981,
		types: ['normal', 'psychic'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'dudunsparce-two-segment': {
		dexId: 982,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	kingambit: {
		dexId: 983,
		types: ['dark', 'steel'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'great-tusk': {
		dexId: 984,
		types: ['ground', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'scream-tail': {
		dexId: 985,
		types: ['fairy', 'psychic'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'brute-bonnet': {
		dexId: 986,
		types: ['grass', 'dark'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'flutter-mane': {
		dexId: 987,
		types: ['ghost', 'fairy'],
		evs: {
			'special-attack': 1,
			'special-defense': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	'slither-wing': {
		dexId: 988,
		types: ['bug', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'sandy-shocks': {
		dexId: 989,
		types: ['electric', 'ground'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'iron-treads': {
		dexId: 990,
		types: ['ground', 'steel'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'iron-bundle': {
		dexId: 991,
		types: ['ice', 'water'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'iron-hands': {
		dexId: 992,
		types: ['fighting', 'electric'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'iron-jugulis': {
		dexId: 993,
		types: ['dark', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'iron-moth': {
		dexId: 994,
		types: ['fire', 'poison'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'iron-thorns': {
		dexId: 995,
		types: ['rock', 'electric'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	frigibax: {
		dexId: 996,
		types: ['dragon', 'ice'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	arctibax: {
		dexId: 997,
		types: ['dragon', 'ice'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	baxcalibur: {
		dexId: 998,
		types: ['dragon', 'ice'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	gimmighoul: {
		dexId: 999,
		types: ['ghost'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	gholdengo: {
		dexId: 1000,
		types: ['steel', 'ghost'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'wo-chien': {
		dexId: 1001,
		types: ['dark', 'grass'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	'chien-pao': {
		dexId: 1002,
		types: ['dark', 'ice'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'ting-lu': {
		dexId: 1003,
		types: ['dark', 'ground'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'chi-yu': {
		dexId: 1004,
		types: ['dark', 'fire'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'roaring-moon': {
		dexId: 1005,
		types: ['dragon', 'dark'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'iron-valiant': {
		dexId: 1006,
		types: ['fairy', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	koraidon: {
		dexId: 1007,
		types: ['fighting', 'dragon'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	miraidon: {
		dexId: 1008,
		types: ['electric', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'walking-wake': {
		dexId: 1009,
		types: ['water', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'iron-leaves': {
		dexId: 1010,
		types: ['grass', 'psychic'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	dipplin: {
		dexId: 1011,
		types: ['grass', 'dragon'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	poltchageist: {
		dexId: 1012,
		types: ['grass', 'ghost'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	sinistcha: {
		dexId: 1013,
		types: ['grass', 'ghost'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	okidogi: {
		dexId: 1014,
		types: ['poison', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	munkidori: {
		dexId: 1015,
		types: ['poison', 'psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	fezandipiti: {
		dexId: 1016,
		types: ['poison', 'fairy'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	ogerpon: {
		dexId: 1017,
		types: ['grass'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	archaludon: {
		dexId: 1018,
		types: ['steel', 'dragon'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	hydrapple: {
		dexId: 1019,
		types: ['grass', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'gouging-fire': {
		dexId: 1020,
		types: ['fire', 'dragon'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'raging-bolt': {
		dexId: 1021,
		types: ['electric', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'iron-boulder': {
		dexId: 1022,
		types: ['rock', 'psychic'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'iron-crown': {
		dexId: 1023,
		types: ['steel', 'psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	terapagos: {
		dexId: 1024,
		types: ['normal'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	pecharunt: {
		dexId: 1025,
		types: ['poison', 'ghost'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'deoxys-attack': {
		dexId: 10001,
		types: ['psychic'],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'deoxys-defense': {
		dexId: 10002,
		types: ['psychic'],
		evs: {
			defense: 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'deoxys-speed': {
		dexId: 10003,
		types: ['psychic'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'wormadam-sandy': {
		dexId: 10004,
		types: ['bug', 'ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'wormadam-trash': {
		dexId: 10005,
		types: ['bug', 'steel'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'shaymin-sky': {
		dexId: 10006,
		types: ['grass', 'flying'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'giratina-origin': {
		dexId: 10007,
		types: ['ghost', 'dragon'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'rotom-heat': {
		dexId: 10008,
		types: ['electric', 'fire'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	'rotom-wash': {
		dexId: 10009,
		types: ['electric', 'water'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	'rotom-frost': {
		dexId: 10010,
		types: ['electric', 'ice'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	'rotom-fan': {
		dexId: 10011,
		types: ['electric', 'flying'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	'rotom-mow': {
		dexId: 10012,
		types: ['electric', 'grass'],
		evs: {
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	'castform-sunny': {
		dexId: 10013,
		types: ['fire'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	'castform-rainy': {
		dexId: 10014,
		types: ['water'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	'castform-snowy': {
		dexId: 10015,
		types: ['ice'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	'basculin-blue-striped': {
		dexId: 10016,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'darmanitan-zen': {
		dexId: 10017,
		types: ['fire', 'psychic'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'meloetta-pirouette': {
		dexId: 10018,
		types: ['normal', 'fighting'],
		evs: {
			attack: 1,
			defense: 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	'tornadus-therian': {
		dexId: 10019,
		types: ['flying'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'thundurus-therian': {
		dexId: 10020,
		types: ['electric', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'landorus-therian': {
		dexId: 10021,
		types: ['ground', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'kyurem-black': {
		dexId: 10022,
		types: ['dragon', 'ice'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'kyurem-white': {
		dexId: 10023,
		types: ['dragon', 'ice'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'keldeo-resolute': {
		dexId: 10024,
		types: ['water', 'fighting'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'meowstic-female': {
		dexId: 10025,
		types: ['psychic'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'aegislash-blade': {
		dexId: 10026,
		types: ['steel', 'ghost'],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'pumpkaboo-small': {
		dexId: 10027,
		types: ['ghost', 'grass'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	'pumpkaboo-large': {
		dexId: 10028,
		types: ['ghost', 'grass'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	'pumpkaboo-super': {
		dexId: 10029,
		types: ['ghost', 'grass'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	'gourgeist-small': {
		dexId: 10030,
		types: ['ghost', 'grass'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'gourgeist-large': {
		dexId: 10031,
		types: ['ghost', 'grass'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'gourgeist-super': {
		dexId: 10032,
		types: ['ghost', 'grass'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'venusaur-mega': {
		dexId: 10033,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'charizard-mega-x': {
		dexId: 10034,
		types: ['fire', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'charizard-mega-y': {
		dexId: 10035,
		types: ['fire', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'blastoise-mega': {
		dexId: 10036,
		types: ['water'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	'alakazam-mega': {
		dexId: 10037,
		types: ['psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'gengar-mega': {
		dexId: 10038,
		types: ['ghost', 'poison'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'kangaskhan-mega': {
		dexId: 10039,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'pinsir-mega': {
		dexId: 10040,
		types: ['bug', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'gyarados-mega': {
		dexId: 10041,
		types: ['water', 'dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'aerodactyl-mega': {
		dexId: 10042,
		types: ['rock', 'flying'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'mewtwo-mega-x': {
		dexId: 10043,
		types: ['psychic', 'fighting'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'mewtwo-mega-y': {
		dexId: 10044,
		types: ['psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'ampharos-mega': {
		dexId: 10045,
		types: ['electric', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'scizor-mega': {
		dexId: 10046,
		types: ['bug', 'steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'heracross-mega': {
		dexId: 10047,
		types: ['bug', 'fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'houndoom-mega': {
		dexId: 10048,
		types: ['dark', 'fire'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'tyranitar-mega': {
		dexId: 10049,
		types: ['rock', 'dark'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'blaziken-mega': {
		dexId: 10050,
		types: ['fire', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'gardevoir-mega': {
		dexId: 10051,
		types: ['psychic', 'fairy'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'mawile-mega': {
		dexId: 10052,
		types: ['steel', 'fairy'],
		evs: {
			attack: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	'aggron-mega': {
		dexId: 10053,
		types: ['steel'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'medicham-mega': {
		dexId: 10054,
		types: ['fighting', 'psychic'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'manectric-mega': {
		dexId: 10055,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'banette-mega': {
		dexId: 10056,
		types: ['ghost'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'absol-mega': {
		dexId: 10057,
		types: ['dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'garchomp-mega': {
		dexId: 10058,
		types: ['dragon', 'ground'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'lucario-mega': {
		dexId: 10059,
		types: ['fighting', 'steel'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'abomasnow-mega': {
		dexId: 10060,
		types: ['grass', 'ice'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'floette-eternal': {
		dexId: 10061,
		types: ['fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'latias-mega': {
		dexId: 10062,
		types: ['dragon', 'psychic'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	'latios-mega': {
		dexId: 10063,
		types: ['dragon', 'psychic'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'swampert-mega': {
		dexId: 10064,
		types: ['water', 'ground'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'sceptile-mega': {
		dexId: 10065,
		types: ['grass', 'dragon'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'sableye-mega': {
		dexId: 10066,
		types: ['dark', 'ghost'],
		evs: {
			attack: 1,
			defense: 1,
		},
		encounterOptions: [],
	},
	'altaria-mega': {
		dexId: 10067,
		types: ['dragon', 'fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'gallade-mega': {
		dexId: 10068,
		types: ['psychic', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'audino-mega': {
		dexId: 10069,
		types: ['normal', 'fairy'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'sharpedo-mega': {
		dexId: 10070,
		types: ['water', 'dark'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'slowbro-mega': {
		dexId: 10071,
		types: ['water', 'psychic'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'steelix-mega': {
		dexId: 10072,
		types: ['steel', 'ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'pidgeot-mega': {
		dexId: 10073,
		types: ['normal', 'flying'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'glalie-mega': {
		dexId: 10074,
		types: ['ice'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'diancie-mega': {
		dexId: 10075,
		types: ['rock', 'fairy'],
		evs: {
			defense: 1,
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'metagross-mega': {
		dexId: 10076,
		types: ['steel', 'psychic'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'kyogre-primal': {
		dexId: 10077,
		types: ['water'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'groudon-primal': {
		dexId: 10078,
		types: ['ground', 'fire'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'rayquaza-mega': {
		dexId: 10079,
		types: ['dragon', 'flying'],
		evs: {
			attack: 2,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'pikachu-rock-star': {
		dexId: 10080,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-belle': {
		dexId: 10081,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-pop-star': {
		dexId: 10082,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-phd': {
		dexId: 10083,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-libre': {
		dexId: 10084,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-cosplay': {
		dexId: 10085,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'hoopa-unbound': {
		dexId: 10086,
		types: ['psychic', 'dark'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'camerupt-mega': {
		dexId: 10087,
		types: ['fire', 'ground'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'lopunny-mega': {
		dexId: 10088,
		types: ['normal', 'fighting'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'salamence-mega': {
		dexId: 10089,
		types: ['dragon', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'beedrill-mega': {
		dexId: 10090,
		types: ['bug', 'poison'],
		evs: {
			attack: 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'rattata-alola': {
		dexId: 10091,
		types: ['dark', 'normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'raticate-alola': {
		dexId: 10092,
		types: ['dark', 'normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'raticate-totem-alola': {
		dexId: 10093,
		types: ['dark', 'normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-original-cap': {
		dexId: 10094,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-hoenn-cap': {
		dexId: 10095,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-sinnoh-cap': {
		dexId: 10096,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-unova-cap': {
		dexId: 10097,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-kalos-cap': {
		dexId: 10098,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'pikachu-alola-cap': {
		dexId: 10099,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'raichu-alola': {
		dexId: 10100,
		types: ['electric', 'psychic'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'sandshrew-alola': {
		dexId: 10101,
		types: ['ice', 'steel'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	'sandslash-alola': {
		dexId: 10102,
		types: ['ice', 'steel'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'vulpix-alola': {
		dexId: 10103,
		types: ['ice'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'ninetales-alola': {
		dexId: 10104,
		types: ['ice', 'fairy'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'diglett-alola': {
		dexId: 10105,
		types: ['ground', 'steel'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'dugtrio-alola': {
		dexId: 10106,
		types: ['ground', 'steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'meowth-alola': {
		dexId: 10107,
		types: ['dark'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'persian-alola': {
		dexId: 10108,
		types: ['dark'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'geodude-alola': {
		dexId: 10109,
		types: ['rock', 'electric'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	'graveler-alola': {
		dexId: 10110,
		types: ['rock', 'electric'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'golem-alola': {
		dexId: 10111,
		types: ['rock', 'electric'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'grimer-alola': {
		dexId: 10112,
		types: ['poison', 'dark'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	'muk-alola': {
		dexId: 10113,
		types: ['poison', 'dark'],
		evs: {
			hp: 1,
			attack: 1,
		},
		encounterOptions: [],
	},
	'exeggutor-alola': {
		dexId: 10114,
		types: ['grass', 'dragon'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'marowak-alola': {
		dexId: 10115,
		types: ['fire', 'ghost'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'greninja-battle-bond': {
		dexId: 10116,
		types: ['water', 'dark'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'greninja-ash': {
		dexId: 10117,
		types: ['water', 'dark'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'zygarde-10-power-construct': {
		dexId: 10118,
		types: ['dragon', 'ground'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'zygarde-50-power-construct': {
		dexId: 10119,
		types: ['dragon', 'ground'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'zygarde-complete': {
		dexId: 10120,
		types: ['dragon', 'ground'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'gumshoos-totem': {
		dexId: 10121,
		types: ['normal'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'vikavolt-totem': {
		dexId: 10122,
		types: ['bug', 'electric'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'oricorio-pom-pom': {
		dexId: 10123,
		types: ['electric', 'flying'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'oricorio-pau': {
		dexId: 10124,
		types: ['psychic', 'flying'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'oricorio-sensu': {
		dexId: 10125,
		types: ['ghost', 'flying'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'lycanroc-midnight': {
		dexId: 10126,
		types: ['rock'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'wishiwashi-school': {
		dexId: 10127,
		types: ['water'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	'lurantis-totem': {
		dexId: 10128,
		types: ['grass'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'salazzle-totem': {
		dexId: 10129,
		types: ['poison', 'fire'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'minior-orange-meteor': {
		dexId: 10130,
		types: ['rock', 'flying'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'minior-yellow-meteor': {
		dexId: 10131,
		types: ['rock', 'flying'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'minior-green-meteor': {
		dexId: 10132,
		types: ['rock', 'flying'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'minior-blue-meteor': {
		dexId: 10133,
		types: ['rock', 'flying'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'minior-indigo-meteor': {
		dexId: 10134,
		types: ['rock', 'flying'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'minior-violet-meteor': {
		dexId: 10135,
		types: ['rock', 'flying'],
		evs: {
			defense: 1,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'minior-red': {
		dexId: 10136,
		types: ['rock', 'flying'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'minior-orange': {
		dexId: 10137,
		types: ['rock', 'flying'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'minior-yellow': {
		dexId: 10138,
		types: ['rock', 'flying'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'minior-green': {
		dexId: 10139,
		types: ['rock', 'flying'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'minior-blue': {
		dexId: 10140,
		types: ['rock', 'flying'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'minior-indigo': {
		dexId: 10141,
		types: ['rock', 'flying'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'minior-violet': {
		dexId: 10142,
		types: ['rock', 'flying'],
		evs: {
			attack: 1,
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'mimikyu-busted': {
		dexId: 10143,
		types: ['ghost', 'fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'mimikyu-totem-disguised': {
		dexId: 10144,
		types: ['ghost', 'fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'mimikyu-totem-busted': {
		dexId: 10145,
		types: ['ghost', 'fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'kommo-o-totem': {
		dexId: 10146,
		types: ['dragon', 'fighting'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'magearna-original': {
		dexId: 10147,
		types: ['steel', 'fairy'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'pikachu-partner-cap': {
		dexId: 10148,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'marowak-totem': {
		dexId: 10149,
		types: ['fire', 'ghost'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'ribombee-totem': {
		dexId: 10150,
		types: ['bug', 'fairy'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'rockruff-own-tempo': {
		dexId: 10151,
		types: ['rock'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'lycanroc-dusk': {
		dexId: 10152,
		types: ['rock'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'araquanid-totem': {
		dexId: 10153,
		types: ['water', 'bug'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'togedemaru-totem': {
		dexId: 10154,
		types: ['electric', 'steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'necrozma-dusk': {
		dexId: 10155,
		types: ['psychic', 'steel'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'necrozma-dawn': {
		dexId: 10156,
		types: ['psychic', 'ghost'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'necrozma-ultra': {
		dexId: 10157,
		types: ['psychic', 'dragon'],
		evs: {
			attack: 1,
			'special-attack': 1,
			speed: 1,
		},
		encounterOptions: [],
	},
	'pikachu-starter': {
		dexId: 10158,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'eevee-starter': {
		dexId: 10159,
		types: ['normal'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'pikachu-world-cap': {
		dexId: 10160,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'meowth-galar': {
		dexId: 10161,
		types: ['steel'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'ponyta-galar': {
		dexId: 10162,
		types: ['psychic'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'rapidash-galar': {
		dexId: 10163,
		types: ['psychic', 'fairy'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'slowpoke-galar': {
		dexId: 10164,
		types: ['psychic'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	'slowbro-galar': {
		dexId: 10165,
		types: ['poison', 'psychic'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'farfetchd-galar': {
		dexId: 10166,
		types: ['fighting'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'weezing-galar': {
		dexId: 10167,
		types: ['poison', 'fairy'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'mr-mime-galar': {
		dexId: 10168,
		types: ['ice', 'psychic'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'articuno-galar': {
		dexId: 10169,
		types: ['psychic', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'zapdos-galar': {
		dexId: 10170,
		types: ['fighting', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'moltres-galar': {
		dexId: 10171,
		types: ['dark', 'flying'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	'slowking-galar': {
		dexId: 10172,
		types: ['poison', 'psychic'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'corsola-galar': {
		dexId: 10173,
		types: ['ghost'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'zigzagoon-galar': {
		dexId: 10174,
		types: ['dark', 'normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'linoone-galar': {
		dexId: 10175,
		types: ['dark', 'normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'darumaka-galar': {
		dexId: 10176,
		types: ['ice'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'darmanitan-galar-standard': {
		dexId: 10177,
		types: ['ice'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'darmanitan-galar-zen': {
		dexId: 10178,
		types: ['ice', 'fire'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'yamask-galar': {
		dexId: 10179,
		types: ['ground', 'ghost'],
		evs: {
			defense: 1,
		},
		encounterOptions: [],
	},
	'stunfisk-galar': {
		dexId: 10180,
		types: ['ground', 'steel'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'zygarde-10': {
		dexId: 10181,
		types: ['dragon', 'ground'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'cramorant-gulping': {
		dexId: 10182,
		types: ['flying', 'water'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'cramorant-gorging': {
		dexId: 10183,
		types: ['flying', 'water'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'toxtricity-low-key': {
		dexId: 10184,
		types: ['electric', 'poison'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'eiscue-noice': {
		dexId: 10185,
		types: ['ice'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'indeedee-female': {
		dexId: 10186,
		types: ['psychic', 'normal'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'morpeko-hangry': {
		dexId: 10187,
		types: ['electric', 'dark'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'zacian-crowned': {
		dexId: 10188,
		types: ['fairy', 'steel'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'zamazenta-crowned': {
		dexId: 10189,
		types: ['fighting', 'steel'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'eternatus-eternamax': {
		dexId: 10190,
		types: ['poison', 'dragon'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
	'urshifu-rapid-strike': {
		dexId: 10191,
		types: ['fighting', 'water'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'zarude-dada': {
		dexId: 10192,
		types: ['dark', 'grass'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'calyrex-ice': {
		dexId: 10193,
		types: ['psychic', 'ice'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'calyrex-shadow': {
		dexId: 10194,
		types: ['psychic', 'ghost'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'venusaur-gmax': {
		dexId: 10195,
		types: ['grass', 'poison'],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'charizard-gmax': {
		dexId: 10196,
		types: ['fire', 'flying'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'blastoise-gmax': {
		dexId: 10197,
		types: ['water'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	'butterfree-gmax': {
		dexId: 10198,
		types: ['bug', 'flying'],
		evs: {
			'special-attack': 2,
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'pikachu-gmax': {
		dexId: 10199,
		types: ['electric'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'meowth-gmax': {
		dexId: 10200,
		types: ['normal'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'machamp-gmax': {
		dexId: 10201,
		types: ['fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'gengar-gmax': {
		dexId: 10202,
		types: ['ghost', 'poison'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'kingler-gmax': {
		dexId: 10203,
		types: ['water'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'lapras-gmax': {
		dexId: 10204,
		types: ['water', 'ice'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'eevee-gmax': {
		dexId: 10205,
		types: ['normal'],
		evs: {
			'special-defense': 1,
		},
		encounterOptions: [],
	},
	'snorlax-gmax': {
		dexId: 10206,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'garbodor-gmax': {
		dexId: 10207,
		types: ['poison'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'melmetal-gmax': {
		dexId: 10208,
		types: ['steel'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'rillaboom-gmax': {
		dexId: 10209,
		types: ['grass'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'cinderace-gmax': {
		dexId: 10210,
		types: ['fire'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'inteleon-gmax': {
		dexId: 10211,
		types: ['water'],
		evs: {
			speed: 3,
		},
		encounterOptions: [],
	},
	'corviknight-gmax': {
		dexId: 10212,
		types: ['flying', 'steel'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'orbeetle-gmax': {
		dexId: 10213,
		types: ['bug', 'psychic'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	'drednaw-gmax': {
		dexId: 10214,
		types: ['water', 'rock'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'coalossal-gmax': {
		dexId: 10215,
		types: ['rock', 'fire'],
		evs: {
			defense: 3,
		},
		encounterOptions: [],
	},
	'flapple-gmax': {
		dexId: 10216,
		types: ['grass', 'dragon'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'appletun-gmax': {
		dexId: 10217,
		types: ['grass', 'dragon'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'sandaconda-gmax': {
		dexId: 10218,
		types: ['ground'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'toxtricity-amped-gmax': {
		dexId: 10219,
		types: ['electric', 'poison'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'centiskorch-gmax': {
		dexId: 10220,
		types: ['fire', 'bug'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'hatterene-gmax': {
		dexId: 10221,
		types: ['psychic', 'fairy'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'grimmsnarl-gmax': {
		dexId: 10222,
		types: ['dark', 'fairy'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'alcremie-gmax': {
		dexId: 10223,
		types: ['fairy'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'copperajah-gmax': {
		dexId: 10224,
		types: ['steel'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'duraludon-gmax': {
		dexId: 10225,
		types: ['steel', 'dragon'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'urshifu-single-strike-gmax': {
		dexId: 10226,
		types: ['fighting', 'dark'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'urshifu-rapid-strike-gmax': {
		dexId: 10227,
		types: ['fighting', 'water'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'toxtricity-low-key-gmax': {
		dexId: 10228,
		types: ['electric', 'poison'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'growlithe-hisui': {
		dexId: 10229,
		types: ['fire', 'rock'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'arcanine-hisui': {
		dexId: 10230,
		types: ['fire', 'rock'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'voltorb-hisui': {
		dexId: 10231,
		types: ['electric', 'grass'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'electrode-hisui': {
		dexId: 10232,
		types: ['electric', 'grass'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'typhlosion-hisui': {
		dexId: 10233,
		types: ['fire', 'ghost'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'qwilfish-hisui': {
		dexId: 10234,
		types: ['dark', 'poison'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'sneasel-hisui': {
		dexId: 10235,
		types: ['fighting', 'poison'],
		evs: {
			speed: 1,
		},
		encounterOptions: [],
	},
	'samurott-hisui': {
		dexId: 10236,
		types: ['water', 'dark'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'lilligant-hisui': {
		dexId: 10237,
		types: ['grass', 'fighting'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'zorua-hisui': {
		dexId: 10238,
		types: ['normal', 'ghost'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'zoroark-hisui': {
		dexId: 10239,
		types: ['normal', 'ghost'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'braviary-hisui': {
		dexId: 10240,
		types: ['psychic', 'flying'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'sliggoo-hisui': {
		dexId: 10241,
		types: ['steel', 'dragon'],
		evs: {
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'goodra-hisui': {
		dexId: 10242,
		types: ['steel', 'dragon'],
		evs: {
			'special-defense': 3,
		},
		encounterOptions: [],
	},
	'avalugg-hisui': {
		dexId: 10243,
		types: ['ice', 'rock'],
		evs: {
			defense: 2,
		},
		encounterOptions: [],
	},
	'decidueye-hisui': {
		dexId: 10244,
		types: ['grass', 'fighting'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'dialga-origin': {
		dexId: 10245,
		types: ['steel', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'palkia-origin': {
		dexId: 10246,
		types: ['water', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'basculin-white-striped': {
		dexId: 10247,
		types: ['water'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'basculegion-female': {
		dexId: 10248,
		types: ['water', 'ghost'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'enamorus-therian': {
		dexId: 10249,
		types: ['fairy', 'flying'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'tauros-paldea-combat-breed': {
		dexId: 10250,
		types: ['fighting'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'tauros-paldea-blaze-breed': {
		dexId: 10251,
		types: ['fighting', 'fire'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'tauros-paldea-aqua-breed': {
		dexId: 10252,
		types: ['fighting', 'water'],
		evs: {
			attack: 2,
		},
		encounterOptions: [],
	},
	'wooper-paldea': {
		dexId: 10253,
		types: ['poison', 'ground'],
		evs: {
			hp: 1,
		},
		encounterOptions: [],
	},
	'oinkologne-female': {
		dexId: 10254,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'dudunsparce-three-segment': {
		dexId: 10255,
		types: ['normal'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'palafin-hero': {
		dexId: 10256,
		types: ['water'],
		evs: {
			hp: 2,
		},
		encounterOptions: [],
	},
	'maushold-family-of-three': {
		dexId: 10257,
		types: ['normal'],
		evs: {
			speed: 2,
		},
		encounterOptions: [],
	},
	'tatsugiri-droopy': {
		dexId: 10258,
		types: ['dragon', 'water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'tatsugiri-stretchy': {
		dexId: 10259,
		types: ['dragon', 'water'],
		evs: {
			'special-attack': 2,
		},
		encounterOptions: [],
	},
	'squawkabilly-blue-plumage': {
		dexId: 10260,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'squawkabilly-yellow-plumage': {
		dexId: 10261,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'squawkabilly-white-plumage': {
		dexId: 10262,
		types: ['normal', 'flying'],
		evs: {
			attack: 1,
		},
		encounterOptions: [],
	},
	'gimmighoul-roaming': {
		dexId: 10263,
		types: ['ghost'],
		evs: {
			'special-attack': 1,
		},
		encounterOptions: [],
	},
	'koraidon-limited-build': {
		dexId: 10264,
		types: ['fighting', 'dragon'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'koraidon-sprinting-build': {
		dexId: 10265,
		types: ['fighting', 'dragon'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'koraidon-swimming-build': {
		dexId: 10266,
		types: ['fighting', 'dragon'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'koraidon-gliding-build': {
		dexId: 10267,
		types: ['fighting', 'dragon'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'miraidon-low-power-mode': {
		dexId: 10268,
		types: ['electric', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'miraidon-drive-mode': {
		dexId: 10269,
		types: ['electric', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'miraidon-aquatic-mode': {
		dexId: 10270,
		types: ['electric', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'miraidon-glide-mode': {
		dexId: 10271,
		types: ['electric', 'dragon'],
		evs: {
			'special-attack': 3,
		},
		encounterOptions: [],
	},
	'ursaluna-bloodmoon': {
		dexId: 10272,
		types: ['ground', 'normal'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'ogerpon-wellspring-mask': {
		dexId: 10273,
		types: ['grass', 'water'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'ogerpon-hearthflame-mask': {
		dexId: 10274,
		types: ['grass', 'fire'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'ogerpon-cornerstone-mask': {
		dexId: 10275,
		types: ['grass', 'rock'],
		evs: {
			attack: 3,
		},
		encounterOptions: [],
	},
	'terapagos-terastal': {
		dexId: 10276,
		types: ['normal'],
		evs: {
			defense: 2,
			'special-defense': 2,
		},
		encounterOptions: [],
	},
	'terapagos-stellar': {
		dexId: 10277,
		types: ['normal'],
		evs: {
			hp: 3,
		},
		encounterOptions: [],
	},
};
// console.log(
// 	Object.fromEntries(
// 		Object.entries(baseInternalDex).map(([key, value]) => [
// 			key,
// 			{
// 				dexId: value.dexId,
// 				types: value.types,
// 				evs: value.evs,
// 				encounterOptions: [],
// 			},
// 		])
// 	)
// );
