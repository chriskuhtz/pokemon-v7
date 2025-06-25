import { useContext, useMemo } from 'react';
import { MapId, mapsRecord } from '../../../constants/maps/mapsRecord';
import { LocationContext } from '../../../hooks/LocationProvider';
import { SaveFileContext } from '../../../hooks/useSaveFile';

export const useIsDark = (
	mapId: MapId
): {
	isDark: boolean;
	hasFlashlight: boolean;
	flashLightDirection?:
		| 'ellipse at top'
		| 'ellipse at bottom'
		| 'ellipse at left'
		| 'ellipse at right';
} => {
	const map = mapsRecord[mapId];
	const { saveFile } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);

	const hasFlashlight = !!saveFile.campUpgrades['flashlight certification'];
	const flashLightDirection = useMemo(() => {
		if (!hasFlashlight) {
			return;
		}
		if (location.orientation === 'DOWN') {
			return 'ellipse at bottom';
		}
		if (location.orientation === 'RIGHT') {
			return 'ellipse at right';
		}
		if (location.orientation === 'LEFT') {
			return 'ellipse at left';
		}
		if (location.orientation === 'UP') {
			return 'ellipse at top';
		}
	}, [hasFlashlight, location.orientation]);

	return {
		isDark: !!map.dark,
		hasFlashlight,
		flashLightDirection,
	};
};
