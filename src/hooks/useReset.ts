import { useContext, useCallback } from 'react';
import { testState, startingLocation } from '../constants/gameData';
import { LocationContext } from './LocationProvider';
import { SaveFileContext } from './useSaveFile';

export const useReset = () => {
	const { putSaveFileReducer } = useContext(SaveFileContext);
	const { setLocation } = useContext(LocationContext);

	return useCallback(() => {
		putSaveFileReducer(testState);
		setLocation(startingLocation);
	}, [putSaveFileReducer, setLocation]);
};
