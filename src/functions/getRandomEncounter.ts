import { OverworldEncounter, OverworldMap } from '../interfaces/OverworldMap';
import { getTimeOfDay } from './getTimeOfDay';

export const getRandomEncounter = (map: OverworldMap): OverworldEncounter =>
	map.possibleEncounters[getTimeOfDay()][
		Math.floor(Math.random() * map.possibleEncounters[getTimeOfDay()].length)
	];
