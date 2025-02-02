import { useEffect, useMemo } from 'react';
import { CharacterLocationData } from '../../../interfaces/SaveFile';

export const useCharacter = (
	canvasId: string,
	playerLocation: CharacterLocationData
) => {
	const yOffset = useMemo(() => {
		if (playerLocation.orientation === 'UP') {
			return -192;
		}
		if (playerLocation.orientation === 'RIGHT') {
			return -128;
		}
		if (playerLocation.orientation === 'LEFT') {
			return -64;
		}
		return 0;
	}, [playerLocation.orientation]);

	const xOffset = useMemo(() => {
		if (playerLocation.forwardFoot === 'LEFT') {
			return -192;
		}
		if (playerLocation.forwardFoot === 'CENTER2') {
			return -128;
		}
		if (playerLocation.forwardFoot === 'RIGHT') {
			return -64;
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
			ctx?.clearRect(0, 0, 64, 64);
			ctx?.drawImage(img, xOffset, yOffset);
		});

		img.src = '/npcs/NPC_001.png';
	}, [canvasId, xOffset, yOffset]);
};
