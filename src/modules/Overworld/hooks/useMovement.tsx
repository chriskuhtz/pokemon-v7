/**
 * What could the next field be:
 * out of bounds
 * occupied
 * free
 * encountergrass
 * onStepEvent
 * water
 *
 * influences on the player:
 * devmode
 * flying
 *
 * what happens if field is:
 * 	out of bounds:
 * 		dont move
 * 	occupied:
 * 		dont move
 * 	free:
 * 		move to field
 * 	encountergrass:
 * 		move to grass
 * 		maybe start encounter
 * 	water (can swim):
 * 		move to water
 * 		maybe start encounter
 * 	water (cant swim):
 * 		dont move
 *
 */

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fps } from '../../../constants/gameData/gameData';
import { mapsRecord } from '../../../constants/gameData/maps/mapsRecord';
import { getNextForwardFoot } from '../../../functions/getNextForwardFoot';
import { updatePosition } from '../../../functions/updatePosition';
import { LocationContext } from '../../../hooks/LocationProvider';
import { GameDataContext } from '../../../hooks/useGameData';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { ScreenTransitionContext } from '../../../hooks/useScreenTransitionEffects';
import {
	Occupant,
	OnStepDialogue,
	OnStepPortal,
	OnStepRouter,
} from '../../../interfaces/Occupant';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { CharacterOrientation } from '../../../interfaces/SaveFile';
import { baseEncounterRate } from '../constants/constants';
import { useStartEncounter } from './useStartEncounter';

export const useMovement = (
	currentOccupants: Occupant[],
	stepsTaken: number,
	setStepsTaken: (x: number) => void
) => {
	const [encounterChance, setEncounterChance] =
		useState<number>(baseEncounterRate);
	const [nextInput, setNextInput] = useState<CharacterOrientation>();
	const { location, setLocation } = useContext(LocationContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const gameData = useContext(GameDataContext);
	const { addMultipleMessages, latestMessage } =
		useContext(MessageQueueContext);
	const { transition } = useContext(ScreenTransitionContext);

	const map = useMemo(
		(): OverworldMap => mapsRecord[location.mapId],
		[location.mapId]
	);

	const addInput = useCallback(
		(input: CharacterOrientation | undefined) => {
			if (nextInput) {
				return;
			}
			setNextInput(input);
		},
		[nextInput]
	);

	const canSwim = gameData.overworldActions.swimming.possible(saveFile);
	const canRockClimb =
		gameData.overworldActions.rockClimbing.possible(saveFile);
	const isFlying = !!saveFile.flying;

	const steptOnPortal: OnStepPortal | undefined = useMemo(
		() =>
			currentOccupants.find(
				(o) =>
					o.type === 'ON_STEP_PORTAL' &&
					o.conditionFunction(saveFile) === true &&
					o.x === location.x &&
					o.y === location.y
			) as OnStepPortal | undefined,
		[currentOccupants, location.x, location.y, saveFile]
	);
	const steptOnDialogue: OnStepDialogue | undefined = useMemo(
		() =>
			currentOccupants.find(
				(o) =>
					o.type === 'ON_STEP_DIALOGUE' &&
					o.conditionFunction(saveFile) === true &&
					o.x === location.x &&
					o.y === location.y
			) as OnStepDialogue | undefined,
		[currentOccupants, location.x, location.y, saveFile]
	);
	const steptOnRouter: OnStepRouter | undefined = useMemo(
		() =>
			currentOccupants.find(
				(o) =>
					o.type === 'ON_STEP_ROUTER' &&
					o.conditionFunction(saveFile) === true &&
					o.x === location.x &&
					o.y === location.y
			) as OnStepRouter | undefined,
		[currentOccupants, location.x, location.y, saveFile]
	);

	const encounterWillHappen = useMemo((): 'WATER' | 'GROUND' | undefined => {
		if (map.peaceful) {
			return;
		}
		if (isFlying) {
			return;
		}
		if (
			map.tileMap.encounterLayer[location.y][location.x] &&
			encounterChance > Math.random()
		) {
			return 'GROUND';
		}
		if (
			map.tileMap.waterLayer[location.y][location.x] &&
			canSwim &&
			encounterChance > Math.random()
		) {
			return 'WATER';
		}
	}, [
		canSwim,
		encounterChance,
		isFlying,
		location,
		map.peaceful,
		map.tileMap.encounterLayer,
		map.tileMap.waterLayer,
	]);

	const startEncounter = useStartEncounter();

	useEffect(() => {
		const engine = setTimeout(() => {
			//dont do anything if in dialogue or transition
			if (nextInput && (latestMessage || transition)) {
				setNextInput(undefined);
			}
			//reset player feet if there is no more input
			else if (
				!nextInput &&
				!['CENTER1', 'CENTER2'].includes(location.forwardFoot)
			) {
				setLocation({
					...location,
					forwardFoot: getNextForwardFoot(location.forwardFoot),
				});
			}

			//handle portals
			else if (steptOnPortal) {
				setLocation(steptOnPortal.portal);
				setEncounterChance(baseEncounterRate);
			}
			//handle dialogues
			else if (steptOnDialogue) {
				addMultipleMessages(
					steptOnDialogue.dialogue.map((d) => ({
						message: d,
					}))
				);
				patchSaveFileReducer({
					handledOccupants: [
						...saveFile.handledOccupants,
						{ id: steptOnDialogue.id, resetAt: -1 },
					],
				});
				setNextInput(undefined);
				setEncounterChance(baseEncounterRate);
				return;
			}
			//handle routers
			else if (steptOnRouter) {
				patchSaveFileReducer({
					...saveFile,
					meta: { ...saveFile.meta, activeTab: steptOnRouter.route },
				});
				setNextInput(undefined);
				setEncounterChance(baseEncounterRate);
				return;
			}
			//maybe start encounter
			else if (encounterWillHappen) {
				setEncounterChance(baseEncounterRate);
				startEncounter(stepsTaken, encounterWillHappen);
			}
			//rotate player
			else if (nextInput && nextInput !== location.orientation) {
				setLocation({
					...location,
					orientation: nextInput,
					forwardFoot: getNextForwardFoot(location.forwardFoot),
				});
			}
			//walk player
			else if (nextInput && nextInput === location.orientation) {
				setStepsTaken(stepsTaken + 1);
				setEncounterChance((cur) => cur + baseEncounterRate);
				setLocation({
					...location,
					...updatePosition(
						location,
						nextInput,
						map,
						currentOccupants,
						canSwim,
						isFlying,
						canRockClimb
					),
					forwardFoot: getNextForwardFoot(location.forwardFoot),
				});
			}
			//remove input after handling
			setNextInput(undefined);
		}, fps);
		return () => clearTimeout(engine);
	}, [
		addMultipleMessages,
		canRockClimb,
		canSwim,
		currentOccupants,
		encounterWillHappen,
		isFlying,
		latestMessage,
		location,
		map,
		nextInput,
		patchSaveFileReducer,
		saveFile,
		setLocation,
		setStepsTaken,
		startEncounter,
		stepsTaken,
		steptOnDialogue,
		steptOnPortal,
		steptOnRouter,
		transition,
	]);

	return addInput;
};
