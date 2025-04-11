import { OverworldMap } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { getRandomIndex } from './filterTargets';
import { getTimeOfDay } from './getTimeOfDay';

export const getRandomEncounter = (
	map: OverworldMap,
	water?: boolean
): Partial<OwnedPokemon> => {
	const options = water
		? [...map.possibleEncounters.WATER]
		: [
				...map.possibleEncounters[getTimeOfDay()],
				...map.possibleEncounters.BASE,
		  ];
	const flatMapped = options.flatMap((p) => {
		if (p.rarity === 'common') {
			return [p, p, p, p, p, p];
		}
		if (p.rarity === 'medium') {
			return [p, p, p, p];
		}
		if (p.rarity === 'rare') {
			return [p, p, p];
		}
		return [p];
	});

	const chosen = flatMapped[getRandomIndex(flatMapped.length)];
	const xp = Math.floor(
		chosen.maxXp - Math.random() * (chosen.maxXp - chosen.minXp)
	);
	return { ...chosen, xp };
};
