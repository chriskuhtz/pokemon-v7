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

const blaineTeam = [
	makeChallengerPokemon({
		name: 'scovillain',
		xp: 15625,
		nature: 'modest',
		ability: 'moody',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'flamethrower', usedPP: 0 },
		secondMove: { name: 'seed-bomb', usedPP: 0 },
		thirdMove: { name: 'ingrain', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			defense: 252,
		},
	}),
];

const blaineCondition = (s: SaveFile) => {
	const team = s.pokemon.filter((p) => p.onTeam);
	return (
		team.length === 1 &&
		team.every(
			(t) =>
				calculateLevelData(t.xp, t.growthRate).level <= 25 &&
				t.caughtOnMap === 'routeE1'
		)
	);
};
const trainerBlaine: OverworldTrainer = {
	type: 'TRAINER',
	x: 43,
	y: 41,
	orientation: 'DOWN',
	id: 'trainer_blaine',
	conditionFunction: blaineCondition,
	sprite: SpriteEnum.blaine,
	unhandledMessage: ['Wahooo'],
	name: 'Gym Leader Blaine',
	team: blaineTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
		generateIvs: true,
	},
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/3/32/VSBlaine.png',
};
const npcBlaine: OverworldNpc = {
	type: 'NPC',
	x: 43,
	y: 41,
	orientation: 'DOWN',
	id: 'npc_blaine',
	conditionFunction: (s) => !blaineCondition(s),
	sprite: SpriteEnum.blaine,
	unhandledMessage: [
		'I may look old, but i am also crazy',
		"Blaine's the name",
		'Fire Pokemon are the game',
		'Challenge me with one pokemon caught on this route',
		'Level 25 should do it',
	],
};

export const blaine: Occupant[] = [trainerBlaine, npcBlaine];
