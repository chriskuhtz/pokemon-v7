import { useCallback, useContext } from 'react';
import {
	localStorageLocationId,
	localStorageSaveFileId,
} from '../constants/gameData';
import { LocationContext } from './LocationProvider';
import { SaveFileContext } from './useSaveFile';

export const useReset = () => {
	const { reset } = useContext(SaveFileContext);
	const { resetLocation } = useContext(LocationContext);

	return useCallback(() => {
		window.localStorage.removeItem(localStorageSaveFileId);
		window.localStorage.removeItem(localStorageLocationId);
		reset();
		resetLocation();
	}, [reset, resetLocation]);
};
