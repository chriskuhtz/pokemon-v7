import { OverworldEncounter, OverworldMap } from '../interfaces/OverworldMap';
import { getRandomIndex } from './filterTargets';
import { getTimeOfDay } from './getTimeOfDay';

export const getRandomEncounter = (
	map: OverworldMap,
	water?: boolean
): OverworldEncounter => {
	const options = water
		? [...map.possibleEncounters.WATER]
		: [
				...map.possibleEncounters[getTimeOfDay()],
				...map.possibleEncounters.BASE,
		  ];
	const flatMapped = options.flatMap((p) => {
		if (p.rarity === 'common') {
			return [p, p, p, p];
		}
		if (p.rarity === 'medium') {
			return [p, p, p];
		}
		if (p.rarity === 'rare') {
			return [p, p];
		}
		return [p];
	});

	return flatMapped[getRandomIndex(flatMapped.length)];
};
