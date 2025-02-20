import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getMovesArray } from '../../../functions/getMovesArray';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import {
	isHealingItem,
	isPokeball,
	isPPRestorationItem,
} from '../../../interfaces/Item';
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
				{getMovesArray(controlled).map((m) => (
					<button key={m.name} onClick={() => setChosenAction(m.name)}>
						{m.name}
					</button>
				))}

				{Object.entries(inventory).map(([item, amount]) => {
					if (
						amount > 0 &&
						(isPokeball(item) ||
							((isHealingItem(item) || isPPRestorationItem(item)) &&
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
