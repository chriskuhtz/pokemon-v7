import { useCallback, useContext } from 'react';
import { ONE_DAY } from '../../../constants/gameData/gameData';
import { GameDataContext } from '../../../hooks/useGameData';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { OverworldBush } from '../../../interfaces/Occupant';

export const useMachete = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);
	const { overworldActions } = useContext(GameDataContext);

	return useCallback(
		(bush: OverworldBush) => {
			if (saveFile.handledOccupants.some((occ) => occ.id === bush.id)) {
				return;
			}
			if (overworldActions.bushCutting.possible(saveFile)) {
				addMultipleMessages(
					overworldActions.bushCutting.successDialogue.map((d, i) => ({
						message: d,
						onRemoval:
							i === overworldActions.bushCutting.successDialogue.length - 1
								? () =>
										patchSaveFileReducer({
											handledOccupants: [
												...saveFile.handledOccupants,
												{
													id: bush.id,
													resetAt: new Date().getTime() + ONE_DAY,
												},
											],
										})
								: undefined,
					}))
				);
			} else
				addMultipleMessages(
					overworldActions.bushCutting.failDialogue.map((d) => ({
						message: d,
					}))
				);
		},
		[
			addMultipleMessages,
			overworldActions.bushCutting,
			patchSaveFileReducer,
			saveFile,
		]
	);
};
