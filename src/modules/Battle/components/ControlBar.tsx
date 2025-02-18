import { useState } from 'react';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { ActionType, ChooseActionPayload } from '../BattleField';
import { ActionSelection } from './ActionSelection';
import { TargetSelection } from './TargetSelection';

export function ControlBar({
	controlled,
	targets,
	chooseAction,
}: {
	controlled: BattlePokemon | undefined;
	targets: BattlePokemon[];
	chooseAction: (x: ChooseActionPayload) => void;
}) {
	const [chosenAction, setChosenAction] = useState<ActionType | undefined>();
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
				Whats going on here
			</div>
		);
	}

	if (!chosenAction) {
		return (
			<ActionSelection
				name={controlled.data.name}
				id={controlled.id}
				chooseAction={chooseAction}
				setChosenAction={setChosenAction}
			/>
		);
	}
	return (
		<TargetSelection
			name={controlled.data.name}
			id={controlled.id}
			targets={targets}
			chooseAction={chooseAction}
			chosenAction={chosenAction}
			setChosenAction={setChosenAction}
		/>
	);
}
