import { useEffect } from 'react';
import { baseSize } from '../../../constants/gameData';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const useDrawBackground = (canvasId: string, map: OverworldMap) => {
	useEffect(() => {
		const { backgroundTile, width, height } = map;
		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		const img = new Image();

		img.addEventListener('load', () => {
			ctx?.clearRect(0, 0, length * baseSize, height * baseSize);

			Array.from({ length: height }).forEach((_, h) => {
				Array.from({ length: width }).forEach((_, w) => {
					ctx?.drawImage(
						img,
						backgroundTile.x,
						backgroundTile.y,
						baseSize / 4,
						baseSize / 4,
						w * baseSize,
						h * baseSize,
						baseSize,
						baseSize
					);
				});
			});
		});

		img.src = '/tileset.png';
	}, [canvasId, map]);
};
