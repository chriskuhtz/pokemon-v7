import { ActionType, ChooseActionPayload } from '../BattleField';

export function ActionSelection(props: {
	name: string;
	id: string;
	setChosenAction: (x: ActionType) => void;
	chooseAction: (x: ChooseActionPayload) => void;
}) {
	return (
		<div
			style={{
				border: '1px solid black',
				padding: '.5rem',
			}}
		>
			<strong>What should {props.name} do?</strong>
			<div
				style={{
					display: 'grid',
					gap: '1rem',
					gridTemplateColumns: '1fr 1fr',
				}}
			>
				<button onClick={() => props.setChosenAction('pound')}>Pound</button>
				<button
					onClick={() =>
						props.chooseAction({
							userId: props.id,
							actionName: 'RUN_AWAY',
							targetId: '',
						})
					}
				>
					Run Away
				</button>
			</div>
		</div>
	);
}
