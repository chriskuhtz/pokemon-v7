import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { animationTimer, baseSize } from '../../constants/gameData';
import { assembleMap } from '../../functions/assembleMap';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { isValidOverWorldMap } from '../../functions/isValidOverworldMap';
import { Occupant, OverworldMap } from '../../interfaces/OverworldMap';
import { CharacterLocationData } from '../../interfaces/SaveFile';
import { Banner } from '../../uiComponents/Banner/Banner';
import './Overworld.css';
import { useDrawBackground } from './hooks/useDrawBackground';
import { useDrawCharacter } from './hooks/useDrawCharacter';
import { useDrawOccupants } from './hooks/useDrawOccupants';
import { useKeyboardControl } from './hooks/useKeyboardControl';
import { useOverworldMovement } from './hooks/useOverworldMovement';

const playerCanvasId = 'playerCanvas';
const backgroundCanvasId = 'bg';
const occupantsCanvasId = 'occs';

export const Overworld = ({
	openMenu,
	playerLocation,
	setCharacterLocation,
	collectItem,
	map,
	collectedItems,
}: {
	openMenu: () => void;
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	collectItem: (item: [string, Occupant]) => void;
	map: OverworldMap;
	collectedItems: number[];
}) => {
	const [bannerContent, setBannerContent] = useState<string | undefined>();
	useEffect(() => {
		const t = setTimeout(() => {
			if (bannerContent) setBannerContent(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [bannerContent]);

	const assembledMap = useMemo(
		() => assembleMap(map, collectedItems),
		[collectedItems, map]
	);
	const valid = useMemo(() => isValidOverWorldMap(map), [map]);

	const setNextInput = useOverworldMovement(
		playerLocation,
		setCharacterLocation,
		assembledMap
	);

	const interactWith = useCallback(
		(occ: [string, Occupant] | undefined) => {
			if (!occ) {
				return;
			}
			setBannerContent(`Found ${occ[1].amount} ${occ[1].item}`);
			collectItem(occ);
		},
		[collectItem]
	);

	//PLAYER
	useDrawCharacter(playerCanvasId, playerLocation);
	useKeyboardControl(
		setNextInput,
		() => handleEnterPress(playerLocation, interactWith),
		!!bannerContent
	);

	useDrawBackground(backgroundCanvasId, map);
	useDrawOccupants(occupantsCanvasId, assembledMap);

	if (!valid) {
		return (
			<h2>
				<IoMdMenu onClick={openMenu} size={baseSize / 2} />
				Invalid Map received
			</h2>
		);
	}

	return (
		<div className="overworldPage">
			{bannerContent && (
				<Banner>
					<h2>{bannerContent}</h2>
				</Banner>
			)}
			<IoMdMenu
				style={{ position: 'absolute', top: '1.5rem', left: '1rem' }}
				onClick={openMenu}
				size={baseSize / 2}
			/>
			<div>
				<canvas id={playerCanvasId} height={baseSize} width={baseSize} />
				<div
					className="backgroundLayer"
					style={{
						top: -baseSize - playerLocation.y * baseSize,
						left: -playerLocation.x * baseSize,
					}}
				>
					<canvas
						style={{ border: '1px solid red' }}
						id={backgroundCanvasId}
						height={map.height * baseSize}
						width={map.width * baseSize}
					/>
				</div>
				<div
					className="backgroundLayer"
					style={{
						top: 2 * -baseSize - playerLocation.y * baseSize,
						left: -playerLocation.x * baseSize,
					}}
				>
					<canvas
						style={{ border: '1px solid blue' }}
						id={occupantsCanvasId}
						height={map.height * baseSize}
						width={map.width * baseSize}
					/>
				</div>
			</div>
		</div>
	);
};
