import { v4 } from 'uuid';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import {
	EmptyStatObject,
	generateRandomStatObject,
	StatObject,
} from '../interfaces/StatObject';

export const OPPO_ID = 'oppo';
export const shinyChance = 1 / 4096;
export const testOpponent: OwnedPokemon = {
	name: 'bulbasaur',
	gender: 'MALE',
	nature: 'adamant',
	ownerId: OPPO_ID,
	ball: 'poke-ball',
	damage: 0,
	firstMove: { name: 'tackle', usedPP: 0 },
	id: '1',
	xp: 125,
	ability: 'damp',
	happiness: 70,
	stepsWalked: 0,
	maxHp: 50,
	effortValues: EmptyStatObject,
	intrinsicValues: EmptyStatObject,
	ppBoostedMoves: [],
	caughtOnMap: 'camp',
	weightModifier: 1,
	unlockedMoves: [],
	growthRate: 'medium',
	caughtAtDate: new Date().getTime(),
};

export const makeChallengerPokemon = (
	data: Partial<Omit<OwnedPokemon, 'id'>>,
	config?: { increasedShinyFactor?: number; fixedIvs?: boolean }
): OwnedPokemon => {
	const ivs = (): StatObject => {
		if (config?.fixedIvs) {
			return data.intrinsicValues ?? generateRandomStatObject(31);
		}

		return generateRandomStatObject(31);
	};
	return {
		...testOpponent,
		weightModifier: Math.random(),
		...data,
		id: v4(),
		intrinsicValues: ivs(),
		shiny:
			testOpponent.shiny ??
			Math.random() * (config?.increasedShinyFactor ?? 1) < shinyChance,
	};
};
