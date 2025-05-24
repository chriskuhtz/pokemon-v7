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

export const redId = 'trainer red';
const redTeam = (s: SaveFile): OwnedPokemon[] => {
	const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);

	const charmander = makeChallengerPokemon({
		name: 'charmander',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'blaze',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'charcoal',
		firstMove: { name: 'flame-wheel', usedPP: 0 },
		secondMove: { name: 'aerial-ace', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const bulbasaur = makeChallengerPokemon({
		name: 'bulbasaur',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'overgrow',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'light-clay',
		firstMove: { name: 'ingrain', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'sludge', usedPP: 0 },
		fourthMove: { name: 'leaf-blade', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			'special-defense': 252,
		},
	});
	const squirtle = makeChallengerPokemon({
		name: 'squirtle',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'rock-head',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'double-edge', usedPP: 0 },
		secondMove: { name: 'head-smash', usedPP: 0 },
		thirdMove: { name: 'withdraw', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			attack: 252,
		},
	});
	const charmeleon = makeChallengerPokemon({
		name: 'charmeleon',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'blaze',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'charcoal',
		firstMove: { name: 'flame-wheel', usedPP: 0 },
		secondMove: { name: 'aerial-ace', usedPP: 0 },
		thirdMove: { name: 'dragon-dance', usedPP: 0 },
		fourthMove: { name: 'slash', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const ivysaur = makeChallengerPokemon({
		name: 'ivysaur',
		xp: highestXpOnTeam,
		nature: 'relaxed',
		ability: 'overgrow',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'light-clay',
		firstMove: { name: 'ingrain', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'sludge', usedPP: 0 },
		fourthMove: { name: 'leaf-blade', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			'special-defense': 252,
		},
	});
	const wartortle = makeChallengerPokemon({
		name: 'wartortle',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'rock-head',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'double-edge', usedPP: 0 },
		secondMove: { name: 'head-smash', usedPP: 0 },
		thirdMove: { name: 'bulk-up', usedPP: 0 },
		fourthMove: { name: 'waterfall', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			attack: 252,
		},
	});
	const charizard = makeChallengerPokemon({
		name: 'charizard',
		xp: highestXpOnTeam,
		nature: 'modest',
		ability: 'blaze',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'charcoal',
		firstMove: { name: 'flamethrower', usedPP: 0 },
		secondMove: { name: 'aeroblast', usedPP: 0 },
		thirdMove: { name: 'tail-glow', usedPP: 0 },
		fourthMove: { name: 'dragon-pulse', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const venusaur = makeChallengerPokemon({
		name: 'venusaur',
		xp: highestXpOnTeam,
		nature: 'relaxed',
		ability: 'overgrow',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'light-clay',
		firstMove: { name: 'ingrain', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'sludge-bomb', usedPP: 0 },
		fourthMove: { name: 'leaf-blade', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			'special-defense': 252,
		},
	});
	const blastoise = makeChallengerPokemon({
		name: 'blastoise',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'rock-head',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'double-edge', usedPP: 0 },
		secondMove: { name: 'head-smash', usedPP: 0 },
		thirdMove: { name: 'bulk-up', usedPP: 0 },
		fourthMove: { name: 'waterfall', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			attack: 252,
		},
	});
	const tauros = makeChallengerPokemon({
		name: 'tauros',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'moxie',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'choice-band',
		firstMove: { name: 'headbutt', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			speed: 252,
			attack: 252,
		},
	});
	const dragonite = makeChallengerPokemon({
		name: 'dragonite',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'hospitality',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'dragon-pulse', usedPP: 0 },
		secondMove: { name: 'reflect', usedPP: 0 },
		thirdMove: { name: 'calm-mind', usedPP: 0 },
		fourthMove: { name: 'recover', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			speed: 252,
			'special-attack': 252,
		},
	});

	const machamp = makeChallengerPokemon({
		name: 'machamp',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-belt',
		firstMove: { name: 'bulk-up', usedPP: 0 },
		secondMove: { name: 'thunder-punch', usedPP: 0 },
		thirdMove: { name: 'drain-punch', usedPP: 0 },
		fourthMove: { name: 'mach-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			attack: 252,
		},
	});
	const alakazam = makeChallengerPokemon({
		name: 'alakazam',
		xp: highestXpOnTeam,
		nature: 'modest',
		ability: 'serene-grace',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'twisted-spoon',
		firstMove: { name: 'extrasensory', usedPP: 0 },
		secondMove: { name: 'calm-mind', usedPP: 0 },
		thirdMove: { name: 'recover', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			speed: 252,
			'special-attack': 252,
		},
	});
	const scyther = makeChallengerPokemon({
		name: 'scyther',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'technician',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'choice-band',
		firstMove: { name: 'wing-attack', usedPP: 0 },
		secondMove: { name: 'mach-punch', usedPP: 0 },
		thirdMove: { name: 'bug-bite', usedPP: 0 },
		fourthMove: { name: 'bullet-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			speed: 252,
			attack: 252,
		},
	});
	const slowbro = makeChallengerPokemon({
		name: 'slowbro',
		xp: highestXpOnTeam,
		nature: 'quiet',
		ability: 'adaptability',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'bubble-beam', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		thirdMove: { name: 'recover', usedPP: 0 },
		fourthMove: { name: 'cosmic-power', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			'special-defense': 252,
		},
	});
	const raichu = makeChallengerPokemon({
		name: 'raichu',
		xp: highestXpOnTeam,
		nature: 'naive',
		ability: 'lightning-rod',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'shuca-berry',
		firstMove: { name: 'nasty-plot', usedPP: 0 },
		secondMove: { name: 'nuzzle', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	});

	if (highestXpOnTeam < 8000) {
		return [charmander, bulbasaur, squirtle];
	}
	if (highestXpOnTeam < 46656) {
		return [charmeleon, ivysaur, wartortle];
	}

	const possibilities = [
		charizard,
		venusaur,
		blastoise,
		tauros,
		dragonite,
		machamp,
		alakazam,
		scyther,
		slowbro,
		raichu,
	];
	const team: OwnedPokemon[] = [];

	for (let i = 0; i < 6; i++) {
		team.push(
			getRandomEntry(
				possibilities.filter((p) => team.every((t) => t.name !== p.name))
			)
		);
	}

	return team;
};

const red: OverworldTrainer = {
	type: 'TRAINER',
	spriteGeneration: 1,
	x: 0,
	y: 0,
	id: redId,
	conditionFunction: (s) => !s.handledOccupants.some((h) => h.id === redId),
	orientation: 'DOWN',
	sprite: SpriteEnum.red1996,
	unhandledMessage: [
		'where am i',
		'this doesnt feel like 1996 anymore',
		'whats with these colors?',
	],
	team: redTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};

export const redN1: Occupant = {
	...red,
	x: 4,
	y: 28,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== redId) && isFriday(),
};
export const redN1E1: Occupant = {
	...red,
	x: 3,
	y: 3,
	orientation: 'RIGHT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== redId) && isSaturday(),
};
export const redE1: Occupant = {
	...red,
	x: 25,
	y: 35,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== redId) && isSunday(),
};
export const redS1E1: Occupant = {
	...red,
	x: 12,
	y: 15,
	orientation: 'UP',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== redId) && isMonday(),
};
export const redS1: Occupant = {
	...red,
	x: 3,
	y: 13,
	orientation: 'DOWN',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== redId) && isTuesday(),
};
export const redS1W1: Occupant = {
	...red,
	x: 31,
	y: 1,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== redId) && isWednesday(),
};
export const redcaveW1: Occupant = {
	...red,
	x: 11,
	y: 9,
	orientation: 'LEFT',
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== redId) && isThursday(),
};
