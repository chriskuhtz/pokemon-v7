import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { TimeOfDayIcon } from '../../components/TimeOfDayIcon/TimeOfDayIcon';
import { WeatherIcon } from '../../components/WeatherIcon/WeatherIcon';
import { occupantsRecord } from '../../constants/checkLists/occupantsRecord';
import { animationTimer, baseSize } from '../../constants/gameData';
import { assembleMap } from '../../functions/assembleMap';
import { getTimeOfDay, OverworldShaderMap } from '../../functions/getTimeOfDay';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { isValidOverWorldMap } from '../../functions/isValidOverworldMap';
import { Inventory } from '../../interfaces/Inventory';
import {
	Occupant,
	OverworldItem,
	OverworldMap,
} from '../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { CharacterLocationData } from '../../interfaces/SaveFile';
import { Banner } from '../../uiComponents/Banner/Banner';
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

export interface Dialogue {
	message: string;
	onRemoval?: () => void;
	icon?: ReactNode;
}

export const Overworld = ({
	openMenu,
	playerLocation,
	setCharacterLocation,
	collectItem,
	map,
	startEncounter,
	firstTeamMember,
	collectedItems,
	goToMarket,
	talkToNurse,
	openStorage,
	bushCutting,
	cutBushes,
	playerSprite,
}: {
	openMenu: (stepsTaken: number) => void;
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	collectItem: (item: [string, OverworldItem]) => void;
	map: OverworldMap;
	collectedItems: number[];
	startEncounter: (stepsTaken: number) => void;
	encounterRateModifier?: number;
	openStorage: (stepsTaken: number) => void;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	firstTeamMember: OwnedPokemon;
	talkToNurse: (id: number) => void;
	bushCutting?: {
		cut: (id: number) => void;
		cutterPokemon: { dexId: number };
	};
	cutBushes: number[];
	playerSprite: string;
}) => {
	const [statefulOccupants, setStatefulOccupants] = useState<
		Record<number, Occupant>
	>({});
	useEffect(() => {
		const filteredOccupants = [...map.occupants].filter(
			(o) =>
				!collectedItems.some((c) => c === o) && !cutBushes.some((c) => c === o)
		);
		setStatefulOccupants(
			Object.fromEntries(
				Object.entries(occupantsRecord).filter(([id]) =>
					filteredOccupants.includes(Number.parseInt(id))
				)
			)
		);
	}, [collectedItems, cutBushes, map]);
	const changeOccupant = useCallback(
		(id: number, updatedOccupant: Occupant) => {
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
	const [dialogues, setDialogues] = useState<Dialogue[]>([]);
	useEffect(() => {
		if (dialogues.length === 0) {
			return;
		}
		const t = setTimeout(() => {
			if (dialogues[0].onRemoval) {
				dialogues[0].onRemoval();
			}
			setDialogues(dialogues.slice(1));
		}, animationTimer);

		return () => clearTimeout(t);
	}, [dialogues]);
	const addDialogue = (x: Dialogue) => {
		setDialogues((dialogues) => [...dialogues, x]);
	};

	const addEncounterDialogue = () => {
		addDialogue({
			message: 'Wild Pokemon appeared!',
			onRemoval: () => startEncounter(stepsTaken),
		});
	};

	const encounterRateModifier = useMemo(() => {
		if (firstTeamMember.ability === 'stench') {
			return 0.5;
		}
		if (
			firstTeamMember.ability === 'sand-veil' &&
			assembledMap.weather === 'sandstorm'
		) {
			return 0.5;
		}

		return 1;
	}, [assembledMap.weather, firstTeamMember.ability]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const fishingEncounterRateModifier = useMemo(() => {
		if (firstTeamMember.ability === 'suction-cups') {
			return 1.5;
		}

		return 1;
	}, [firstTeamMember.ability]);

	//DRAWING
	useDrawCharacter(playerCanvasId, playerLocation, playerSprite);
	useDrawBackground(backgroundCanvasId, map);
	useDrawOccupants(
		occupantsCanvasId,
		dialogues.length > 0,
		statefulOccupants,
		setStatefulOccupants
	);
	//INTERACTION
	const interactWith = useCallback(
		(occ: [string, Occupant] | undefined) =>
			interactWithFunction({
				occ,
				addDialogue,
				collectItem,
				cutBushes,
				bushCutting,
				openStorage,
				stepsTaken,
				changeOccupant,
				playerLocation,
				goToMarket,
				talkToNurse,
			}),
		[
			bushCutting,
			changeOccupant,
			collectItem,
			cutBushes,
			goToMarket,
			openStorage,
			playerLocation,
			stepsTaken,
			talkToNurse,
		]
	);
	//MOVEMENT
	const setNextInput = useOverworldMovement(
		playerLocation,
		setCharacterLocation,
		assembledMap,
		addEncounterDialogue,
		() => setStepsTaken((s) => s + 1),
		encounterRateModifier
	);
	const setClickTarget = useClickTarget(
		assembledMap,
		playerLocation,
		setNextInput,
		interactWith,
		collectedItems,
		dialogues.length > 0,
		statefulOccupants
	);
	useKeyboardControl(
		setNextInput,
		() =>
			handleEnterPress(
				playerLocation,
				collectedItems,
				interactWith,
				statefulOccupants
			),
		() => openMenu(stepsTaken),
		dialogues.length > 0
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
			{dialogues.length > 0 && (
				<Banner>
					<h2>{dialogues[0].message}</h2>
					{dialogues[0].icon}
				</Banner>
			)}
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
