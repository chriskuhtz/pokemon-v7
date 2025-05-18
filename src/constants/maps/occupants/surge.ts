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

const surgeTeam = () => [
	makeChallengerPokemon({
		name: 'raichu',
		xp: 27000,
		nature: 'brave',
		ability: 'hustle',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'mago-berry',
		firstMove: { name: 'slam', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
		},
	}),
];

const surgeCondition = (s: SaveFile) => {
	const team = s.pokemon.filter((p) => p.onTeam);
	return (
		team.length === 1 &&
		team.every(
			(t) =>
				calculateLevelData(t.xp, t.growthRate).level <= 30 &&
				t.name === 'pikachu'
		)
	);
};
const trainerSurge: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/4/46/VSLt_Surge.png',
	type: 'TRAINER',
	x: 45,
	y: 7,
	orientation: 'UP',
	id: 'trainer_surge',
	conditionFunction: surgeCondition,
	sprite: SpriteEnum.surge,
	unhandledMessage: [
		'First I crush you',
		"then i'll crush some burgers and brewskies with the boys",
	],
	name: 'Gym Leader Surge',
	team: surgeTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
		generateIvs: true,
	},
};
const npcSurge: OverworldNpc = {
	type: 'NPC',
	x: 45,
	y: 7,
	orientation: 'UP',
	id: 'npc_surge',
	conditionFunction: (s) => !surgeCondition(s),
	sprite: SpriteEnum.surge,
	unhandledMessage: [
		'Yo, Dipshit',
		'I am Lt.Surge',
		'Can you read my shirt?',
		'You inspect his tank top',
		'it says:',
		'Make Kanto great again',
		'If you want to battle',
		'you get Pikachu, i get Raichu',
		'At level 30',
	],
};

export const surge: Occupant[] = [trainerSurge, npcSurge];
