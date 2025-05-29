import { useCallback, useContext } from 'react';
import {
	localStorageLocationId,
	localStorageSaveFileId,
	startingLocation,
	testState,
} from '../constants/gameData';
import { LocationContext } from './LocationProvider';
import { SaveFileContext } from './useSaveFile';

export const useReset = () => {
	const { patchSaveFileReducer } = useContext(SaveFileContext);
	const { setLocation } = useContext(LocationContext);

	return useCallback(() => {
		window.localStorage.removeItem(localStorageSaveFileId);
		window.localStorage.removeItem(localStorageLocationId);
		patchSaveFileReducer(testState);
		setLocation(startingLocation);
	}, [patchSaveFileReducer, setLocation]);
};
