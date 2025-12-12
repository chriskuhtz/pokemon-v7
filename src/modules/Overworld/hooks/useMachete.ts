import { useCallback, useContext } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { OverworldBush } from '../../../interfaces/Occupant';

export const useMachete = () => {
	const { saveFile, handleOccupantReducer } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(
		(bush: OverworldBush) => {
			if (saveFile.handledOccupants.some((occ) => occ.id === bush.id)) {
				return;
			}
			if (saveFile.campUpgrades['machete certification']) {
				addMultipleMessages([
					{
						message: 'You use your certified machete skills',
						onRemoval: () => handleOccupantReducer(bush),
					},
				]);
			} else
				addMultipleMessages([
					{ message: 'You need a machete certification to cut bushes' },
					{ message: 'bureaucracy ...' },
				]);
			return;
		},
		[addMultipleMessages, handleOccupantReducer, saveFile]
	);
};
