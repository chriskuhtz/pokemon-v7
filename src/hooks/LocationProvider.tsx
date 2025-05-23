import React, {
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	localStorageLocationId,
	startingLocation,
} from '../constants/gameData';
import { CharacterLocationData } from '../interfaces/SaveFile';
import { SaveFileContext } from './useSaveFile';

export interface LocationContextType {
	location: CharacterLocationData;
	setLocation: (x: CharacterLocationData) => void;
}

export const LocationContext = React.createContext({} as LocationContextType);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const initValue: CharacterLocationData = useMemo(() => {
		const local = window.localStorage.getItem(localStorageLocationId);
		return local
			? (JSON.parse(local) as CharacterLocationData)
			: startingLocation;
	}, []);
	const [location, setLocation] = useState<CharacterLocationData>(initValue);

	//SYNC WITH LOCAL STORAGE
	useEffect(() => {
		window.localStorage.setItem(
			localStorageLocationId,
			JSON.stringify(location)
		);
	}, [location]);

	//reset catch streak on location change
	useEffect(() => {
		if (!saveFile.catchStreak) {
			return;
		}
		if (location.mapId !== saveFile.catchStreak.mapId) {
			patchSaveFileReducer({ catchStreak: undefined });
		}
	}, [location, patchSaveFileReducer, saveFile]);

	const value = useMemo(() => ({ location, setLocation }), [location]);

	return (
		<LocationContext.Provider value={value}>
			{children}
		</LocationContext.Provider>
	);
};
