import { getHighestXpOnTeam } from '../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { occupantHandled } from '../../../functions/occupantHandled';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const lanceTeam = (s: SaveFile): OwnedPokemon[] => {
	const xp = Math.min(70 * 70 * 70, getHighestXpOnTeam(s.pokemon));

	const salamence = makeChallengerPokemon({
		xp,
		name: 'salamence',
		ability: 'moxie',
		heldItemName: 'yache-berry',
		firstMove: { name: 'acrobatics', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		thirdMove: { name: 'dragon-dance', usedPP: 0 },
		fourthMove: { name: 'steel-wing', usedPP: 0 },
	});
	const dragonite = makeChallengerPokemon({
		xp,
		name: 'dragonite',
		ability: 'multiscale',
		heldItemName: 'light-clay',
		firstMove: { name: 'reflect', usedPP: 0 },
		secondMove: { name: 'light-screen', usedPP: 0 },
		thirdMove: { name: 'dragon-pulse', usedPP: 0 },
		fourthMove: { name: 'steel-wing', usedPP: 0 },
	});
	const haxorus = makeChallengerPokemon({
		name: 'haxorus',
		xp,
		heldItemName: 'choice-band',
		firstMove: { name: 'dragon-claw', usedPP: 0 },
		secondMove: { name: 'slash', usedPP: 0 },
		fourthMove: { name: 'iron-head', usedPP: 0 },
		ability: 'speed-boost',
	});
	const dragonite2 = makeChallengerPokemon({
		name: 'dragonite',
		xp,
		heldItemName: 'leftovers',
		firstMove: { name: 'dragon-pulse', usedPP: 0 },
		secondMove: { name: 'aqua-ring', usedPP: 0 },
		thirdMove: { name: 'cosmic-power', usedPP: 0 },
		fourthMove: { name: 'toxic', usedPP: 0 },
		ability: 'multiscale',
	});
	const garchomp = makeChallengerPokemon({
		name: 'garchomp',
		xp,
		heldItemName: 'soft-sand',
		firstMove: { name: 'earthquake', usedPP: 0 },
		secondMove: { name: 'dragon-claw', usedPP: 0 },
		thirdMove: { name: 'dragon-dance', usedPP: 0 },
		ability: 'rough-skin',
	});
	const dragonite3 = makeChallengerPokemon({
		name: 'dragonite',
		xp,
		heldItemName: 'choice-band',
		firstMove: { name: 'extreme-speed', usedPP: 0 },
		ability: 'multiscale',
	});
	return [salamence, dragonite, haxorus, dragonite2, garchomp, dragonite3];
};
export const lance: OverworldTrainer = {
	type: 'TRAINER',
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/c/ce/VSLance.png',
	id: 'elite4-champ-lance',
	conditionFunction: (s) => !occupantHandled(s, 'elite4-champ-lance'),
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
