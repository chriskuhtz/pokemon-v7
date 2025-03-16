import { useCallback, useContext, useMemo, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { TeamOverview } from '../../components/TeamOverview/TeamOverview';
import { TimeOfDayIcon } from '../../components/TimeOfDayIcon/TimeOfDayIcon';
import { WeatherIcon } from '../../components/WeatherIcon/WeatherIcon';

import { CgZoomIn, CgZoomOut } from 'react-icons/cg';
import { CombinedCanvas } from '../../components/CombinedCanvas/CombinedCanvas';
import { battleSpriteSize, fps } from '../../constants/gameData';
import { mapsRecord } from '../../constants/maps/mapsRecord';
import { getTimeOfDay, OverworldShaderMap } from '../../functions/getTimeOfDay';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { BaseSizeContext } from '../../hooks/useBaseSize';
import { useDrawForeground } from '../../hooks/useDrawBackground';
import { useHallowedTower } from '../../hooks/useHallowedTower';
import { useHoneyTree } from '../../hooks/useHoneyTree';
import { Message } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { Occupant } from '../../interfaces/OverworldMap';
import { CharacterLocationData, SaveFile } from '../../interfaces/SaveFile';
import './Overworld.css';
import { ClickerGrid } from './components/ClickerGrid';
import { UncollectedQuestsBadge } from './components/UncollectedQuestsBadge';
import { interactWithFunction } from './functions/interactWith';
import { useClickTarget } from './hooks/useClickTarget';
import { useDrawCharacter } from './hooks/useDrawCharacter';
import { useDrawOccupants } from './hooks/useDrawOccupants';
import { useKeyboardControl } from './hooks/useKeyboardControl';
import { useOccupants } from './hooks/useOccupants';
import { useOverworldMovement } from './hooks/useOverworldMovement';
import { useStartEncounter } from './hooks/useStartEncounter';

const playerCanvasId = 'playerCanvas';
const backgroundCanvasId = 'bg';
const occupantsCanvasId = 'occs';

export const Overworld = ({
	playerLocation,
	setCharacterLocation,
	goToMarket,
	talkToNurse,
	playerSprite,
	handledOccupants,
	cutterPokemon,
	latestMessage,
	encounterRateModifier,
	addMultipleMessages,
}: {
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	encounterRateModifier?: number;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: string) => void;
	playerSprite: string;
	receiveItems: (item: ItemType, amount: number) => void;
	handledOccupants: string[];
	cutterPokemon?: { name: string };
	saveFile: SaveFile;
	latestMessage: Message | undefined;
	addMultipleMessages: (newMessages: Message[]) => void;
}) => {
	const { baseSize, setBaseSize } = useContext(BaseSizeContext);
	const { saveFile, handleOccupantReducer, navigateAwayFromOverworldReducer } =
		useContext(SaveFileContext);
	const interactWithHoneyTree = useHoneyTree();
	const interactWithHallowedTower = useHallowedTower();
	const addEncounterMessage = useStartEncounter();
	const map = useMemo(
		() => mapsRecord[saveFile.location.mapId],
		[saveFile.location.mapId]
	);

	const { width, height } = {
		width: map.tileMap.baseLayer[0].length,
		height: map.tileMap.baseLayer.length,
	};

	const [stepsTaken, setStepsTaken] = useState<number>(0);
	const { rotateOccupant, occupants } = useOccupants();

	//DRAWING
	useDrawCharacter(playerCanvasId, playerLocation, playerSprite);
	useDrawOccupants(occupantsCanvasId, occupants);
	//INTERACTION
	useDrawForeground('foreground', map.tileMap, baseSize);
	const interactWith = useCallback(
		(occ: Occupant | undefined) =>
			interactWithFunction({
				occ,
				addMultipleMessages,
				openStorage: () =>
					navigateAwayFromOverworldReducer('STORAGE', stepsTaken),
				stepsTaken,
				rotateOccupant,
				playerLocation,
				goToMarket,
				talkToNurse,
				handledOccupants,
				handleThisOccupant: handleOccupantReducer,
				cutterPokemon,
				goToPosition: setCharacterLocation,
				interactWithHoneyTree,
				interactWithHallowedTower,
				goToCampMenu: () =>
					navigateAwayFromOverworldReducer('CAMP_UPGRADES', stepsTaken),
				goToBulletinBoard: () =>
					navigateAwayFromOverworldReducer('BULLETIN_BOARD', stepsTaken),
				settings: saveFile.settings,
			}),
		[
			addMultipleMessages,
			cutterPokemon,
			goToMarket,
			handleOccupantReducer,
			handledOccupants,
			interactWithHallowedTower,
			interactWithHoneyTree,
			navigateAwayFromOverworldReducer,
			playerLocation,
			rotateOccupant,
			saveFile.settings,
			setCharacterLocation,
			stepsTaken,
			talkToNurse,
		]
	);
	//MOVEMENT
	const setNextInput = useOverworldMovement(
		() => addEncounterMessage(stepsTaken),
		() => setStepsTaken((s) => s + 1),
		occupants,
		encounterRateModifier
	);
	const setClickTarget = useClickTarget(
		map,
		playerLocation,
		setNextInput,
		interactWith,
		[],
		!!latestMessage,
		occupants
	);
	useKeyboardControl(
		setNextInput,
		() => handleEnterPress(playerLocation, interactWith, occupants),
		() => navigateAwayFromOverworldReducer('MAIN', stepsTaken),
		() => navigateAwayFromOverworldReducer('QUESTS', stepsTaken),
		() => navigateAwayFromOverworldReducer('TEAM', stepsTaken),
		() => navigateAwayFromOverworldReducer('BAG', stepsTaken),
		!!latestMessage
	);

	return (
		<div>
			<div
				style={{
					position: 'absolute',
					top: '1.5rem',
					left: '1rem',
					zIndex: 8999,
					padding: '.5rem',
					borderRadius: 9000,
					backgroundColor: 'rgba(255,255,255,.6)',
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				<CgZoomIn
					size={battleSpriteSize}
					onClick={() => {
						if (baseSize === 256) {
							return;
						}
						setBaseSize(baseSize * 2);
					}}
				/>
				<CgZoomOut
					size={battleSpriteSize}
					onClick={() => {
						if (baseSize === 16) {
							return;
						}
						setBaseSize(baseSize / 2);
					}}
				/>
				<IoMdMenu
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						navigateAwayFromOverworldReducer('MAIN', stepsTaken);
					}}
					size={battleSpriteSize}
				/>
				<UncollectedQuestsBadge stepsWalked={stepsTaken} />
				<TeamOverview steps={stepsTaken} />
			</div>
			<div
				style={{
					position: 'absolute',
					top: '1.5rem',
					right: '1rem',
					display: 'flex',
					gap: '1rem',
					alignItems: 'center',
					zIndex: 9000,
					padding: '.5rem',
					borderRadius: 9000,
					backgroundColor: 'rgba(255,255,255,.6)',
				}}
			>
				<strong>{map.id}</strong>
				<WeatherIcon weather={map.weather} />
				<TimeOfDayIcon />
			</div>

			<div className="overworldPage">
				<div id="canvassesAndShaders" style={{ position: 'relative' }}>
					<div
						id="clickerGridWrapper"
						style={{
							width: width * baseSize,
							height: height * baseSize,
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
							position: 'absolute',
							zIndex: 2,
						}}
					>
						<ClickerGrid
							width={width}
							height={height}
							onClick={setClickTarget}
							baseSize={baseSize}
						/>
					</div>
					<div
						id="shader1"
						style={{
							width: width * baseSize,
							height: height * baseSize,
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
							position: 'absolute',
							backgroundColor: OverworldShaderMap[getTimeOfDay()],
							zIndex: 1,
						}}
					/>
					<canvas
						style={{
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
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
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
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
						id="shader1"
						style={{
							width: width * baseSize,
							height: height * baseSize,
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
							transitionProperty: 'top,left',
							transition: `${fps} ease 0s`,
							position: 'absolute',
							backgroundColor: OverworldShaderMap[getTimeOfDay()],
							zIndex: -2,
						}}
					/>
					<div
						style={{
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
							zIndex: -3,
							position: 'absolute',
						}}
						id={backgroundCanvasId}
					>
						<CombinedCanvas map={map.tileMap} tileSize={baseSize} />
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
						backgroundColor: OverworldShaderMap[getTimeOfDay()],
						zIndex: -4,
					}}
				/>
			</div>
		</div>
	);
};
