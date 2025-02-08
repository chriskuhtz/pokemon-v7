import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { RoutesType } from '../../App';
import { animationTimer, baseSize } from '../../constants/gameData';
import { assembleMap } from '../../functions/assembleMap';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { isValidOverWorldMap } from '../../functions/isValidOverworldMap';
import {
	Occupant,
	OverworldItem,
	OverworldMap,
} from '../../interfaces/OverworldMap';
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
	startEncounter,
	encounterRateModifier,
	collectedItems,
	navigate,
}: {
	openMenu: () => void;
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	collectItem: (item: [string, OverworldItem]) => void;
	map: OverworldMap;
	collectedItems: number[];
	startEncounter: () => void;
	encounterRateModifier?: number;
	navigate: (x: RoutesType) => void;
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
		[map, collectedItems]
	);
	const valid = useMemo(() => isValidOverWorldMap(map), [map]);

	const setNextInput = useOverworldMovement(
		playerLocation,
		setCharacterLocation,
		assembledMap,
		startEncounter,
		encounterRateModifier
	);

	const interactWith = useCallback(
		(occ: [string, Occupant] | undefined) => {
			if (!occ) {
				return;
			}
			const [, data] = occ;

			if (data.type === 'ITEM') {
				setBannerContent(`Found ${data.amount} ${data.item}`);
				collectItem(occ as [string, OverworldItem]);
				return;
			}
			if (data.type === 'PC') {
				navigate('STORAGE');
				return;
			}

			console.error('what is this occupant', occ);
		},
		[collectItem, navigate]
	);

	//PLAYER
	useDrawCharacter(playerCanvasId, playerLocation);
	useKeyboardControl(
		setNextInput,
		() => handleEnterPress(playerLocation, collectedItems, interactWith),
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
						id={occupantsCanvasId}
						height={map.height * baseSize}
						width={map.width * baseSize}
					/>
				</div>
			</div>
		</div>
	);
};
