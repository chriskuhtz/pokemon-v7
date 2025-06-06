import { getHighestXpOnTeam } from '../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { occupantHandled } from '../../../functions/occupantHandled';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const karenTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = Math.min(70 * 70 * 70, getHighestXpOnTeam(s.pokemon) * 0.95);

	const weavile = makeChallengerPokemon({
		xp,
		name: 'weavile',
		ability: 'dark-aura',
		heldItemName: 'choice-band',
		firstMove: { name: 'sucker-punch', usedPP: 0 },
	});
	const spiritomb = makeChallengerPokemon({
		xp,
		name: 'spiritomb',
		ability: 'pressure',
		heldItemName: 'light-clay',
		firstMove: { name: 'reflect', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'confuse-ray', usedPP: 0 },
		fourthMove: { name: 'will-o-wisp', usedPP: 0 },
	});
	const honchkrow = makeChallengerPokemon({
		name: 'honchkrow',
		xp,
		heldItemName: 'leftovers',
		firstMove: { name: 'drill-peck', usedPP: 0 },
		secondMove: { name: 'dark-pulse', usedPP: 0 },
		fourthMove: { name: 'acrobatics', usedPP: 0 },
		thirdMove: { name: 'roost', usedPP: 0 },
		ability: 'moxie',
	});
	const umbreon = makeChallengerPokemon({
		name: 'umbreon',
		xp,
		heldItemName: 'leftovers',
		firstMove: { name: 'toxic', usedPP: 0 },
		secondMove: { name: 'dark-void', usedPP: 0 },
		thirdMove: { name: 'cosmic-power', usedPP: 0 },
		fourthMove: { name: 'dark-void', usedPP: 0 },
		ability: 'inner-focus',
	});
	const houndoom = makeChallengerPokemon({
		name: 'houndoom',
		xp,
		heldItemName: 'charcoal',
		firstMove: { name: 'flamethrower', usedPP: 0 },
		secondMove: { name: 'solar-beam', usedPP: 0 },
		ability: 'drought',
	});
	const absol = makeChallengerPokemon({
		name: 'absol',
		xp,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'swords-dance', usedPP: 0 },
		secondMove: { name: 'night-slash', usedPP: 0 },
		fourthMove: { name: 'aerial-ace', usedPP: 0 },
		thirdMove: { name: 'leaf-blade', usedPP: 0 },
		ability: 'sharpness',
	});
	return [weavile, spiritomb, honchkrow, umbreon, houndoom, absol];
};
export const karen: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/f/f3/VSKaren.png',
	type: 'TRAINER',
	id: 'elite4-karen',
	conditionFunction: (s) => !occupantHandled(s, 'elite4-karen'),
	x: 5,
	y: 12,
	orientation: 'DOWN',
	sprite: SpriteEnum.karen,
	unhandledMessage: [
		'Seems like the boys are getting soft',
		'Its rare that a trainer gets past bruno',
		'Okay, lets see what you got then',
	],
	team: karenTeam,
	battleTeamConfig: {
		assignGender: true,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};
