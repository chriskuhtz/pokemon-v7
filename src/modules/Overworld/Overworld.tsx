import { useCallback, useContext, useMemo, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { TeamOverview } from '../../components/TeamOverview/TeamOverview';
import { TimeOfDayIcon } from '../../components/TimeOfDayIcon/TimeOfDayIcon';
import { WeatherIcon } from '../../components/WeatherIcon/WeatherIcon';

import { CombinedCanvas } from '../../components/CombinedCanvas/CombinedCanvas';
import { baseSize, fps } from '../../constants/gameData';
import { getTimeOfDay, OverworldShaderMap } from '../../functions/getTimeOfDay';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { Message } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { Occupant, OverworldMap } from '../../interfaces/OverworldMap';
import { CharacterLocationData, SaveFile } from '../../interfaces/SaveFile';
import './Overworld.css';
import { ClickerGrid } from './components/ClickerGrid';
import { interactWithFunction } from './functions/interactWith';
import { useClickTarget } from './hooks/useClickTarget';
import { useDrawCharacter } from './hooks/useDrawCharacter';
import { useDrawOccupants } from './hooks/useDrawOccupants';
import { useKeyboardControl } from './hooks/useKeyboardControl';
import { useOverworldMovement } from './hooks/useOverworldMovement';

const playerCanvasId = 'playerCanvas';
const backgroundCanvasId = 'bg';
const occupantsCanvasId = 'occs';

export const Overworld = ({
	openMenu,
	openBag,
	openQuests,
	openTeam,
	playerLocation,
	setCharacterLocation,
	map,
	startEncounter,
	goToMarket,
	talkToNurse,
	openStorage,
	playerSprite,
	handleThisOccupant,
	handledOccupants,
	cutterPokemon,
	latestMessage,
	addMessage,
	encounterRateModifier,
	addMultipleMessages,
}: {
	openMenu: (stepsTaken: number) => void;
	openTeam: (stepsTaken: number) => void;
	openQuests: (stepsTaken: number) => void;
	openBag: (stepsTaken: number) => void;
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	map: OverworldMap;
	startEncounter: (stepsTaken: number) => void;
	encounterRateModifier?: number;
	openStorage: (stepsTaken: number) => void;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: string) => void;
	playerSprite: string;
	receiveItems: (item: ItemType, amount: number) => void;
	handledOccupants: string[];
	handleThisOccupant: (id: string) => void;
	cutterPokemon?: { dexId: number };
	saveFile: SaveFile;
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
}) => {
	const { saveFile } = useContext(SaveFileContext);
	const conditionalOccupants = useMemo(() => {
		return map.occupants.filter((m) => m.conditionFunction(saveFile));
	}, [map, saveFile]);
	const { width, height } = {
		width: map.tileMap.baseLayer[0].length,
		height: map.tileMap.baseLayer.length,
	};

	const [stepsTaken, setStepsTaken] = useState<number>(0);

	const addEncounterMessage = () => {
		addMessage({
			message: 'Wild Pokemon appeared!',
			onRemoval: () => startEncounter(stepsTaken),
		});
	};

	//DRAWING
	useDrawCharacter(playerCanvasId, playerLocation, playerSprite);
	useDrawOccupants(occupantsCanvasId, conditionalOccupants);
	//INTERACTION
	const interactWith = useCallback(
		(occ: Occupant | undefined) =>
			interactWithFunction({
				occ,
				addMultipleMessages,
				openStorage,
				stepsTaken,
				changeOccupant: () => {},
				playerLocation,
				goToMarket,
				talkToNurse,
				handledOccupants,
				handleThisOccupant,
				cutterPokemon,
				goToPosition: setCharacterLocation,
			}),
		[
			addMultipleMessages,
			cutterPokemon,
			goToMarket,
			handleThisOccupant,
			handledOccupants,
			openStorage,
			playerLocation,
			setCharacterLocation,
			stepsTaken,
			talkToNurse,
		]
	);
	//MOVEMENT
	const setNextInput = useOverworldMovement(
		playerLocation,
		setCharacterLocation,
		map,
		addEncounterMessage,
		() => setStepsTaken((s) => s + 1),
		encounterRateModifier
	);
	const setClickTarget = useClickTarget(
		map,
		playerLocation,
		setNextInput,
		interactWith,
		[],
		!!latestMessage,
		conditionalOccupants
	);
	useKeyboardControl(
		setNextInput,
		() => handleEnterPress(playerLocation, interactWith, conditionalOccupants),
		() => openMenu(stepsTaken),
		() => openQuests(stepsTaken),
		() => openTeam(stepsTaken),
		() => openBag(stepsTaken),
		!!latestMessage
	);

	return (
		<div>
			<div
				style={{
					position: 'absolute',
					top: '1.5rem',
					left: '1rem',
					zIndex: 9000,
					padding: '.5rem',
					borderRadius: 9000,
					backgroundColor: 'rgba(255,255,255,.6)',
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				<IoMdMenu
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						openMenu(stepsTaken);
					}}
					size={baseSize / 2}
				/>
				<TeamOverview />
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
							zIndex: 1,
						}}
					>
						<ClickerGrid
							width={width}
							height={height}
							onClick={setClickTarget}
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
							zIndex: 0,
						}}
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
