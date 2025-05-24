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

export const cynthiaId = 'champion cynthia';
const cynthiaTeam = (s: SaveFile): OwnedPokemon[] => {
	const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);

	const gible = makeChallengerPokemon({
		name: 'gible',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'sand-stream',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'soft-sand',
		firstMove: { name: 'dig', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		thirdMove: { name: 'bite', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const gabite = makeChallengerPokemon({
		name: 'gabite',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'sand-stream',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'soft-sand',
		firstMove: { name: 'dig', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		thirdMove: { name: 'bite', usedPP: 0 },
		fourthMove: { name: 'dragon-dance', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const garchomp = makeChallengerPokemon({
		name: 'garchomp',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'sand-stream',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'soft-sand',
		firstMove: { name: 'dig', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		thirdMove: { name: 'bite', usedPP: 0 },
		fourthMove: { name: 'dragon-dance', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const riolu = makeChallengerPokemon({
		name: 'riolu',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-belt',
		firstMove: { name: 'mach-punch', usedPP: 0 },
		secondMove: { name: 'bullet-punch', usedPP: 0 },
		thirdMove: { name: 'work-up', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			defense: 252,
		},
	});
	const lucario = makeChallengerPokemon({
		name: 'lucario',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'mega-launcher',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-belt',
		firstMove: { name: 'dragon-pulse', usedPP: 0 },
		secondMove: { name: 'dark-pulse', usedPP: 0 },
		thirdMove: { name: 'calm-mind', usedPP: 0 },
		fourthMove: { name: 'aura-sphere', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			defense: 252,
		},
	});
	const togepi = makeChallengerPokemon({
		name: 'togepi',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'hospitality',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'charm', usedPP: 0 },
		secondMove: { name: 'sweet-kiss', usedPP: 0 },
		thirdMove: { name: 'fairy-wind', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	});
	const togetic = makeChallengerPokemon({
		name: 'togetic',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'hospitality',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'charm', usedPP: 0 },
		secondMove: { name: 'cosmic-power', usedPP: 0 },
		thirdMove: { name: 'fairy-wind', usedPP: 0 },
		fourthMove: { name: 'aeroblast', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	});
	const togekiss = makeChallengerPokemon({
		name: 'togekiss',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'hospitality',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'charm', usedPP: 0 },
		secondMove: { name: 'cosmic-power', usedPP: 0 },
		thirdMove: { name: 'fairy-wind', usedPP: 0 },
		fourthMove: { name: 'aeroblast', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	});
	const spiritomb = makeChallengerPokemon({
		name: 'spiritomb',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'unnerve',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'shadow-sneak', usedPP: 0 },
		secondMove: { name: 'calm-mind', usedPP: 0 },
		thirdMove: { name: 'dark-pulse', usedPP: 0 },
		fourthMove: { name: 'shadow-ball', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	});
	const roserade = makeChallengerPokemon({
		name: 'roserade',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'poison-point',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-sludge',
		firstMove: { name: 'giga-drain', usedPP: 0 },
		secondMove: { name: 'calm-mind', usedPP: 0 },
		thirdMove: { name: 'sludge-bomb', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			'special-attack': 252,
		},
	});
	const gastrodon = makeChallengerPokemon({
		name: 'gastrodon',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'water-absorb',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'earth-power', usedPP: 0 },
		secondMove: { name: 'amnesia', usedPP: 0 },
		thirdMove: { name: 'surf', usedPP: 0 },
		fourthMove: { name: 'ice-beam', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			'special-attack': 252,
		},
	});

	if (highestXpOnTeam < 8000) {
		return [gible, riolu, togepi];
	}
	if (highestXpOnTeam < 46656) {
		return [gabite, riolu, togetic, spiritomb];
	}

	const team: OwnedPokemon[] = [
		garchomp,
		lucario,
		togekiss,
		spiritomb,
		roserade,
		gastrodon,
	];

	return team;
};

const cynthia: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/b/b1/VSCynthia.png',
	type: 'TRAINER',
	x: 0,
	y: 0,
	id: cynthiaId,
	conditionFunction: (s) => !s.handledOccupants.some((h) => h.id === cynthiaId),
	orientation: 'DOWN',
	sprite: SpriteEnum.cynthia,
	unhandledMessage: [
		'Its always nice to meet aspiring trainers',
		'lets see how strong you have grown',
	],
	team: cynthiaTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};

export const cynthiaN1: Occupant = {
	...cynthia,
	x: 43,
	y: 23,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== cynthiaId) && isThursday(),
};
export const cynthiaN1E1: Occupant = {
	...cynthia,
	x: 30,
	y: 46,
	orientation: 'RIGHT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== cynthiaId) && isFriday(),
};
export const cynthiaE1: Occupant = {
	...cynthia,
	x: 25,
	y: 29,
	orientation: 'RIGHT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== cynthiaId) && isSaturday(),
};
export const cynthiaS1E1: Occupant = {
	...cynthia,
	x: 12,
	y: 42,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== cynthiaId) && isSunday(),
};
export const cynthiaS1: Occupant = {
	...cynthia,
	x: 25,
	y: 20,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== cynthiaId) && isMonday(),
};
export const cynthiaS1W1: Occupant = {
	...cynthia,
	x: 10,
	y: 45,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== cynthiaId) && isTuesday(),
};
export const cynthiaN1W1: Occupant = {
	...cynthia,
	x: 23,
	y: 40,
	orientation: 'RIGHT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== cynthiaId) && isWednesday(),
};
