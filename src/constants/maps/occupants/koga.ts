import { getHighestXpOnTeam } from '../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { occupantHandled } from '../../../functions/occupantHandled';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../interfaces/StatObject';

const kogaTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = Math.min(70 * 70 * 70, getHighestXpOnTeam(s.pokemon) * 0.85);

	const skuntank = makeChallengerPokemon({
		xp,
		name: 'skuntank',
		ability: 'poison-point',
		heldItemName: 'light-clay',
		firstMove: { name: 'reflect', usedPP: 0 },
		secondMove: { name: 'night-slash', usedPP: 0 },
		thirdMove: { name: 'cross-poison', usedPP: 0 },
		fourthMove: { name: 'bulk-up', usedPP: 0 },
		effortValues: { ...EmptyStatObject, 'special-defense': 252, defense: 252 },
	});
	const toxicroak = makeChallengerPokemon({
		xp,
		name: 'toxicroak',
		ability: 'adaptability',
		heldItemName: 'black-sludge',
		firstMove: { name: 'toxic', usedPP: 0 },
		secondMove: { name: 'low-kick', usedPP: 0 },
		thirdMove: { name: 'venoshock', usedPP: 0 },
		fourthMove: { name: 'aqua-jet', usedPP: 0 },
		effortValues: { ...EmptyStatObject, attack: 252, speed: 252 },
	});
	const vileplume = makeChallengerPokemon({
		name: 'vileplume',
		xp,
		heldItemName: 'black-sludge',
		firstMove: { name: 'leaf-blade', usedPP: 0 },
		secondMove: { name: 'spore', usedPP: 0 },
		thirdMove: { name: 'toxic', usedPP: 0 },
		fourthMove: { name: 'leech-seed', usedPP: 0 },
		ability: 'effect-spore',
		effortValues: { ...EmptyStatObject, 'special-defense': 252, defense: 252 },
	});
	const salazzle = makeChallengerPokemon({
		name: 'salazzle',
		xp,
		heldItemName: 'sitrus-berry',
		firstMove: { name: 'will-o-wisp', usedPP: 0 },
		secondMove: { name: 'flamethrower', usedPP: 0 },
		thirdMove: { name: 'toxic', usedPP: 0 },
		fourthMove: { name: 'venoshock', usedPP: 0 },
		ability: 'merciless',
		effortValues: { ...EmptyStatObject, 'special-attack': 252, attack: 252 },
	});
	const muk = makeChallengerPokemon({
		name: 'muk',
		xp,
		heldItemName: 'black-sludge',
		firstMove: { name: 'calm-mind', usedPP: 0 },
		secondMove: { name: 'toxic', usedPP: 0 },
		thirdMove: { name: 'sludge-bomb', usedPP: 0 },
		ability: 'stench',
		effortValues: { ...EmptyStatObject, 'special-defense': 252, defense: 252 },
	});
	const crobat = makeChallengerPokemon({
		name: 'crobat',
		xp,
		heldItemName: 'poison-gem',
		firstMove: { name: 'air-slash', usedPP: 0 },
		secondMove: { name: 'venoshock', usedPP: 0 },
		fourthMove: { name: 'leech-life', usedPP: 0 },
		ability: 'merciless',
		effortValues: { ...EmptyStatObject, attack: 252, speed: 252 },
	});
	return [skuntank, toxicroak, vileplume, salazzle, muk, crobat];
};
export const koga: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/b/b0/VSKoga.png',
	type: 'TRAINER',
	id: 'elite4-koga',
	conditionFunction: (s) => !occupantHandled(s, 'elite4-koga'),
	x: 5,
	y: 32,
	orientation: 'DOWN',
	sprite: SpriteEnum.koga,
	unhandledMessage: [
		'Me and my pokemon understand teamwork and strategy',
		'We soften you up, the next guy squashes you',
		'One doesnt have to win every battle to win the war',
		'Well ...',
		'We dont, you do',
	],
	team: kogaTeam,
	battleTeamConfig: {
		assignGender: true,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};
