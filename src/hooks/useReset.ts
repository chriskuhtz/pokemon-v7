import { useCallback, useContext } from 'react';
import {
	localStorageLocationId,
	localStorageSaveFileId,
	startingLocation,
} from '../constants/gameData';
import { LocationContext } from './LocationProvider';
import { SaveFileContext } from './useSaveFile';

export const useReset = () => {
	const { reset } = useContext(SaveFileContext);
	const { setLocation } = useContext(LocationContext);

	return useCallback(() => {
		window.localStorage.removeItem(localStorageSaveFileId);
		window.localStorage.removeItem(localStorageLocationId);
		reset();
		setLocation(startingLocation);
	}, [reset, setLocation]);
};
