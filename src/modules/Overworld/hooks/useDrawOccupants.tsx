import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { animationTimer, baseSize } from '../../../constants/gameData';
import { getNextLocation } from '../../../functions/getNextLocation';
import { getYOffsetFromOrientation } from '../../../functions/getYOffsetFromOrientation';
import { Occupant } from '../../../interfaces/OverworldMap';

export const overflow = (current: number, excludedMax: number) => {
	if (current < excludedMax - 1) {
		return current + 1;
	}
	return 0;
};

export const useDrawOccupants = (
	canvasId: string,
	activeDialogue: boolean,
	statefulOccupants: Record<number, Occupant>,
	setStatefulOccupants: React.Dispatch<
		React.SetStateAction<Record<number, Occupant>>
	>
) => {
	const [lastDrawnOccupants, setLastDrawnOccupants] = useState<
		Record<number, Occupant>
	>({});

	//Walk the npcs
	useEffect(() => {
		if (activeDialogue) {
			//stop movement during dialogue
			return;
		}
		if (
			Object.values(statefulOccupants).some(
				(occ) => occ.type === 'NPC' && occ.movement
			)
		) {
			const t = setTimeout(() => {
				setStatefulOccupants(
					Object.fromEntries(
						Object.entries(statefulOccupants).map(([id, occ]) => {
							if (occ.type === 'NPC' && occ.movement && Math.random() > 0.5) {
								const step = occ.movement.path[occ.movement.currentStep];
								const update =
									step === occ.orientation
										? getNextLocation(
												{
													x: occ.x,
													y: occ.y,
													orientation: occ.orientation,
													forwardFoot: 'CENTER1',
													mapId: occ.map,
												},
												step
										  )
										: { orientation: step };
								return [
									id,
									{
										...occ,
										...update,
										movement: {
											...occ.movement,
											currentStep: overflow(
												occ.movement.currentStep,
												occ.movement.path.length
											),
										},
									},
								];
							}
							return [id, occ];
						})
					)
				);
			}, animationTimer);

			return () => clearTimeout(t);
		}
	}, [activeDialogue, setStatefulOccupants, statefulOccupants]);

	//draw the npcs
	useEffect(() => {
		console.log('draw occupants');

		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		Object.keys(statefulOccupants).forEach((id) => {
			const current = statefulOccupants[Number.parseInt(id)];
			const lastDrawn = lastDrawnOccupants[Number.parseInt(id)];
			if (isEqual(current, lastDrawn)) {
				return;
			}

			if (current && !lastDrawn) {
				drawOccupant(current, ctx);
				return;
			}

			drawOccupant(current, ctx);
			ctx?.clearRect(
				baseSize * lastDrawn.x,
				baseSize * lastDrawn.y,
				baseSize,
				baseSize
			);
		});
		Object.keys(lastDrawnOccupants).forEach((id) => {
			const current = statefulOccupants[Number.parseInt(id)];
			const lastDrawn = lastDrawnOccupants[Number.parseInt(id)];
			if (!current && lastDrawn) {
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
			case 'TRAINER':
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
		case 'TRAINER':
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
