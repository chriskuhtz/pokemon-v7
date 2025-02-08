import { useEffect } from 'react';
import { baseSize } from '../../../constants/gameData';
import { occupantsRecord } from '../../../constants/occupantsRecord';
import { getYOffsetFromOrientation } from '../../../functions/getYOffsetFromOrientation';
import { Occupant, OverworldMap } from '../../../interfaces/OverworldMap';

export const useDrawOccupants = (canvasId: string, map: OverworldMap) => {
	useEffect(() => {
		const { occupants, width, height } = map;

		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		ctx?.clearRect(0, 0, width * baseSize, height * baseSize);

		occupants.forEach((occupantId) => {
			const occ = occupantsRecord[occupantId];
			if (!occ) {
				return;
			}

			const img = new Image();

			img.addEventListener('load', () => {
				switch (occ.type) {
					case 'MERCHANT':
						ctx?.clearRect(
							baseSize * occ.x,
							baseSize * occ.y,
							baseSize,
							baseSize
						);

						ctx?.drawImage(
							img,
							0,
							-getYOffsetFromOrientation(occ.orientation),
							baseSize,
							baseSize,
							baseSize * occ.x,
							baseSize * occ.y,
							baseSize,
							baseSize
						);
						break;
					case 'ITEM':
					case 'PC':
					default:
						ctx?.drawImage(
							img,
							baseSize * occ.x + baseSize * 0.125,
							baseSize * occ.y + baseSize * 0.125,
							baseSize * 0.75,
							baseSize * 0.75
						);
				}
			});

			img.src = getSource(occ.type);
		}, []);
	}, [canvasId, map]);
};

const getSource = (type: Occupant['type']) => {
	switch (type) {
		case 'MERCHANT':
			return '/npcs/NPC_113.png';
		case 'PC':
			return '/mapObjects/pc.png';
		case 'ITEM':
		default:
			return '/mapObjects/pokeball.png';
	}
};
