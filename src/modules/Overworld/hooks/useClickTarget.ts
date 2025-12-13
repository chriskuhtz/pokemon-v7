import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MapId } from '../../../constants/gameData/maps/mapsRecord';
import { getNextFieldOccupant } from '../../../functions/getNextFieldOccupant';
import { getOverworldDistance } from '../../../functions/getOverworldDistance';
import { isPassable } from '../../../functions/isPassable';
import { LocationContext } from '../../../hooks/LocationProvider';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Occupant } from '../../../interfaces/Occupant';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { CharacterOrientation } from '../../../interfaces/SaveFile';
import { Pathfinder, PathfindingApproach } from '../../../model/Pathfinder';
import { Vector2 } from '../../../model/Vector2';

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
			return isPassable({
				nextLocation: pos,
				playerLocation: location,
				map: assembledMap,
				currentOccupants,
				canSwim: saveFile.campUpgrades['swimming certification'],
				flying: !!saveFile.flying,
				canClimb: saveFile.campUpgrades['rock climbing certification'],
			});
		},
		[
			assembledMap,
			currentOccupants,
			location,
			saveFile.campUpgrades,
			saveFile.flying,
		]
	);

	const [lastClickTarget, setLastClickTarget] = useState<Vector2 | undefined>();

	const pathfinding = useMemo(() => {
		return new Pathfinder(
			assembledMap,
			currentOccupants,
			saveFile.campUpgrades['swimming certification'],
			!!saveFile.flying,
			saveFile.campUpgrades['rock climbing certification']
		);
	}, [assembledMap, currentOccupants, saveFile.campUpgrades, saveFile.flying]);

	// compute path on target change
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
		const locationVector = new Vector2(location.x, location.y);
		const clickTargetVector = new Vector2(clickTarget.x, clickTarget.y);

		if (
			!lastClickTarget ||
			lastClickTarget.toString() !== clickTargetVector.toString()
		) {
			setLastClickTarget(clickTargetVector);
			pathfinding.computePath(
				locationVector,
				clickTargetVector,
				saveFile.settings?.seekOutEncounters
					? PathfindingApproach.SEEK
					: PathfindingApproach.AVOID_ENCOUNTER,
				!!saveFile.settings?.unlimitedPathfindingRange
			);
		}
		const nextDirection = pathfinding.getNextDirection(locationVector);
		const occupantMet =
			occ &&
			occ?.type !== 'ON_STEP_PORTAL' &&
			occ?.type !== 'ON_STEP_DIALOGUE' &&
			occ?.type !== 'ON_STEP_ROUTER' &&
			getOverworldDistance(clickTarget, location) === 1;
		const targetReached = nextDirection.toString() === Vector2.ZERO.toString();

		if (targetReached || occupantMet) {
			if (occupantMet) {
				interactWith(occ);
			}

			pathfinding.clearPath();
			setClickTarget(undefined);
			console.log('Target reached');
		} else {
			setNextInput(nextDirection.getInputForDirection());
		}
	}, [
		pathfinding,
		assembledMap,
		clickTarget,
		interactWith,
		location,
		setNextInput,
		currentOccupants,
		saveFile,
		isPassableForPlayer,
		latestMessage,
		lastClickTarget,
	]);

	return setClickTarget;
};
