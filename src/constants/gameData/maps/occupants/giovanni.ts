import { getHighestXpOnTeam } from '../../../../functions/getHighestXpOnTeam';
import { makeChallengerPokemon } from '../../../../functions/makeChallengerPokemon';
import { OverworldTrainer } from '../../../../interfaces/OverworldMap';
import { SaveFile } from '../../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../../../interfaces/StatObject';

const giovanniTeam = (s: SaveFile) => {
	const xp = getHighestXpOnTeam(s.pokemon);
	return [
		makeChallengerPokemon({
			name: 'nidoking',
			xp,
			happiness: 255,
			ability: 'iron-fist',
			fixedAbility: true,
			heldItemName: 'metal-coat',
			firstMove: { name: 'bullet-punch', usedPP: 0 },
			secondMove: { name: 'bulk-up', usedPP: 0 },
			thirdMove: { name: 'fire-punch', usedPP: 0 },
			effortValues: {
				...EmptyStatObject,
				attack: 252,
				speed: 252,
			},
		}),
		makeChallengerPokemon({
			name: 'nidoqueen',
			xp,
			nature: 'adamant',
			ability: 'battle-armor',
			fixedAbility: true,
			happiness: 255,
			heldItemName: 'leftovers',
			firstMove: { name: 'ice-beam', usedPP: 0 },
			secondMove: { name: 'tail-glow', usedPP: 0 },
			thirdMove: { name: 'thunder', usedPP: 0 },
			fourthMove: { name: 'light-screen', usedPP: 0 },
			effortValues: {
				...EmptyStatObject,
				'special-attack': 252,
				speed: 252,
			},
		}),
		makeChallengerPokemon({
			name: 'tauros',
			xp,
			nature: 'adamant',
			ability: 'berserk',
			fixedAbility: true,
			happiness: 255,
			heldItemName: 'life-orb',
			firstMove: { name: 'earthquake', usedPP: 0 },
			secondMove: { name: 'bulk-up', usedPP: 0 },
			thirdMove: { name: 'return', usedPP: 0 },
			effortValues: {
				...EmptyStatObject,
				attack: 252,
				speed: 252,
			},
		}),
		makeChallengerPokemon({
			name: 'annihilape',
			xp,
			nature: 'adamant',
			ability: 'contrary',
			fixedAbility: true,
			happiness: 255,
			heldItemName: 'choice-band',
			firstMove: { name: 'super-power', usedPP: 0 },
			effortValues: {
				...EmptyStatObject,
				attack: 252,
				speed: 252,
			},
		}),
		makeChallengerPokemon({
			name: 'persian',
			xp,
			nature: 'adamant',
			ability: 'simple',
			fixedAbility: true,
			happiness: 255,
			heldItemName: 'silk-scarf',
			firstMove: { name: 'swords-dance', usedPP: 0 },
			secondMove: { name: 'return', usedPP: 0 },
			effortValues: {
				...EmptyStatObject,
				attack: 252,
				speed: 252,
			},
		}),
		makeChallengerPokemon({
			name: 'mewtwo',
			xp,
			nature: 'adamant',
			ability: 'speed-boost',
			fixedAbility: true,
			happiness: 255,
			heldItemName: 'leftovers',
			firstMove: { name: 'psychic', usedPP: 0 },
			secondMove: { name: 'calm-mind', usedPP: 0 },
			thirdMove: { name: 'aura-sphere', usedPP: 0 },
			fourthMove: { name: 'dark-pulse', usedPP: 0 },
			effortValues: {
				...EmptyStatObject,
				'special-attack': 252,
				speed: 252,
			},
		}),
	];
};

export const giovanni: OverworldTrainer = {
	profilePicture:
		'https://archives.bulbagarden.net/media/upload/2/25/VSGiovanni.png',
	type: 'TRAINER',
	x: 25,
	y: 30,
	orientation: 'DOWN',
	sprite: SpriteEnum.giovanni,
	id: 'giovanni',
	unhandledMessage: [
		'So you are the one,',
		'that has been defeating my poachers',
		'lets settle this',
		'once and for all',
	],
	team: giovanniTeam,
	battleTeamConfig: {
		assignGender: false,
		assignHeldItem: false,
		assignLearnsetMoves: false,
		assignNaturalAbility: false,
	},
	conditionFunction: (s) =>
		!!(
			s.rangerLevel &&
			s.rangerLevel > 10 &&
			!s.handledOccupants.some((h) => h.id === 'giovanni')
		),
};
