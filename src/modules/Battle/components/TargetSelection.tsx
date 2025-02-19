import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { ActionType, ChooseActionPayload } from '../BattleField';

export function TargetSelection(props: {
	name: string;
	id: string;
	targets: BattlePokemon[];
	chosenAction: ActionType;
	chooseAction: (x: ChooseActionPayload) => void;
	setChosenAction: (x: ActionType | undefined) => void;
}) {
	return (
		<div
			style={{
				padding: '.5rem',
			}}
		>
			<strong>
				Who is the target for {props.name}'s {props.chosenAction}?
			</strong>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
				}}
			>
				{props.targets.map((t) => (
					<button
						key={t.id}
						onClick={() => {
							props.chooseAction({
								userId: props.id,
								actionName: props.chosenAction,
								targetId: t.id,
							});
							props.setChosenAction(undefined);
						}}
					>
						{t.data.name}
					</button>
				))}
			</div>
		</div>
	);
}
