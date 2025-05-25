import {
	superEffectiveSaveTable,
	typeBoostItemTable,
} from '../../interfaces/Item';
import { PokemonType, pokemonTypes } from '../../interfaces/PokemonType';
import { Quest } from '../../interfaces/Quest';
import { byType } from '../internalDex';
import { PokemonName } from '../pokemonNames';
import { QuestName } from '../questsRecord';

const realTypes = pokemonTypes.filter((p) => p !== 'typeless');

const createTypeQuests = (type: PokemonType): [string, Quest][] => {
	const saveBerry = superEffectiveSaveTable[type];
	const boostItem = typeBoostItemTable[type][0];
	return [
		[
			`catch a ${type} pokemon`,
			{
				category: 'POKEDEX',
				kind: 'BULLETIN',
				rewardItems: {
					'poke-ball': 1,
					'chesto-berry': 2,
					'pecha-berry': 2,
					[saveBerry]: 2,
				},
				researchPoints: 5,
				catchBoosts: { [type]: 1 },
				conditionFunction: (s) =>
					Object.entries(s.pokedex).filter(
						([name, info]) =>
							info.caughtOnRoutes.length > 0 &&
							byType[type].includes(name as PokemonName)
					).length > 0,
			},
		],
		[
			`catch 10 different ${type} pokemon`,
			{
				category: 'POKEDEX',
				kind: 'BULLETIN',
				rewardItems: {
					'great-ball': 5,
					'kebia-berry': 4,
					'coba-berry': 4,
					[saveBerry]: 4,
				},
				catchBoosts: { [type]: 1 },
				researchPoints: 20,
				availableAfter: `catch a ${type} pokemon` as QuestName,
				progress: (s) => ({
					goal: 10,
					current: Object.entries(s.pokedex).filter(
						([name, info]) =>
							info.caughtOnRoutes.length > 0 &&
							byType[type].includes(name as PokemonName)
					).length,
				}),
				conditionFunction: (s) =>
					Object.entries(s.pokedex).filter(
						([name, info]) =>
							info.caughtOnRoutes.length > 0 &&
							byType[type].includes(name as PokemonName)
					).length > 9,
			},
		],
		[
			`catch 25 different ${type} pokemon`,
			{
				category: 'POKEDEX',
				kind: 'BULLETIN',
				rewardItems: {
					'net-ball': 5,
					'quick-ball': 5,
					'rindo-berry': 6,
					'aguav-berry': 6,
					[saveBerry]: 6,
				},
				catchBoosts: { [type]: 1 },
				researchPoints: 50,
				availableAfter: `catch 10 different ${type} pokemon` as QuestName,
				progress: (s) => ({
					goal: 25,
					current: Object.entries(s.pokedex).filter(
						([name, info]) =>
							info.caughtOnRoutes.length > 0 &&
							byType[type].includes(name as PokemonName)
					).length,
				}),
				conditionFunction: (s) =>
					Object.entries(s.pokedex).filter(
						([name, info]) =>
							info.caughtOnRoutes.length > 0 &&
							byType[type].includes(name as PokemonName)
					).length > 24,
			},
		],
		[
			`catch 50 different ${type} pokemon`,
			{
				category: 'POKEDEX',
				kind: 'BULLETIN',
				rewardItems: {
					'ultra-ball': 25,
					[boostItem]: 1,
					[saveBerry]: 10,
				},
				catchBoosts: { [type]: 1 },
				researchPoints: 100,
				availableAfter: `catch 25 different ${type} pokemon` as QuestName,
				progress: (s) => ({
					goal: 50,
					current: Object.entries(s.pokedex).filter(
						([name, info]) =>
							info.caughtOnRoutes.length > 0 &&
							byType[type].includes(name as PokemonName)
					).length,
				}),
				conditionFunction: (s) =>
					Object.entries(s.pokedex).filter(
						([name, info]) =>
							info.caughtOnRoutes.length > 0 &&
							byType[type].includes(name as PokemonName)
					).length > 49,
			},
		],
	];
};

export const typeCatchQuests: Record<string, Quest> = Object.fromEntries(
	realTypes.flatMap(createTypeQuests)
);
