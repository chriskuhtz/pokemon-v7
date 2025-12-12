import { useCallback, useContext } from 'react';
import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { LocationContext } from '../../../hooks/LocationProvider';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { CharacterLocationData } from '../../../interfaces/SaveFile';
import { useShovel } from './useShovel';
import { Ledge } from '../../../interfaces/Occupant';

export const useInteractWithLedge = () => {
	const { saveFile } = useContext(SaveFileContext);
	const { location, setLocation } = useContext(LocationContext);
	const { addMessage, addMultipleMessages } = useContext(MessageQueueContext);
	const shovel = useShovel();
	return useCallback(
		(ledge: Ledge) => {
			if (saveFile.handledOccupants.some((occ) => occ.id === ledge.id)) {
				return;
			}
			if (saveFile.campUpgrades['shovel certification']) {
				shovel(ledge);
				return;
			}
			if (ledge.passableFrom === getOppositeDirection(location.orientation)) {
				addMessage({
					message: 'You hop down the ledge',
					needsNoConfirmation: true,
				});
				const newPosition = (): CharacterLocationData => {
					if (ledge.passableFrom === 'UP') {
						return { ...location, y: location.y + 2 };
					}
					if (ledge.passableFrom === 'DOWN') {
						return { ...location, y: location.y - 2 };
					}
					if (ledge.passableFrom === 'RIGHT') {
						return { ...location, x: location.x - 2 };
					}
					if (ledge.passableFrom === 'LEFT') {
						return { ...location, x: location.x + 2 };
					}
					return location;
				};
				setLocation(newPosition());
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
			location,
			saveFile.campUpgrades,
			saveFile.handledOccupants,
			setLocation,
			shovel,
		]
	);
};
