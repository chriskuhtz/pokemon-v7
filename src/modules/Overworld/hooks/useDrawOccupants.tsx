import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { OccupantName } from '../../../constants/checkLists/occupantsRecord';
import { animationTimer, baseSize } from '../../../constants/gameData';
import { getNextLocation } from '../../../functions/getNextLocation';
import {
	getTimeOfDay,
	OverworldShaderMap,
} from '../../../functions/getTimeOfDay';
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
	activeMessage: boolean,
	statefulOccupants: Partial<Record<OccupantName, Occupant>>,
	setStatefulOccupants: React.Dispatch<
		React.SetStateAction<Record<number, Occupant>>
	>
) => {
	const [lastDrawnOccupants, setLastDrawnOccupants] = useState<
		Partial<Record<OccupantName, Occupant>>
	>({});

	//Walk the npcs
	useEffect(() => {
		if (activeMessage) {
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
	}, [activeMessage, setStatefulOccupants, statefulOccupants]);

	//draw the npcs
	useEffect(() => {
		console.log('draw occupants');

		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		Object.keys(statefulOccupants).forEach((id) => {
			const current = statefulOccupants[id as OccupantName];
			const lastDrawn = lastDrawnOccupants[id as OccupantName];
			if (!current) {
				return;
			}
			if (isEqual(current, lastDrawn)) {
				return;
			}

			if (current && !lastDrawn) {
				drawOccupant(current, ctx);
				return;
			} else if (lastDrawn) {
				drawOccupant(current, ctx);

				ctx?.clearRect(
					baseSize * lastDrawn.x,
					baseSize * lastDrawn.y,
					baseSize,
					baseSize
				);
			}
		});
		Object.keys(lastDrawnOccupants).forEach((id) => {
			const current = statefulOccupants[id as OccupantName];
			const lastDrawn = lastDrawnOccupants[id as OccupantName];
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

	if (!ctx) {
		return;
	}
	img.addEventListener('load', () => {
		switch (occ.type) {
			case 'PORTAL':
				if (occ.small) {
					ctx?.drawImage(
						img,
						baseSize * occ.x + baseSize * 0.25,
						baseSize * occ.y + baseSize * 0.25,
						baseSize * 0.5,
						baseSize * 0.5
					);
				} else {
					ctx?.drawImage(
						img,
						baseSize * occ.x,
						baseSize * occ.y,
						baseSize,
						baseSize
					);
				}

				break;
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
				ctx?.drawImage(
					img,
					baseSize * occ.x,
					baseSize * occ.y,
					baseSize,
					baseSize
				);
				break;
			case 'HIDDEN_ITEM':
				ctx?.drawImage(
					img,
					baseSize * occ.x,
					baseSize * occ.y,
					baseSize,
					baseSize
				);
				ctx.fillStyle = OverworldShaderMap[getTimeOfDay()];
				ctx?.fillRect(baseSize * occ.x, baseSize * occ.y, baseSize, baseSize);
				break;
			case 'OBSTACLE':
				if (occ.small) {
					ctx?.drawImage(
						img,
						baseSize * occ.x + baseSize * 0.125,
						baseSize * occ.y + baseSize * 0.125,
						baseSize * 0.75,
						baseSize * 0.75
					);
				} else {
					ctx?.drawImage(
						img,
						baseSize * occ.x,
						baseSize * occ.y,
						baseSize,
						baseSize
					);
					ctx?.drawImage(
						img,
						baseSize * occ.x,
						baseSize * occ.y,
						baseSize,
						baseSize
					);
				}

				if (occ.sprite.includes('fence')) {
					ctx.fillStyle = OverworldShaderMap[getTimeOfDay()];
					ctx?.fillRect(
						baseSize * occ.x + baseSize * 0.125,
						baseSize * occ.y + baseSize * 0.125,
						baseSize * 0.75,
						baseSize * 0.75
					);
				}

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
		case 'PORTAL':
		case 'OBSTACLE':
			return occ.sprite;
		case 'MERCHANT':
		case 'NURSE':
		case 'NPC':
		case 'TRAINER':
			return `/npcs/NPC_${occ.sprite}.png`;
		case 'PC':
			return '/mapObjects/pc.png';
		case 'SIGN':
			return '/mapObjects/sign.png';
		case 'BUSH':
			return '/mapObjects/bush.png';
		case 'HIDDEN_ITEM':
			return '/mapObjects/hiddenItem.png';
		case 'ITEM':
		default:
			return '/mapObjects/pokeball.png';
	}
};
