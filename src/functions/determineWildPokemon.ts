import { getRandomNature } from '../interfaces/Natures';
import { OverworldMap } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { getRandomEncounter } from './getRandomEncounter';
import { makeChallengerPokemon } from './makeChallengerPokemon';

export const determineWildPokemon = (
	team: OwnedPokemon[],
	map: OverworldMap
) => {
	return team.filter((p) => p.damage < p.maxHp).length > 1
		? [
				makeChallengerPokemon({
					nature: getRandomNature(),
					...getRandomEncounter(map),
				}),
				makeChallengerPokemon({
					nature: getRandomNature(),
					...getRandomEncounter(map),
				}),
		  ]
		: [
				makeChallengerPokemon({
					nature: getRandomNature(),
					...getRandomEncounter(map),
				}),
		  ];
};
