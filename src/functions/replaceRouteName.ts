import {
	MapId,
	mapDisplayNames,
	mapIds,
} from '../constants/gameData/maps/mapsRecord';

export const replaceRouteName = (input: string): string => {
	return input
		.split(' ')
		.map((word) => {
			if (mapIds.includes(word as MapId)) {
				return mapDisplayNames[word as MapId];
			}
			return word;
		})
		.join(' ');
};
