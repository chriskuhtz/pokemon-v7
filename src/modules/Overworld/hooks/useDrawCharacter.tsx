import { useContext, useEffect, useMemo } from 'react';
import { getYOffsetFromOrientation } from '../../../functions/getYOffsetFromOrientation';
import { BaseSizeContext } from '../../../hooks/useBaseSize';
import { CharacterLocationData } from '../../../interfaces/SaveFile';
import { threeDigitString } from './useDrawOccupants';

export const useDrawCharacter = (
	canvasId: string,
	playerLocation: CharacterLocationData,
	playerSprite: string
) => {
	const { baseSize } = useContext(BaseSizeContext);

	const yOffset = useMemo(
		() => getYOffsetFromOrientation(playerLocation.orientation),
		[playerLocation.orientation]
	);

	const xOffset = useMemo(() => {
		if (playerLocation.forwardFoot === 'LEFT') {
			return -3 * 64;
		}
		if (playerLocation.forwardFoot === 'CENTER2') {
			return -2 * 64;
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
			ctx?.clearRect(0, 0, baseSize, baseSize);
			ctx?.drawImage(img, -xOffset, -yOffset, 64, 64, 0, 0, baseSize, baseSize);
		});

		img.src = `/npcs/${playerSprite}.png`;
	}, [baseSize, canvasId, playerSprite, xOffset, yOffset]);
};
export const useDrawFollowerPokemon = (
	canvasId: string,
	playerLocation: CharacterLocationData,
	dexId: number
) => {
	const { baseSize } = useContext(BaseSizeContext);

	const yOffset = useMemo(
		() => getYOffsetFromOrientation(playerLocation.orientation),
		[playerLocation.orientation]
	);

	const xOffset = useMemo(() => {
		if (playerLocation.forwardFoot === 'LEFT') {
			return -3 * 64;
		}
		if (playerLocation.forwardFoot === 'CENTER2') {
			return -2 * 64;
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
			ctx?.clearRect(0, 0, baseSize, baseSize);
			ctx?.drawImage(img, -xOffset, -yOffset, 64, 64, 0, 0, baseSize, baseSize);
		});

		img.src = `/overworldPokemonSprites/${threeDigitString(dexId)}.png`;
	}, [baseSize, canvasId, dexId, xOffset, yOffset]);
};
