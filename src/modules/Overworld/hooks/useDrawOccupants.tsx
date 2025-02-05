import { useEffect } from 'react';
import { baseSize } from '../../../constants/gameData';
import { itemsRecord } from '../../../constants/itemsRecord';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const useDrawOccupants = (canvasId: string, map: OverworldMap) => {
	useEffect(() => {
		const { occupants, width, height } = map;

		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		ctx?.clearRect(0, 0, width * baseSize, height * baseSize);

		occupants.forEach((occupantId) => {
			const occ = itemsRecord[occupantId];
			if (!occ) {
				return;
			}

			const img = new Image();

			img.addEventListener('load', () => {
				ctx?.drawImage(
					img,
					baseSize * occ.x + baseSize * 0.125,
					baseSize * occ.y + baseSize * 0.125,
					baseSize * 0.75,
					baseSize * 0.75
				);
			});

			img.src = '/mapObjects/pokeball.png';
		}, []);
	}, [canvasId, map]);
};
