import { useEffect, useMemo, useState } from 'react';
import { calculateDamage } from '../../../functions/calculateDamage';
import { determineMultiHits } from '../../../functions/determineMultiHits';
import { filterTargets } from '../../../functions/filterTargets';
import { getMovesArray } from '../../../functions/getMovesArray';
import { OPPO_ID } from '../../../functions/makeChallengerPokemon';
import { BattleMove, BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import {
	ActionType,
	BattleFieldEffect,
	ChooseActionPayload,
} from '../BattleField';
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
}: {
	controlled: BattlePokemon | undefined;
	targets: BattlePokemon[];
	chooseAction: (x: ChooseActionPayload) => void;
	playerInventory: Inventory;
	catchingAllowed: boolean;
	runningAllowed: boolean;
	battleFieldEffects: BattleFieldEffect[];
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
				actionName: 'SLACKING',
				targetId: controlled.id,
			});
			return;
		}
		if (controlled?.ownerId === OPPO_ID) {
			const action = chooseOpponentAction({ controlled, targets });
			chooseAction(action);
		}
	}, [chooseAction, controlled, targets]);

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
		/>
	);
}

export type PokemonProfile = 'AGGRESSIVE';

export const determinePokemonProfile = (): PokemonProfile => {
	//always try to do the most damage immediately
	return 'AGGRESSIVE';
};

export const determineBestMoveAndTarget = (
	attacker: BattlePokemon,
	moves: BattleMove[],
	targets: BattlePokemon[]
): { actionName: ActionType; targetId: string } => {
	const mapped: { actionName: ActionType; targetId: string; damage: number }[] =
		moves.flatMap((move) =>
			targets.map((target) => ({
				actionName: move.name,
				targetId: target.id,
				//TODO: consider weather/effects etc
				damage: calculateDamage(
					attacker,
					target,
					{
						name: move.name,
						type: 'BattleAttack',
						round: 0,
						data: move.data,
						targetId: target.id,
						multiHits: determineMultiHits(move.data),
					},
					undefined,
					[],
					false,
					false,
					false,
					() => {}
				).damage,
			}))
		);

	const sorted = mapped.sort((a, b) => b.damage - a.damage);

	return sorted[0];
};

export const chooseOpponentAction = ({
	controlled,
	targets,
}: {
	controlled: BattlePokemon;
	targets: BattlePokemon[];
}): ChooseActionPayload => {
	//const profile = determinePokemonProfile();

	//IF PROFILE AGGRESSIVE
	const moves = getMovesArray(controlled, {
		filterOutDisabled: true,
		filterOutEmpty: true,
	});

	const filtered = filterTargets({
		targets,
		user: controlled,
		chosenAction: 'tackle', //just assume its an attacking move
		onlyOpponents: true,
	});

	if (moves.length === 0) {
		return {
			userId: controlled.id,
			actionName: 'splash',
			targetId: filtered[0].id,
		};
	}

	const { targetId, actionName } = determineBestMoveAndTarget(
		controlled,
		moves,
		filtered
	);

	return { userId: controlled.id, actionName, targetId };
};
