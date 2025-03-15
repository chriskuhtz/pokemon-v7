import { useEffect, useState } from 'react';
import { getNextFieldOccupant } from '../../../functions/getNextFieldOccupant';
import { getOverworldDistance } from '../../../functions/getOverworldDistance';
import { isPassable } from '../../../functions/isPassable';
import { Occupant, OverworldMap } from '../../../interfaces/OverworldMap';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../../../interfaces/SaveFile';

export const useClickTarget = (
	assembledMap: OverworldMap,
	playerLocation: CharacterLocationData,
	setNextInput: React.Dispatch<
		React.SetStateAction<CharacterOrientation | undefined>
	>,
	interactWith: (occ: Occupant | undefined) => void,
	collectedItems: string[],
	activeMessage: boolean,
	currentOccupants: Occupant[]
): React.Dispatch<
	React.SetStateAction<
		| {
				x: number;
				y: number;
		  }
		| undefined
	>
> => {
	const [clickTarget, setClickTarget] = useState<
		{ x: number; y: number } | undefined
	>();
	useEffect(() => {
		if (activeMessage) {
			setClickTarget(undefined);
			return;
		}
		if (!clickTarget) {
			return;
		}

		const occ = getNextFieldOccupant(clickTarget, currentOccupants);

		if (occ && getOverworldDistance(clickTarget, playerLocation) === 1) {
			interactWith(occ);
		}

		if (
			playerLocation.x < clickTarget.x &&
			isPassable(
				{ x: playerLocation.x + 1, y: playerLocation.y },
				assembledMap,
				currentOccupants
			)
		) {
			setNextInput('RIGHT');
			return;
		}
		if (
			playerLocation.x > clickTarget.x &&
			isPassable(
				{ x: playerLocation.x - 1, y: playerLocation.y },
				assembledMap,
				currentOccupants
			)
		) {
			setNextInput('LEFT');
			return;
		}
		if (
			playerLocation.y < clickTarget.y &&
			isPassable(
				{ x: playerLocation.x, y: playerLocation.y + 1 },
				assembledMap,
				currentOccupants
			)
		) {
			setNextInput('DOWN');
			return;
		}
		if (
			playerLocation.y > clickTarget.y &&
			isPassable(
				{ x: playerLocation.x, y: playerLocation.y - 1 },
				assembledMap,
				currentOccupants
			)
		) {
			setNextInput('UP');
			return;
		}

		if (
			(clickTarget.x === playerLocation.x &&
				clickTarget.y === playerLocation.y) ||
			(!isPassable(clickTarget, assembledMap, currentOccupants) &&
				getOverworldDistance(clickTarget, playerLocation) === 1)
		) {
			if (playerLocation.x > clickTarget.x) {
				setNextInput('LEFT');
			}
			if (playerLocation.x < clickTarget.x) {
				setNextInput('RIGHT');
			}
			if (playerLocation.y < clickTarget.y) {
				setNextInput('DOWN');
			}
			if (playerLocation.y > clickTarget.y) {
				setNextInput('UP');
			}

			console.log('target reached');
		}

		setClickTarget(undefined);
	}, [
		activeMessage,
		assembledMap,
		clickTarget,
		collectedItems,
		interactWith,
		playerLocation,
		setNextInput,
		currentOccupants,
	]);

	return setClickTarget;
};
