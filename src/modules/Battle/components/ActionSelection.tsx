import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { isHealingItem, isPokeball } from '../../../interfaces/Item';
import { ActionType, ChooseActionPayload } from '../BattleField';

export function ActionSelection({
	controlled,
	inventory,
	setChosenAction,
	chooseAction,
	allTargets,
}: {
	controlled: BattlePokemon;
	inventory: Inventory;
	setChosenAction: (x: ActionType) => void;
	chooseAction: (x: ChooseActionPayload) => void;
	allTargets: BattlePokemon[];
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
					display: 'flex',
					gap: '1rem',
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
				{Object.entries(inventory).map(([item, amount]) => {
					if (
						amount > 0 &&
						(isPokeball(item) ||
							(isHealingItem(item) &&
								allTargets.some((t) => canBenefitFromItem(t, item))))
					) {
						return (
							<button onClick={() => setChosenAction(item)} key={item}>
								{item}
							</button>
						);
					}
				})}

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
