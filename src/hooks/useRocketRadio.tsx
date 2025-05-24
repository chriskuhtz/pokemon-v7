import { useCallback, useContext } from 'react';
import { mapDisplayNames, MapId } from '../constants/maps/mapsRecord';
import { getRandomEntry } from '../functions/filterTargets';
import { createRocketOutbreak } from '../functions/teamRocket';
import { SaveFile } from '../interfaces/SaveFile';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

const getRouteForRockets = (s: SaveFile): MapId => {
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

export const useRocketRadio = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	return useCallback(() => {
		const now = new Date().getTime();
		if (saveFile.rocketOperation) {
			addMessage({
				message: `There are reports of team rocket activity at ${
					mapDisplayNames[saveFile.rocketOperation.route]
				}`,
				needsNoConfirmation: true,
			});
		} else if (
			!saveFile.nextRocketOperationAt ||
			now > saveFile.nextRocketOperationAt
		) {
			const route = getRouteForRockets(saveFile);
			const op = createRocketOutbreak(
				saveFile.rangerLevel ?? 0,
				route,
				saveFile.campUpgrades['warden certification']
			);

			addMessage({
				message: `There are reports of team rocket activity at ${mapDisplayNames[route]}`,
				needsNoConfirmation: true,
			});

			patchSaveFileReducer({
				rocketOperation: { route, trainers: op },
			});
		} else {
			addMessage({
				message: 'There are no news, check back later',
				needsNoConfirmation: true,
			});
		}
	}, [addMessage, patchSaveFileReducer, saveFile]);
};
