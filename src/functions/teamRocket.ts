import { MapId, mapsRecord } from '../constants/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { OverworldTrainer } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { SaveFile } from '../interfaces/SaveFile';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import { EmptyStatObject } from '../interfaces/StatObject';
import { getRandomEntry } from './filterTargets';
import { getHighestXpOnTeam } from './getHighestXpOnTeam';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getRandomOrientation } from './getNextClockwiseDirection';
import { isPassable } from './isPassable';
import { makeChallengerPokemon } from './makeChallengerPokemon';

const rocketPokemon: { name: PokemonName; minXp: number; maxXp: number }[] = [
	{ name: 'rattata', minXp: 1000, maxXp: 8000 },
	{ name: 'raticate', minXp: 8000, maxXp: 125000 },
	{ name: 'rattata-alola', minXp: 1000, maxXp: 8000 },
	{ name: 'raticate-alola', minXp: 8000, maxXp: 125000 },
	{ name: 'voltorb', minXp: 1000, maxXp: 8000 },
	{ name: 'electrode', minXp: 8000, maxXp: 125000 },
	{ name: 'exeggcute', minXp: 1000, maxXp: 8000 },
	{ name: 'exeggutor', minXp: 8000, maxXp: 125000 },
	{ name: 'tauros', minXp: 8000, maxXp: 125000 },
	{ name: 'magmar', minXp: 8000, maxXp: 125000 },
	{ name: 'electabuzz', minXp: 8000, maxXp: 125000 },
	{ name: 'grimer', minXp: 1000, maxXp: 8000 },
	{ name: 'muk', minXp: 8000, maxXp: 125000 },
	{ name: 'grimer-alola', minXp: 1000, maxXp: 8000 },
	{ name: 'muk-alola', minXp: 8000, maxXp: 125000 },
	{ name: 'houndour', minXp: 1000, maxXp: 8000 },
	{ name: 'houndoom', minXp: 8000, maxXp: 125000 },
	{ name: 'meowth', minXp: 1000, maxXp: 8000 },
	{ name: 'persian', minXp: 8000, maxXp: 125000 },
	{ name: 'meowth-alola', minXp: 1000, maxXp: 8000 },
	{ name: 'persian-alola', minXp: 8000, maxXp: 125000 },
	{ name: 'meowth-galar', minXp: 1000, maxXp: 8000 },
	{ name: 'perrserker', minXp: 8000, maxXp: 125000 },
	{ name: 'koffing', minXp: 1000, maxXp: 8000 },
	{ name: 'weezing', minXp: 1000, maxXp: 125000 },
	{ name: 'zubat', minXp: 1000, maxXp: 8000 },
	{ name: 'golbat', minXp: 8000, maxXp: 64000 },
	{ name: 'crobat', minXp: 8000, maxXp: 125000 },
	{ name: 'drowzee', minXp: 1000, maxXp: 8000 },
	{ name: 'hypno', minXp: 8000, maxXp: 125000 },
	{ name: 'venonat', minXp: 1000, maxXp: 8000 },
	{ name: 'venomoth', minXp: 8000, maxXp: 125000 },
	{ name: 'murkrow', minXp: 1000, maxXp: 8000 },
	{ name: 'honchkrow', minXp: 8000, maxXp: 125000 },
	{ name: 'sneasel', minXp: 1000, maxXp: 125000 },
	{ name: 'weavile', minXp: 27000, maxXp: 125000 },
	{ name: 'gyarados', minXp: 27000, maxXp: 125000 },
	{ name: 'magmortar', minXp: 27000, maxXp: 125000 },
	{ name: 'electivire', minXp: 27000, maxXp: 125000 },
	{ name: 'primeape', minXp: 8000, maxXp: 125000 },
	{ name: 'mankey', minXp: 1000, maxXp: 8000 },
];

const rocketNamesMale = [
	'Chad',
	'Brad',
	'Cliff',
	'Cleetus',
	'Raphael',
	'Maurice',
	'Boris',
	'Justin',
	'Earnest',
];
const rocketNamesFemale = [
	'Jessica',
	'Dolores',
	'Jennifer',
	'April',
	'Agnes',
	'Agatha',
	'Myriel',
	'Lisa',
	'Britney',
	'Alicia',
];

const determineNumberOfMembers = (rangerLevel: number) => {
	if (rangerLevel > 15) {
		return 6;
	}
	if (rangerLevel > 10) {
		return 5;
	}
	if (rangerLevel > 5) {
		return 4;
	}
	if (rangerLevel > 3) {
		return 3;
	}

	return 2;
};
const determineMinXp = (rangerLevel: number) => {
	if (rangerLevel > 15) {
		return 125000;
	}
	if (rangerLevel > 10) {
		return 64000;
	}
	if (rangerLevel > 5) {
		return 8000;
	}
	if (rangerLevel > 3) {
		return 3000;
	}

	return 0;
};
const determineMaxXp = (rangerLevel: number) => {
	if (rangerLevel > 15) {
		return 1250000;
	}
	if (rangerLevel > 10) {
		return 125000;
	}
	if (rangerLevel > 5) {
		return 27000;
	}

	return 8000;
};

