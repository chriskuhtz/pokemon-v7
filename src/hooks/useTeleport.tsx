import { useCallback, useContext, useMemo } from 'react';
import { startingLocation } from '../constants/gameData';
import { getMovesArray } from '../functions/getMovesArray';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';
export const useTeleport = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);
	const teleporter = useMemo(
		() =>
			saveFile.pokemon.find(
				(p) => p.onTeam && getMovesArray(p).some((m) => m.name === 'teleport')
			),
		[saveFile.pokemon]
	);
	const teleportHome = useCallback(() => {
		if (teleporter) {
			addMessage({
				message: `Your Pokemon teleported you back to camp`,
				needsNoConfirmation: true,
			});
			patchSaveFileReducer({
				location: startingLocation,
				meta: { ...saveFile.meta, activeTab: 'OVERWORLD' },
			});
		}
	}, [addMessage, patchSaveFileReducer, saveFile.meta, teleporter]);
	return { teleporter, teleportHome };
};
