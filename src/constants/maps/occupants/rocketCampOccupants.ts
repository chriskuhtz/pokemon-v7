import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { occupantHandled } from '../../../functions/occupantHandled';
import { ItemType } from '../../../interfaces/Item';
import { Occupant, OverworldItem } from '../../../interfaces/OverworldMap';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

export const allRocketCampTrainersDefeated = (s: SaveFile): boolean => {
	return rocketCampOccupants
		.filter((r) => r.type === 'TRAINER')
		.every((r) => s.handledOccupants.some((h) => h.id === r.id));
};

export const makeOverworldItem = ({
	id,
	x,
	y,
	item,
	amount,
}: {
	id: string;
	x: number;
	y: number;
	item: ItemType;
	amount: number;
}): OverworldItem => {
	return {
		type: 'ITEM',
		x,
		y,
		id,
		conditionFunction: (s) => !occupantHandled(s, id),
		item,
		amount,
	};
};
export const rocketCampOccupants: Occupant[] = [
	makeOverworldItem({
		item: 'ultra-ball',
		id: 'rocket-camp-ultra-ball',
		amount: 5,
		x: 7,
		y: 15,
	}),
	makeOverworldItem({
		item: 'rare-candy',
		id: 'rocket-camp-rare-candy',
		amount: 1,
		x: 19,
		y: 11,
	}),
	makeOverworldItem({
		item: 'loaded-dice',
		id: 'rocket-camp-loaded-dice',
		amount: 1,
		x: 8,
		y: 5,
	}),
	makeOverworldItem({
		item: 'exp-candy-l',
		id: 'rocket-camp-exp-candy-l',
		amount: 1,
		x: 1,
		y: 17,
	}),
	{
		type: 'TRAINER',
		id: 'rocketCamp-goon-1',
		x: 11,
		y: 9,
		orientation: 'UP',
		team: [makeChallengerPokemon({ name: 'hypno', xp: 8000 })],
		sprite: SpriteEnum.rocketFemale,
		name: 'Rocket Goon Stevie',
		unhandledMessage: ['Who the hell are you?'],
		conditionFunction: (s) => !occupantHandled(s, 'rocketCamp-goon-1'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			generateIvs: true,
			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'rocketCamp-goon-2',
		x: 2,
		y: 6,
		orientation: 'RIGHT',
		team: [
			makeChallengerPokemon({ name: 'grimer', xp: 7000 }),
			makeChallengerPokemon({ name: 'fearow', xp: 9000 }),
		],
		sprite: SpriteEnum.rocketFemale,
		name: 'Rocket Goon Fatiha',
		unhandledMessage: ['Bruv'],
		conditionFunction: (s) => !occupantHandled(s, 'rocketCamp-goon-2'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			generateIvs: true,
			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'rocketCamp-goon-3',
		x: 14,
		y: 2,
		orientation: 'DOWN',
		team: [
			makeChallengerPokemon({ name: 'magneton', xp: 12000 }),
			makeChallengerPokemon({ name: 'rattata', xp: 9000 }),
		],
		sprite: SpriteEnum.rocketFemale,
		name: 'Rocket Goon Rosie',
		unhandledMessage: ['Dont mess with our loot'],
		conditionFunction: (s) => !occupantHandled(s, 'rocketCamp-goon-3'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			generateIvs: true,
			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'rocketCamp-goon-4',
		x: 2,
		y: 17,
		orientation: 'RIGHT',
		team: [
			makeChallengerPokemon({ name: 'houndoom', xp: 11000 }),
			makeChallengerPokemon({ name: 'spinarak', xp: 9000 }),
			makeChallengerPokemon({ name: 'aipom', xp: 10000 }),
		],
		sprite: SpriteEnum.rocketMale,
		name: 'Rocket Goon Jason',
		unhandledMessage: ['Nyyyaaaah'],
		conditionFunction: (s) => !occupantHandled(s, 'rocketCamp-goon-4'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			generateIvs: true,
			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'rocketCamp-goon-5',
		x: 16,
		y: 11,
		orientation: 'LEFT',
		team: [
			makeChallengerPokemon({ name: 'machoke', xp: 10000 }),
			makeChallengerPokemon({ name: 'arbok', xp: 9000 }),
		],
		sprite: SpriteEnum.rocketMale,
		name: 'Rocket Goon Matt',
		unhandledMessage: ['You aint getting out of here'],
		conditionFunction: (s) => !occupantHandled(s, 'rocketCamp-goon-5'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			generateIvs: true,
			assignHeldItem: true,
		},
	},
	{
		type: 'TRAINER',
		id: 'rocketCamp-goon-6',
		x: 18,
		y: 5,
		orientation: 'DOWN',
		team: [
			makeChallengerPokemon({ name: 'primeape', xp: 10000 }),
			makeChallengerPokemon({ name: 'kadabra', xp: 12000 }),
		],
		sprite: SpriteEnum.rocketMale,
		name: 'Rocket Goon Alex',
		unhandledMessage: ['Why?'],
		conditionFunction: (s) => !occupantHandled(s, 'rocketCamp-goon-6'),
		battleTeamConfig: {
			assignLearnsetMoves: true,
			assignNaturalAbility: true,
			assignGender: true,
			generateIvs: true,
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
		to: {
			mapId: 'camp',
			x: 11,
			y: 8,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: allRocketCampTrainersDefeated,
		dialogue: ['great job', 'thank you for help'],
	},
];
