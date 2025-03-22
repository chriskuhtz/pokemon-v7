import { useContext, useCallback } from 'react';
import { ONE_HOUR } from '../../../constants/gameData';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { OverworldRock } from '../../../interfaces/OverworldMap';

export const useSledgeHammer = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(
		(rock: OverworldRock) => {
			if (saveFile.handledOccupants.some((occ) => occ.id === rock.id)) {
				return;
			}
			if (saveFile.campUpgrades['sledge hammer certification']) {
				addMultipleMessages([
					{
						message: 'You use your certified sledge hammer skills',
						onRemoval: () =>
							patchSaveFileReducer({
								handledOccupants: [
									...saveFile.handledOccupants,
									{ id: rock.id, resetAt: new Date().getTime() + ONE_HOUR },
								],
							}),
					},
				]);
			} else
				addMultipleMessages([
					{
						message: 'You need a sledge hammer certification to demolish rocks',
					},
					{ message: 'bureaucracy ...' },
				]);
			return;
		},
		[
			addMultipleMessages,
			patchSaveFileReducer,
			saveFile.campUpgrades,
			saveFile.handledOccupants,
		]
	);
};
