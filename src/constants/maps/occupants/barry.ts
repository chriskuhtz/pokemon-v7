import { getRandomEntry } from '../../../functions/filterTargets';
import { getHighestXpOnTeam } from '../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { Occupant, OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../interfaces/StatObject';

export const barryId = 'trainer_barry';
const barryTeam = (s: SaveFile): OwnedPokemon[] => {
	const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);

	const chimchar = makeChallengerPokemon({
		name: 'chimchar',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'passho-berry',
		firstMove: { name: 'bulk-up', usedPP: 0 },
		secondMove: { name: 'mach-punch', usedPP: 0 },
		thirdMove: { name: 'fire-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const monferno = makeChallengerPokemon({
		name: 'monferno',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'moxie',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'passho-berry',
		firstMove: { name: 'bulk-up', usedPP: 0 },
		secondMove: { name: 'mach-punch', usedPP: 0 },
		thirdMove: { name: 'fire-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const infernape = makeChallengerPokemon({
		name: 'infernape',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'iron-fist',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'leftovers',
		firstMove: { name: 'bulk-up', usedPP: 0 },
		secondMove: { name: 'drain-punch', usedPP: 0 },
		thirdMove: { name: 'fire-punch', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const starly = makeChallengerPokemon({
		name: 'starly',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'big-pecks',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sharp-beak',
		firstMove: { name: 'aerial-ace', usedPP: 0 },
		secondMove: { name: 'quick-attack', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const staravia = makeChallengerPokemon({
		name: 'staravia',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'intimidate',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sharp-beak',
		firstMove: { name: 'aerial-ace', usedPP: 0 },
		secondMove: { name: 'quick-attack', usedPP: 0 },
		thirdMove: { name: 'brave-bird', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const staraptor = makeChallengerPokemon({
		name: 'staravia',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'reckless',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'sharp-beak',
		firstMove: { name: 'double-edge', usedPP: 0 },
		secondMove: { name: 'quick-attack', usedPP: 0 },
		thirdMove: { name: 'brave-bird', usedPP: 0 },
		fourthMove: { name: 'flare-blitz', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const stunky = makeChallengerPokemon({
		name: 'stunky',
		xp: highestXpOnTeam,
		nature: 'bold',
		ability: 'own-tempo',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-sludge',
		firstMove: { name: 'toxic', usedPP: 0 },
		secondMove: { name: 'acid-armor', usedPP: 0 },
		thirdMove: { name: 'sludge', usedPP: 0 },
		fourthMove: { name: 'feint-attack', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			'special-defense': 252,
		},
	});
	const skuntank = makeChallengerPokemon({
		name: 'skuntank',
		xp: highestXpOnTeam,
		nature: 'bold',
		ability: 'own-tempo',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'black-sludge',
		firstMove: { name: 'toxic', usedPP: 0 },
		secondMove: { name: 'acid-armor', usedPP: 0 },
		thirdMove: { name: 'sludge-bomb', usedPP: 0 },
		fourthMove: { name: 'night-slash', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			defense: 252,
			'special-defense': 252,
		},
	});
	const luxio = makeChallengerPokemon({
		name: 'luxio',
		xp: highestXpOnTeam,
		nature: 'lonely',
		ability: 'strong-jaw',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'magnet',
		firstMove: { name: 'bite', usedPP: 0 },
		secondMove: { name: 'thunder-fang', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const luxray = makeChallengerPokemon({
		name: 'luxray',
		xp: highestXpOnTeam,
		nature: 'lonely',
		ability: 'strong-jaw',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'magnet',
		firstMove: { name: 'crunch', usedPP: 0 },
		secondMove: { name: 'thunder-fang', usedPP: 0 },
		thirdMove: { name: 'ice-fang', usedPP: 0 },
		fourthMove: { name: 'poison-fang', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const snover = makeChallengerPokemon({
		name: 'snover',
		xp: highestXpOnTeam,
		nature: 'sassy',
		ability: 'soundproof',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'big-root',
		firstMove: { name: 'ingrain', usedPP: 0 },
		secondMove: { name: 'mega-drain', usedPP: 0 },
		thirdMove: { name: 'icy-wind', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	});
	const abomasnow = makeChallengerPokemon({
		name: 'abomasnow',
		xp: highestXpOnTeam,
		nature: 'sassy',
		ability: 'soundproof',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'big-root',
		firstMove: { name: 'ingrain', usedPP: 0 },
		secondMove: { name: 'giga-drain', usedPP: 0 },
		thirdMove: { name: 'blizzard', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	});
	const yanmega = makeChallengerPokemon({
		name: 'yanmega',
		xp: highestXpOnTeam,
		nature: 'sassy',
		ability: 'tinted-lens',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'expert-belt',
		firstMove: { name: 'tail-glow', usedPP: 0 },
		secondMove: { name: 'aeroblast', usedPP: 0 },
		thirdMove: { name: 'signal-beam', usedPP: 0 },
		fourthMove: { name: 'ancient-power', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	});
	const rampardos = makeChallengerPokemon({
		name: 'rampardos',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'rock-head',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'expert-belt',
		firstMove: { name: 'head-smash', usedPP: 0 },
		secondMove: { name: 'double-edge', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});
	const mismagius = makeChallengerPokemon({
		name: 'mismagius',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'moody',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'expert-belt',
		firstMove: { name: 'magical-leaf', usedPP: 0 },
		secondMove: { name: 'psychic', usedPP: 0 },
		thirdMove: { name: 'shadow-ball', usedPP: 0 },
		fourthMove: { name: 'power-gem', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	});
	const torterra = makeChallengerPokemon({
		name: 'torterra',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'steadfast',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'big-root',
		firstMove: { name: 'earthquake', usedPP: 0 },
		secondMove: { name: 'power-whip', usedPP: 0 },
		thirdMove: { name: 'ingrain', usedPP: 0 },
		fourthMove: { name: 'bulk-up', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-defense': 252,
			defense: 252,
		},
	});
	const empoleon = makeChallengerPokemon({
		name: 'empoleon',
		xp: highestXpOnTeam,
		nature: 'adamant',
		ability: 'steadfast',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'metal-coat',
		firstMove: { name: 'steel-wing', usedPP: 0 },
		secondMove: { name: 'swords-dance', usedPP: 0 },
		thirdMove: { name: 'drill-peck', usedPP: 0 },
		fourthMove: { name: 'waterfall', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			attack: 252,
			speed: 252,
		},
	});

	if (highestXpOnTeam < 8000) {
		return [chimchar, starly, snover];
	}
	if (highestXpOnTeam < 46656) {
		return [monferno, staravia, stunky, luxio, snover];
	}

	const possibilities = [
		infernape,
		staraptor,
		skuntank,
		luxray,
		abomasnow,
		yanmega,
		rampardos,
		mismagius,
		torterra,
		empoleon,
	];
	const team: OwnedPokemon[] = [];

	for (let i = 0; i < 6; i++) {
		team.push(
			getRandomEntry(
				possibilities.filter((p) => team.every((t) => t.name !== p.name))
			)
		);
	}

	return team;
};

const barry: OverworldTrainer = {
	type: 'TRAINER',
	x: 0,
	y: 0,
	id: barryId,
	conditionFunction: (s) => !s.handledOccupants.some((h) => h.id === barryId),
	orientation: 'DOWN',
	sprite: SpriteEnum.barry,
	unhandledMessage: [
		'Yo, good to meet you',
		'My Name is Barry, i am a fellow research assistant',
		'So i am travelling to a different route every day',
		'Lets battle every time we meet each other in the wild',
		'That way, we will grow stronger together',
	],
	name: 'Research Assistant Barry',
	team: barryTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
};

const day = new Date().getDay();

export const barryN1: Occupant = {
	...barry,
	x: 12,
	y: 40,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== barryId) && day === 1,
};
export const barryN1E1: Occupant = {
	...barry,
	x: 14,
	y: 22,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== barryId) && day === 2,
};
export const barryE1: Occupant = {
	...barry,
	x: 10,
	y: 29,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== barryId) && day === 3,
};
export const barryS1E1: Occupant = {
	...barry,
	x: 25,
	y: 25,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== barryId) && day === 4,
};
export const barryOnixCave: Occupant = {
	...barry,
	x: 38,
	y: 44,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== barryId) && day === 5,
};
export const barryS1W1: Occupant = {
	...barry,
	x: 29,
	y: 6,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== barryId) && day === 6,
};
export const barryN1W1: Occupant = {
	...barry,
	x: 16,
	y: 45,
	conditionFunction: (s) =>
		s.handledOccupants.every((h) => h.id !== barryId) && day === 0,
};
