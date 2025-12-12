import { getHighestXpOnTeam } from '../../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../../functions/makeChallengerPokemon';
import { occupantHandled } from '../../../../functions/occupantHandled';
import { OverworldTrainer } from '../../../../interfaces/Occupant';
import { OwnedPokemon } from '../../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../../interfaces/StatObject';

const karenTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = Math.max(69 * 69 * 69, getHighestXpOnTeam(s.pokemon) * 0.95);

	const weavile = makeChallengerPokemon({
		xp,
		name: 'weavile',
		nature: 'hasty',
		ability: 'dark-aura',
		heldItemName: 'choice-band',
		firstMove: { name: 'sucker-punch', usedPP: 0 },
		effortValues: { ...EmptyStatObject, attack: 252, defense: 252 },
	});
	const spiritomb = makeChallengerPokemon({
		xp,
		name: 'spiritomb',
		ability: 'pressure',
		nature: 'calm',
		heldItemName: 'light-clay',
		firstMove: { name: 'reflect', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'confuse-ray', usedPP: 0 },
		fourthMove: { name: 'will-o-wisp', usedPP: 0 },
		effortValues: { ...EmptyStatObject, 'special-defense': 252, speed: 252 },
	});
	const honchkrow = makeChallengerPokemon({
		name: 'honchkrow',
		xp,
		nature: 'adamant',
		heldItemName: 'leftovers',
		firstMove: { name: 'drill-peck', usedPP: 0 },
		secondMove: { name: 'night-slash', usedPP: 0 },
		fourthMove: { name: 'acrobatics', usedPP: 0 },
		thirdMove: { name: 'roost', usedPP: 0 },
		ability: 'moxie',
		effortValues: { ...EmptyStatObject, attack: 252, speed: 252 },
	});
	const umbreon = makeChallengerPokemon({
		name: 'umbreon',
		xp,
		nature: 'relaxed',
		heldItemName: 'leftovers',
		firstMove: { name: 'toxic', usedPP: 0 },
		secondMove: { name: 'dark-void', usedPP: 0 },
		thirdMove: { name: 'cosmic-power', usedPP: 0 },
		fourthMove: { name: 'dark-void', usedPP: 0 },
		ability: 'inner-focus',
		effortValues: { ...EmptyStatObject, defense: 252, 'special-defense': 252 },
	});
	const houndoom = makeChallengerPokemon({
		name: 'houndoom',
		xp,
		nature: 'modest',
		heldItemName: 'shuca-berry',
		firstMove: { name: 'flamethrower', usedPP: 0 },
		secondMove: { name: 'solar-beam', usedPP: 0 },
		ability: 'drought',
		effortValues: { ...EmptyStatObject, speed: 252, 'special-attack': 252 },
	});
	const absol = makeChallengerPokemon({
		name: 'absol',
		xp,
		nature: 'adamant',
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'swords-dance', usedPP: 0 },
		secondMove: { name: 'night-slash', usedPP: 0 },
		fourthMove: { name: 'aerial-ace', usedPP: 0 },
		thirdMove: { name: 'leaf-blade', usedPP: 0 },
		ability: 'sharpness',
		effortValues: { ...EmptyStatObject, speed: 252, attack: 252 },
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
