import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getMovesArray } from '../../../functions/getMovesArray';
import { isTrapped } from '../../../functions/isTrapped';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import {
	isHealingItem,
	isPokeball,
	isPPRestorationItem,
	isXItem,
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
	const trapped = isTrapped(controlled);
	const shadowTagged =
		allTargets.some(
			(p) => p.id !== controlled.id && p.ability === 'shadow-tag'
		) && controlled.ability !== 'shadow-tag';

	const runButtonMessage = () => {
		if (trapped) {
			return 'Trapped';
		}
		if (shadowTagged) {
			return 'Shadow Tag in Effect';
		}
		return 'Run Away';
	};

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
				{getMovesArray(controlled, true).map((m) => (
					<button key={m.name} onClick={() => setChosenAction(m.name)}>
						{m.name}
					</button>
				))}

				{Object.entries(inventory).map(([item, amount]) => {
					if (
						amount > 0 &&
						(isPokeball(item) ||
							((isHealingItem(item) ||
								isPPRestorationItem(item) ||
								isXItem(item)) &&
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
					disabled={trapped || shadowTagged}
					onClick={() =>
						chooseAction({
							userId: controlled.id,
							actionName: 'RUN_AWAY',
							targetId: '',
						})
					}
				>
					{runButtonMessage()}
				</button>
			</div>
		</div>
	);
}
