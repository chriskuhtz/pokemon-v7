import { useCallback, useContext } from 'react';
import { startingLocation, testState } from '../constants/gameData';
import { LocationContext } from './LocationProvider';
import { SaveFileContext } from './useSaveFile';

export const useReset = () => {
	const { patchSaveFileReducer } = useContext(SaveFileContext);
	const { setLocation } = useContext(LocationContext);

	return useCallback(() => {
		patchSaveFileReducer(testState);
		setLocation(startingLocation);
	}, [patchSaveFileReducer, setLocation]);
};
