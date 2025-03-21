import { useCallback, useContext, useMemo, useState } from 'react';

import { CombinedCanvas } from '../../components/CombinedCanvas/CombinedCanvas';
import { fps } from '../../constants/gameData';
import { mapsRecord } from '../../constants/maps/mapsRecord';
import { getTimeOfDay, OverworldShaderMap } from '../../functions/getTimeOfDay';
import { handleEnterPress } from '../../functions/handleEnterPress';
import { BaseSizeContext } from '../../hooks/useBaseSize';
import { useDrawForeground } from '../../hooks/useDrawBackground';
import { useDugtrioExplorers } from '../../hooks/useDugtrioExplorers';
import { useHallowedTower } from '../../hooks/useHallowedTower';
import { useHoneyTree } from '../../hooks/useHoneyTree';
import { Message } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { useZigzagoonForagers } from '../../hooks/useZigzagoonForagers';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { Occupant } from '../../interfaces/OverworldMap';
import { CharacterLocationData, SaveFile } from '../../interfaces/SaveFile';
import './Overworld.css';
import { ClickerGrid } from './components/ClickerGrid';
import { OverworldMenus } from './components/OverworldMenus';
import { interactWithFunction } from './functions/interactWith';
import { useClickTarget } from './hooks/useClickTarget';
import { useCombeeHive } from './hooks/useCombeeHive';
import { useDrawCharacter } from './hooks/useDrawCharacter';
import { useDrawOccupants } from './hooks/useDrawOccupants';
import { useJumpDownLedge } from './hooks/useJumpDownLedge';
import { useKeyboardControl } from './hooks/useKeyboardControl';
import { useMachete } from './hooks/useMachete';
import { useOccupants } from './hooks/useOccupants';
import { useOverworldMovement } from './hooks/useOverworldMovement';
import { useStartEncounter } from './hooks/useStartEncounter';

const playerCanvasId = 'playerCanvas';
const backgroundCanvasId = 'bg';
const occupantsCanvasId = 'occs';

export const useEncounterRateModifier = () => {
	const { saveFile } = useContext(SaveFileContext);

	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile.pokemon]
	);

	const firstTeamMember = useMemo(
		() => (team.length > 0 ? team[0] : undefined),
		[team]
	);

	return useMemo(() => {
		const stenchFactor = firstTeamMember?.ability === 'stench' ? 0.5 : 1;
		const illumFactor = firstTeamMember?.ability === 'illuminate' ? 2 : 1;
		const swarmFactor = firstTeamMember?.ability === 'swarm' ? 2 : 1;
		const itemFactor = saveFile.encounterRateModifier?.factor ?? 1;
		const weatherFactor =
			firstTeamMember?.ability === 'sand-veil' &&
			mapsRecord[saveFile.location.mapId].weather === 'sandstorm'
				? 0.5
				: 1;

		return (
			1 * stenchFactor * itemFactor * weatherFactor * illumFactor * swarmFactor
		);
	}, [firstTeamMember, saveFile]);
};

export const Overworld = ({
	playerLocation,
	setCharacterLocation,
	goToMarket,
	talkToNurse,
	playerSprite,
	handledOccupants,
	latestMessage,
	addMultipleMessages,
}: {
	playerLocation: CharacterLocationData;
	setCharacterLocation: (update: CharacterLocationData) => void;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: string) => void;
	playerSprite: string;
	receiveItems: (item: ItemType, amount: number) => void;
	handledOccupants: string[];
	saveFile: SaveFile;
	latestMessage: Message | undefined;
	addMultipleMessages: (newMessages: Message[]) => void;
}) => {
	const { baseSize } = useContext(BaseSizeContext);
	const { saveFile, handleOccupantReducer, navigateAwayFromOverworldReducer } =
		useContext(SaveFileContext);
	const interactWithHoneyTree = useHoneyTree();
	const interactWithHallowedTower = useHallowedTower();
	const interactWithCombeeHive = useCombeeHive();
	const interactWithBush = useMachete();
	const interactWithLedge = useJumpDownLedge();
	const interactWithZigzagoonForager = useZigzagoonForagers();
	const interactWithDugtrioExplorer = useDugtrioExplorers();
	const addEncounterMessage = useStartEncounter();
	const encounterRateModifier = useEncounterRateModifier();

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
				goToPosition: setCharacterLocation,
				interactWithHoneyTree,
				interactWithHallowedTower,
				interactWithCombeeHive,
				interactWithBush,
				interactWithLedge,
				interactWithZigzagoonForager,
				interactWithDugtrioExplorer,
				goToCampMenu: () =>
					navigateAwayFromOverworldReducer('CAMP_UPGRADES', stepsTaken),
				goToBulletinBoard: () =>
					navigateAwayFromOverworldReducer('BULLETIN_BOARD', stepsTaken),
				goToApricornSmith: () =>
					navigateAwayFromOverworldReducer('APRICORN_SMITHY', stepsTaken),
				settings: saveFile.settings,
				goToTrainingField: () =>
					navigateAwayFromOverworldReducer('TRAINING_FIELD', stepsTaken),
				goToBerryFarm: () =>
					navigateAwayFromOverworldReducer('FARM', stepsTaken),
				goToMiltankFarm: () =>
					navigateAwayFromOverworldReducer('MILTANK_FARM', stepsTaken),
			}),
		[
			addMultipleMessages,
			goToMarket,
			handleOccupantReducer,
			handledOccupants,
			interactWithBush,
			interactWithCombeeHive,
			interactWithDugtrioExplorer,
			interactWithHallowedTower,
			interactWithHoneyTree,
			interactWithLedge,
			interactWithZigzagoonForager,
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
			<OverworldMenus stepsTaken={stepsTaken} />

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
