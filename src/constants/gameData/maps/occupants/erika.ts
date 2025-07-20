import { calculateLevelData } from '../../../../functions/calculateLevelData';
import { makeChallengerPokemon } from '../../../../functions/makeChallengerPokemon';
import {
	Occupant,
	OverworldNpc,
	OverworldTrainer,
} from '../../../../interfaces/OverworldMap';
import { SaveFile } from '../../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../../interfaces/StatObject';

const erikaTeam = () => [
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
		calculateLevelData(team[0].xp, team[0].growthRate).level === 15
	);
};

export const erikaId = 'Gym Leader Erika';
export const trainerErika: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/5/5a/VSErika.png',
	type: 'TRAINER',
	x: 25,
	y: 8,
	id: erikaId,
	conditionFunction: erikaCondition,
	orientation: 'DOWN',
	sprite: SpriteEnum.erika,
	unhandledMessage: ['Lets see how good you are'],
	team: erikaTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
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
		'each of us will only use one pokemon at exactly lvl 15',
		'come back with a team that fits these rules',
	],
};

export const erika: Occupant[] = [trainerErika, npcErika];
