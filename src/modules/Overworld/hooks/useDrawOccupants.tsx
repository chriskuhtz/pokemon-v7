import { isEqual } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { getItemUrl } from '../../../functions/getItemUrl';
import {
	OverworldShaderMap,
	getTimeOfDay,
} from '../../../functions/getTimeOfDay';
import { getYOffsetFromOrientation } from '../../../functions/getYOffsetFromOrientation';
import { BaseSizeContext } from '../../../hooks/useBaseSize';
import { Occupant } from '../../../interfaces/OverworldMap';

export const overflow = (current: number, excludedMax: number) => {
	if (current < excludedMax - 1) {
		return current + 1;
	}
	return 0;
};

export const useDrawOccupants = (
	canvasId: string,
	statefulOccupants: Occupant[]
) => {
	const { baseSize } = useContext(BaseSizeContext);
	const [lastDrawnOccupants, setLastDrawnOccupants] = useState<Occupant[]>([]);
	useEffect(() => setLastDrawnOccupants([]), [baseSize]);
	//draw the npcs
	useEffect(() => {
		if (
			lastDrawnOccupants.length === statefulOccupants.length &&
			statefulOccupants.every((o, i) => isEqual(o, lastDrawnOccupants[i]))
		) {
			//no need to draw
			return;
		} else {
			console.log('draw occupants');

			const el: HTMLCanvasElement | null = document.getElementById(
				canvasId
			) as HTMLCanvasElement | null;
			const ctx = el?.getContext('2d');
			ctx?.clearRect(0, 0, 9000, 9000);

			statefulOccupants.forEach((occ) => {
				drawOccupant(occ, ctx, baseSize);
				return;
			});
			setLastDrawnOccupants(statefulOccupants);
		}
	}, [baseSize, canvasId, lastDrawnOccupants, statefulOccupants]);
};

const drawOccupant = (
	occ: Occupant,
	ctx: CanvasRenderingContext2D | null | undefined,
	baseSize: number
) => {
	const img = new Image();

	if (!ctx) {
		return;
	}
	img.addEventListener('load', () => {
		switch (occ.type) {
			case 'ON_STEP_PORTAL':
				break;
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
			case 'CAMP_MANAGER':
			case 'APRICORN_SMITH':
			case 'NURSE':
			case 'NPC':
			case 'TRAINING_FIELD_MASTER':
			case 'TRAINER':
				ctx?.drawImage(
					img,
					0,
					-getYOffsetFromOrientation(occ.orientation),
					64,
					64,
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
			case 'HONEY_TREE':
			case 'HALLOWED_TOWER':
				ctx?.drawImage(
					img,
					baseSize * occ.x + baseSize * 0.125,
					baseSize * occ.y,
					baseSize * 0.75,
					baseSize
				);
				break;
			case 'OBSTACLE':
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
			return occ.sprite;
		case 'MERCHANT':
		case 'CAMP_MANAGER':
		case 'APRICORN_SMITH':
		case 'NURSE':
		case 'NPC':
		case 'TRAINING_FIELD_MASTER':
		case 'TRAINER':
			return `/npcs/NPC_${occ.sprite}.png`;
		case 'PC':
			return '/mapObjects/pc.png';
		case 'SIGN':
			return '/mapObjects/sign.png';
		case 'BULLETIN_BOARD':
			return '/mapObjects/largeInfoSign.png';
		case 'BUSH':
			return '/mapObjects/bush.png';
		case 'HIDDEN_ITEM':
			return '/mapObjects/hiddenItem.png';
		case 'HONEY_TREE':
			return '/mapObjects/honeyTree.png';
		case 'HALLOWED_TOWER':
			return '/mapObjects/hallowedTower.png';
		case 'OBSTACLE':
			return occ.src;
		case 'ITEM':
			return getItemUrl(occ.item);
		default:
			return '/mapObjects/pokeball.png';
	}
};
