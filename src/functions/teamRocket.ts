import { MapId, mapsRecord } from '../constants/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { OverworldTrainer } from '../interfaces/OverworldMap';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import { getRandomEntry } from './filterTargets';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getRandomOrientation } from './getNextClockwiseDirection';
import { isPassable } from './isPassable';
import { makeChallengerPokemon } from './makeChallengerPokemon';

const rocketPokemon: { name: PokemonName; minXp: number; maxXp: number }[] = [
	{ name: 'rattata', minXp: 1000, maxXp: 8000 },
	{ name: 'grimer', minXp: 1000, maxXp: 8000 },
	{ name: 'houndour', minXp: 1000, maxXp: 8000 },
	{ name: 'meowth', minXp: 1000, maxXp: 8000 },
	{ name: 'koffing', minXp: 1000, maxXp: 8000 },
	{ name: 'zubat', minXp: 1000, maxXp: 8000 },
	{ name: 'drowzee', minXp: 1000, maxXp: 8000 },
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
	if (rangerLevel > 20) {
		return 6;
	}
	if (rangerLevel > 15) {
		return 5;
	}
	if (rangerLevel > 10) {
		return 4;
	}
	if (rangerLevel > 5) {
		return 3;
	}

	return 2;
};
const determineMinXp = (rangerLevel: number) => {
	if (rangerLevel > 30) {
		return 125000;
	}
	if (rangerLevel > 20) {
		return 64000;
	}
	if (rangerLevel > 15) {
		return 27000;
	}
	if (rangerLevel > 10) {
		return 8000;
	}
	if (rangerLevel > 5) {
		return 3000;
	}

	return 0;
};
const determineMaxXp = (rangerLevel: number) => {
	if (rangerLevel > 30) {
		return 12500000;
	}
	if (rangerLevel > 20) {
		return 125000;
	}
	if (rangerLevel > 15) {
		return 64000;
	}
	if (rangerLevel > 10) {
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
		return ['Lets battle'];
	}
	return ['I will squash you'];
};

export const createRocketOutbreak = (
	rangerLevel: number,
	mapId: MapId
): OverworldTrainer[] => {
	// const chosenNames = [...rocketNamesFemale, ...rocketNamesMale].filter(
	// 	() => Math.random() < 0.5
	// );
	const chosenNames = [rocketNamesFemale[0]];

	const getTeam = (): OverworldTrainer['team'] => {
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

	return chosenNames.map((name) => {
		const id = `Rocket Grunt ${name}`;
		const team = getTeam();
		const { x, y } = getPosition();
		const trainer: OverworldTrainer = {
			x,
			y,
			type: 'TRAINER',
			id,
			name: id,
			orientation: getRandomOrientation(),
			unhandledMessage: getRocketMessage(),
			team,
			battleTeamConfig: {
				assignLearnsetMoves: true,
				assignNaturalAbility: true,
				assignGender: true,
				generateIvs: true,
				assignHeldItem: true,
			},
			sprite: rocketNamesMale.includes(name)
				? SpriteEnum.rocketMale
				: SpriteEnum.rocketFemale,
			conditionFunction: () => true,
		};

		return trainer;
	});
};
