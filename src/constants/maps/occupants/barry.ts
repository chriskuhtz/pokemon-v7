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
		nature: 'modest',
		ability: 'drought',
		fixedAbility: true,
		happiness: 255,
		heldItemName: 'occa-berry',
		firstMove: { name: 'solar-beam', usedPP: 0 },
		effortValues: {
			...EmptyStatObject,
			'special-attack': 252,
			speed: 252,
		},
	});

	if (highestXpOnTeam < 1000) {
		return [chimchar];
	}

	return [chimchar];
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
