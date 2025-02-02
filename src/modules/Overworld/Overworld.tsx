import { useMemo } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { baseSize } from '../../constants/gameData';
import { isValidOverWorldMap } from '../../functions/isValidOverworldMap';
import { OverworldMap } from '../../interfaces/OverworldMap';
import { CharacterLocationData } from '../../interfaces/SaveFile';
import './Overworld.css';
import { useDrawBackground } from './hooks/useDrawBackground';
import { useDrawCharacter } from './hooks/useDrawCharacter';
import { useOverworldMovement } from './hooks/useOverworldMovement';
import { usePlayerControl } from './hooks/usePlayerControl';

const playerCanvasId = 'playerCanvas';
const backgroundCanvasId = 'bg';

export const Overworld = ({
	openMenu,
	playerLocation,
	setCharacterLocation,
	map,
}: {
	openMenu: () => void;
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	map: OverworldMap;
}) => {
	const valid = useMemo(() => isValidOverWorldMap(map), [map]);
	const setNextInput = useOverworldMovement(
		playerLocation,
		setCharacterLocation,
		map
	);
	//PLAYER
	useDrawCharacter(playerCanvasId, playerLocation);
	usePlayerControl(setNextInput);

	useDrawBackground(backgroundCanvasId, map);

	if (!valid) {
		return (
			<h2>
				<IoMdMenu onClick={openMenu} size={30} />
				Invalid Map received
			</h2>
		);
	}

	return (
		<div className="overworldPage">
			<IoMdMenu
				style={{ position: 'absolute', top: '1.5rem', left: '1rem' }}
				onClick={openMenu}
				size={30}
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
			</div>
		</div>
	);
};
