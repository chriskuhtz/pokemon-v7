import { useMemo, useState } from 'react';
import { isMove } from '../../../constants/checkLists/movesCheckList';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getOpponentPokemon } from '../../../functions/getOpponentPokemon';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { isHealingItem, isPokeball } from '../../../interfaces/Item';
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

	const filteredTargets = useMemo(() => {
		if (isHealingItem(chosenAction)) {
			return targets.filter((t) => canBenefitFromItem(t, chosenAction));
		}
		if (isPokeball(chosenAction)) {
			return getOpponentPokemon(targets).filter((t) => t.status === 'ONFIELD');
		}
		if (isMove(chosenAction)) {
			return targets.filter((t) => t.status === 'ONFIELD');
		}
		return targets;
	}, [chosenAction, targets]);

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
				<h3>{message}</h3>
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
