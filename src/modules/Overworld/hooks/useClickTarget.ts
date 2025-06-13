import { useCallback, useContext, useEffect, useState } from 'react';
import { MapId } from '../../../constants/maps/mapsRecord';
import { getNextFieldOccupant } from '../../../functions/getNextFieldOccupant';
import { getOverworldDistance } from '../../../functions/getOverworldDistance';
import { isPassable } from '../../../functions/isPassable';
import { LocationContext } from '../../../hooks/LocationProvider';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Occupant, OverworldMap } from '../../../interfaces/OverworldMap';
import { CharacterOrientation } from '../../../interfaces/SaveFile';

export const useClickTarget = (
	assembledMap: OverworldMap,
	setNextInput: React.Dispatch<
		React.SetStateAction<CharacterOrientation | undefined>
	>,
	interactWith: (occ: Occupant | undefined) => void,
	currentOccupants: Occupant[]
): React.Dispatch<
	React.SetStateAction<
		| {
				x: number;
				y: number;
				mapId: MapId;
		  }
		| undefined
	>
> => {
	const { saveFile } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);
	const { latestMessage } = useContext(MessageQueueContext);
	const [clickTarget, setClickTarget] = useState<
		{ x: number; y: number; mapId: MapId } | undefined
	>();

	const isPassableForPlayer = useCallback(
		(pos: { x: number; y: number }) => {
			return isPassable(
				pos,
				assembledMap,
				currentOccupants,
				saveFile.campUpgrades['swimming certification'],
				!!saveFile.flying,
				saveFile.campUpgrades['rock climbing certification']
			);
		},
		[assembledMap, currentOccupants, saveFile.campUpgrades, saveFile.flying]
	);
	useEffect(() => {
		if (latestMessage) {
			setClickTarget(undefined);
			return;
		}
		if (location.mapId != clickTarget?.mapId) {
			setClickTarget(undefined);
			return;
		}
		if (!clickTarget) {
			return;
		}

		const occ = getNextFieldOccupant(clickTarget, currentOccupants);

		if (
			occ?.type !== 'ON_STEP_PORTAL' &&
			getOverworldDistance(clickTarget, location) === 1
		) {
			interactWith(occ);
			return;
		}

		if (
			location.x < clickTarget.x &&
			isPassableForPlayer({ x: location.x + 1, y: location.y })
		) {
			setNextInput('RIGHT');
			return;
		}
		if (
			location.x > clickTarget.x &&
			isPassableForPlayer({ x: location.x - 1, y: location.y })
		) {
			setNextInput('LEFT');
			return;
		}
		if (
			location.y < clickTarget.y &&
			isPassableForPlayer({ x: location.x, y: location.y + 1 })
		) {
			setNextInput('DOWN');
			return;
		}
		if (
			location.y > clickTarget.y &&
			isPassableForPlayer({ x: location.x, y: location.y - 1 })
		) {
			setNextInput('UP');
			return;
		}

		if (
			(clickTarget.x === location.x && clickTarget.y === location.y) ||
			(!isPassableForPlayer(clickTarget) &&
				getOverworldDistance(clickTarget, location) === 1)
		) {
			if (location.x > clickTarget.x) {
				setNextInput('LEFT');
			}
			if (location.x < clickTarget.x) {
				setNextInput('RIGHT');
			}
			if (location.y < clickTarget.y) {
				setNextInput('DOWN');
			}
			if (location.y > clickTarget.y) {
				setNextInput('UP');
			}

			console.log('target reached');
		}

		setClickTarget(undefined);
	}, [
		assembledMap,
		clickTarget,
		interactWith,
		location,
		setNextInput,
		currentOccupants,
		saveFile,
		isPassableForPlayer,
		latestMessage,
	]);

	return setClickTarget;
};
