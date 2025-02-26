import { useEffect } from 'react';
import { baseSize } from '../../../constants/gameData';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const useDrawBackground = (canvasId: string, map: OverworldMap) => {
	useEffect(() => {
		const {
			backgroundTile,
			encounterTile,
			borderTile,
			obstacleTile,
			width,
			height,
			tileMap,
		} = map;
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
					//const isBorder = value === 3;
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
		const borderTileImage = new Image();
		if (borderTile) {
			borderTileImage.addEventListener('load', () => {
				tileMap.forEach((row, h) => {
					row.forEach((value, w) => {
						const isBorder = value === 3;
						if (isBorder) {
							ctx?.drawImage(
								borderTileImage,
								w * baseSize,
								h * baseSize,
								baseSize,
								baseSize
							);
						}
					});
				});
			});

			borderTileImage.src = borderTile;
		}

		const obstacleTileImage = new Image();
		if (obstacleTile) {
			obstacleTileImage.addEventListener('load', () => {
				tileMap.forEach((row, h) => {
					row.forEach((value, w) => {
						const isObstacle = value === 4;
						if (isObstacle) {
							ctx?.drawImage(
								obstacleTileImage,
								w * baseSize,
								h * baseSize,
								baseSize,
								baseSize
							);
						}
					});
				});
			});

			obstacleTileImage.src = obstacleTile;
		}
	}, [canvasId, map]);
};
