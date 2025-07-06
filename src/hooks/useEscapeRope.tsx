import { useCallback, useContext, useMemo } from 'react';
import { mapsRecord } from '../constants/maps/mapsRecord';
import { joinInventories } from '../interfaces/Inventory';
import { LocationContext } from './LocationProvider';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useEscapeRope = (): {
	applyEscapeRope: () => void;
	disabled: boolean;
} => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { resetLocation, location } = useContext(LocationContext);
	const { addMessage } = useContext(MessageQueueContext);
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
		if (mapsRecord[location.mapId].area !== 'CAVE') {
			addMessage({ message: `Escape Rope only works in caves` });
			return;
		}
		resetLocation();
		patchSaveFileReducer({
			...saveFile,
			bag: joinInventories(saveFile.bag, { 'escape-rope': 1 }, true),
			meta: { ...saveFile, activeTab: 'OVERWORLD' },
		});
	}, [
		addMessage,
		disabled,
		location.mapId,
		patchSaveFileReducer,
		saveFile,
		resetLocation,
	]);

	return { applyEscapeRope, disabled };
};
