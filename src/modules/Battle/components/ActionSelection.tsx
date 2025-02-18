import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { ActionType, ChooseActionPayload } from '../BattleField';

export function ActionSelection({
	controlled,
	setChosenAction,
	chooseAction,
}: {
	controlled: BattlePokemon;
	setChosenAction: (x: ActionType) => void;
	chooseAction: (x: ChooseActionPayload) => void;
}) {
	return (
		<div
			style={{
				borderTop: '1px solid black',
				padding: '.5rem',
			}}
		>
			<strong>What should {controlled.data.name} do?</strong>
			<div
				style={{
					display: 'grid',
					gap: '1rem',
					gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
				}}
			>
				<button onClick={() => setChosenAction(controlled.firstMove.name)}>
					{controlled.firstMove.name}
				</button>
				{controlled.secondMove && (
					<button
						onClick={() =>
							setChosenAction(controlled.secondMove?.name ?? 'pound')
						}
					>
						{controlled.secondMove.name}
					</button>
				)}
				{controlled.thirdMove && (
					<button
						onClick={() =>
							setChosenAction(controlled.thirdMove?.name ?? 'pound')
						}
					>
						{controlled.thirdMove.name}
					</button>
				)}
				{controlled.fourthMove && (
					<button
						onClick={() =>
							setChosenAction(controlled.fourthMove?.name ?? 'pound')
						}
					>
						{controlled.fourthMove.name}
					</button>
				)}
				<button
					onClick={() =>
						chooseAction({
							userId: controlled.id,
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
