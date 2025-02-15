import { useEffect } from 'react';
import { baseSize } from '../../../constants/gameData';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const useDrawBackground = (canvasId: string, map: OverworldMap) => {
	useEffect(() => {
		const { backgroundTile, encounterTile, width, height, tileMap } = map;
		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		const img = new Image();

		img.addEventListener('load', () => {
			ctx?.clearRect(0, 0, width * baseSize, height * baseSize);

			tileMap.forEach((row, h) => {
				row.forEach((value, w) => {
					const isEncounterGrass = value === 1;
					ctx?.drawImage(
						img,
						isEncounterGrass ? encounterTile.x : backgroundTile.x,
						isEncounterGrass ? encounterTile.y : backgroundTile.y,
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
