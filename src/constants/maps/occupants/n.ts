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

export const nId = 'trainer n';
const nTeam = (s: SaveFile): OwnedPokemon[] => {
	const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);

	const zorua = makeChallengerPokemon({
		name: 'zorua',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'dark-aura',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-glasses',
		firstMove: { name: 'bite', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const zoroark = makeChallengerPokemon({
		name: 'zoroark',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'dark-aura',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-glasses',
		firstMove: { name: 'night-slash', usedPP: 0 },
		secondMove: { name: 'swords-dance', usedPP: 0 },
		thirdMove: { name: 'slash', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const sandile = makeChallengerPokemon({
		name: 'sandile',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'strong-jaw',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-glasses',
		firstMove: { name: 'bite', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const krokorok = makeChallengerPokemon({
		name: 'krokorok',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'strong-jaw',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'crunch', usedPP: 0 },
		secondMove: { name: 'dig', usedPP: 0 },
		thirdMove: { name: 'ice-fang', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const krookodile = makeChallengerPokemon({
		name: 'krookodile',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'strong-jaw',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'crunch', usedPP: 0 },
		secondMove: { name: 'dig', usedPP: 0 },
		thirdMove: { name: 'ice-fang', usedPP: 0 },
		fourthMove: { name: 'thunder-fang', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const darumaka = makeChallengerPokemon({
		name: 'darumaka',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'drought',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'choice-band',
		firstMove: { name: 'flame-wheel', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const darmanitan = makeChallengerPokemon({
		name: 'darmanitan-standard',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'drought',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'choice-band',
		firstMove: { name: 'double-edge', usedPP: 0 },
		secondMove: { name: 'flare-blitz', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const scrafty = makeChallengerPokemon({
		name: 'darmanitan-standard',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'inner-focus',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'low-kick', usedPP: 0 },
		secondMove: { name: 'dizzy-punch', usedPP: 0 },
		thirdMove: { name: 'bullet-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const sigilyph = makeChallengerPokemon({
		name: 'sigilyph',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'tinted-lens',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'cosmic-power', usedPP: 0 },
		secondMove: { name: 'aeroblast', usedPP: 0 },
		thirdMove: { name: 'psychic', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			'special-defense': 252,
		},
	});
	const ferrothorn = makeChallengerPokemon({
		name: 'ferrothorn',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'technician',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'cosmic-power', usedPP: 0 },
		secondMove: { name: 'bullet-punch', usedPP: 0 },
		thirdMove: { name: 'razor-leaf', usedPP: 0 },
		fourthMove: { name: 'ingrain', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			'special-defense': 252,
		},
	});

	if (highestXpOnTeam < 8000) {
		return [zorua, sandile, darumaka];
	}
	if (highestXpOnTeam < 46656) {
		return [zoroark, krokorok, darumaka];
	}

	const team: OwnedPokemon[] = [
		zoroark,
		krookodile,
		darmanitan,
		scrafty,
		sigilyph,
		ferrothorn,
	];

	return team;
};

const n: OverworldTrainer = {
	type: 'TRAINER',
	x: 0,
	y: 0,
	id: nId,
	conditionFunction: (s) => !s.handledOccupants.some((h) => h.id === nId),
	orientation: 'DOWN',
	sprite: SpriteEnum.n,
	unhandledMessage: ['Do you treat your pokemon well?'],
	team: nTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};

export const nN1: Occupant = {
	...n,
	x: 18,
	y: 25,
	orientation: 'LEFT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== nId) && isThursday(),
};
export const nN1E1: Occupant = {
	...n,
	x: 10,
	y: 33,
	orientation: 'LEFT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== nId) && isFriday(),
};
export const nE1: Occupant = {
	...n,
	x: 35,
	y: 3,
	orientation: 'LEFT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== nId) && isSaturday(),
};
export const nS1E1: Occupant = {
	...n,
	x: 47,
	orientation: 'LEFT',
	y: 40,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== nId) && isSunday(),
};
export const nS1: Occupant = {
	...n,
	x: 38,
	y: 22,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== nId) && isMonday(),
};
export const nS1W1: Occupant = {
	...n,
	x: 39,
	y: 28,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== nId) && isTuesday(),
};
export const nN1W1: Occupant = {
	...n,
	x: 34,
	y: 1,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== nId) && isWednesday(),
};
