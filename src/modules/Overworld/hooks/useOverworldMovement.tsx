import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fps } from '../../../constants/gameData/gameData';
import { mapsRecord } from '../../../constants/gameData/maps/mapsRecord';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { determineWildPokemon } from '../../../functions/determineWildPokemon';
import { getNextForwardFoot } from '../../../functions/getNextForwardFoot';
import { OPPO_ID } from '../../../functions/makeChallengerPokemon';
import { updatePosition } from '../../../functions/updatePosition';
import { LocationContext } from '../../../hooks/LocationProvider';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Challenger } from '../../../interfaces/Challenger';
import { EmptyInventory } from '../../../interfaces/Inventory';
import { Occupant, OnStepPortal } from '../../../interfaces/OverworldMap';
import { CharacterOrientation } from '../../../interfaces/SaveFile';

const baseEncounterRate = 0;
const encounterRateStep = 0.05;
export const useOverworldMovement = (
	startEncounter: (encounter: Challenger) => void,
	addStep: () => void,
	currentOccupants: Occupant[],
	encounterRateModifier: { factor: number }
) => {
	const { saveFile } = useContext(SaveFileContext);
	const {
		pokemon,
		quests,
		currentSwarm,
		campUpgrades,
		bag,
		activatedLure,
		catchStreak,
		currentDistortionSwarm,
		currentStrongSwarm,
	} = saveFile;
	const { location: playerLocation, setLocation: setCharacterLocation } =
		useContext(LocationContext);

	const shinyFactor = useMemo(() => (bag['shiny-charm'] > 1 ? 4 : 1), [bag]);
	const map = useMemo(() => mapsRecord[playerLocation.mapId], [playerLocation]);
	const [encounterChance, setEncounterChance] =
		useState<number>(baseEncounterRate);

	const [nextInput, setNextInput] = useState<
		CharacterOrientation | undefined
	>();

	const reduceEncounterRate = useCallback(() => {
		if (encounterChance <= baseEncounterRate) {
			return;
		}
		setEncounterChance(encounterChance - encounterRateStep);
	}, [encounterChance]);

	const steptOnPortal: OnStepPortal | undefined = useMemo(
		() =>
			map.occupants.find(
				(o) =>
					o.type === 'ON_STEP_PORTAL' &&
					o.conditionFunction(saveFile) === true &&
					o.x === playerLocation.x &&
					o.y === playerLocation.y
			) as OnStepPortal | undefined,
		[map.occupants, playerLocation.x, playerLocation.y, saveFile]
	);

	const handlePossibleEncounter = useCallback(() => {
		setNextInput(undefined);
		setEncounterChance(baseEncounterRate);

		if (map.peaceful) {
			return;
		}

		if (
			!(
				map.tileMap.encounterLayer[playerLocation.y][playerLocation.x] ||
				map.tileMap.waterLayer[playerLocation.y][playerLocation.x]
			)
		) {
			reduceEncounterRate();
			return;
		}
		if (Math.random() > encounterChance * encounterRateModifier.factor) {
			setEncounterChance(encounterChance + encounterRateStep);
			return;
		}

		const waterEncounter =
			!!map.tileMap.waterLayer[playerLocation.y][playerLocation.x];

		const { team, battleTeamConfig } = determineWildPokemon(
			pokemon.filter((p) => p.onTeam),
			playerLocation.mapId,
			quests,
			waterEncounter,
			shinyFactor,
			activatedLure,
			catchStreak,
			currentSwarm,
			currentStrongSwarm,
			currentDistortionSwarm
		);

		const challenger: Challenger = {
			type: 'WILD',
			id: OPPO_ID,
			inventory: EmptyInventory,
			team,
			battleTeamConfig,
		};
		const avgChallengerLevel =
			challenger.team.reduce(
				(sum, summand) =>
					sum + calculateLevelData(summand.xp, summand.growthRate).level,
				0
			) / challenger.team.length;
		if (saveFile.activatedRepel === 'repel' && avgChallengerLevel < 20) {
			return;
		}
		if (saveFile.activatedRepel === 'super-repel' && avgChallengerLevel < 40) {
			return;
		}
		if (saveFile.activatedRepel === 'max-repel' && avgChallengerLevel < 60) {
			return;
		}

		startEncounter(challenger);
	}, [
		activatedLure,
		catchStreak,
		currentDistortionSwarm,
		currentStrongSwarm,
		currentSwarm,
		encounterChance,
		encounterRateModifier.factor,
		map,
		playerLocation,
		pokemon,
		quests,
		reduceEncounterRate,
		saveFile.activatedRepel,
		shinyFactor,
		startEncounter,
	]);

	const canSwim = useMemo((): boolean => {
		return campUpgrades['swimming certification'];
	}, [campUpgrades]);

	useEffect(() => {
		const int = setTimeout(() => {
			if (
				!nextInput &&
				!['CENTER1', 'CENTER2'].includes(playerLocation.forwardFoot)
			) {
				setCharacterLocation({
					...playerLocation,
					forwardFoot: getNextForwardFoot(playerLocation.forwardFoot),
				});
			}
			if (steptOnPortal) {
				setCharacterLocation(steptOnPortal.portal);
				return;
			}
			if (nextInput && !saveFile.flying) {
				handlePossibleEncounter();
			}
			if (nextInput === playerLocation.orientation) {
				setCharacterLocation({
					...playerLocation,
					...updatePosition(
						playerLocation,
						nextInput,
						map,
						addStep,
						currentOccupants,
						canSwim,
						!!saveFile.flying,
						campUpgrades['rock climbing certification']
					),
					forwardFoot: getNextForwardFoot(playerLocation.forwardFoot),
				});
			}
			if (nextInput && nextInput !== playerLocation.orientation) {
				setCharacterLocation({
					...playerLocation,
					orientation: nextInput,
					forwardFoot: getNextForwardFoot(playerLocation.forwardFoot),
				});
			}
			setNextInput(undefined);
		}, fps);

		return () => clearTimeout(int);
	}, [
		activatedLure,
		addStep,
		campUpgrades,
		canSwim,
		currentOccupants,
		currentSwarm,
		encounterChance,
		encounterRateModifier.factor,
		handlePossibleEncounter,
		map,
		nextInput,
		playerLocation,
		pokemon,
		quests,
		reduceEncounterRate,
		saveFile,
		setCharacterLocation,
		shinyFactor,
		startEncounter,
		steptOnPortal,
	]);

	return setNextInput;
};
