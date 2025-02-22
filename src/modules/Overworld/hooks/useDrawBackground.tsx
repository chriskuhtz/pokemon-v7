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

		const baseTileImage = new Image();
		ctx?.clearRect(0, 0, width * baseSize, height * baseSize);

		baseTileImage.addEventListener('load', () => {
			tileMap.forEach((row, h) => {
				row.forEach((value, w) => {
					const isEncounterGrass = value === 1;
					if (!isEncounterGrass) {
						ctx?.drawImage(
							baseTileImage,
							w * baseSize,
							h * baseSize,
							baseSize,
							baseSize
						);
					}
				});
			});
		});
		baseTileImage.src = backgroundTile;
		const encounterTileImage = new Image();
		if (encounterTile) {
			encounterTileImage.addEventListener('load', () => {
				//ctx?.clearRect(0, 0, width * baseSize, height * baseSize);

				tileMap.forEach((row, h) => {
					row.forEach((value, w) => {
						const isEncounterGrass = value === 1;
						if (isEncounterGrass) {
							ctx?.drawImage(
								encounterTileImage,
								w * baseSize,
								h * baseSize,
								baseSize,
								baseSize
							);
						}
					});
				});
			});

			encounterTileImage.src = encounterTile;
		}
	}, [canvasId, map]);
};
