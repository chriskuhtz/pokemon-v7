import { useCallback, useContext } from 'react';
import { mapDisplayNames, MapId } from '../constants/maps/mapsRecord';
import { getRandomEntry } from '../functions/filterTargets';
import { makeTroubleMakers } from '../functions/troubleMakers/troubleMakers';
import { evilTeams, SaveFile } from '../interfaces/SaveFile';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

const getRouteForTroubleMakers = (s: SaveFile): MapId => {
	const options: MapId[] = ['routeN1'];

	if (s.campUpgrades['machete certification']) {
		options.push('routeN1E1');
	}
	if (s.campUpgrades['sledge hammer certification']) {
		options.push('routeE1');
	}
	if (s.campUpgrades['shovel certification']) {
		options.push('onixCave');
	}
	if (s.campUpgrades['swimming certification']) {
		options.push('routeS1E1', 'routeS1W1', 'caveW1');
	}
	if (s.campUpgrades['buy skiing equipment']) {
		options.push('routeN1W1');
	}
	return getRandomEntry(options);
};

export const useRangerRadio = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	return useCallback(() => {
		const now = new Date().getTime();
		if (saveFile.troubleMakers) {
			addMessage({
				message: `There are reports of team ${
					saveFile.troubleMakers.affiliation
				} activity at ${mapDisplayNames[saveFile.troubleMakers.route]}`,
				needsNoConfirmation: true,
			});
		} else if (
			!saveFile.nextTroubleMakersAt ||
			now > saveFile.nextTroubleMakersAt
		) {
			const route = getRouteForTroubleMakers(saveFile);

			const randomAffiliation = getRandomEntry([...evilTeams]);
			const op = makeTroubleMakers(
				saveFile.rangerLevel ?? 0,
				route,
				saveFile.campUpgrades['warden certification'],
				randomAffiliation
			);

			addMessage({
				message: `There are reports of team rocket activity at ${mapDisplayNames[route]}`,
				needsNoConfirmation: true,
			});

			patchSaveFileReducer({
				troubleMakers: { route, trainers: op, affiliation: randomAffiliation },
			});
		} else {
			addMessage({
				message: 'There are no news, check back later',
				needsNoConfirmation: true,
			});
		}
	}, [addMessage, patchSaveFileReducer, saveFile]);
};
