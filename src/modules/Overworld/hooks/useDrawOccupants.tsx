export const overflow = (current: number, excludedMax: number) => {
	if (current < excludedMax - 1) {
		return current + 1;
	}
	return 0;
};

// export const useDrawOccupants = (
// 	canvasId: string,
// 	statefulOccupants: Occupant[]
// ) => {
// 	const [lastDrawnOccupants, setLastDrawnOccupants] = useState<Occupant[]>([]);

// 	//draw the npcs
// 	// useEffect(() => {
// 	// 	console.log('draw occupants');

// 	// 	const el: HTMLCanvasElement | null = document.getElementById(
// 	// 		canvasId
// 	// 	) as HTMLCanvasElement | null;
// 	// 	const ctx = el?.getContext('2d');

// 	// 	Object.keys(statefulOccupants).forEach((id) => {
// 	// 		const current = statefulOccupants[id as OccupantName];
// 	// 		const lastDrawn = lastDrawnOccupants[id as OccupantName];
// 	// 		if (!current) {
// 	// 			return;
// 	// 		}
// 	// 		if (isEqual(current, lastDrawn)) {
// 	// 			return;
// 	// 		}

// 	// 		if (current && !lastDrawn) {
// 	// 			drawOccupant(current, ctx);
// 	// 			return;
// 	// 		} else if (lastDrawn) {
// 	// 			drawOccupant(current, ctx);

// 	// 			ctx?.clearRect(
// 	// 				baseSize * lastDrawn.x,
// 	// 				baseSize * lastDrawn.y,
// 	// 				baseSize,
// 	// 				baseSize
// 	// 			);
// 	// 		}
// 	// 	});
// 	// 	Object.keys(lastDrawnOccupants).forEach((id) => {
// 	// 		const current = statefulOccupants[id as OccupantName];
// 	// 		const lastDrawn = lastDrawnOccupants[id as OccupantName];
// 	// 		if (!current && lastDrawn) {
// 	// 			ctx?.clearRect(
// 	// 				baseSize * lastDrawn.x,
// 	// 				baseSize * lastDrawn.y,
// 	// 				baseSize,
// 	// 				baseSize
// 	// 			);
// 	// 			return;
// 	// 		}
// 	// 	});
// 	// 	setLastDrawnOccupants(statefulOccupants);
// 	// }, [canvasId, lastDrawnOccupants, statefulOccupants]);
// };

// const drawOccupant = (
// 	occ: Occupant,
// 	ctx: CanvasRenderingContext2D | null | undefined
// ) => {
// 	const img = new Image();

// 	if (!ctx) {
// 		return;
// 	}
// 	img.addEventListener('load', () => {
// 		switch (occ.type) {
// 			case 'PORTAL':
// 				if (occ.small) {
// 					ctx?.drawImage(
// 						img,
// 						baseSize * occ.x + baseSize * 0.25,
// 						baseSize * occ.y + baseSize * 0.25,
// 						baseSize * 0.5,
// 						baseSize * 0.5
// 					);
// 				} else {
// 					ctx?.drawImage(
// 						img,
// 						baseSize * occ.x,
// 						baseSize * occ.y,
// 						baseSize,
// 						baseSize
// 					);
// 				}

// 				break;
// 			case 'MERCHANT':
// 			case 'NURSE':
// 			case 'NPC':
// 			case 'TRAINER':
// 				ctx?.drawImage(
// 					img,
// 					0,
// 					-getYOffsetFromOrientation(occ.orientation),
// 					baseSize,
// 					baseSize,
// 					baseSize * occ.x,
// 					baseSize * occ.y,
// 					baseSize,
// 					baseSize
// 				);
// 				break;
// 			case 'BUSH':
// 				ctx?.drawImage(
// 					img,
// 					baseSize * occ.x,
// 					baseSize * occ.y,
// 					baseSize,
// 					baseSize
// 				);
// 				break;
// 			case 'HIDDEN_ITEM':
// 				ctx?.drawImage(
// 					img,
// 					baseSize * occ.x,
// 					baseSize * occ.y,
// 					baseSize,
// 					baseSize
// 				);
// 				ctx.fillStyle = OverworldShaderMap[getTimeOfDay()];
// 				ctx?.fillRect(baseSize * occ.x, baseSize * occ.y, baseSize, baseSize);
// 				break;
// 			case 'OBSTACLE':
// 				if (occ.small) {
// 					ctx?.drawImage(
// 						img,
// 						baseSize * occ.x + baseSize * 0.125,
// 						baseSize * occ.y + baseSize * 0.125,
// 						baseSize * 0.75,
// 						baseSize * 0.75
// 					);
// 				} else {
// 					ctx?.drawImage(
// 						img,
// 						baseSize * occ.x,
// 						baseSize * occ.y,
// 						baseSize,
// 						baseSize
// 					);
// 					ctx?.drawImage(
// 						img,
// 						baseSize * occ.x,
// 						baseSize * occ.y,
// 						baseSize,
// 						baseSize
// 					);
// 				}

// 				if (occ.sprite.includes('fence')) {
// 					ctx.fillStyle = OverworldShaderMap[getTimeOfDay()];
// 					ctx?.fillRect(
// 						baseSize * occ.x + baseSize * 0.125,
// 						baseSize * occ.y + baseSize * 0.125,
// 						baseSize * 0.75,
// 						baseSize * 0.75
// 					);
// 				}

// 				break;
// 			case 'ITEM':
// 			case 'PC':
// 			default:
// 				ctx?.drawImage(
// 					img,
// 					baseSize * occ.x + baseSize * 0.125,
// 					baseSize * occ.y + baseSize * 0.125,
// 					baseSize * 0.75,
// 					baseSize * 0.75
// 				);
// 		}
// 	});

// 	img.src = getSource(occ);
// };

// const getSource = (occ: Occupant) => {
// 	switch (occ.type) {
// 		case 'PORTAL':
// 		case 'OBSTACLE':
// 			return occ.sprite;
// 		case 'MERCHANT':
// 		case 'NURSE':
// 		case 'NPC':
// 		case 'TRAINER':
// 			return `/npcs/NPC_${occ.sprite}.png`;
// 		case 'PC':
// 			return '/mapObjects/pc.png';
// 		case 'SIGN':
// 			return '/mapObjects/sign.png';
// 		case 'BUSH':
// 			return '/mapObjects/bush.png';
// 		case 'HIDDEN_ITEM':
// 			return '/mapObjects/hiddenItem.png';
// 		case 'ITEM':
// 		default:
// 			return '/mapObjects/pokeball.png';
// 	}
// };
