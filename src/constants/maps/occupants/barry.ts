import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { Occupant, OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../interfaces/StatObject';

const barryTeam = (s: SaveFile): OwnedPokemon[] => {
	const highestXpOnTeam = Math.max(
		...s.pokemon.filter((p) => p.onTeam).map((p) => p.xp)
	);

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

	if (highestXpOnTeam < 8000) {
		return [chimchar, starly, stunky, snover];
	}
	if (highestXpOnTeam < 46656) {
		return [monferno, staravia, staraptor, luxio, snover];
	}

	return [infernape, staraptor, skuntank, luxray, abomasnow, yanmega];
};

const barry: OverworldTrainer = {
	type: 'TRAINER',
	x: 0,
	y: 0,
	id: 'trainer_barry',
	conditionFunction: (s) =>
		!s.handledOccupants.some((h) => h.id === 'trainer_barry'),
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
		assignNaturalAbility: true,
		generateIvs: true,
	},
};

const day = new Date().getDay();

export const barryN1: Occupant = {
	...barry,
	x: 12,
	y: 40,
	conditionFunction: () => day === 1,
};
export const barryN1E1: Occupant = {
	...barry,
	x: 14,
	y: 22,
	conditionFunction: () => day === 2,
};
export const barryE1: Occupant = {
	...barry,
	x: 10,
	y: 29,
	conditionFunction: () => day === 3,
};
export const barryS1E1: Occupant = {
	...barry,
	x: 25,
	y: 25,
	conditionFunction: () => day === 4,
};
export const barryOnixCave: Occupant = {
	...barry,
	x: 38,
	y: 44,
	conditionFunction: () => day === 5,
};
export const barryS1W1: Occupant = {
	...barry,
	x: 29,
	y: 6,
	conditionFunction: () => day === 5,
};
export const barryN1W1: Occupant = {
	...barry,
	x: 16,
	y: 45,
	conditionFunction: () => day === 6,
};
