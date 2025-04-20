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

const janineTeam = [
	makeChallengerPokemon({
		name: 'arbok',
		xp: 8000,
		nature: 'adamant',
		ability: 'intimidate',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'earthquake', usedPP: 0 },
		secondMove: { name: 'bite', usedPP: 0 },
		thirdMove: { name: 'ice-fang', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'golbat',
		xp: 8000,
		nature: 'adamant',
		ability: 'inner-focus',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'scope-lens',
		firstMove: { name: 'bite', usedPP: 0 },
		secondMove: { name: 'giga-drain', usedPP: 0 },
		thirdMove: { name: 'leech-life', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	}),
];

const janineCondition = (s: SaveFile) => {
	const team = s.pokemon.filter((p) => p.onTeam);
	return (
		team.length === 2 &&
		team.every((t) => calculateLevelData(t.xp, t.growthRate).level <= 20)
	);
};
const trainerJanine: OverworldTrainer = {
	type: 'TRAINER',
	x: 13,
	y: 46,
	orientation: 'UP',
	id: 'trainer_janine',
	conditionFunction: janineCondition,
	sprite: SpriteEnum.janine,
	unhandledMessage: ['Think you can beat me?'],
	name: 'Gym Leader Janine',
	team: janineTeam,
};
const npcJanine: OverworldNpc = {
	type: 'NPC',
	x: 13,
	y: 46,
	orientation: 'UP',
	id: 'npc_janine',
	conditionFunction: (s) => !janineCondition(s),
	sprite: SpriteEnum.janine,
	unhandledMessage: [
		'I am Janine',
		'I love poison pokemon',
		'would you like to have a battle?',
		'My rules are as follows:',
		'Two pokemon each',
		'Level 20 or lower',
	],
};

export const janine: Occupant[] = [trainerJanine, npcJanine];
