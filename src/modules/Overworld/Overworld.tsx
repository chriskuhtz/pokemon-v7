import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { CombinedCanvas } from '../../components/CombinedCanvas/CombinedCanvas';
import { fps } from '../../constants/gameData';
import { mapsRecord } from '../../constants/maps/mapsRecord';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { LocationContext } from '../../hooks/LocationProvider';
import { useApricornTree } from '../../hooks/useApricornTree';
import { BaseSizeContext } from '../../hooks/useBaseSize';
import { useDrawForeground } from '../../hooks/useDrawBackground';
import { useDugtrioExplorers } from '../../hooks/useDugtrioExplorers';
import { useHallowedTower } from '../../hooks/useHallowedTower';
import { useHoneyTree } from '../../hooks/useHoneyTree';
import { useInteractWithSnorlax } from '../../hooks/useInteractWithSnorlax';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useRangerRadio } from '../../hooks/useRangerRadio';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { useShader } from '../../hooks/useShader';
import { useStaticEncounter } from '../../hooks/useStaticEncounter';
import { useStrangeTree } from '../../hooks/useStrangeTree';
import { useZigzagoonForagers } from '../../hooks/useZigzagoonForagers';
import { Occupant } from '../../interfaces/OverworldMap';
import './Overworld.css';
import { ClickerGrid } from './components/ClickerGrid';
import { OverworldMenus } from './components/OverworldMenus';
import { interactWithFunction } from './functions/interactWith';
import { useClickTarget } from './hooks/useClickTarget';
import { useCombeeHive } from './hooks/useCombeeHive';
import { useDrawCharacter } from './hooks/useDrawCharacter';
import { useDrawOccupants } from './hooks/useDrawOccupants';
import { useEncounterRateModifier } from './hooks/useEncounterRateModifier';
import { useInteractWithLedge } from './hooks/useInteractWithLedge';
import { useInteractWithTrainer } from './hooks/useInteractWithTrainer';
import { useKeyboardControl } from './hooks/useKeyboardControl';
import { useMachete } from './hooks/useMachete';
import { useOccupants } from './hooks/useOccupants';
import { useOverworldMovement } from './hooks/useOverworldMovement';
import { useSledgeHammer } from './hooks/useSledgeHammer';
import { useStartEncounter } from './hooks/useStartEncounter';

const playerCanvasId = 'playerCanvas';
const backgroundCanvasId = 'bg';
const occupantsCanvasId = 'occs';

