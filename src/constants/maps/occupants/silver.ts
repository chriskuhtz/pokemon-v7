import { getRandomEntry } from '../../../functions/filterTargets';
import { getHighestXpOnTeam } from '../../../functions/getHighestXpOnTeam';
import {
	isFriday,
	isMonday,
	isSaturday,
	isSunday,
	isThursday,
	isTuesday,
	isWednesday,
} from '../../../functions/isXDay';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { Occupant, OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../interfaces/StatObject';

export const silverId = 'trainer silver';
const silverTeam = (s: SaveFile): OwnedPokemon[] => {
	const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);

	const totodile = makeChallengerPokemon({
		name: 'totodile',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'strong-jaw',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'bulk-up', usedPP: 0 },
		secondMove: { name: 'bite', usedPP: 0 },
		thirdMove: { name: 'ice-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const croconaw = makeChallengerPokemon({
		name: 'croconaw',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'moxie',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'bulk-up', usedPP: 0 },
		secondMove: { name: 'bite', usedPP: 0 },
		thirdMove: { name: 'ice-fang', usedPP: 0 },
		fourthMove: { name: 'waterfall', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const feraligatr = makeChallengerPokemon({
		name: 'feraligatr',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'moxie',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'bulk-up', usedPP: 0 },
		secondMove: { name: 'crunch', usedPP: 0 },
		thirdMove: { name: 'ice-fang', usedPP: 0 },
		fourthMove: { name: 'waterfall', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const hoothoot = makeChallengerPokemon({
		name: 'hoothoot',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'big-pecks',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sharp-beak',
		firstMove: { name: 'aerial-ace', usedPP: 0 },
		secondMove: { name: 'quick-attack', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const noctowl = makeChallengerPokemon({
		name: 'noctowl',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'battle-armor',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sharp-beak',
		firstMove: { name: 'psychic', usedPP: 0 },
		secondMove: { name: 'feint-attack', usedPP: 0 },
		thirdMove: { name: 'aeroblast', usedPP: 0 },
		fourthMove: { name: 'calm-mind', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			'special-defense': 252,
		},
	});
	const tyrogue = makeChallengerPokemon({
		name: 'tyrogue',
		xp: highestXpOnTeam,
		nature: 'bold',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-belt',
		firstMove: { name: 'mach-punch', usedPP: 0 },
		secondMove: { name: 'bulk-up', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			attack: 252,
		},
	});
	const hitmontop = makeChallengerPokemon({
		name: 'hitmontop',
		xp: highestXpOnTeam,
		nature: 'bold',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-belt',
		firstMove: { name: 'mach-punch', usedPP: 0 },
		secondMove: { name: 'bulk-up', usedPP: 0 },
		thirdMove: { name: 'shadow-punch', usedPP: 0 },
		fourthMove: { name: 'drain-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			attack: 252,
		},
	});
	const flaaffy = makeChallengerPokemon({
		name: 'flaaffy',
		xp: highestXpOnTeam,
		nature: 'lonely',
		ability: 'cotton-down',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'magnet',
		firstMove: { name: 'shock-wave', usedPP: 0 },
		secondMove: { name: 'tail-glow', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			defense: 252,
		},
	});
	const ampharos = makeChallengerPokemon({
		name: 'ampharos',
		xp: highestXpOnTeam,
		nature: 'lonely',
		ability: 'cotton-down',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'magnet',
		firstMove: { name: 'thunderbolt', usedPP: 0 },
		secondMove: { name: 'tail-glow', usedPP: 0 },
		thirdMove: { name: 'dragon-pulse', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			defense: 252,
		},
	});
	const houndoom = makeChallengerPokemon({
		name: 'houndoom',
		xp: highestXpOnTeam,
		nature: 'lonely',
		ability: 'dark-aura',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-glasses',
		firstMove: { name: 'flamethrower', usedPP: 0 },
		secondMove: { name: 'dark-pulse', usedPP: 0 },
		thirdMove: { name: 'crunch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			attack: 252,
		},
	});
	const tyranitar = makeChallengerPokemon({
		name: 'tyranitar',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'intimidate',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-glasses',
		firstMove: { name: 'rock-slide', usedPP: 0 },
		secondMove: { name: 'bulk-up', usedPP: 0 },
		thirdMove: { name: 'crunch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			attack: 252,
		},
	});
	const espeon = makeChallengerPokemon({
		name: 'espeon',
		xp: highestXpOnTeam,
		nature: 'mild',
		ability: 'synchronize',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'twisted-spoon',
		firstMove: { name: 'psychic', usedPP: 0 },
		secondMove: { name: 'calm-mind', usedPP: 0 },
		thirdMove: { name: 'recover', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	});
	const meganium = makeChallengerPokemon({
		name: 'meganium',
		xp: highestXpOnTeam,
		nature: 'mild',
		ability: 'overgrow',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'big-root',
		firstMove: { name: 'magical-leaf', usedPP: 0 },
		secondMove: { name: 'calm-mind', usedPP: 0 },
		thirdMove: { name: 'recover', usedPP: 0 },
		fourthMove: { name: 'ingrain', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	});
	const typhlosion = makeChallengerPokemon({
		name: 'typhlosion',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'flame-body',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'life-orb',
		firstMove: { name: 'flare-blitz', usedPP: 0 },
		secondMove: { name: 'body-slam', usedPP: 0 },
		thirdMove: { name: 'volt-tackle', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			defense: 252,
		},
	});
	const skarmory = makeChallengerPokemon({
		name: 'skarmory',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'hustle',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'aerial-ace', usedPP: 0 },
		secondMove: { name: 'swift', usedPP: 0 },
		thirdMove: { name: 'steel-wing', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});

	if (highestXpOnTeam < 8000) {
		return [totodile, tyrogue, hoothoot];
	}
	if (highestXpOnTeam < 46656) {
		return [croconaw, noctowl, flaaffy, tyrogue];
	}

	const possibilities = [
		ampharos,
		hitmontop,
		noctowl,
		feraligatr,
		houndoom,
		tyranitar,
		espeon,
		meganium,
		typhlosion,
		skarmory,
	];
	const team: OwnedPokemon[] = [];

	const numberOfMembers = () => {
		if (highestXpOnTeam < 50 * 50 * 50) {
			return 3;
		}
		if (highestXpOnTeam < 60 * 60 * 60) {
			return 4;
		}
		if (highestXpOnTeam < 70 * 70 * 70) {
			return 5;
		}

		return 6;
	};
	for (let i = 0; i < numberOfMembers(); i++) {
		team.push(
			getRandomEntry(
				possibilities.filter((p) => team.every((t) => t.name !== p.name))
			)
		);
	}

	return team;
};

const silver: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/b/b6/VSSilver.png',
	type: 'TRAINER',
	x: 0,
	y: 0,
	id: silverId,
	conditionFunction: () => true,
	orientation: 'DOWN',
	sprite: SpriteEnum.silver,
	unhandledMessage: ['hmppf', 'do you even have strong pokemon?'],
	team: silverTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};

export const silverN1: Occupant = {
	...silver,
	x: 39,
	y: 40,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== silverId) && isTuesday(),
};
export const silverN1E1: Occupant = {
	...silver,
	x: 47,
	y: 2,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== silverId) && isWednesday(),
};
export const silverE1: Occupant = {
	...silver,
	x: 32,
	y: 23,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== silverId) && isThursday(),
};
export const silverS1E1: Occupant = {
	...silver,
	x: 17,
	y: 10,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== silverId) && isFriday(),
};
export const silverS1: Occupant = {
	...silver,
	x: 10,
	y: 1,
	orientation: 'RIGHT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== silverId) && isSaturday(),
};
export const silverS1W1: Occupant = {
	...silver,
	x: 31,
	y: 40,
	orientation: 'RIGHT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== silverId) && isSunday(),
};
export const silverN1W1: Occupant = {
	...silver,
	x: 26,
	y: 46,
	orientation: 'LEFT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== silverId) && isMonday(),
};
