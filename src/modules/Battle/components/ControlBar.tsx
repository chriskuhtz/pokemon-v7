import { useEffect, useMemo, useState } from 'react';
import { chooseOpponentAction } from '../../../functions/chooseOpponentAction';
import { filterTargets } from '../../../functions/filterTargets';
import { getMovesArray } from '../../../functions/getMovesArray';
import { OPPO_ID } from '../../../functions/makeChallengerPokemon';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { WeatherType } from '../../../interfaces/Weather';
import {
	ActionType,
	BattleFieldEffect,
	ChooseActionPayload,
} from '../BattleField';
import { BattleTerrain } from '../hooks/useBattleTerrain';
import { ActionSelection } from './ActionSelection';
import { TargetSelection } from './TargetSelection';

export function ControlBar({
	controlled,
	targets,
	chooseAction,
	playerInventory,
	catchingAllowed,
	runningAllowed,
	battleFieldEffects,
	weather,
	terrain,
}: {
	controlled: BattlePokemon | undefined;
	targets: BattlePokemon[];
	chooseAction: (x: ChooseActionPayload) => void;
	playerInventory: Inventory;
	catchingAllowed: boolean;
	runningAllowed: boolean;
	battleFieldEffects: BattleFieldEffect[];
	weather: WeatherType | undefined;
	terrain: BattleTerrain | undefined;
}) {
	const [chosenAction, setChosenAction] = useState<ActionType | undefined>();

	const filteredTargets = useMemo(
		() =>
			controlled && chosenAction
				? filterTargets({
						targets,
						user: controlled,
						chosenAction,
						onlyOpponents: false,
				  })
				: [],
		[chosenAction, controlled, targets]
	);

	useEffect(() => {
		if (
			controlled?.ability === 'truant' &&
			controlled.roundsInBattle % 2 === 1
		) {
			chooseAction({
				userId: controlled.id,
				actionName: 'LOAFING',
				targetId: controlled.id,
			});
			return;
		}
		if (controlled?.ownerId === OPPO_ID) {
			const action = chooseOpponentAction({
				controlled,
				targets,
				effects: battleFieldEffects,
				weather,
				terrain,
			});
			chooseAction(action);
		}
	}, [battleFieldEffects, chooseAction, controlled, targets, terrain, weather]);

	if (!controlled) {
		return (
			<div
				style={{
					borderTop: '1px solid black',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<h3>Whats going on here</h3>
			</div>
		);
	}

	if (!chosenAction) {
		return (
			<ActionSelection
				controlled={controlled}
				chooseAction={chooseAction}
				setChosenAction={setChosenAction}
				inventory={playerInventory}
				allTargets={targets}
				catchingAllowed={catchingAllowed}
				runningAllowed={runningAllowed}
				battleFieldEffects={battleFieldEffects}
			/>
		);
	}
	return (
		<TargetSelection
			name={controlled.data.name}
			id={controlled.id}
			targets={filteredTargets}
			chooseAction={chooseAction}
			chosenAction={chosenAction}
			setChosenAction={setChosenAction}
			moveData={
				getMovesArray(controlled).find((m) => m.name === chosenAction)?.data
			}
		/>
	);
}
