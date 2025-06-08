import { getHighestXpOnTeam } from '../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { occupantHandled } from '../../../functions/occupantHandled';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../interfaces/StatObject';

export const lanceId = 'elite4-champ-lance';
const lanceTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = Math.max(70 * 70 * 70, getHighestXpOnTeam(s.pokemon));

	const salamence = makeChallengerPokemon({
		xp,
		name: 'salamence',
		ability: 'moxie',
		nature: 'adamant',
		heldItemName: 'yache-berry',
		firstMove: { name: 'acrobatics', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		thirdMove: { name: 'dragon-dance', usedPP: 0 },
		fourthMove: { name: 'steel-wing', usedPP: 0 },
		effortValues: { ...EmptyStatObject, speed: 252, attack: 252 },
	});
	const dragonite = makeChallengerPokemon({
		xp,
		name: 'dragonite',
		ability: 'multiscale',
		nature: 'relaxed',
		heldItemName: 'light-clay',
		firstMove: { name: 'reflect', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'dragon-pulse', usedPP: 0 },
		fourthMove: { name: 'steel-wing', usedPP: 0 },
		effortValues: { ...EmptyStatObject, 'special-defense': 252, defense: 252 },
	});
	const haxorus = makeChallengerPokemon({
		name: 'haxorus',
		xp,
		heldItemName: 'choice-band',
		nature: 'adamant',
		firstMove: { name: 'dragon-claw', usedPP: 0 },
		secondMove: { name: 'slash', usedPP: 0 },
		fourthMove: { name: 'iron-head', usedPP: 0 },
		ability: 'speed-boost',
		effortValues: { ...EmptyStatObject, defense: 252, attack: 252 },
	});
	const dragonite2 = makeChallengerPokemon({
		name: 'dragonite',
		xp,
		heldItemName: 'leftovers',
		nature: 'sassy',
		firstMove: { name: 'dragon-pulse', usedPP: 0 },
		secondMove: { name: 'aqua-ring', usedPP: 0 },
		thirdMove: { name: 'cosmic-power', usedPP: 0 },
		fourthMove: { name: 'toxic', usedPP: 0 },
		ability: 'multiscale',
		effortValues: { ...EmptyStatObject, 'special-defense': 252, defense: 252 },
	});
	const garchomp = makeChallengerPokemon({
		name: 'garchomp',
		xp,
		heldItemName: 'soft-sand',
		nature: 'adamant',
		firstMove: { name: 'earthquake', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		thirdMove: { name: 'dragon-dance', usedPP: 0 },
		ability: 'rough-skin',
		effortValues: { ...EmptyStatObject, speed: 252, attack: 252 },
	});
	const dragonite3 = makeChallengerPokemon({
		name: 'dragonite',
		xp,
		shiny: true,
		heldItemName: 'choice-band',
		nature: 'brave',
		firstMove: { name: 'extreme-speed', usedPP: 0 },
		ability: 'multiscale',
		effortValues: { ...EmptyStatObject, defense: 252, attack: 252 },
	});
	return [salamence, dragonite, haxorus, dragonite2, garchomp, dragonite3];
};
export const lance: OverworldTrainer = {
	type: 'TRAINER',
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/c/ce/VSLance.png',
	id: lanceId,
	conditionFunction: (s) => !occupantHandled(s, lanceId),
	x: 5,
	y: 3,
	orientation: 'DOWN',
	sprite: SpriteEnum.lance,
	unhandledMessage: [
		'Welcome, Challenger',
		'I have the honor to be Lance',
		'Master of Dragon Type Pokemon',
		'And you have the honor of providing practice for my pokemon',
		'If you could win, that would make you the Pokemon League Champion',
		'But lets stay serious...',
	],
	team: lanceTeam,
	battleTeamConfig: {
		assignGender: true,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};
