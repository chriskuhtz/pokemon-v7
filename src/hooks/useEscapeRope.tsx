import { useCallback, useContext, useMemo } from 'react';
import { joinInventories } from '../interfaces/Inventory';
import { SaveFileContext } from './useSaveFile';

export const useEscapeRope = (): {
	applyEscapeRope: () => void;
	disabled: boolean;
} => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

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

		patchSaveFileReducer({
			...saveFile,
			bag: joinInventories(saveFile.bag, { 'escape-rope': 1 }, true),
			location: {
				...saveFile.location,
				x: 1,
				y: 1,
				orientation: 'DOWN',
				mapId: 'camp',
			},
			meta: { ...saveFile, activeTab: 'OVERWORLD' },
		});
	}, [disabled, patchSaveFileReducer, saveFile]);

	return { applyEscapeRope, disabled };
};
