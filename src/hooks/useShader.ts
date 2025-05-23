import { useContext, useMemo } from 'react';
import { mapsRecord } from '../constants/maps/mapsRecord';
import {
	futureShader,
	getTimeOfDay,
	pastShader,
	spaceShader,
} from '../functions/getTimeOfDay';
import { LocationContext } from './LocationProvider';
import { SaveFileContext } from './useSaveFile';

export const useShader = () => {
	const { saveFile } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);
	return useMemo(() => {
		const map = mapsRecord[location.mapId];
		if (
			saveFile.currentDistortionSwarm &&
			location.mapId === saveFile.currentDistortionSwarm.route
		) {
			if (saveFile.currentDistortionSwarm.type === 'FUTURE') {
				return futureShader;
			}
			if (saveFile.currentDistortionSwarm.type === 'PAST') {
				return pastShader;
			}
			return spaceShader;
		}
		return map.timeOfDayShadersMap[getTimeOfDay()];
	}, [location.mapId, saveFile.currentDistortionSwarm]);
};
