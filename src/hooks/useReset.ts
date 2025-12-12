import { useCallback, useContext } from 'react';

import { LocationContext } from './LocationProvider';
import { GameDataContext } from './useGameData';
import { SaveFileContext } from './useSaveFile';

export const useReset = () => {
	const { saveFileId, locationId } = useContext(GameDataContext);
	const { reset } = useContext(SaveFileContext);
	const { resetLocation } = useContext(LocationContext);

	return useCallback(() => {
		window.localStorage.removeItem(saveFileId);
		window.localStorage.removeItem(locationId);
		reset();
		resetLocation();
	}, [locationId, reset, resetLocation, saveFileId]);
};