const getRocketMessage = (): string[] => {
	const r = Math.random();

	if (r > 0.9) {
		return ['Dont get in our way'];
	}
	if (r > 0.8) {
		return ['Piss Off, Nerd'];
	}
	if (r > 0.7) {
		return ['Oooh no, a ranger', 'Pwease dont hurt me'];
	}
	if (r > 0.6) {
		return ['Just wait till the boss gets here'];
	}
	if (r > 0.5) {
		return ['We hurt Pokemon for fun'];
	}
	if (r > 0.4) {
		return ['You are so annoying'];
	}
	if (r > 0.3) {
		return ['Leave, if you know whats good for you'];
	}
	if (r > 0.2) {
		return ['Team Rocket, faster than light'];
	}
	if (r > 0.2) {
		return ['You little Runt'];
	}
	if (r > 0.1) {
		return [
			'We are hardened Crimninals',
			'But if you defeat our pokemon',
			'We will stop ;)',
		];
	}
	return ['I will squash you'];
};

const getChadTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = getHighestXpOnTeam(s.pokemon);

	return [
		makeChallengerPokemon({
			xp,
			name: 'annihilape',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'granbull',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'honchkrow',
			effortValues: { ...EmptyStatObject, 'special-attack': 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'arbok',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'muk',
			effortValues: {
				...EmptyStatObject,
				defense: 252,
				'special-defense': 252,
			},
		}),
		makeChallengerPokemon({
			xp,
			name: 'weavile',
			effortValues: {
				...EmptyStatObject,
				attack: 252,
				speed: 252,
			},
		}),
	];
};
const getHillaryTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = getHighestXpOnTeam(s.pokemon);

	return [
		makeChallengerPokemon({
			xp,
			name: 'purugly',
			effortValues: { ...EmptyStatObject, attack: 252, defense: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'rapidash',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'persian',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'weezing',
			effortValues: { ...EmptyStatObject, attack: 252 },
		}),
		makeChallengerPokemon({
			xp,
			name: 'gengar',
			effortValues: {
				...EmptyStatObject,
				attack: 252,
				speed: 252,
			},
		}),
		makeChallengerPokemon({
			xp,
			name: 'jynx',
			effortValues: {
				...EmptyStatObject,
				defense: 252,
				'special-attack': 252,
			},
		}),
	];
};

export const createRocketOutbreak = (
	rangerLevel: number,
	mapId: MapId,
	warden: boolean
): OverworldTrainer[] => {
	const chosenNames = [...rocketNamesFemale, ...rocketNamesMale].filter(
		() => Math.random() < 0.5
	);

	const getTeam = (s: SaveFile): OwnedPokemon[] => {
		if (!s.campUpgrades['ranger certification']) {
			return [makeChallengerPokemon({})];
		}
		const numberOfMembers = determineNumberOfMembers(rangerLevel);
		const minXp = determineMinXp(rangerLevel);
		const maxXp = determineMaxXp(rangerLevel);
		const availableMons = rocketPokemon.filter(
			(r) => r.minXp >= minXp && r.maxXp <= maxXp
		);

		return Array.from({ length: numberOfMembers }).map(() => {
			const mon = getRandomEntry(availableMons);

			return makeChallengerPokemon({
				name: mon.name,
				xp: getMiddleOfThree([
					mon.minXp,
					mon.maxXp,
					Math.floor(mon.maxXp * Math.random()),
				]),
			});
		});
	};

	const OverworldMap = mapsRecord[mapId];

	const getPosition = (): { x: number; y: number } => {
		const y = Math.floor(Math.random() * OverworldMap.tileMap.baseLayer.length);
		const x = Math.floor(
			Math.random() * OverworldMap.tileMap.baseLayer[0].length
		);

		if (!isPassable({ x, y }, OverworldMap, OverworldMap.occupants, false)) {
			return getPosition();
		}
		return { y, x };
	};

	const res = chosenNames.map((name) => {
		const id = `Rocket Grunt ${name}`;

		const { x, y } = getPosition();
		const trainer: OverworldTrainer = {
			x,
			y,
			type: 'TRAINER',
			id,
			orientation: getRandomOrientation(),
			unhandledMessage: getRocketMessage(),
			team: (s) => getTeam(s),
			battleTeamConfig: {
				assignLearnsetMoves: true,
				assignNaturalAbility: true,
				assignGender: true,
				assignHeldItem: true,
			},
			sprite: rocketNamesMale.includes(name)
				? SpriteEnum.rocketMale
				: SpriteEnum.rocketFemale,
			conditionFunction: () => true,
		};

		return trainer;
	});

	if (warden) {
		const chadId = `Rocket Admin Chad`;
		const hillaryId = `Rocket Admin Hillary`;

		const { x, y } = getPosition();

		const chad: OverworldTrainer = {
			x,
			y,
			type: 'TRAINER',
			id: chadId,
			orientation: getRandomOrientation(),
			unhandledMessage: getRocketMessage(),
			team: (s) => getChadTeam(s),
			battleTeamConfig: {
				assignLearnsetMoves: true,
				assignNaturalAbility: true,
				assignGender: true,
				assignHeldItem: true,
			},
			sprite: SpriteEnum.rocketAdminMale,
			conditionFunction: () => true,
		};
		const hillary: OverworldTrainer = {
			x,
			y,
			type: 'TRAINER',
			id: hillaryId,
			orientation: getRandomOrientation(),
			unhandledMessage: getRocketMessage(),
			team: (s) => getHillaryTeam(s),
			battleTeamConfig: {
				assignLearnsetMoves: true,
				assignNaturalAbility: true,
				assignGender: true,
				assignHeldItem: true,
			},
			sprite: SpriteEnum.rocketAdminFemale,
			conditionFunction: () => true,
		};
		if (Math.random() > 0.5) {
			res.push(chad);
		} else res.push(hillary);
	}

	return res;
};
