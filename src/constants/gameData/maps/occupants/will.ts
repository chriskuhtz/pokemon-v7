import { getHighestXpOnTeam } from '../../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../../functions/makeChallengerPokemon';
import { occupantHandled } from '../../../../functions/occupantHandled';
import { OverworldTrainer } from '../../../../interfaces/Occupant';
import { OwnedPokemon } from '../../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../../interfaces/StatObject';

const willTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = Math.max(66 * 66 * 66, getHighestXpOnTeam(s.pokemon) * 0.8);

	const bronzong = makeChallengerPokemon({
		xp,
		nature: 'careful',
		name: 'bronzong',
		ability: 'levitate',
		heldItemName: 'light-clay',
		firstMove: { name: 'light-screen', usedPP: 0 },
		secondMove: { name: 'reflect', usedPP: 0 },
		thirdMove: { name: 'gyro-ball', usedPP: 0 },
		fourthMove: { name: 'extrasensory', usedPP: 0 },
		effortValues: { ...EmptyStatObject, 'special-defense': 252, defense: 252 },
	});
	const jynx = makeChallengerPokemon({
		xp,
		name: 'jynx',
		ability: 'filter',
		nature: 'timid',
		heldItemName: 'terrain-extender',
		firstMove: { name: 'fake-out', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		thirdMove: { name: 'recover', usedPP: 0 },
		fourthMove: { name: 'psychic-terrain', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			'special-attack': 252,
		},
	});
	const grumpig = makeChallengerPokemon({
		name: 'grumpig',
		nature: 'modest',
		xp,
		heldItemName: 'leftovers',
		firstMove: { name: 'tail-glow', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		ability: 'thick-fat',
		effortValues: { ...EmptyStatObject, defense: 252, 'special-attack': 252 },
	});
	const slowbro = makeChallengerPokemon({
		name: 'slowbro',
		xp,
		nature: 'quiet',
		heldItemName: 'leftovers',
		firstMove: { name: 'calm-mind', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		thirdMove: { name: 'hydro-pump', usedPP: 0 },
		ability: 'simple',
		effortValues: { ...EmptyStatObject, 'special-defense': 252, defense: 252 },
	});
	const gardevoir = makeChallengerPokemon({
		name: 'gardevoir',
		xp,
		nature: 'hasty',
		heldItemName: 'choice-band',
		firstMove: { name: 'dazzling-gleam', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		ability: 'synchronize',
		effortValues: { ...EmptyStatObject, 'special-attack': 252, speed: 252 },
	});
	const xatu = makeChallengerPokemon({
		name: 'xatu',
		xp,
		nature: 'hasty',
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'aeroblast', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		fourthMove: { name: 'shadow-ball', usedPP: 0 },
		thirdMove: { name: 'roost', usedPP: 0 },
		ability: 'synchronize',
		effortValues: { ...EmptyStatObject, 'special-attack': 252, speed: 252 },
	});
	return [bronzong, jynx, grumpig, slowbro, gardevoir, xatu];
};
export const will: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/0/07/VSWill.png',
	type: 'TRAINER',
	id: 'elite4-will',
	conditionFunction: (s) => !occupantHandled(s, 'elite4-will'),
	x: 5,
	y: 42,
	orientation: 'DOWN',
	sprite: SpriteEnum.will,
	unhandledMessage: [
		'Congratulations',
		'Only really talented trainers get here',
		'Unfortunately for you',
		'You wont get any further',
	],
	team: willTeam,
	battleTeamConfig: {
		assignGender: true,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};
