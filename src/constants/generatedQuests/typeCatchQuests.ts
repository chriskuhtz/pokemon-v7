import {
	superEffectiveSaveTable,
	typeBoostItemTable,
} from '../../interfaces/Item';
import { PokemonType, pokemonTypes } from '../../interfaces/PokemonType';
import { Quest } from '../../interfaces/Quest';
import { QuestName } from '../checkLists/questsRecord';
import { byType } from '../typeRecord';

const realTypes = pokemonTypes.filter((p) => p !== 'typeless');

const createTypeQuests = (type: PokemonType): [string, Quest][] => {
	const saveBerry = superEffectiveSaveTable[type];
	const boostItem = typeBoostItemTable[type][0];
	return [
		[
			`catch a ${type} pokemon`,
			{
				kind: 'BULLETIN',
				rewardItems: {
					'poke-ball': 2,
					'chesto-berry': 2,
					'pecha-berry': 2,
					[saveBerry]: 1,
				},
				researchPoints: 5,
				conditionFunction: (s) =>
					[...new Set(s.pokemon.map((p) => p.name))].filter((p) =>
						byType[p].includes(type)
					).length > 0,
			},
		],
		[
			`catch 10 different ${type} pokemon`,
			{
				kind: 'BULLETIN',
				rewardItems: {
					'great-ball': 10,
					'kebia-berry': 4,
					'coba-berry': 4,
					[saveBerry]: 3,
				},
				researchPoints: 20,
				availableAfter: `catch a ${type} pokemon` as QuestName,
				conditionFunction: (s) =>
					[...new Set(s.pokemon.map((p) => p.name))].filter((p) =>
						byType[p].includes(type)
					).length > 9,
			},
		],
		[
			`catch 25 different ${type} pokemon`,
			{
				kind: 'BULLETIN',
				rewardItems: {
					'net-ball': 10,
					'quick-ball': 10,
					'rindo-berry': 6,
					'aguav-berry': 6,
					[saveBerry]: 3,
				},
				researchPoints: 50,
				availableAfter: `catch 10 ${type} pokemon` as QuestName,
				conditionFunction: (s) =>
					[...new Set(s.pokemon.map((p) => p.name))].filter((p) =>
						byType[p].includes(type)
					).length > 24,
			},
		],
		[
			`catch 50 different ${type} pokemon`,
			{
				kind: 'BULLETIN',
				rewardItems: {
					'ultra-ball': 50,
					[boostItem]: 1,
					[saveBerry]: 5,
				},
				researchPoints: 100,
				availableAfter: `catch 25 ${type} pokemon` as QuestName,
				conditionFunction: (s) =>
					[...new Set(s.pokemon.map((p) => p.name))].filter((p) =>
						byType[p].includes(type)
					).length > 49,
			},
		],
	];
};

export const typeCatchQuests: Record<string, Quest> = Object.fromEntries(
	realTypes.flatMap(createTypeQuests)
);
