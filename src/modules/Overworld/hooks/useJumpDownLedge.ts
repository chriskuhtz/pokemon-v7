import { useCallback, useContext } from 'react';
import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Ledge } from '../../../interfaces/OverworldMap';
import { CharacterLocationData } from '../../../interfaces/SaveFile';

export const useJumpDownLedge = () => {
	const { saveFile, setCharacterLocationReducer } = useContext(SaveFileContext);
	const { addMessage, addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(
		(ledge: Ledge) => {
			if (saveFile.handledOccupants.some((occ) => occ.id === ledge.id)) {
				return;
			}
			if (
				ledge.passableFrom ===
				getOppositeDirection(saveFile.location.orientation)
			) {
				addMessage({
					message: 'You hop down the ledge',
					needsNoConfirmation: true,
				});
				const newPosition = (): CharacterLocationData => {
					if (ledge.passableFrom === 'UP') {
						return { ...saveFile.location, y: saveFile.location.y + 2 };
					}
					if (ledge.passableFrom === 'RIGHT') {
						return { ...saveFile.location, x: saveFile.location.x - 2 };
					}
					if (ledge.passableFrom === 'LEFT') {
						return { ...saveFile.location, x: saveFile.location.x + 2 };
					}
					return saveFile.location;
				};
				setCharacterLocationReducer(newPosition());
			} else
				addMultipleMessages([
					{
						message: 'The ledge is too steep to climb',
						needsNoConfirmation: true,
					},
					{
						message: 'Someone with a shovel certification',
						needsNoConfirmation: true,
					},
					{
						message: 'would be allowed to flatten it',
						needsNoConfirmation: true,
					},
					{
						message: '...bureaucracy',
						needsNoConfirmation: true,
					},
				]);
			return;
		},
		[
			addMessage,
			addMultipleMessages,
			saveFile.handledOccupants,
			saveFile.location,
			setCharacterLocationReducer,
		]
	);
};
