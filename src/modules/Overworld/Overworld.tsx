import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { animationTimer, baseSize } from '../../constants/gameData';
import { assembleMap } from '../../functions/assembleMap';
import { getOppositeDirection } from '../../functions/getOppositeDirection';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { isValidOverWorldMap } from '../../functions/isValidOverworldMap';
import { Inventory } from '../../interfaces/Inventory';
import {
	Occupant,
	OverworldEncounter,
	OverworldItem,
	OverworldMap,
} from '../../interfaces/OverworldMap';
import { RoutesType } from '../../interfaces/Routing';
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

export interface Dialogue {
	message: string;
	onRemoval?: () => void;
}

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
	goToMarket,
}: {
	openMenu: () => void;
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	collectItem: (item: [string, OverworldItem]) => void;
	map: OverworldMap;
	collectedItems: number[];
	startEncounter: (x: OverworldEncounter) => void;
	encounterRateModifier?: number;
	navigate: (x: RoutesType) => void;
	goToMarket: (marketInventory: Partial<Inventory>) => void;
}) => {
	const assembledMap = useMemo(
		() => assembleMap(map, collectedItems),
		[map, collectedItems]
	);
	const valid = useMemo(() => isValidOverWorldMap(map), [map]);

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
			onRemoval: () => startEncounter(randomEncounter),
		});
	};

	const setNextInput = useOverworldMovement(
		playerLocation,
		setCharacterLocation,
		assembledMap,
		addEncounterDialogue,
		encounterRateModifier
	);

	//DRAWING
	useDrawCharacter(playerCanvasId, playerLocation);
	useDrawBackground(backgroundCanvasId, map);
	const changeOccupant = useDrawOccupants(occupantsCanvasId, assembledMap);

	const interactWith = useCallback(
		(occ: [string, Occupant] | undefined) => {
			if (!occ) {
				return;
			}
			const [id, data] = occ;

			if (data.type === 'ITEM') {
				addDialogue({
					message: `Found ${data.amount} ${data.item}`,
					onRemoval: () => collectItem(occ as [string, OverworldItem]),
				});
				return;
			}
			if (data.type === 'PC') {
				addDialogue({
					message: 'Accessing Pokemon Storage',
					onRemoval: () => navigate('STORAGE'),
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
								? () => goToMarket(data.inventory)
								: undefined,
					})
				);
				return;
			}

			console.error('what is this occupant', occ);
		},
		[changeOccupant, collectItem, goToMarket, navigate, playerLocation]
	);

	useKeyboardControl(
		setNextInput,
		() => handleEnterPress(playerLocation, collectedItems, interactWith),
		dialogues.length > 0
	);

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
			{dialogues.length > 0 && (
				<Banner>
					<h2>{dialogues[0].message}</h2>
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
