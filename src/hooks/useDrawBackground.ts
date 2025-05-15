import { useEffect } from 'react';
import { TileMap } from '../interfaces/OverworldMap';

export const useDrawBackground = (
	canvasId: string,
	map: TileMap,
	tileSetSource: string,
	tileSize: number
) => {
	useEffect(() => {
		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		const {
			baseLayer,
			obstacleLayer,
			decorationLayer,
			encounterLayer,
			foregroundLayer,
			waterLayer,
		} = map;
		const spriteSheet = new Image();
		ctx?.clearRect(
			0,
			0,
			baseLayer[0].length * tileSize,
			baseLayer.length * tileSize
		);

		spriteSheet.addEventListener('load', () => {
			baseLayer.forEach((row, h) => {
				row.forEach((el, w) => {
					ctx?.drawImage(
						spriteSheet,
						-el.xOffset,
						-el.yOffset,
						16,
						16,
						tileSize * w,
						tileSize * h,
						tileSize,
						tileSize
					);
					const enco = encounterLayer[h][w];
					if (enco) {
						ctx?.drawImage(
							spriteSheet,
							-enco.xOffset,
							-enco.yOffset,
							16,
							16,
							tileSize * w,
							tileSize * h,
							tileSize,
							tileSize
						);
					}
					const water = waterLayer[h][w];
					if (water) {
						ctx?.drawImage(
							spriteSheet,
							-water.xOffset,
							-water.yOffset,
							16,
							16,
							tileSize * w,
							tileSize * h,
							tileSize,
							tileSize
						);
					}
					const deco = decorationLayer[h][w];
					if (deco) {
						ctx?.drawImage(
							spriteSheet,
							-deco.xOffset,
							-deco.yOffset,
							16,
							16,
							tileSize * w,
							tileSize * h,
							tileSize,
							tileSize
						);
					}

					const ob = obstacleLayer[h][w];
					if (ob) {
						ctx?.drawImage(
							spriteSheet,
							-ob.xOffset,
							-ob.yOffset,
							16,
							16,
							tileSize * w,
							tileSize * h,
							tileSize,
							tileSize
						);
					}

					const fore = foregroundLayer[h][w];
					if (fore) {
						ctx?.drawImage(
							spriteSheet,
							-fore.xOffset,
							-fore.yOffset,
							16,
							16,
							tileSize * w,
							tileSize * h,
							tileSize,
							tileSize
						);
					}
				});
			});
		});

		spriteSheet.src = tileSetSource;
	}, [canvasId, map, tileSetSource, tileSize]);
};

export const useDrawForeground = (
	canvasId: string,
	map: TileMap,
	tileSetSource: string,
	tileSize: number
) => {
	useEffect(() => {
		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		const { foregroundLayer } = map;
		const spriteSheet = new Image();
		ctx?.clearRect(
			0,
			0,
			foregroundLayer[0].length * tileSize,
			foregroundLayer.length * tileSize
		);

		spriteSheet.addEventListener('load', () => {
			foregroundLayer.forEach((row, h) => {
				row.forEach((el, w) => {
					if (el) {
						ctx?.drawImage(
							spriteSheet,
							-el.xOffset,
							-el.yOffset,
							16,
							16,
							tileSize * w,
							tileSize * h,
							tileSize,
							tileSize
						);
					}
				});
			});
		});

		spriteSheet.src = tileSetSource;
	}, [canvasId, map, tileSetSource, tileSize]);
};
