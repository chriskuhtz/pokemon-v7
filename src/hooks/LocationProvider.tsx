import React, {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	localStorageLocationId,
	startingLocation,
} from '../constants/gameData';
import { resetEliteFour } from '../functions/resetChallengeFielders';
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
	const [location, s] = useState<CharacterLocationData>(initValue);

	const setLocation = useCallback(
		(l: CharacterLocationData) => {
			//reset e4 when entering league
			if (l.mapId == 'pokemonLeague' && location.mapId !== 'pokemonLeague') {
				patchSaveFileReducer({
					handledOccupants: resetEliteFour(saveFile.handledOccupants),
				});
			}
			s(l);
		},
		[location.mapId, patchSaveFileReducer, saveFile.handledOccupants]
	);

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

	const value = useMemo(
		() => ({ location, setLocation }),
		[location, setLocation]
	);

	return (
		<LocationContext.Provider value={value}>
			{children}
		</LocationContext.Provider>
	);
};
