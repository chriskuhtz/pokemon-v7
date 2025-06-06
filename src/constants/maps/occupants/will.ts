import { getHighestXpOnTeam } from '../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { occupantHandled } from '../../../functions/occupantHandled';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const willTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = Math.min(70 * 70 * 70, getHighestXpOnTeam(s.pokemon) * 0.8);

	const bronzong = makeChallengerPokemon({
		xp,
		name: 'bronzong',
		ability: 'levitate',
		heldItemName: 'light-clay',
		firstMove: { name: 'light-screen', usedPP: 0 },
		secondMove: { name: 'reflect', usedPP: 0 },
		thirdMove: { name: 'gyro-ball', usedPP: 0 },
		fourthMove: { name: 'extrasensory', usedPP: 0 },
	});
	const jynx = makeChallengerPokemon({
		xp,
		name: 'jynx',
		ability: 'filter',
		heldItemName: 'terrain-extender',
		firstMove: { name: 'fake-out', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		thirdMove: { name: 'recover', usedPP: 0 },
		fourthMove: { name: 'psychic-terrain', usedPP: 0 },
	});
	const grumpig = makeChallengerPokemon({
		name: 'grumpig',
		xp,
		heldItemName: 'leftovers',
		firstMove: { name: 'tail-glow', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		ability: 'thick-fat',
	});
	const slowbro = makeChallengerPokemon({
		name: 'slowbro',
		xp,
		heldItemName: 'leftovers',
		firstMove: { name: 'calm-mind', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		thirdMove: { name: 'hydro-pump', usedPP: 0 },
		ability: 'simple',
	});
	const gardevoir = makeChallengerPokemon({
		name: 'gardevoir',
		xp,
		heldItemName: 'choice-band',
		firstMove: { name: 'dazzling-gleam', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		ability: 'synchronize',
	});
	const xatu = makeChallengerPokemon({
		name: 'xatu',
		xp,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'aeroblast', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		fourthMove: { name: 'shadow-ball', usedPP: 0 },
		thirdMove: { name: 'roost', usedPP: 0 },
		ability: 'synchronize',
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
	unhandledMessage: ['Nyaaaaahhh'],
	team: willTeam,
	battleTeamConfig: {
		assignGender: true,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};
