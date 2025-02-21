import { v4 } from 'uuid';
import { testOpponent } from '../constants/gameData';
import { OverworldMap } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { getRandomEncounter } from './getRandomEncounter';

export const determineWildPokemon = (
	team: OwnedPokemon[],
	map: OverworldMap
) => {
	return team.filter((p) => p.damage < p.maxHp).length > 1
		? [
				{ ...testOpponent, ...getRandomEncounter(map), id: v4() },
				{ ...testOpponent, ...getRandomEncounter(map), id: v4() },
		  ]
		: [{ ...testOpponent, ...getRandomEncounter(map), id: v4() }];
};
