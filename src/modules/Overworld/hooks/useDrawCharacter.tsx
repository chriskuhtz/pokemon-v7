import { useEffect, useMemo } from 'react';
import { baseSize } from '../../../constants/gameData';
import { getYOffsetFromOrientation } from '../../../functions/getYOffsetFromOrientation';
import { CharacterLocationData } from '../../../interfaces/SaveFile';

export const useDrawCharacter = (
	canvasId: string,
	playerLocation: CharacterLocationData,
	playerSprite: string
) => {
	const yOffset = useMemo(
		() => getYOffsetFromOrientation(playerLocation.orientation),
		[playerLocation.orientation]
	);

	const xOffset = useMemo(() => {
		if (playerLocation.forwardFoot === 'LEFT') {
			return -3 * baseSize;
		}
		if (playerLocation.forwardFoot === 'CENTER2') {
			return -2 * baseSize;
		}
		if (playerLocation.forwardFoot === 'RIGHT') {
			return -baseSize;
		}
		return 0;
	}, [playerLocation.forwardFoot]);

	useEffect(() => {
		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		const img = new Image();

		img.addEventListener('load', () => {
			ctx?.clearRect(0, 0, baseSize, baseSize);
			ctx?.drawImage(img, xOffset, yOffset);
		});

		img.src = `/npcs/${playerSprite}.png`;
	}, [canvasId, playerSprite, xOffset, yOffset]);
};
