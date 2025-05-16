import { useContext, useEffect, useMemo, useState } from 'react';
import { fps } from '../../../constants/gameData';
import { mapsRecord } from '../../../constants/maps/mapsRecord';
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
	const { pokemon, quests, currentSwarm, campUpgrades, bag, activatedLure } =
		saveFile;
	const { location: playerLocation, setLocation: setCharacterLocation } =
		useContext(LocationContext);

	const shinyFactor = useMemo(() => (bag['shiny-charm'] > 1 ? 4 : 1), [bag]);
	const map = useMemo(() => mapsRecord[playerLocation.mapId], [playerLocation]);
	const [encounterChance, setEncounterChance] =
		useState<number>(baseEncounterRate);

	const [nextInput, setNextInput] = useState<
		CharacterOrientation | undefined
	>();

	useEffect(() => {
		const stepOnPortal: OnStepPortal | undefined = map.occupants.find(
			(o) =>
				o.type === 'ON_STEP_PORTAL' &&
				o.conditionFunction(saveFile) === true &&
				o.x === playerLocation.x &&
				o.y === playerLocation.y
		) as OnStepPortal | undefined;

		const reduceEncounterRate = () => {
			if (encounterChance === baseEncounterRate) {
				return;
			}
			setEncounterChance(encounterChance - encounterRateStep);
		};
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
			if (stepOnPortal) {
				setCharacterLocation(stepOnPortal.portal);
				return;
			}

			if (nextInput) {
				if (
					saveFile.activatedRepel !== 'max-repel' &&
					(map.tileMap.encounterLayer[playerLocation.y][playerLocation.x] ||
						map.tileMap.waterLayer[playerLocation.y][playerLocation.x])
				) {
					if (Math.random() < encounterChance * encounterRateModifier.factor) {
						const waterEncounter =
							!!map.tileMap.waterLayer[playerLocation.y][playerLocation.x];
						const challenger: Challenger = {
							type: 'WILD',
							id: OPPO_ID,
							inventory: EmptyInventory,
							team: determineWildPokemon(
								pokemon.filter((p) => p.onTeam),
								mapsRecord[playerLocation.mapId],
								quests,
								waterEncounter,
								shinyFactor,
								currentSwarm,
								activatedLure
							),
						};

						const avgChallengerLevel =
							challenger.team.reduce(
								(sum, summand) =>
									sum +
									calculateLevelData(summand.xp, summand.growthRate).level,
								0
							) / challenger.team.length;

						if (
							saveFile.activatedRepel === 'repel' &&
							avgChallengerLevel < 20
						) {
							setEncounterChance(baseEncounterRate);
							return;
						}
						if (
							saveFile.activatedRepel === 'super-repel' &&
							avgChallengerLevel < 40
						) {
							setEncounterChance(baseEncounterRate);
							return;
						}

						setNextInput(undefined);
						setEncounterChance(baseEncounterRate);
						startEncounter(challenger);
						return;
					} else setEncounterChance(encounterChance + encounterRateStep);
				} else reduceEncounterRate();
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
						campUpgrades['swimming certification']
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
		currentOccupants,
		currentSwarm,
		encounterChance,
		encounterRateModifier.factor,
		map,
		nextInput,
		playerLocation,
		pokemon,
		quests,
		saveFile,
		setCharacterLocation,
		shinyFactor,
		startEncounter,
	]);

	return setNextInput;
};
