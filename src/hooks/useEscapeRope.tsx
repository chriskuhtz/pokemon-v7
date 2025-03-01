import { useCallback, useContext, useMemo } from 'react';
import { SaveFileContext } from './useSaveFile';

export const useEscapeRope = (): {
	applyEscapeRope: () => void;
	disabled: boolean;
} => {
	const { saveFile } = useContext(SaveFileContext);

	const disabled = useMemo(() => {
		if (saveFile.inventory['escape-rope'] <= 0) {
			return true;
		}
		if (!saveFile.lastNurse) {
			return true;
		}
		return false;
	}, [saveFile]);
	const applyEscapeRope = useCallback(() => {
		// if (disabled) {
		// 	return;
		// }
		// const lastNurse = Object.entries(occupantsRecord).find(
		// 	([id]) => id === saveFile.lastNurse
		// )?.[1];
		// if (!lastNurse) {
		// 	return;
		// }
		// putSaveFileReducer({
		// 	...saveFile,
		// 	inventory: joinInventories(
		// 		saveFile.inventory,
		// 		{ 'escape-rope': 1 },
		// 		true
		// 	),
		// 	// location: {
		// 	// 	...saveFile.location,
		// 	// 	x: lastNurse.x,
		// 	// 	y: lastNurse.y + 1,
		// 	// 	orientation: 'UP',
		// 	// 	mapId: lastNurse.map,
		// 	// },
		// 	meta: { ...saveFile, activeTab: 'OVERWORLD' },
		// });
	}, []);

	return { applyEscapeRope, disabled };
};
