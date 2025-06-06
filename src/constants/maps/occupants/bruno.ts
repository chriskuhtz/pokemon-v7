import { getHighestXpOnTeam } from '../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { occupantHandled } from '../../../functions/occupantHandled';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const brunoTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = Math.min(70 * 70 * 70, getHighestXpOnTeam(s.pokemon) * 0.9);

	const hitmonlee = makeChallengerPokemon({
		xp,
		name: 'hitmonlee',
		ability: 'sniper',
		heldItemName: 'choice-band',
		firstMove: { name: 'low-kick', usedPP: 0 },
		secondMove: { name: 'blaze-kick', usedPP: 0 },
		thirdMove: { name: 'thunderous-kick', usedPP: 0 },
	});
	const hitmonchan = makeChallengerPokemon({
		xp,
		name: 'hitmonchan',
		ability: 'iron-fist',
		heldItemName: 'punching-glove',
		firstMove: { name: 'power-up-punch', usedPP: 0 },
		secondMove: { name: 'ice-punch', usedPP: 0 },
		thirdMove: { name: 'bullet-punch', usedPP: 0 },
	});
	const hitmontop = makeChallengerPokemon({
		name: 'hitmontop',
		xp,
		heldItemName: 'loaded-dice',
		firstMove: { name: 'triple-kick', usedPP: 0 },
		secondMove: { name: 'triple-axel', usedPP: 0 },
		thirdMove: { name: 'fury-swipes', usedPP: 0 },
		ability: 'super-luck',
	});
	const hariyama = makeChallengerPokemon({
		name: 'hariyama',
		xp,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'belly-drum', usedPP: 0 },
		secondMove: { name: 'drain-punch', usedPP: 0 },
		thirdMove: { name: 'rock-slide', usedPP: 0 },
		ability: 'iron-fist',
	});
	const pangoro = makeChallengerPokemon({
		name: 'pangoro',
		xp,
		heldItemName: 'black-glasses',
		firstMove: { name: 'power-up-punch', usedPP: 0 },
		secondMove: { name: 'crunch', usedPP: 0 },
		thirdMove: { name: 'rock-slide', usedPP: 0 },
		ability: 'dark-aura',
	});
	const machamp = makeChallengerPokemon({
		name: 'machamp',
		xp,
		heldItemName: 'black-belt',
		firstMove: { name: 'bulk-up', usedPP: 0 },
		secondMove: { name: 'cross-chop', usedPP: 0 },
		fourthMove: { name: 'mega-kick', usedPP: 0 },
		ability: 'no-guard',
	});
	return [hitmonchan, hitmonlee, hitmontop, hariyama, pangoro, machamp];
};
export const bruno: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/b/b8/VSBruno.png',
	type: 'TRAINER',
	id: 'elite4-bruno',
	conditionFunction: (s) => !occupantHandled(s, 'elite4-bruno'),
	x: 5,
	y: 22,
	orientation: 'DOWN',
	sprite: SpriteEnum.bruno,
	unhandledMessage: ['Looks like koga did his part', 'We will squash you now'],
	team: brunoTeam,
	battleTeamConfig: {
		assignGender: true,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};
