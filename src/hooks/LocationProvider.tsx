import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import {
	localStorageLocationId,
	startingLocation,
} from '../constants/gameData';
import { CharacterLocationData } from '../interfaces/SaveFile';

export interface LocationContextType {
	location: CharacterLocationData;
	setLocation: (x: CharacterLocationData) => void;
}

export const LocationContext = React.createContext({} as LocationContextType);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
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

	const value = useMemo(() => ({ location, setLocation }), [location]);

	return (
		<LocationContext.Provider value={value}>
			{children}
		</LocationContext.Provider>
	);
};
