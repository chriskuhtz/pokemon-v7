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

export const hughId = 'trainer hugh';
const hughTeam = (s: SaveFile): OwnedPokemon[] => {
	const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);

	const tepig = makeChallengerPokemon({
		name: 'tepig',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'blaze',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'charcoal',
		firstMove: { name: 'flame-wheel', usedPP: 0 },
		secondMove: { name: 'stomp', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const pignite = makeChallengerPokemon({
		name: 'pignite',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'blaze',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'charcoal',
		firstMove: { name: 'flame-wheel', usedPP: 0 },
		secondMove: { name: 'stomp', usedPP: 0 },
		thirdMove: { name: 'bulk-up', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const emboar = makeChallengerPokemon({
		name: 'emboar',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'blaze',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'charcoal',
		firstMove: { name: 'flame-wheel', usedPP: 0 },
		secondMove: { name: 'earthquake', usedPP: 0 },
		thirdMove: { name: 'bulk-up', usedPP: 0 },
		fourthMove: { name: 'cross-chop', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const rufflet = makeChallengerPokemon({
		name: 'rufflet',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'sniper',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sharp-beak',
		firstMove: { name: 'aerial-ace', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const braviary = makeChallengerPokemon({
		name: 'braviary',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'sniper',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sharp-beak',
		firstMove: { name: 'aerial-ace', usedPP: 0 },
		secondMove: { name: 'bulk-up', usedPP: 0 },
		thirdMove: { name: 'shadow-claw', usedPP: 0 },
		fourthMove: { name: 'body-slam', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const axew = makeChallengerPokemon({
		name: 'axew',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'inner-focus',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'dragon-dance', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const fraxure = makeChallengerPokemon({
		name: 'fraxure',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'inner-focus',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'dragon-dance', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		thirdMove: { name: 'shadow-claw', usedPP: 0 },
		fourthMove: { name: 'night-slash', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const haxorus = makeChallengerPokemon({
		name: 'haxorus',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'inner-focus',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'dragon-dance', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		thirdMove: { name: 'shadow-claw', usedPP: 0 },
		fourthMove: { name: 'night-slash', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const golett = makeChallengerPokemon({
		name: 'golett',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'ghost-gem',
		firstMove: { name: 'shadow-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const golurk = makeChallengerPokemon({
		name: 'golurk',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'ghost-gem',
		firstMove: { name: 'shadow-punch', usedPP: 0 },
		secondMove: { name: 'thunder-punch', usedPP: 0 },
		thirdMove: { name: 'fire-punch', usedPP: 0 },
		fourthMove: { name: 'ice-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const gothitelle = makeChallengerPokemon({
		name: 'gothitelle',
		xp: highestXpOnTeam,
		nature: 'sassy',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'light-clay',
		firstMove: { name: 'reflect', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'psychic', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	});
	const scolipede = makeChallengerPokemon({
		name: 'scolipede',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'supreme-overlord',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'silver-powder',
		firstMove: { name: 'slash', usedPP: 0 },
		secondMove: { name: 'bug-bite', usedPP: 0 },
		thirdMove: { name: 'cross-poison', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});

	if (highestXpOnTeam < 8000) {
		return [tepig, rufflet, axew];
	}
	if (highestXpOnTeam < 46656) {
		return [pignite, rufflet, fraxure, golett];
	}

	const team: OwnedPokemon[] = [
		emboar,
		braviary,
		gothitelle,
		haxorus,
		golurk,
		scolipede,
	];

	return team;
};

const hugh: OverworldTrainer = {
	type: 'TRAINER',
	x: 0,
	y: 0,
	id: hughId,
	conditionFunction: (s) => !s.handledOccupants.some((h) => h.id === hughId),
	orientation: 'DOWN',
	sprite: SpriteEnum.hugh,
	unhandledMessage: [
		'How do you like it here?',
		'I really enjoy the wilderness',
		'Its refreshing to get out of the city',
	],
	name: hughId,
	team: hughTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};

export const hughN1: Occupant = {
	...hugh,
	x: 11,
	y: 27,
	orientation: 'UP',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== hughId) && isSaturday(),
};
export const hughN1E1: Occupant = {
	...hugh,
	x: 26,
	y: 40,
	orientation: 'DOWN',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== hughId) && isSunday(),
};
export const hughE1: Occupant = {
	...hugh,
	x: 18,
	y: 18,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== hughId) && isMonday(),
};
export const hughS1E1: Occupant = {
	...hugh,
	x: 30,
	y: 20,
	orientation: 'DOWN',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== hughId) && isTuesday(),
};
export const hughS1: Occupant = {
	...hugh,
	x: 32,
	y: 3,
	orientation: 'DOWN',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== hughId) && isWednesday(),
};
export const hughS1W1: Occupant = {
	...hugh,
	x: 23,
	y: 14,
	orientation: 'LEFT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== hughId) && isThursday(),
};
export const hughcaveW1: Occupant = {
	...hugh,
	x: 13,
	y: 42,
	orientation: 'DOWN',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== hughId) && isFriday(),
};
