import {
	challengeFieldId,
	randomFieldId,
} from '../constants/gameData/gameData';
import { MapId } from '../constants/gameData/maps/mapsRecord';

export const questMenuAvailable = (id: MapId) => {
	return (
		id !== challengeFieldId &&
		id !== randomFieldId &&
		id !== 'labyrinth_level_1'
	);
};
