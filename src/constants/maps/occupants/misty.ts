import { calculateLevelData } from '../../../functions/calculateLevelData';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import {
	Occupant,
	OverworldNpc,
	OverworldTrainer,
} from '../../../interfaces/OverworldMap';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../interfaces/StatObject';

const mistyTeam = () => [
	makeChallengerPokemon({
		name: 'starmie',
		xp: 46656,
		nature: 'bold',
		heldItemName: 'leftovers',
		ability: 'water-absorb',
		fixedAbility: true,
		happiness: 255,
		firstMove: { name: 'reflect', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'recover', usedPP: 0 },
		fourthMove: { name: 'psychic', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			'special-defense': 252,
		},
	}),
	makeChallengerPokemon({
		name: 'starmie',
		shiny: true,
		xp: 46656,
		nature: 'rash',
		ability: 'drizzle',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'mystic-water',
		firstMove: { name: 'surf', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'recover', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	}),
];

const mistyCondition = (s: SaveFile) => {
	const team = s.pokemon.filter((p) => p.onTeam);
	return (
		team.length === 2 &&
		team.every((t) => calculateLevelData(t.xp, t.growthRate).level <= 36) &&
		team[0].name === team[1].name
	);
};

export const mistyId = 'trainer_misty';
const trainerMisty: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/2/20/VSMisty.png',
	type: 'TRAINER',
	x: 16,
	y: 24,
	orientation: 'DOWN',
	id: mistyId,
	conditionFunction: mistyCondition,
	sprite: SpriteEnum.misty,
	unhandledMessage: ['lets see what you got'],
	team: mistyTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};
const npcMisty: OverworldNpc = {
	type: 'NPC',
	x: 16,
	y: 24,
	orientation: 'DOWN',
	id: 'npc_misty',
	conditionFunction: (s) => !mistyCondition(s),
	sprite: SpriteEnum.misty,
	unhandledMessage: [
		'nice to meet you',
		"i'm misty",
		'if you want to battle me',
		'you may bring 2 of the same pokemon',
		'Level 36 at the highest',
		'I will use my two starmies',
	],
};

export const misty: Occupant[] = [trainerMisty, npcMisty];
