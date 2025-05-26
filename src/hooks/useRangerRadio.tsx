import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { mapDisplayNames } from '../constants/maps/mapsRecord';
import { getRandomEntry } from '../functions/filterTargets';
import { getRandomAvailableRoute } from '../functions/getRandomAvailableRoute';
import { makeTroubleMakers } from '../functions/troubleMakers/troubleMakers';
import { evilTeams } from '../interfaces/SaveFile';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useRangerRadio = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	return useCallback(() => {
		if (saveFile.troubleMakers) {
			addMessage({
				message: `There are reports of team ${
					saveFile.troubleMakers.affiliation
				} activity at ${mapDisplayNames[saveFile.troubleMakers.route]}`,
				needsNoConfirmation: true,
			});
		} else {
			const route = getRandomAvailableRoute(saveFile, []);

			if (!route) {
				return;
			}

			const randomAffiliation = getRandomEntry([...evilTeams]);
			const op = makeTroubleMakers(
				route,
				saveFile.campUpgrades['warden certification'],
				randomAffiliation
			);

			addMessage({
				message: `There are reports of team ${randomAffiliation} activity at ${mapDisplayNames[route]}`,
				needsNoConfirmation: true,
			});
			const now = new Date().getTime();
			patchSaveFileReducer({
				troubleMakers: {
					route,
					trainers: op,
					affiliation: randomAffiliation,
					leavesAt: now + ONE_HOUR * 3,
				},
			});
		}
	}, [addMessage, patchSaveFileReducer, saveFile]);
};
