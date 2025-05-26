import { useCallback, useContext } from 'react';
import { SpriteIcon } from '../components/SpriteIcon/SpriteIcon';
import { ONE_HOUR } from '../constants/gameData';
import { mapDisplayNames } from '../constants/maps/mapsRecord';
import { getRandomEntry } from '../functions/filterTargets';
import { getRandomAvailableRoute } from '../functions/getRandomAvailableRoute';
import { makeTroubleMakers } from '../functions/troubleMakers/troubleMakers';
import { EvilTeam, evilTeams } from '../interfaces/SaveFile';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useRangerRadio = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	return useCallback(() => {
		const sprite = (affiliation: EvilTeam) => {
			if (affiliation === 'magma') {
				return SpriteEnum.maxie;
			}
			if (affiliation === 'aqua') {
				return SpriteEnum.archie;
			}
			if (affiliation === 'galactic') {
				return SpriteEnum.galacticMale;
			}

			return SpriteEnum.rocketMale;
		};

		if (saveFile.troubleMakers) {
			addMessage({
				icon: (
					<SpriteIcon sprite={sprite(saveFile.troubleMakers.affiliation)} />
				),
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
				icon: <SpriteIcon sprite={sprite(randomAffiliation)} />,
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
