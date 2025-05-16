import { useCallback, useContext, useMemo } from 'react';
import { startingLocation } from '../constants/gameData';
import { joinInventories } from '../interfaces/Inventory';
import { LocationContext } from './LocationProvider';
import { SaveFileContext } from './useSaveFile';

export const useEscapeRope = (): {
	applyEscapeRope: () => void;
	disabled: boolean;
} => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { setLocation } = useContext(LocationContext);
	const disabled = useMemo(() => {
		if (saveFile.bag['escape-rope'] <= 0) {
			return true;
		}

		return false;
	}, [saveFile]);
	const applyEscapeRope = useCallback(() => {
		if (disabled) {
			return;
		}

		setLocation(startingLocation);
		patchSaveFileReducer({
			...saveFile,
			bag: joinInventories(saveFile.bag, { 'escape-rope': 1 }, true),
			meta: { ...saveFile, activeTab: 'OVERWORLD' },
		});
	}, [disabled, patchSaveFileReducer, saveFile, setLocation]);

	return { applyEscapeRope, disabled };
};
