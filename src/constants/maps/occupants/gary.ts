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
import { internalDex } from '../../pokemonNames';

const garyTeam = () => [
	makeChallengerPokemon({
		name: 'exeggutor',
		xp: 216000,
		nature: 'careful',
		heldItemName: 'big-root',
		ability: 'sturdy',
		fixedAbility: true,
		happiness: 255,
		firstMove: { name: 'spore', usedPP: 0 },
		secondMove: { name: 'ingrain', usedPP: 0 },
		thirdMove: { name: 'light-screen', usedPP: 0 },
		fourthMove: { name: 'rain-dance', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'blastoise',
		xp: 216000,
		nature: 'modest',
		heldItemName: 'wacan-berry',
		ability: 'drizzle',
		fixedAbility: true,
		happiness: 255,
		firstMove: { name: 'calm-mind', usedPP: 0 },
		secondMove: { name: 'bubble-beam', usedPP: 0 },
		thirdMove: { name: 'ice-beam', usedPP: 0 },
		fourthMove: { name: 'hyper-beam', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'electabuzz',
		xp: 216000,
		nature: 'modest',
		heldItemName: 'choice-scarf',
		ability: 'lightning-rod',
		fixedAbility: true,
		happiness: 255,
		firstMove: { name: 'thunder', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'tauros',
		xp: 216000,
		nature: 'adamant',
		heldItemName: 'silk-scarf',
		ability: 'dry-skin',
		fixedAbility: true,
		happiness: 255,
		firstMove: { name: 'body-slam', usedPP: 0 },
		secondMove: { name: 'earthquake', usedPP: 0 },
		thirdMove: { name: 'brick-break', usedPP: 0 },
		fourthMove: { name: 'rock-slide', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	}),
];

const garyCondition = (s: SaveFile) => {
	const team = s.pokemon.filter((p) => p.onTeam);
	return (
		team.length === 4 &&
		team.every(
			(t) =>
				calculateLevelData(t.xp, t.growthRate).level <= 60 &&
				internalDex[t.name].dexId <= 151
		)
	);
};

export const garyId = 'trainer_gary';
const trainerGary: OverworldTrainer = {
	type: 'TRAINER',
	x: 10,
	y: 20,
	orientation: 'DOWN',
	id: garyId,
	conditionFunction: garyCondition,
	sprite: SpriteEnum.gary,
	unhandledMessage: ['I am always looking for a challenge'],
	team: garyTeam,
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/8/89/VSBlue.png',
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};
const npcGary: OverworldNpc = {
	type: 'NPC',
	x: 10,
	y: 20,
	orientation: 'DOWN',
	id: 'npc_gary',
	conditionFunction: (s) => !garyCondition(s),
	sprite: SpriteEnum.gary,
	unhandledMessage: [
		'Look at this view',
		'There is so much out there to discover',
		'Actually, this looks like a nice spot for a battle',
		'Bring 4 Lvl 60 Pokemon from Kanto',
		'and lets see who is the better trainer',
	],
};

export const gary: Occupant[] = [trainerGary, npcGary];
