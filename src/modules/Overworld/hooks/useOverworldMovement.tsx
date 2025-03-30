import { useContext, useEffect, useMemo, useState } from 'react';
import { fps } from '../../../constants/gameData';
import { mapsRecord } from '../../../constants/maps/mapsRecord';
import { determineWildPokemon } from '../../../functions/determineWildPokemon';
import { getNextForwardFoot } from '../../../functions/getNextForwardFoot';
import { OPPO_ID } from '../../../functions/makeChallengerPokemon';
import { updatePosition } from '../../../functions/updatePosition';
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
	encounterRateModifier: { factor: number; upToXp: number }
) => {
	const {
		saveFile: {
			pokemon,
			quests,
			location: playerLocation,
			currentSwarm,
			encounterRateModifier: repelFactor,
		},
		setCharacterLocationReducer: setCharacterLocation,
	} = useContext(SaveFileContext);
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
				if (map.tileMap.encounterLayer[playerLocation.y][playerLocation.x]) {
					if (Math.random() < encounterChance * encounterRateModifier.factor) {
						const challenger: Challenger = {
							type: 'WILD',
							id: OPPO_ID,
							inventory: EmptyInventory,
							team: determineWildPokemon(
								pokemon.filter((p) => p.onTeam),
								mapsRecord[playerLocation.mapId],
								quests,
								currentSwarm
							),
						};

						if (
							repelFactor?.factor &&
							repelFactor.factor < 1 &&
							challenger.team[0].xp < encounterRateModifier.upToXp
						) {
							//Only pokemon stronger than your team can "pass through" the repel filter
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
						currentOccupants
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
		addStep,
		currentOccupants,
		currentSwarm,
		encounterChance,
		encounterRateModifier.factor,
		encounterRateModifier.upToXp,
		map,
		nextInput,
		playerLocation,
		pokemon,
		quests,
		repelFactor,
		setCharacterLocation,
		startEncounter,
	]);

	return setNextInput;
};
