import { MapId, mapsRecord } from '../constants/gameData/maps/mapsRecord';
import { SettingsObject } from '../interfaces/SettingsObject';

export const questMenuAvailable = (
	id: MapId,
	settings: SettingsObject | undefined
) => {
	const { questMenuAvailable } = mapsRecord[id];
	return questMenuAvailable && !settings?.questsTabHidden;
};
