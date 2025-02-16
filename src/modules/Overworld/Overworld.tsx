import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { TimeOfDayIcon } from '../../components/TimeOfDayIcon/TimeOfDayIcon';
import { WeatherIcon } from '../../components/WeatherIcon/WeatherIcon';
import { animationTimer, baseSize } from '../../constants/gameData';
import { assembleMap } from '../../functions/assembleMap';
import { getOppositeDirection } from '../../functions/getOppositeDirection';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { isEvening, isMorning, isNight } from '../../functions/getTimeOfDay';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { isValidOverWorldMap } from '../../functions/isValidOverworldMap';
import { Inventory } from '../../interfaces/Inventory';
import {
	Occupant,
	OverworldEncounter,
	OverworldItem,
	OverworldMap,
} from '../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { CharacterLocationData } from '../../interfaces/SaveFile';
import { Banner } from '../../uiComponents/Banner/Banner';
import './Overworld.css';
import { ClickerGrid } from './components/ClickerGrid';
import { useClickTarget } from './hooks/useClickTarget';
import { useDrawBackground } from './hooks/useDrawBackground';
import { useDrawCharacter } from './hooks/useDrawCharacter';
import { useDrawOccupants } from './hooks/useDrawOccupants';
import { useKeyboardControl } from './hooks/useKeyboardControl';
import { useOverworldMovement } from './hooks/useOverworldMovement';

const playerCanvasId = 'playerCanvas';
const backgroundCanvasId = 'bg';
const occupantsCanvasId = 'occs';

const getOverworldShaderColor = (): string => {
	if (isNight()) {
		return 'rgba(23, 44, 79,.4)';
	}
	if (isEvening() || isMorning()) {
		return 'rgba(156, 98, 0,.2)';
	}
	return 'rgba(255,255,255,0)';
};
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
}: {
	openMenu: (stepsTaken: number) => void;
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	collectItem: (item: [string, OverworldItem]) => void;
	map: OverworldMap;
	collectedItems: number[];
	startEncounter: (x: OverworldEncounter, stepsTaken: number) => void;
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
}) => {
	const assembledMap = useMemo(
		() => assembleMap(map, collectedItems, cutBushes),
		[map, collectedItems, cutBushes]
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
		const randomEncounter =
			assembledMap.possibleEncounters[
				Math.floor(Math.random() * assembledMap.possibleEncounters.length)
			];

		addDialogue({
			message: 'A wild Pokemon appeared!',
			onRemoval: () => startEncounter(randomEncounter, stepsTaken),
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

	//DRAWING
	useDrawCharacter(playerCanvasId, playerLocation);
	useDrawBackground(backgroundCanvasId, map);
	const changeOccupant = useDrawOccupants(occupantsCanvasId, assembledMap);
	//INTERACTION
	const interactWith = useCallback(
		(occ: [string, Occupant] | undefined) => {
			if (!occ) {
				return;
			}
			const [id, data] = occ;

			if (data.type === 'ITEM' || data.type === 'HIDDEN_ITEM') {
				addDialogue({
					message: `Found ${data.amount} ${data.item}`,
					onRemoval: () => collectItem(occ as [string, OverworldItem]),
				});
				return;
			}
			if (data.type === 'BUSH' && !cutBushes.includes(Number.parseInt(id))) {
				if (bushCutting) {
					addDialogue({
						message: `Your Pokemon used cut`,
						icon: (
							<img src={getPokemonSprite(bushCutting.cutterPokemon.dexId)} />
						),
						onRemoval: () => bushCutting.cut(Number.parseInt(id)),
					});
				} else addDialogue({ message: 'Maybe a Pokemon can cut this' });
				return;
			}
			if (data.type === 'PC') {
				addDialogue({
					message: 'Accessing Pokemon Storage',
					onRemoval: () => openStorage(stepsTaken),
				});
				return;
			}
			if (data.type === 'MERCHANT') {
				changeOccupant(Number.parseInt(id), {
					...data,
					orientation: getOppositeDirection(playerLocation.orientation),
				});
				data.dialogue.forEach((d, i) =>
					addDialogue({
						message: d,
						onRemoval:
							i === data.dialogue.length - 1
								? () => goToMarket(data.inventory, stepsTaken)
								: undefined,
					})
				);
				return;
			}
			if (data.type === 'NURSE') {
				changeOccupant(Number.parseInt(id), {
					...data,
					orientation: getOppositeDirection(playerLocation.orientation),
				});

				data.dialogue.forEach((d, i) =>
					addDialogue({
						message: d,
						onRemoval:
							i === data.dialogue.length - 1
								? () => talkToNurse(Number.parseInt(id))
								: undefined,
					})
				);
				return;
			}

			console.error('what is this occupant', occ);
		},
		[
			bushCutting,
			changeOccupant,
			collectItem,
			cutBushes,
			goToMarket,
			openStorage,
			playerLocation.orientation,
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
		dialogues.length > 0
	);
	useKeyboardControl(
		setNextInput,
		() => handleEnterPress(playerLocation, collectedItems, interactWith),
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
		<>
			<IoMdMenu
				style={{ position: 'absolute', top: '1.5rem', left: '1rem', zIndex: 1 }}
				onClick={() => openMenu(stepsTaken)}
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
				<div id="canvasses" style={{ position: 'relative' }}>
					<div
						id="clickerGridWrapper"
						style={{
							border: 'solid 2px blue',
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
						id="shader"
						style={{
							width: map.width * baseSize,
							height: map.height * baseSize,
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
							position: 'absolute',
							backgroundColor: getOverworldShaderColor(),
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
						id="shader"
						style={{
							width: map.width * baseSize,
							height: map.height * baseSize,
							top: -playerLocation.y * baseSize,
							left: -playerLocation.x * baseSize,
							position: 'absolute',
							backgroundColor: getOverworldShaderColor(),
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
			</div>
		</>
	);
};
