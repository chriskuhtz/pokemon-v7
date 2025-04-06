import { getRandomNature } from '../interfaces/Natures';
import { OverworldMap } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonSwarm, SaveFile } from '../interfaces/SaveFile';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getRandomEncounter } from './getRandomEncounter';
import { makeChallengerPokemon } from './makeChallengerPokemon';

export const determineWildPokemon = (
	team: OwnedPokemon[],
	map: OverworldMap,
	quests: SaveFile['quests'],
	waterEncounter: boolean,
	swarm?: PokemonSwarm
): OwnedPokemon[] => {
	if (
		quests['catch the legendary bird of ice'] === 'ACTIVE' &&
		Math.random() < 0.01
	) {
		return [
			makeChallengerPokemon(
				{ name: 'articuno', xp: 125000 },
				{ increasedShinyFactor: 2 }
			),
		];
	}
	if (
		!waterEncounter &&
		swarm &&
		swarm.route === map.id &&
		Math.random() > 0.5
	) {
		return [
			makeChallengerPokemon(
				{
					nature: getRandomNature(),
					name: swarm.pokemon,
					xp: getMiddleOfThree([
						swarm.xpMin,
						swarm.xpMax,
						Math.floor(swarm.xpMax * Math.random()),
					]),
				},
				{ increasedShinyFactor: 8 }
			),
		];
	}
	return team.filter((p) => p.damage < p.maxHp).length > 1
		? [
				makeChallengerPokemon({
					nature: getRandomNature(),
					...getRandomEncounter(map, waterEncounter),
				}),
				makeChallengerPokemon({
					nature: getRandomNature(),
					...getRandomEncounter(map, waterEncounter),
				}),
		  ]
		: [
				makeChallengerPokemon({
					nature: getRandomNature(),
					...getRandomEncounter(map, waterEncounter),
				}),
		  ];
};
