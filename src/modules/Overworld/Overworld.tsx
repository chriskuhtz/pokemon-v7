import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { TimeOfDayIcon } from '../../components/TimeOfDayIcon/TimeOfDayIcon';
import { WeatherIcon } from '../../components/WeatherIcon/WeatherIcon';
import {
	OccupantName,
	occupantsRecord,
} from '../../constants/checkLists/occupantsRecord';
import { baseSize } from '../../constants/gameData';
import { assembleMap } from '../../functions/assembleMap';
import { getTimeOfDay, OverworldShaderMap } from '../../functions/getTimeOfDay';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { isValidOverWorldMap } from '../../functions/isValidOverworldMap';
import { Message } from '../../hooks/useMessageQueue';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { Occupant, OverworldMap } from '../../interfaces/OverworldMap';
import { CharacterLocationData, SaveFile } from '../../interfaces/SaveFile';
import './Overworld.css';
import { ClickerGrid } from './components/ClickerGrid';
import { interactWithFunction } from './functions/interactWith';
import { useClickTarget } from './hooks/useClickTarget';
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
	map,
	startEncounter,
	goToMarket,
	talkToNurse,
	openStorage,
	playerSprite,
	handleThisOccupant,
	handledOccupants,
	cutterPokemon,
	saveFile,
	latestMessage,
	addMessage,
	encounterRateModifier,
	addMultipleMessages,
}: {
	openMenu: (stepsTaken: number) => void;
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	map: OverworldMap;
	startEncounter: (stepsTaken: number) => void;
	encounterRateModifier?: number;
	openStorage: (stepsTaken: number) => void;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: OccupantName) => void;
	playerSprite: string;
	receiveItems: (item: ItemType, amount: number) => void;
	handledOccupants: OccupantName[];
	handleThisOccupant: (id: OccupantName) => void;
	cutterPokemon?: { dexId: number };
	saveFile: SaveFile;
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
}) => {
	const [statefulOccupants, setStatefulOccupants] = useState<
		Partial<Record<OccupantName, Occupant>>
	>({});

	useEffect(() => {
		const filteredOccupants = [...map.occupants].filter((o) => {
			const occ = occupantsRecord[o];

			if (occ.type === 'ITEM' && handledOccupants.includes(o)) {
				return false;
			}
			if (occ.type === 'BUSH' && handledOccupants.includes(o)) {
				return false;
			}
			if (occ.type === 'HIDDEN_ITEM' && handledOccupants.includes(o)) {
				return false;
			}

			return occ.conditionFunction(saveFile);
		});
		setStatefulOccupants(
			Object.fromEntries(
				Object.entries(occupantsRecord).filter(([id]) =>
					filteredOccupants.includes(id as OccupantName)
				)
			)
		);
	}, [handledOccupants, map, saveFile]);
	const changeOccupant = useCallback(
		(id: OccupantName, updatedOccupant: Occupant) => {
			setStatefulOccupants((statefulOccupants) => {
				const updated = { ...statefulOccupants };
				updated[id] = updatedOccupant;

				return updated;
			});
		},
		[]
	);

	const assembledMap = useMemo(
		() => assembleMap(map, statefulOccupants),
		[map, statefulOccupants]
	);

	const valid = useMemo(() => isValidOverWorldMap(map), [map]);

	const [stepsTaken, setStepsTaken] = useState<number>(0);

	const addEncounterMessage = () => {
		addMessage({
			message: 'Wild Pokemon appeared!',
			onRemoval: () => startEncounter(stepsTaken),
		});
	};

	//DRAWING
	useDrawCharacter(playerCanvasId, playerLocation, playerSprite);
	useDrawBackground(backgroundCanvasId, map);
	useDrawOccupants(
		occupantsCanvasId,
		!!latestMessage,
		statefulOccupants,
		setStatefulOccupants
	);
	//INTERACTION
	const interactWith = useCallback(
		(occ: [string, Occupant] | undefined) =>
			interactWithFunction({
				occ,
				addMultipleMessages,
				openStorage,
				stepsTaken,
				changeOccupant,
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
			changeOccupant,
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
		assembledMap,
		addEncounterMessage,
		() => setStepsTaken((s) => s + 1),
		encounterRateModifier
	);
	const setClickTarget = useClickTarget(
		assembledMap,
		playerLocation,
		setNextInput,
		interactWith,
		handledOccupants.filter(
			(h) =>
				occupantsRecord[h].type === 'ITEM' ||
				occupantsRecord[h].type === 'HIDDEN_ITEM'
		),
		!!latestMessage,
		statefulOccupants
	);
	useKeyboardControl(
		setNextInput,
		() =>
			handleEnterPress(
				playerLocation,
				handledOccupants.filter(
					(h) =>
						occupantsRecord[h].type === 'ITEM' ||
						occupantsRecord[h].type === 'HIDDEN_ITEM'
				),
				interactWith,
				statefulOccupants
			),
		() => openMenu(stepsTaken),
		!!latestMessage
	);

	if (!valid) {
		return (
			<h2>
				<IoMdMenu onClick={() => openMenu(stepsTaken)} size={baseSize / 2} />
				Invalid Map received
			</h2>
		);
	}

	return (
		<div>
			<IoMdMenu
				style={{
					position: 'absolute',
					top: '1.5rem',
					left: '1rem',
					zIndex: 9000,
				}}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					openMenu(stepsTaken);
				}}
				size={baseSize / 2}
			/>
			<div
				style={{
					position: 'absolute',
					top: '1.5rem',
					right: '1rem',
					display: 'flex',
					gap: '1rem',
				}}
			>
				<WeatherIcon weather={assembledMap.weather} />
				<TimeOfDayIcon />
			</div>
			{/* {dialogues.length > 0 && (
				<Banner>
					<h2>{dialogues[0].message}</h2>
					{dialogues[0].icon}
				</Banner>
			)} */}
			<div className="overworldPage">
				<div id="canvassesAndShaders" style={{ position: 'relative' }}>
					<div
						id="clickerGridWrapper"
						style={{
							width: map.width * baseSize,
							height: map.height * baseSize,
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
							position: 'absolute',
							zIndex: 1,
						}}
					>
						<ClickerGrid
							width={map.width}
							height={map.height}
							onClick={setClickTarget}
						/>
					</div>
					<div
						id="shader1"
						style={{
							width: map.width * baseSize,
							height: map.height * baseSize,
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
							zIndex: -1,
							position: 'absolute',
						}}
						id={occupantsCanvasId}
						height={map.height * baseSize}
						width={map.width * baseSize}
					/>
					<div
						id="shader1"
						style={{
							width: map.width * baseSize,
							height: map.height * baseSize,
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
							position: 'absolute',
							backgroundColor: OverworldShaderMap[getTimeOfDay()],
							zIndex: -2,
						}}
					/>
					<canvas
						style={{
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
							zIndex: -3,
							position: 'absolute',
						}}
						id={backgroundCanvasId}
						height={map.height * baseSize}
						width={map.width * baseSize}
					/>
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
