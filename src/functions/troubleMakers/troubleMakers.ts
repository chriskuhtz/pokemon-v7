import { MapId, mapsRecord } from '../../constants/maps/mapsRecord';
import { PokemonName } from '../../constants/pokemonNames';
import { OverworldTrainer } from '../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { EvilTeam, SaveFile } from '../../interfaces/SaveFile';
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
	getAquaAliyaTeam,
	getAquaArnoldTeam,
	getAquaMessage,
} from './aqua';
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
	rangerLevel: number,
	mapId: MapId,
	warden: boolean,
	affiliation: EvilTeam
): OverworldTrainer[] => {
	if (affiliation === 'aqua') {
		return createTroubleMakers(
			rangerLevel,
			mapId,
			warden,
			affiliation,
			aquaNamesMale,
			aquaNamesFemale,
			aquaPokemon
		);
	}
	return createTroubleMakers(
		rangerLevel,
		mapId,
		warden,
		affiliation,
		rocketNamesMale,
		rocketNamesFemale,
		rocketPokemon
	);
};

const createAdmin = (
	affiliation: EvilTeam,
	pos: { x: number; y: number }
): OverworldTrainer => {
	const { x, y } = pos;

	if (affiliation === 'aqua') {
		const arnold: OverworldTrainer = {
			x,
			y,
			type: 'TRAINER',
			id: `Aqua Admin Arnold`,
			orientation: getRandomOrientation(),
			unhandledMessage: getAquaMessage(),
			team: (s) => getAquaArnoldTeam(s),
			battleTeamConfig: {
				assignLearnsetMoves: true,
				assignNaturalAbility: true,
				assignGender: true,
				assignHeldItem: true,
			},
			sprite: SpriteEnum.rocketAdminMale,
			conditionFunction: () => true,
		};
		const aliya: OverworldTrainer = {
			x,
			y,
			type: 'TRAINER',
			id: `Aqua Admin Aliya`,
			orientation: getRandomOrientation(),
			unhandledMessage: getAquaMessage(),
			team: (s) => getAquaAliyaTeam(s),
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
			return arnold;
		} else return aliya;
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

const createTroubleMakers = (
	rangerLevel: number,
	mapId: MapId,
	warden: boolean,
	affiliation: EvilTeam,
	namesMale: string[],
	namesFemale: string[],
	pokemon: {
		name: PokemonName;
		minXp: number;
		maxXp: number;
	}[]
): OverworldTrainer[] => {
	const chosenNames = [...namesFemale, ...namesMale].filter(
		() => Math.random() < 0.5
	);

	const getTeam = (s: SaveFile): OwnedPokemon[] => {
		if (!s.campUpgrades['ranger certification']) {
			return [makeChallengerPokemon({})];
		}
		const numberOfMembers = determineNumberOfMembers(rangerLevel);
		const minXp = determineMinXp(rangerLevel);
		const maxXp = determineMaxXp(rangerLevel);
		const availableMons = pokemon.filter(
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
		res.push(createAdmin(affiliation, getPosition()));
	}

	return res;
};
