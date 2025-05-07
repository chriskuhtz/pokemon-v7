import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import {
	OverworldNpc,
	OverworldTrainer,
} from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../interfaces/StatObject';

const chrisTeam = [
	makeChallengerPokemon({
		name: 'ursaring',
		xp: 343000,
		nature: 'adamant',
		ability: 'huge-power',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'chople-berry',
		firstMove: { name: 'earthquake', usedPP: 0 },
		secondMove: { name: 'bulk-up', usedPP: 0 },
		thirdMove: { name: 'return', usedPP: 0 },
		fourthMove: { name: 'zen-headbutt', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'dragonite',
		xp: 343000,
		nature: 'adamant',
		ability: 'multiscale',
		fixedAbility: true,
		heldItemName: 'leftovers',
		firstMove: { name: 'dragon-dance', usedPP: 0 },
		secondMove: { name: 'extreme-speed', usedPP: 0 },
		thirdMove: { name: 'dragon-claw', usedPP: 0 },
		fourthMove: { name: 'ice-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'milotic',
		ability: 'drizzle',
		fixedAbility: true,
		nature: 'modest',
		firstMove: { name: 'surf', usedPP: 0 },
		secondMove: { name: 'tail-glow', usedPP: 0 },
		heldItemName: 'mystic-water',
		xp: 343000,
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'scizor',
		ability: 'technician',
		fixedAbility: true,
		nature: 'adamant',
		heldItemName: 'choice-band',
		firstMove: { name: 'bullet-punch', usedPP: 0 },
		xp: 343000,
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'arcanine-hisui',
		heldItemName: 'heat-rock',
		ability: 'drought',
		fixedAbility: true,
		nature: 'adamant',
		xp: 343000,
		firstMove: { name: 'dragon-dance', usedPP: 0 },
		secondMove: { name: 'thunder-fang', usedPP: 0 },
		thirdMove: { name: 'rock-slide', usedPP: 0 },
		fourthMove: { name: 'fire-fang', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'meganium',
		xp: 343000,
		heldItemName: 'leftovers',
		ability: 'solar-power',
		fixedAbility: true,
		nature: 'calm',
		firstMove: { name: 'solar-beam', usedPP: 0 },
		secondMove: { name: 'synthesis', usedPP: 0 },
		thirdMove: { name: 'ingrain', usedPP: 0 },
		fourthMove: { name: 'cosmic-power', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			'special-attack': 252,
		},
	}),
];

export const champChris: OverworldTrainer = {
	type: 'TRAINER',
	x: 25,
	y: 18,
	orientation: 'DOWN',
	name: 'Chris',
	sprite: SpriteEnum.red,
	id: 'champ-chris',
	unhandledMessage: ['.', '..', '...'],
	team: chrisTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
		generateIvs: true,
	},
	conditionFunction: (s) =>
		!s.handledOccupants.some((h) => h.id === 'champ-chris'),
};

export const rewardChris: OverworldNpc = {
	type: 'NPC',
	x: 10,
	y: 8,
	orientation: 'DOWN',
	sprite: SpriteEnum.red,
	id: 'reward-chris',
	unhandledMessage: [
		'Thank you so much for playing my game',
		'if i know you, give me a call',
		'and we will put you into the game',
		'as a trainer with your victory team',
	],
	conditionFunction: (s) =>
		s.handledOccupants.some((h) => h.id === 'champ-chris'),
};
