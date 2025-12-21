import { useContext, useCallback } from 'react';
import { isBagOverloaded } from '../../../functions/getBagLimit';
import { LocationContext } from '../../../hooks/LocationProvider';
import { useApricornTree } from '../../../hooks/useApricornTree';
import { useDugtrioExplorers } from '../../../hooks/useDugtrioExplorers';
import { GameDataContext } from '../../../hooks/useGameData';
import { useHallowedTower } from '../../../hooks/useHallowedTower';
import { useHoneyTree } from '../../../hooks/useHoneyTree';
import { useInteractWithClimbingSteps } from '../../../hooks/useInteractWithClimbingSteps';
import {
	useInteractWithSnorlax,
	useInteractWithOverworldChest,
	useInteractWithNPC,
	useInteractWithOverworldItem,
	useInteractWithOverworldPokeball,
} from '../../../hooks/useInteractWithSnorlax';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { useRangerRadio } from '../../../hooks/useRangerRadio';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { useInteractWithOverworldPokemon } from '../../../hooks/useStaticEncounter';
import { useStrangeTree } from '../../../hooks/useStrangeTree';
import { useZigzagoonForagers } from '../../../hooks/useZigzagoonForagers';
import { Occupant } from '../../../interfaces/Occupant';
import { CharacterOrientation } from '../../../interfaces/SaveFile';
import { interactWithFunction } from '../functions/interactWith';
import { useCombeeHive } from './useCombeeHive';
import { useInteractWithLedge } from './useInteractWithLedge';
import { useInteractWithTrainer } from './useInteractWithTrainer';
import { useMachete } from './useMachete';
import { useSledgeHammer } from './useSledgeHammer';

export const useInteractWith = (
	stepsTaken: number,
	rotateOccupant: (id: string, newOrientation: CharacterOrientation) => void
) => {
	const gameData = useContext(GameDataContext);
	const { latestMessage, addMultipleMessages } =
		useContext(MessageQueueContext);
	const {
		saveFile,
		navigateAwayFromOverworldReducer,
		talkToNurseReducer: talkToNurse,
	} = useContext(SaveFileContext);
	const { location, setLocation: setCharacterLocation } =
		useContext(LocationContext);

	const interactWithClimbingSteps = useInteractWithClimbingSteps();
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
	const interactWithOverworldPokemon = useInteractWithOverworldPokemon();
	const interactWithDugtrioExplorer = useDugtrioExplorers();
	const interactWithSwarmRadar = useCallback(() => {
		navigateAwayFromOverworldReducer({ activeTab: 'SWARM_RADAR' }, stepsTaken);
	}, [navigateAwayFromOverworldReducer, stepsTaken]);
	const interactWithRocketRadio = useRangerRadio();
	const interactWithRock = useSledgeHammer();
	const interactWithOverworldChest = useInteractWithOverworldChest();
	const interactWithOverworldNpc = useInteractWithNPC();
	const interactWithOverworldItem = useInteractWithOverworldItem();
	const interactWithOverworldPokeball = useInteractWithOverworldPokeball();
	return useCallback(
		(occ: Occupant | undefined) =>
			interactWithFunction({
				overloaded: isBagOverloaded(saveFile, gameData),
				activeMessage: !!latestMessage,
				occ,
				addMultipleMessages,
				rotateOccupant,
				playerLocation: location,
				talkToNurse,
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
				interactWithOverworldPokemon,
				interactWithTrainer,
				interactWithClimbingSteps,
				interactWithOverworldChest,
				interactWithOverworldNpc,
				interactWithOverworldItem,
				interactWithOverworldPokeball,
				routeTo: (meta) => navigateAwayFromOverworldReducer(meta, stepsTaken),
			}),
		[
			saveFile,
			gameData,
			latestMessage,
			addMultipleMessages,
			rotateOccupant,
			location,
			talkToNurse,
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
			interactWithOverworldPokemon,
			interactWithTrainer,
			interactWithClimbingSteps,
			interactWithOverworldChest,
			interactWithOverworldNpc,
			interactWithOverworldItem,
			navigateAwayFromOverworldReducer,
			interactWithOverworldPokeball,
			stepsTaken,
		]
	);
};
