import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { getItemUrl } from '../../../functions/getItemUrl';
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
	statefulOccupants: Occupant[],
	baseSize: number
) => {
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
				if (occ.sprite) {
					ctx?.drawImage(
						img,
						baseSize * occ.x,
						baseSize * occ.y,
						baseSize,
						baseSize
					);
				}
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
			case 'LEDGE':
				ctx?.drawImage(
					img,
					baseSize * occ.x,
					baseSize * occ.y,
					baseSize,
					baseSize
				);

				break;
			case 'MERCHANT':
			case 'NURSE':
			case 'NPC':
			case 'TRAINER':
			case 'POKEMON':
			case 'ZIGZAGOON_FORAGER':
			case 'DUGTRIO_EXPLORER':
			case 'SNORLAX':
			case 'STRANGE_TREE':
			case 'ROUTER_NPC':
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
			case 'HALLOWED_TOWER':
			case 'SWARM_RADAR':
			case 'ROCKET_RADIO':
			case 'ROCK':
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
			case 'COMBEE_HIVE':
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
				break;
			case 'ITEM':
			case 'PC':
			case 'BERRY_LURE':
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
		case 'BERRY_LURE':
			return '/mapObjects/berry_lure.png';
		case 'ON_STEP_PORTAL':
			return occ.sprite ?? '';

		case 'PORTAL':
		case 'LEDGE':
			return occ.sprite;
		case 'BERRY_TREE':
			return `/berryTrees/${occ.sprite}.png`;
		case 'MERCHANT':
		case 'NURSE':
		case 'NPC':
		case 'TRAINER':
		case 'ROUTER_NPC':
			return `/npcs/NPC_${occ.sprite}.png`;
		case 'POKEMON':
		case 'DUGTRIO_EXPLORER':
		case 'ZIGZAGOON_FORAGER':
			return `/overworldPokemonSprites/${threeDigitString(occ.dexId)}.png`;
		case 'SNORLAX':
			return `/overworldPokemonSprites/143.png`;
		case 'STRANGE_TREE':
			return `/overworldPokemonSprites/185.png`;
		case 'PC':
			return '/mapObjects/pc.png';
		case 'STORAGE_CHEST':
			return '/mapObjects/chest.png';
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
		case 'ROCK':
			return '/mapObjects/rock.png';
		case 'HALLOWED_TOWER':
			return '/mapObjects/hallowedTower.png';

		case 'SWARM_RADAR':
			return '/mapObjects/radar.png';
		case 'ROCKET_RADIO':
			return '/mapObjects/rocketRadar.png';
		case 'COMBEE_HIVE':
			return '/mapObjects/combeeHive.png';
		case 'OBSTACLE':
			return occ.src;
		case 'ITEM':
			return getItemUrl(occ.item);
		default:
			return '/mapObjects/pokeball.png';
	}
};

export const threeDigitString = (input: number) => {
	if (input > 999) {
		throw new Error('This number is too long');
	}
	if (input >= 100) {
		return `${Math.floor(input)}`;
	}
	if (input >= 10) {
		return `0${Math.floor(input)}`;
	}

	return `00${Math.floor(input)}`;
};
