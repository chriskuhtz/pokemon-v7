import { useEffect, useState } from 'react';
import { fps } from '../../../constants/gameData';
import { getNextForwardFoot } from '../../../functions/getNextForwardFoot';
import { updatePosition } from '../../../functions/updatePosition';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../../../interfaces/SaveFile';

const baseEncounterRate = 0;
export const useOverworldMovement = (
	playerLocation: CharacterLocationData,
	setCharacterLocation: (update: CharacterLocationData) => void,
	map: OverworldMap,
	startEncounter: () => void,
	addStep: () => void,
	encounterRateModifier?: number
) => {
	const [encounterChance, setEncounterChance] =
		useState<number>(baseEncounterRate);

	const [nextInput, setNextInput] = useState<
		CharacterOrientation | undefined
	>();

	useEffect(() => {
		const resetEncounterRate = () => {
			if (encounterChance === baseEncounterRate) {
				return;
			}
			setEncounterChance(baseEncounterRate);
		};
		const int = setInterval(() => {
			if (
				!nextInput &&
				!['CENTER1', 'CENTER2'].includes(playerLocation.forwardFoot)
			) {
				setCharacterLocation({
					...playerLocation,
					forwardFoot: getNextForwardFoot(playerLocation.forwardFoot),
				});
			}
			if (nextInput) {
				if (map.tileMap[playerLocation.y][playerLocation.x] === 1) {
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
					...updatePosition(playerLocation, nextInput, map, addStep),
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
		}, 1000 / fps);

		return () => clearInterval(int);
	}, [
		addStep,
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
