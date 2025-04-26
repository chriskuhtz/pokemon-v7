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

const erikaTeam = [
	makeChallengerPokemon({
		name: 'gloom',
		xp: 3375,
		nature: 'modest',
		ability: 'drought',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'occa-berry',
		firstMove: { name: 'solar-beam', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	}),
];

const erikaCondition = (s: SaveFile) => {
	const team = s.pokemon.filter((p) => p.onTeam);
	return (
		team.length === 1 &&
		calculateLevelData(team[0].xp, team[0].growthRate).level <= 15
	);
};
const trainerErika: OverworldTrainer = {
	type: 'TRAINER',
	x: 25,
	y: 8,
	id: 'trainer_erika',
	conditionFunction: erikaCondition,
	orientation: 'DOWN',
	sprite: SpriteEnum.erika,
	unhandledMessage: ['Lets see how good you are'],
	name: 'Gym Leader Erika',
	team: erikaTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
		generateIvs: true,
	},
};
const npcErika: OverworldNpc = {
	type: 'NPC',
	x: 25,
	y: 8,
	id: 'npc_erika',
	conditionFunction: (s) => !erikaCondition(s),
	orientation: 'DOWN',
	sprite: SpriteEnum.erika,
	unhandledMessage: [
		'My name is erika',
		'my favorite pokemon are grass types',
		'would you like to have a battle?',
		'to make it more interesting',
		'each of us will only use one pokemon at lvl 15 or lower',
		'come back with a team that fits these rules',
	],
};

export const erika: Occupant[] = [trainerErika, npcErika];
