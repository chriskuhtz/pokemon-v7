import { MapId, mapsRecord } from '../constants/gameData/maps/mapsRecord';
import { GameData } from '../interfaces/GameData';

export const questMenuAvailable = (id: MapId, gameData: GameData) => {
	const { questMenuAvailable } = mapsRecord[id];
	return questMenuAvailable && gameData.features.quests;
};
