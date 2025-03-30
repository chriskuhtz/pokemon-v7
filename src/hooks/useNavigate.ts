import { useCallback, useContext } from 'react';
import { RoutesType } from '../interfaces/Routing';
import { SaveFileContext } from './useSaveFile';

export const useNavigate = (): ((
	currentRoute: RoutesType,
	newRoute: RoutesType,
	stepsWalked?: number
) => void) => {
	const { setActiveTabReducer, navigateAwayFromOverworldReducer } =
		useContext(SaveFileContext);

	return useCallback(
		(currentRoute: RoutesType, newRoute: RoutesType, stepsWalked?: number) => {
			if (currentRoute === 'OVERWORLD') {
				navigateAwayFromOverworldReducer(newRoute, stepsWalked ?? 0);
			} else setActiveTabReducer(newRoute);
		},
		[navigateAwayFromOverworldReducer, setActiveTabReducer]
	);
};