export const Overworld = () => {
	const shader = useShader();
	const [stepsTaken, setStepsTaken] = useState<number>(0);
	const { baseSize } = useContext(BaseSizeContext);
	const { latestMessage, addMultipleMessages } =
		useContext(MessageQueueContext);
	const {
		saveFile,
		handleOccupantReducer,
		navigateAwayFromOverworldReducer,
		patchSaveFileReducer,
		talkToNurseReducer: talkToNurse,
	} = useContext(SaveFileContext);
	const { location, setLocation: setCharacterLocation } =
		useContext(LocationContext);
	const interactWithApricornTree = useApricornTree();
	const interactWithHoneyTree = useHoneyTree();
	const interactWithTrainer = useInteractWithTrainer();
	const interactWithHallowedTower = useHallowedTower();
	const interactWithStrangeTree = useStrangeTree();
	const interactWithCombeeHive = useCombeeHive();
	const interactWithBush = useMachete();
	const interactWithLedge = useInteractWithLedge();
	const interactWithZigzagoonForager = useZigzagoonForagers();
	const interactWithSnorlax = useInteractWithSnorlax();
	const interactWithStaticEncounter = useStaticEncounter();
	const interactWithDugtrioExplorer = useDugtrioExplorers();
	const interactWithSwarmRadar = useCallback(() => {
		navigateAwayFromOverworldReducer('SWARM_RADAR', stepsTaken);
	}, [navigateAwayFromOverworldReducer, stepsTaken]);
	const interactWithRocketRadio = useRangerRadio();
	const interactWithRock = useSledgeHammer();
	const addEncounterMessage = useStartEncounter();
	const encounterRateModifier = useEncounterRateModifier();

	const map = useMemo(() => mapsRecord[location.mapId], [location.mapId]);

	const { width, height } = {
		width: map.tileMap.baseLayer[0].length,
		height: map.tileMap.baseLayer.length,
	};

	//stop flying in cave
	useEffect(() => {
		if (mapsRecord[location.mapId].area === 'CAVE' && saveFile.flying) {
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
	const interactWith = useCallback(
		(occ: Occupant | undefined) =>
			interactWithFunction({
				activeMessage: !!latestMessage,
				occ,
				addMultipleMessages,
				rotateOccupant,
				playerLocation: location,
				talkToNurse,
				handledOccupants: saveFile.handledOccupants.map((h) => h.id),
				handleThisOccupant: handleOccupantReducer,
				goToPosition: setCharacterLocation,
				interactWithApricornTree,
				interactWithHoneyTree,
				interactWithHallowedTower,
				interactWithStrangeTree,
				interactWithCombeeHive,
				interactWithBush,
				interactWithRock,
				interactWithLedge,
				interactWithZigzagoonForager,
				interactWithDugtrioExplorer,
				interactWithSwarmRadar,
				interactWithRocketRadio,
				interactWithSnorlax,
				interactWithStaticEncounter,
				interactWithTrainer,
				goTo: (route) => navigateAwayFromOverworldReducer(route, stepsTaken),
				settings: saveFile.settings,
			}),
		[
			latestMessage,
			addMultipleMessages,
			stepsTaken,
			rotateOccupant,
			location,
			talkToNurse,
			saveFile.handledOccupants,
			saveFile.settings,
			handleOccupantReducer,
			setCharacterLocation,
			interactWithApricornTree,
			interactWithHoneyTree,
			interactWithHallowedTower,
			interactWithStrangeTree,
			interactWithCombeeHive,
			interactWithBush,
			interactWithRock,
			interactWithLedge,
			interactWithZigzagoonForager,
			interactWithDugtrioExplorer,
			interactWithSwarmRadar,
			interactWithRocketRadio,
			interactWithSnorlax,
			interactWithStaticEncounter,
			interactWithTrainer,
			navigateAwayFromOverworldReducer,
		]
	);
	//MOVEMENT
	const setNextInput = useOverworldMovement(
		(challenger) => addEncounterMessage(stepsTaken, challenger),
		() => setStepsTaken((s) => s + 1),
		occupants,
		encounterRateModifier
	);
	const setClickTarget = useClickTarget(
		map,
		location,
		setNextInput,
		interactWith,
		[],
		!!latestMessage,
		occupants
	);
	useKeyboardControl(
		setNextInput,
		() => handleEnterPress(location, interactWith, occupants),
		() => navigateAwayFromOverworldReducer('MAIN', stepsTaken),
		() => navigateAwayFromOverworldReducer('QUESTS', stepsTaken),
		() => navigateAwayFromOverworldReducer('TEAM', stepsTaken),
		() => navigateAwayFromOverworldReducer('BAG', stepsTaken),
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

			<div className="overworldPage">
				<div id="canvassesAndShaders" style={{ position: 'relative' }}>
					<div
						id="clickerGridWrapper"
						style={{
							width: width * baseSize,
							height: height * baseSize,
							top: -location.y * baseSize,
							left: -location.x * baseSize,
							position: 'absolute',
							zIndex: 2,
						}}
					>
						<ClickerGrid
							width={width}
							height={height}
							onClick={setClickTarget}
							baseSize={baseSize}
							mapId={location.mapId}
						/>
					</div>
					<div
						id="shader1"
						style={{
							width: width * baseSize,
							height: height * baseSize,
							top: -location.y * baseSize,
							left: -location.x * baseSize,
							position: 'absolute',
							backgroundColor: shader,
							zIndex: 1,
						}}
					/>
					<canvas
						style={{
							top: -location.y * baseSize,
							left: -location.x * baseSize,
							transitionProperty: 'top,left',
							transition: `${fps} ease 0s`,
							zIndex: 0,
							position: 'absolute',
						}}
						id={'foreground'}
						height={height * baseSize}
						width={width * baseSize}
					/>
					<canvas id={playerCanvasId} height={baseSize} width={baseSize} />

					<canvas
						style={{
							top: -location.y * baseSize,
							left: -location.x * baseSize,
							transitionProperty: 'top,left',
							transition: `${fps} ease 0s`,
							zIndex: -1,
							position: 'absolute',
						}}
						id={occupantsCanvasId}
						height={height * baseSize}
						width={width * baseSize}
					/>

					<div
						style={{
							top: -location.y * baseSize,
							left: -location.x * baseSize,
							zIndex: -3,
							position: 'absolute',
						}}
						id={backgroundCanvasId}
					>
						<CombinedCanvas
							map={map.tileMap}
							tileSize={baseSize}
							tileSetUrl={map.tilesetUrl}
						/>
					</div>
				</div>
				<div
					id="background"
					style={{
						width: '100dvw',
						height: '100dvh',
						top: 0,
						left: 0,
						position: 'absolute',
						backgroundColor: shader,
						zIndex: -4,
					}}
				/>
			</div>
		</div>
	);
};
