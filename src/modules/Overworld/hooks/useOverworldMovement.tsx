import { useContext, useEffect, useMemo, useState } from 'react';
import { fps } from '../../../constants/gameData';
import { mapsRecord } from '../../../constants/maps/mapsRecord';
import { getNextForwardFoot } from '../../../functions/getNextForwardFoot';
import { updatePosition } from '../../../functions/updatePosition';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Occupant, OnStepPortal } from '../../../interfaces/OverworldMap';
import { CharacterOrientation } from '../../../interfaces/SaveFile';

const baseEncounterRate = 0;
export const useOverworldMovement = (
	startEncounter: () => void,
	addStep: () => void,
	currentOccupants: Occupant[],
	encounterRateModifier?: number
) => {
	const {
		saveFile: { location: playerLocation },
		setCharacterLocationReducer: setCharacterLocation,
	} = useContext(SaveFileContext);
	const map = useMemo(() => mapsRecord[playerLocation.mapId], [playerLocation]);
	const [encounterChance, setEncounterChance] =
		useState<number>(baseEncounterRate);

	const [nextInput, setNextInput] = useState<
		CharacterOrientation | undefined
	>();

	useEffect(() => {
		const stepOnPortal: OnStepPortal | undefined = map.occupants.find(
			(o) =>
				o.type === 'ON_STEP_PORTAL' &&
				o.x === playerLocation.x &&
				o.y === playerLocation.y
		) as OnStepPortal | undefined;

		const resetEncounterRate = () => {
			if (encounterChance === baseEncounterRate) {
				return;
			}
			setEncounterChance(baseEncounterRate);
		};
		const int = setTimeout(() => {
			if (
				!nextInput &&
				!['CENTER1', 'CENTER2'].includes(playerLocation.forwardFoot)
			) {
				setCharacterLocation({
					...playerLocation,
					forwardFoot: getNextForwardFoot(playerLocation.forwardFoot),
				});
			}
			if (stepOnPortal) {
				console.log('yaya');
				setCharacterLocation(stepOnPortal.portal);
				return;
			}

			if (nextInput) {
				if (map.tileMap.encounterLayer[playerLocation.y][playerLocation.x]) {
					const modifiedEncounterRate =
						encounterChance * (encounterRateModifier ?? 1);
					if (Math.random() < modifiedEncounterRate) {
						startEncounter();
						return;
					} else setEncounterChance(encounterChance + 0.02);
				} else resetEncounterRate();
			}
			if (nextInput === playerLocation.orientation) {
				setCharacterLocation({
					...playerLocation,
					...updatePosition(
						playerLocation,
						nextInput,
						map,
						addStep,
						currentOccupants
					),
					forwardFoot: getNextForwardFoot(playerLocation.forwardFoot),
				});
			}
			if (nextInput && nextInput !== playerLocation.orientation) {
				setCharacterLocation({
					...playerLocation,
					orientation: nextInput,
					forwardFoot: getNextForwardFoot(playerLocation.forwardFoot),
				});
			}
			setNextInput(undefined);
		}, fps);

		return () => clearTimeout(int);
	}, [
		addStep,
		currentOccupants,
		encounterChance,
		encounterRateModifier,
		map,
		nextInput,
		playerLocation,
		setCharacterLocation,
		startEncounter,
	]);

	return setNextInput;
};
