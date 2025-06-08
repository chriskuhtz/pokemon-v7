import { getHighestXpOnTeam } from '../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { makeOverworldItem } from '../../../functions/makeOverworldItem';
import { occupantHandled } from '../../../functions/occupantHandled';
import { getRocketChadTeam } from '../../../functions/troubleMakers/rocket';
import { Occupant } from '../../../interfaces/OverworldMap';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { startingLocation } from '../../gameData';

export const allRocketCampTrainersDefeated = (s: SaveFile): boolean => {
	return rocketCampOccupants
		.filter((r) => r.type === 'TRAINER')
		.every((r) => s.handledOccupants.some((h) => h.id === r.id));
};

export const rocketCampOccupants: Occupant[] = [
	makeOverworldItem({
		item: 'ultra-ball',
		mapId: 'rocketCamp',
		amount: 5,
		x: 7,
		y: 15,
	}),
	makeOverworldItem({
		item: 'rare-candy',
		mapId: 'rocketCamp',
		amount: 1,
		x: 19,
		y: 11,
	}),
	makeOverworldItem({
		item: 'loaded-dice',
		mapId: 'rocketCamp',
		amount: 1,
		x: 8,
		y: 5,
	}),
	makeOverworldItem({
		item: 'exp-candy-l',
		mapId: 'rocketCamp',
		amount: 1,
		x: 1,
		y: 17,
	}),
	{
		type: 'TRAINER',
		id: 'Rocket Goon Stevie',
		x: 11,
		y: 9,
		orientation: 'UP',
		team: (s) => [
			makeChallengerPokemon({
				name: 'hypno',
				xp: getHighestXpOnTeam(s.pokemon),
			}),
		],
		sprite: SpriteEnum.rocketFemale,
		unhandledMessage: ['Who the hell are you?'],
		conditionFunction: (s) => !occupantHandled(s, 'Rocket Goon Stevie'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'Rocket Goon Fatiha',
		x: 2,
		y: 6,
		orientation: 'RIGHT',
		team: (s) => [
			makeChallengerPokemon({
				name: 'grimer',
				xp: getHighestXpOnTeam(s.pokemon) * 0.8,
			}),
			makeChallengerPokemon({
				name: 'fearow',
				xp: getHighestXpOnTeam(s.pokemon),
			}),
		],
		sprite: SpriteEnum.rocketFemale,
		unhandledMessage: ['Bruv'],
		conditionFunction: (s) => !occupantHandled(s, 'Rocket Goon Fatiha'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'Rocket Goon Rosie',
		x: 14,
		y: 2,
		orientation: 'DOWN',
		team: (s) => [
			makeChallengerPokemon({
				name: 'magneton',
				xp: getHighestXpOnTeam(s.pokemon),
			}),
			makeChallengerPokemon({
				name: 'rattata',
				xp: getHighestXpOnTeam(s.pokemon) * 0.8,
			}),
		],
		sprite: SpriteEnum.rocketFemale,
		unhandledMessage: ['Dont mess with our loot'],
		conditionFunction: (s) => !occupantHandled(s, 'Rocket Goon Rosie'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'Rocket Goon Jason',
		x: 2,
		y: 17,
		orientation: 'RIGHT',
		team: (s) => [
			makeChallengerPokemon({
				name: 'houndoom',
				xp: getHighestXpOnTeam(s.pokemon) * 0.8,
			}),
			makeChallengerPokemon({
				name: 'spinarak',
				xp: getHighestXpOnTeam(s.pokemon) * 0.8,
			}),
			makeChallengerPokemon({
				name: 'aipom',
				xp: getHighestXpOnTeam(s.pokemon),
			}),
		],
		sprite: SpriteEnum.rocketMale,

		unhandledMessage: ['Nyyyaaaah'],
		conditionFunction: (s) => !occupantHandled(s, 'Rocket Goon Jason'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'Rocket Goon Matt',
		x: 16,
		y: 11,
		orientation: 'LEFT',
		team: (s) => [
			makeChallengerPokemon({
				name: 'machoke',
				xp: getHighestXpOnTeam(s.pokemon) * 0.8,
			}),
			makeChallengerPokemon({
				name: 'arbok',
				xp: getHighestXpOnTeam(s.pokemon),
			}),
		],
		sprite: SpriteEnum.rocketMale,
		unhandledMessage: ['You aint getting out of here'],
		conditionFunction: (s) => !occupantHandled(s, 'Rocket Goon Matt'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,

			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'Rocket Goon Alex',
		x: 18,
		y: 5,
		orientation: 'DOWN',
		team: (s) => [
			makeChallengerPokemon({
				name: 'primeape',
				xp: getHighestXpOnTeam(s.pokemon) * 0.8,
			}),
			makeChallengerPokemon({
				name: 'kadabra',
				xp: getHighestXpOnTeam(s.pokemon),
			}),
		],
		sprite: SpriteEnum.rocketMale,

		unhandledMessage: ['Why?'],
		conditionFunction: (s) => !occupantHandled(s, 'Rocket Goon Alex'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,

			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'Rocket Admin Chad',
		x: 10,
		y: 9,
		orientation: 'DOWN',
		team: getRocketChadTeam,
		sprite: SpriteEnum.rocketAdminMale,

		unhandledMessage: [
			'Dont you understand?',
			'Everybody has got to make a living',
			'I accept no responsibility for my cruelty',
			'...',
			'big dog',
		],
		conditionFunction: (s) => !occupantHandled(s, 'Rocket Admin Chad'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			assignHeldItem: true,
		},
	},

	{
		id: 'looker_teleport',
		type: 'TELEPORTER_NPC',
		sprite: SpriteEnum.looker,
		orientation: 'DOWN',
		x: 10,
		y: 10,
		to: startingLocation,
		conditionFunction: allRocketCampTrainersDefeated,
		dialogue: ['great job', 'thank you for help'],
	},
];
