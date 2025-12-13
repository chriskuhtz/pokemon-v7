import {
	challengeFieldId,
	randomFieldId,
} from '../constants/gameData/gameData';
import { MapId } from '../constants/gameData/maps/mapsRecord';
import { SettingsObject } from '../interfaces/SettingsObject';

export const questMenuAvailable = (
	id: MapId,
	settings: SettingsObject | undefined
) => {
	return (
		!settings?.questsTabHidden &&
		id !== challengeFieldId &&
		id !== randomFieldId &&
		id !== 'labyrinth_level_1'
	);
};
