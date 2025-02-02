import { useEffect, useState } from 'react';
import { getNextForwardFoot } from '../../../functions/getNextForwardFoot';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../../../interfaces/SaveFile';

const fps = 16;

const updatePosition = (
	playerLocation: CharacterLocationData,
	nextInput: CharacterOrientation,
	map: OverworldMap
): { x: number; y: number } => {
	if (nextInput === 'DOWN') {
		if (playerLocation.y >= map.height - 1) {
			return { x: playerLocation.x, y: playerLocation.y };
		}
		return { x: playerLocation.x, y: playerLocation.y + 1 };
	}
	if (nextInput === 'UP') {
		if (playerLocation.y === 0) {
			return { x: playerLocation.x, y: playerLocation.y };
		}
		return { x: playerLocation.x, y: playerLocation.y - 1 };
	}
	if (nextInput === 'LEFT') {
		if (playerLocation.x === 0) {
			return { x: playerLocation.x, y: playerLocation.y };
		}
		return { x: playerLocation.x - 1, y: playerLocation.y };
	}
	if (nextInput === 'RIGHT') {
		if (playerLocation.x >= map.width - 1) {
			return { x: playerLocation.x, y: playerLocation.y };
		}
		return { x: playerLocation.x + 1, y: playerLocation.y };
	}
	return { x: playerLocation.x, y: playerLocation.y };
};
export const useOverworldMovement = (
	playerLocation: CharacterLocationData,
	setCharacterLocation: (update: CharacterLocationData) => void,
	map: OverworldMap
) => {
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
			if (nextInput === playerLocation.orientation) {
				setCharacterLocation({
					...playerLocation,

					forwardFoot: getNextForwardFoot(playerLocation.forwardFoot),
					...updatePosition(playerLocation, nextInput, map),
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
	}, [nextInput, playerLocation, setCharacterLocation]);

	return setNextInput;
};
