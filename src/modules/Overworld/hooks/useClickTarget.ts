import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MapId } from '../../../constants/gameData/maps/mapsRecord';
import { getNextFieldOccupant } from '../../../functions/getNextFieldOccupant';
import { getOverworldDistance } from '../../../functions/getOverworldDistance';
import { isPassable } from '../../../functions/isPassable';
import { LocationContext } from '../../../hooks/LocationProvider';
import { GameDataContext } from '../../../hooks/useGameData';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { ScreenTransitionContext } from '../../../hooks/useScreenTransitionEffects';
import { Occupant } from '../../../interfaces/Occupant';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { CharacterOrientation } from '../../../interfaces/SaveFile';
import { Pathfinder, PathfindingApproach } from '../../../model/Pathfinder';
import { Vector2 } from '../../../model/Vector2';

export const useClickTarget = (
	assembledMap: OverworldMap,
	setNextInput: (x: CharacterOrientation | undefined) => void,
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
	const gameData = useContext(GameDataContext);
	const { latestMessage } = useContext(MessageQueueContext);
	const { transition } = useContext(ScreenTransitionContext);
	const [clickTarget, setClickTarget] = useState<
		{ x: number; y: number; mapId: MapId } | undefined
	>();
	const canSwim = gameData.overworldActions.swimming.possible(saveFile);
	const canRockClimb =
		gameData.overworldActions.rockClimbing.possible(saveFile);

	const isPassableForPlayer = useCallback(
		(pos: { x: number; y: number }) => {
			return isPassable({
				nextLocation: pos,
				playerLocation: location,
				map: assembledMap,
				currentOccupants,
				canSwim,
				flying: !!saveFile.flying,
				canClimb: canRockClimb,
			});
		},
		[
			assembledMap,
			canRockClimb,
			canSwim,
			currentOccupants,
			location,
			saveFile.flying,
		]
	);

	const [lastClickTarget, setLastClickTarget] = useState<Vector2 | undefined>();

	const pathfinding = useMemo(() => {
		return new Pathfinder(
			assembledMap,
			currentOccupants,
			canSwim,
			!!saveFile.flying,
			canRockClimb
		);
	}, [assembledMap, canRockClimb, canSwim, currentOccupants, saveFile.flying]);

	// compute path on target change
	useEffect(() => {
		if (latestMessage || transition) {
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
		transition,
	]);

	return setClickTarget;
};
