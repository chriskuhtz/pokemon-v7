import { useCallback, useContext } from 'react';

import { LocationContext } from './LocationProvider';
import { GameDataContext } from './useGameData';
import { SaveFileContext } from './useSaveFile';

export const useReset = () => {
	const { saveFileId, locationId } = useContext(GameDataContext);
	const { reset, saveFile } = useContext(SaveFileContext);
	const { resetLocation } = useContext(LocationContext);

	return useCallback(() => {
		saveFile.handledOccupants.forEach((h) => {
			window.localStorage.removeItem(h.id);
		});
		window.localStorage.removeItem(saveFileId);
		window.localStorage.removeItem(locationId);
		reset();
		resetLocation();
	}, [locationId, reset, resetLocation, saveFile.handledOccupants, saveFileId]);
};
