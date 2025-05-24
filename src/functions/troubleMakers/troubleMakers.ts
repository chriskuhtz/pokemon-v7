import { MapId, mapsRecord } from '../../constants/maps/mapsRecord';
import { OverworldTrainer } from '../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import {
	EvilTeam,
	OverworldTrainerStump,
	SaveFile,
} from '../../interfaces/SaveFile';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { getRandomEntry } from '../filterTargets';
import { getMiddleOfThree } from '../getMiddleOfThree';
import { getRandomOrientation } from '../getNextClockwiseDirection';
import { isPassable } from '../isPassable';
import { makeChallengerPokemon } from '../makeChallengerPokemon';
import {
	aquaNamesFemale,
	aquaNamesMale,
	aquaPokemon,
	getAquaArchieTeam,
} from './aqua';
import {
	getMagmaMaxieTeam,
	magmaNamesFemale,
	magmaNamesMale,
	magmaPokemon,
} from './magma';
import {
	getRocketChadTeam,
	getRocketHillaryTeam,
	getRocketMessage,
	rocketNamesFemale,
	rocketNamesMale,
	rocketPokemon,
} from './rocket';

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

export const makeTroubleMakers = (
	mapId: MapId,
	warden: boolean,
	affiliation: EvilTeam
): OverworldTrainerStump[] => {
	if (affiliation === 'aqua') {
		return createTroubleMakers(
			mapId,
			warden,
			affiliation,
			aquaNamesMale,
			aquaNamesFemale
		);
	}
	if (affiliation === 'magma') {
		return createTroubleMakers(
			mapId,
			warden,
			affiliation,
			magmaNamesMale,
			magmaNamesFemale
		);
	}
	return createTroubleMakers(
		mapId,
		warden,
		affiliation,
		rocketNamesMale,
		rocketNamesFemale
	);
};

export const createAdmin = (
	affiliation: EvilTeam,
	pos: { x: number; y: number }
): OverworldTrainer => {
	const { x, y } = pos;

	if (affiliation === 'aqua') {
		return {
			x,
			y,
			type: 'TRAINER',
			id: `Aqua Boss Archie`,
			orientation: getRandomOrientation(),
			unhandledMessage: [
				'We shall flood the whole world',
				'Then my beloved water pokemon',
				'will have all the space they need',
				'Isnt that a noble goal?',
			],
			team: (s) => getAquaArchieTeam(s),
			battleTeamConfig: {
				assignLearnsetMoves: true,
				assignNaturalAbility: true,
				assignGender: true,
				assignHeldItem: true,
			},
			sprite: SpriteEnum.archie,
			conditionFunction: () => true,
		};
	}
	if (affiliation === 'magma') {
		return {
			x,
			y,
			type: 'TRAINER',
			id: `Magma Boss Maxie`,
			orientation: getRandomOrientation(),
			unhandledMessage: [
				'If we remove the oceans',
				'The Pokemon will be free to roam',
				'Isnt that a noble goal?',
			],
			team: (s) => getMagmaMaxieTeam(s),
			battleTeamConfig: {
				assignLearnsetMoves: true,
				assignNaturalAbility: true,
				assignGender: true,
				assignHeldItem: true,
			},
			sprite: SpriteEnum.archie,
			conditionFunction: () => true,
		};
	}
	const chad: OverworldTrainer = {
		x,
		y,
		type: 'TRAINER',
		id: `Rocket Admin Chad`,
		orientation: getRandomOrientation(),
		unhandledMessage: getRocketMessage(),
		team: (s) => getRocketChadTeam(s),
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
		id: `Rocket Admin Hillary`,
		orientation: getRandomOrientation(),
		unhandledMessage: getRocketMessage(),
		team: (s) => getRocketHillaryTeam(s),
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
		return chad;
	} else return hillary;
};

export const getTroubleMakerTeam = (s: SaveFile): OwnedPokemon[] => {
	if (!s.campUpgrades['ranger certification']) {
		return [makeChallengerPokemon({})];
	}
	const rangerLevel = s.rangerLevel ?? 0;
	const pokemon = () => {
		if (s.troubleMakers?.affiliation === 'magma') {
			return magmaPokemon;
		}
		if (s.troubleMakers?.affiliation === 'aqua') {
			return aquaPokemon;
		}

		return rocketPokemon;
	};
	const numberOfMembers = determineNumberOfMembers(rangerLevel);
	const minXp = determineMinXp(rangerLevel);
	const maxXp = determineMaxXp(rangerLevel);
	const availableMons = pokemon().filter(
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

const createTroubleMakers = (
	mapId: MapId,
	warden: boolean,
	affiliation: EvilTeam,
	namesMale: string[],
	namesFemale: string[]
): OverworldTrainerStump[] => {
	const chosenNames = [...namesFemale, ...namesMale].filter(
		() => Math.random() < 0.5
	);

	const OverworldMap = mapsRecord[mapId];

	const getPosition = (): { x: number; y: number } => {
		const y = Math.floor(Math.random() * OverworldMap.tileMap.baseLayer.length);
		const x = Math.floor(
			Math.random() * OverworldMap.tileMap.baseLayer[0].length
		);

		if (
			!isPassable({ x, y }, OverworldMap, OverworldMap.occupants, false, false)
		) {
			return getPosition();
		}
		return { y, x };
	};

	const res = chosenNames.map((name) => {
		const id = `${affiliation} Grunt ${name}`;

		const { x, y } = getPosition();

		const sprite = () => {
			if (affiliation === 'aqua' || affiliation === 'magma') {
				if (namesMale.includes(name)) {
					return SpriteEnum.aquaMagma;
				} else return SpriteEnum.aquaMagmaFemale;
			}
			if (affiliation === 'galactic') {
				if (namesMale.includes(name)) {
					return SpriteEnum.galacticMale;
				} else return SpriteEnum.galacticFemale;
			}
			if (namesMale.includes(name)) {
				return SpriteEnum.rocketMale;
			} else return SpriteEnum.rocketFemale;
		};
		const trainer: OverworldTrainerStump = {
			x,
			y,
			type: 'TRAINER',
			id,
			orientation: getRandomOrientation(),
			unhandledMessage: getRocketMessage(),
			battleTeamConfig: {
				assignLearnsetMoves: true,
				assignNaturalAbility: true,
				assignGender: true,
				assignHeldItem: true,
			},
			sprite: sprite(),
		};

		return trainer;
	});

	if (warden) {
		res.push(createAdmin(affiliation, getPosition()));
	}

	return res;
};
