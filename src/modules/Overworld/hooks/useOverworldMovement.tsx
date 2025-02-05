import { useEffect, useState } from 'react';
import { fps } from '../../../constants/gameData';
import { getNextForwardFoot } from '../../../functions/getNextForwardFoot';
import { updatePosition } from '../../../functions/updatePosition';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../../../interfaces/SaveFile';

export const useOverworldMovement = (
	playerLocation: CharacterLocationData,
	setCharacterLocation: (update: CharacterLocationData) => void,
	map: OverworldMap,
	startEncounter: () => void,
	encounterRateModifier?: number
) => {
	const [encounterChance, setEncounterChance] = useState<number>(0.2);
	const [nextInput, setNextInput] = useState<
		CharacterOrientation | undefined
	>();

	useEffect(() => {
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
			if (nextInput && map.tileMap[playerLocation.y][playerLocation.x] === 1) {
				if (Math.random() < encounterChance * (encounterRateModifier ?? 1)) {
					startEncounter();
					return;
				} else setEncounterChance(encounterChance + 0.05);
			}
			if (nextInput === playerLocation.orientation) {
				setCharacterLocation({
					...playerLocation,
					...updatePosition(playerLocation, nextInput, map),
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
