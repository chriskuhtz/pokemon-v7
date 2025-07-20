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

const blaineTeam = () => [
	makeChallengerPokemon({
		name: 'slugma',
		xp: 15625,
		nature: 'modest',
		ability: 'flame-body',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'flame-wheel', usedPP: 0 },
		secondMove: { name: 'will-o-wisp', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'magmar',
		xp: 15625,
		nature: 'adamant',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'fire-punch', usedPP: 0 },
		secondMove: { name: 'mega-punch', usedPP: 0 },
		thirdMove: { name: 'bullet-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			defense: 252,
		},
	}),
	makeChallengerPokemon({
		name: 'arcanine',
		xp: 15625,
		nature: 'modest',
		ability: 'intimidate',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'life-orb',
		firstMove: { name: 'flare-blitz', usedPP: 0 },
		secondMove: { name: 'volt-tackle', usedPP: 0 },
		thirdMove: { name: 'double-edge', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	}),
];

const blaineCondition = (s: SaveFile) => {
	const team = s.pokemon.filter((p) => p.onTeam);
	return (
		team.length === 3 &&
		team.every(
			(t) =>
				calculateLevelData(t.xp, t.growthRate).level <= 25 &&
				t.caughtOnMap === 'routeE1'
		)
	);
};

export const blaineId = 'trainer_blaine';
export const trainerBlaine: OverworldTrainer = {
	type: 'TRAINER',
	x: 43,
	y: 41,
	orientation: 'DOWN',
	id: blaineId,
	conditionFunction: blaineCondition,
	sprite: SpriteEnum.blaine,
	unhandledMessage: ['Wahooo'],
	team: blaineTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
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
		'Challenge me with three pokemon caught on this route',
		'Level 25 should do it',
	],
};

export const blaine: Occupant[] = [trainerBlaine, npcBlaine];
