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

const sabrinaTeam = [
	makeChallengerPokemon({
		name: 'gardevoir',
		xp: 64000,
		nature: 'modest',
		heldItemName: 'light-clay',
		ability: 'fairy-aura',
		fixedAbility: true,
		happiness: 255,
		firstMove: { name: 'reflect', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		thirdMove: { name: 'recover', usedPP: 0 },
		fourthMove: { name: 'moonblast', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			speed: 252,
			'special-attack': 252,
		},
	}),
	makeChallengerPokemon({
		name: 'gallade',
		xp: 64000,
		nature: 'adamant',
		heldItemName: 'black-belt',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		firstMove: { name: 'mach-punch', usedPP: 0 },
		secondMove: { name: 'fire-punch', usedPP: 0 },
		thirdMove: { name: 'shadow-punch', usedPP: 0 },
		fourthMove: { name: 'sky-uppercut', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			speed: 252,
			'special-attack': 252,
		},
	}),
];

const sabrinaCondition = (s: SaveFile) => {
	const team = s.pokemon.filter((p) => p.onTeam);
	return (
		team.length === 3 &&
		team[0].name === 'gengar' &&
		team[1].name === 'scizor' &&
		team[2].name === 'houndoom' &&
		team.every((t) => calculateLevelData(t.xp, t.growthRate).level <= 40)
	);
};
const trainerSabrina: OverworldTrainer = {
	type: 'TRAINER',
	x: 3,
	y: 3,
	orientation: 'LEFT',
	id: 'trainer_sabrina',
	conditionFunction: sabrinaCondition,
	sprite: SpriteEnum.sabrina,
	unhandledMessage: ['Just as i foresaw'],
	name: 'Gym Leader Sabrina',
	team: sabrinaTeam,
};
const npcSabrina: OverworldNpc = {
	type: 'NPC',
	x: 3,
	y: 3,
	orientation: 'LEFT',
	id: 'npc_sabrina',
	conditionFunction: (s) => !sabrinaCondition(s),
	sprite: SpriteEnum.sabrina,
	unhandledMessage: [
		'No need to speak',
		'with my telepathic powers, i can see',
		'That you will battle me',
		'with 3 Lvl 40 pokemon',
		'Gengar, Scizor and Houndoom, in that order',
	],
};

export const sabrina: Occupant[] = [trainerSabrina, npcSabrina];
