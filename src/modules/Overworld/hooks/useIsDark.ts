import { useContext, useMemo } from 'react';
import { portraitMode } from '../../../constants/gameData/gameData';
import { MapId, mapsRecord } from '../../../constants/gameData/maps/mapsRecord';
import { LocationContext } from '../../../hooks/LocationProvider';
import { SaveFileContext } from '../../../hooks/useSaveFile';

export const useIsDark = (
	mapId: MapId
): {
	isDark: boolean;
	hasFlashlight: boolean;
	flashLightDirection?:
		| 'ellipse 50% 140% at 50% 35%'
		| 'ellipse 50% 140% at 50% 20%'
		| 'ellipse 50% 140% at 50% 65%'
		| 'ellipse 50% 140% at 50% 80%'
		| 'ellipse at 20% 50%'
		| 'ellipse at 35% 50%'
		| 'ellipse at 80% 50%'
		| 'ellipse at 65% 50%';
} => {
	const map = mapsRecord[mapId];
	const { saveFile } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);

	const hasFlashlight = !!saveFile.campUpgrades['flashlight certification'];
	const flashLightDirection = useMemo(() => {
		if (!hasFlashlight) {
			return;
		}
		if (location.orientation === 'UP') {
			return portraitMode
				? 'ellipse 50% 140% at 50% 35%'
				: 'ellipse 50% 140% at 50% 20%';
		}
		if (location.orientation === 'DOWN') {
			return portraitMode
				? 'ellipse 50% 140% at 50% 65%'
				: 'ellipse 50% 140% at 50% 80%';
		}
		if (location.orientation === 'LEFT') {
			return portraitMode ? 'ellipse at 20% 50%' : 'ellipse at 35% 50%';
		}
		if (location.orientation === 'RIGHT') {
			return portraitMode ? 'ellipse at 80% 50%' : 'ellipse at 65% 50%';
		}
	}, [hasFlashlight, location.orientation]);

	return {
		isDark: !!map.dark,
		hasFlashlight,
		flashLightDirection,
	};
};
