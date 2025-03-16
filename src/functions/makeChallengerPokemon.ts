import { v4 } from 'uuid';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { EmptyStatObject } from '../interfaces/StatObject';

export const OPPO_ID = 'oppo';

export const testOpponent: OwnedPokemon = {
	name: 'bulbasaur',
	gender: 'MALE',
	nature: 'adamant',
	ownerId: OPPO_ID,
	ball: 'poke-ball',
	damage: 0,
	firstMove: { name: 'scratch', usedPP: 0 },
	secondMove: { name: 'growl', usedPP: 0 },
	thirdMove: { name: 'pound', usedPP: 0 },
	fourthMove: { name: 'leer', usedPP: 0 },
	id: '1',
	xp: 200,
	ability: 'damp',
	happiness: -1,
	stepsWalked: 0,
	maxHp: 50,
	effortValues: EmptyStatObject,
	ppBoostedMoves: [],
	caughtOnMap: 'camp',
};

export const makeChallengerPokemon = (
	data: Partial<Omit<OwnedPokemon, 'id'>>
): OwnedPokemon => {
	return { ...testOpponent, ...data, id: v4() };
};
