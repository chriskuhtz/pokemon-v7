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

const brockTeam = () => [
	makeChallengerPokemon({
		name: 'onix',
		xp: 1000000,
		nature: 'adamant',
		heldItemName: 'choice-band',
		ability: 'huge-power',
		fixedAbility: true,
		happiness: 255,
		firstMove: { name: 'accelerock', usedPP: 17 },
		secondMove: { name: 'slack-off', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	}),
];

const brockCondition = (s: SaveFile) => {
	const team = s.pokemon.filter((p) => p.onTeam);
	return (
		team.length === 3 &&
		team.every(
			(t) =>
				calculateLevelData(t.xp, t.growthRate).level <= 50 &&
				calculateLevelData(t.xp, t.growthRate).level >= 40
		)
	);
};
const trainerBrock: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/1/11/VSBrock.png',
	type: 'TRAINER',
	x: 8,
	y: 28,
	orientation: 'RIGHT',
	id: 'trainer_brock',
	conditionFunction: brockCondition,
	sprite: SpriteEnum.brock,
	unhandledMessage: ['Lets do this'],
	name: 'Gym Leader Brock',
	team: brockTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
		generateIvs: true,
	},
};
const npcBrock: OverworldNpc = {
	type: 'NPC',
	x: 8,
	y: 28,
	orientation: 'RIGHT',
	id: 'npc_brock',
	conditionFunction: (s) => !brockCondition(s),
	sprite: SpriteEnum.brock,
	unhandledMessage: [
		'Whats Up, i am brock',
		'I just found the strongest onix ever',
		'I bet you couldnt defeat it with 3 Pokemon between level 40 and 50',
	],
};

export const brock: Occupant[] = [trainerBrock, npcBrock];
