import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { baseSize } from '../../../constants/gameData';
import { occupantsRecord } from '../../../constants/occupantsRecord';
import { getYOffsetFromOrientation } from '../../../functions/getYOffsetFromOrientation';
import { Occupant, OverworldMap } from '../../../interfaces/OverworldMap';

export const useDrawOccupants = (
	canvasId: string,
	map: OverworldMap
): ((id: number, updatedOccupant: Occupant) => void) => {
	const [lastDrawnOccupants, setLastDrawnOccupants] = useState<
		Record<number, Occupant>
	>({});
	const [statefulOccupants, setStatefulOccupants] = useState<
		Record<number, Occupant>
	>({});

	useEffect(() => {
		setStatefulOccupants(
			Object.fromEntries(
				Object.entries(occupantsRecord).filter(
					([id, data]) =>
						data.map === map.id && map.occupants.includes(Number.parseInt(id))
				)
			)
		);
	}, [map]);

	const changeOccupant = useCallback(
		(id: number, updatedOccupant: Occupant) => {
			setStatefulOccupants((statefulOccupants) => {
				const updated = { ...statefulOccupants };
				updated[id] = updatedOccupant;

				return updated;
			});
		},
		[]
	);

	useEffect(() => {
		console.log('draw occupants');
		//const { width, height } = map;

		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		Object.keys(statefulOccupants).forEach((id) => {
			const current = statefulOccupants[Number.parseInt(id)];
			const lastDrawn = lastDrawnOccupants[Number.parseInt(id)];
			if (isEqual(current, lastDrawn)) {
				console.log('no need to redraw me', current);
				return;
			}

			if (current && !lastDrawn) {
				console.log('draw me for the first time', current);
				drawOccupant(current, ctx);
				return;
			}
			console.log('i have changed,redraw me', current, lastDrawn);
			ctx?.clearRect(
				baseSize * lastDrawn.x,
				baseSize * lastDrawn.y,
				baseSize,
				baseSize
			);

			drawOccupant(current, ctx);
		});
		Object.keys(lastDrawnOccupants).forEach((id) => {
			const current = statefulOccupants[Number.parseInt(id)];
			const lastDrawn = lastDrawnOccupants[Number.parseInt(id)];
			if (!current && lastDrawn) {
				console.log('i dont exist anymore, clear', lastDrawn);
				ctx?.clearRect(
					baseSize * lastDrawn.x,
					baseSize * lastDrawn.y,
					baseSize,
					baseSize
				);
				return;
			}
		});
		setLastDrawnOccupants(statefulOccupants);
	}, [canvasId, lastDrawnOccupants, statefulOccupants]);

	return changeOccupant;
};

const drawOccupant = (
	occ: Occupant,
	ctx: CanvasRenderingContext2D | null | undefined
) => {
	const img = new Image();

	img.addEventListener('load', () => {
		switch (occ.type) {
			case 'MERCHANT':
			case 'NURSE':
			case 'NPC':
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
			case 'BUSH':
			case 'HIDDEN_ITEM':
				ctx?.drawImage(
					img,
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

	img.src = getSource(occ);
};

const getSource = (occ: Occupant) => {
	switch (occ.type) {
		case 'MERCHANT':
		case 'NURSE':
		case 'NPC':
			return `/npcs/NPC_${occ.sprite}.png`;
		case 'PC':
			return '/mapObjects/pc.png';
		case 'BUSH':
			return '/mapObjects/bush.png';
		case 'HIDDEN_ITEM':
			return '/mapObjects/hiddenItem.png';
		case 'ITEM':
		default:
			return '/mapObjects/pokeball.png';
	}
};
