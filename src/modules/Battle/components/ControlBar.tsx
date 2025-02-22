import { useEffect, useMemo, useState } from 'react';
import { OPPO_ID } from '../../../constants/gameData';
import {
	filterTargets,
	getRandomIndex,
} from '../../../functions/filterTargets';
import { getMovesArray } from '../../../functions/getMovesArray';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { ActionType, ChooseActionPayload } from '../BattleField';
import { ActionSelection } from './ActionSelection';
import { TargetSelection } from './TargetSelection';

export function ControlBar({
	controlled,
	targets,
	chooseAction,
	message,
	playerInventory,
}: {
	controlled: BattlePokemon | undefined;
	targets: BattlePokemon[];
	chooseAction: (x: ChooseActionPayload) => void;
	message?: string;
	playerInventory: Inventory;
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
		if (controlled?.ownerId === OPPO_ID) {
			const moves = getMovesArray(controlled, true);
			const actionName = moves[getRandomIndex(moves.length)].name;
			const filtered = filterTargets({
				targets,
				user: controlled,
				chosenAction: actionName,
				onlyOpponents: true,
			});
			const targetId = filtered[Math.floor(Math.random() * filtered.length)].id;

			chooseAction({
				userId: controlled.id,
				actionName: actionName,
				targetId,
			});
		}
	}, [chooseAction, controlled, targets]);

	if (message) {
		return (
			<div
				style={{
					borderTop: '1px solid black',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<h3></h3>
			</div>
		);
	}
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
