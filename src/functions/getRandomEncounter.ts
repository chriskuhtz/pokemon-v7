import { OverworldEncounter, OverworldMap } from '../interfaces/OverworldMap';
import { getRandomIndex } from './filterTargets';
import { getTimeOfDay } from './getTimeOfDay';

export const getRandomEncounter = (map: OverworldMap): OverworldEncounter => {
	const flatMapped = map.possibleEncounters[getTimeOfDay()].flatMap((p) => {
		if (p.rarity === 'common') {
			return [p, p, p, p, p, p, p];
		}
		if (p.rarity === 'medium') {
			return [p, p, p, p, p];
		}
		if (p.rarity === 'rare') {
			return [p, p];
		}
		return [p];
	});

	return flatMapped[getRandomIndex(flatMapped.length)];
};
