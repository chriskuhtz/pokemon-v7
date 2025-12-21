import { useContext, useEffect, useMemo, useState } from 'react';

import { mapsRecord } from '../../constants/gameData/maps/mapsRecord';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { LocationContext } from '../../hooks/LocationProvider';
import { BaseSizeContext } from '../../hooks/useBaseSize';
import { useDrawForeground } from '../../hooks/useDrawBackground';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { OverworldMap } from '../../interfaces/OverworldMap';
import './Overworld.css';
import { OverworldCanvasses } from './components/OverworldCanvasses';
import { OverworldMenus } from './components/OverworldMenus';
import { occupantsCanvasId, playerCanvasId } from './constants/constants';
import { useDrawCharacter } from './hooks/useDrawCharacter';
import { useDrawOccupants } from './hooks/useDrawOccupants';
import { useInteractWith } from './hooks/useInteractWith';
import { useKeyboardControl } from './hooks/useKeyboardControl';
import { useMovement } from './hooks/useMovement';
import { useOccupants } from './hooks/useOccupants';

export const Overworld = () => {
	const [stepsTaken, setStepsTaken] = useState<number>(0);
	const { baseSize } = useContext(BaseSizeContext);

	const { latestMessage } = useContext(MessageQueueContext);
	const { saveFile, navigateAwayFromOverworldReducer, patchSaveFileReducer } =
		useContext(SaveFileContext);
	const { location } = useContext(LocationContext);

	const map = useMemo(
		(): OverworldMap => mapsRecord[location.mapId],
		[location.mapId]
	);

	//stop flying in cave
	useEffect(() => {
		const devmode = !!window.localStorage.getItem('devmode');
		if (
			mapsRecord[location.mapId].area !== 'OPEN' &&
			saveFile.flying &&
			!devmode
		) {
			patchSaveFileReducer({ flying: false });
		}
	}, [location, patchSaveFileReducer, saveFile]);

	const { rotateOccupant, occupants } = useOccupants();

	const sprite = useMemo(() => {
		if (saveFile.flying) {
			return 'pidgeot';
		}
		const onWater = map.tileMap.waterLayer[location.y][location.x];
		if (onWater) {
			return 'NPC_027';
		}
		if (map.id === 'routeN1W1') {
			return 'NPC_011';
		}

		return saveFile.sprite;
	}, [
		saveFile.flying,
		saveFile.sprite,
		map.tileMap.waterLayer,
		map.id,
		location.y,
		location.x,
	]);

	//DRAWING
	useDrawCharacter(playerCanvasId, location, sprite);
	useDrawOccupants(occupantsCanvasId, occupants, baseSize);
	//INTERACTION
	useDrawForeground('foreground', map.tileMap, map.tilesetUrl, baseSize);
	const interactWith = useInteractWith(stepsTaken, rotateOccupant);
	//MOVEMENT
	// const setNextInput = useOverworldMovement(
	// 	() => setStepsTaken((s) => s + 1),
	// 	occupants,
	// 	stepsTaken
	// );
	const setNextInput = useMovement(occupants, stepsTaken, setStepsTaken);

	useKeyboardControl(
		setNextInput,
		() => handleEnterPress(location, interactWith, occupants),
		() => navigateAwayFromOverworldReducer({ activeTab: 'MAIN' }, stepsTaken),
		() => navigateAwayFromOverworldReducer({ activeTab: 'QUESTS' }, stepsTaken),
		() => navigateAwayFromOverworldReducer({ activeTab: 'TEAM' }, stepsTaken),
		() => navigateAwayFromOverworldReducer({ activeTab: 'BAG' }, stepsTaken),
		!!latestMessage
	);

	return (
		<div>
			<OverworldMenus
				stepsTaken={stepsTaken}
				setNextInput={setNextInput}
				handleEnterPress={() =>
					handleEnterPress(location, interactWith, occupants)
				}
			/>
			<OverworldCanvasses
				setNextInput={setNextInput}
				interactWith={interactWith}
				occupants={occupants}
			/>
		</div>
	);
};
