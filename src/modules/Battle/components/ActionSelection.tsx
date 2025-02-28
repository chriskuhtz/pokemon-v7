import { MoveCard } from '../../../components/MoveCard/MoveCard';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getMovesArray } from '../../../functions/getMovesArray';
import { getPlayerPokemon } from '../../../functions/getPlayerPokemon';
import { getTypeNames } from '../../../functions/getTypeNames';
import { isTrapped } from '../../../functions/isTrapped';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import {
	isHealingItem,
	isPokeball,
	isPPRestorationItem,
	isRunawayItem,
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
			(p) => p.ownerId !== controlled.ownerId && p.ability === 'shadow-tag'
		) && controlled.ability !== 'shadow-tag';
	const magnetPulled = allTargets.some(
		(p) =>
			p.ownerId !== controlled.ownerId &&
			p.ability === 'magnet-pull' &&
			getTypeNames(controlled).includes('steel')
	);

	const runButtonMessage = () => {
		if (trapped) {
			return 'Trapped';
		}
		if (shadowTagged) {
			return 'Shadow Tag in Effect';
		}
		if (magnetPulled) {
			return 'Magnet Pull in Effect';
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
					<MoveCard
						move={m}
						key={m.name}
						onClick={() => setChosenAction(m.name)}
					/>
				))}

				{Object.entries(inventory).map(([item, amount]) => {
					if (
						amount > 0 &&
						(isRunawayItem(item) ||
							isPokeball(item) ||
							((isHealingItem(item) ||
								isPPRestorationItem(item) ||
								isXItem(item)) &&
								getPlayerPokemon(allTargets).some((t) =>
									canBenefitFromItem(t, item)
								)))
					) {
						return (
							<button onClick={() => setChosenAction(item)} key={item}>
								{item}
							</button>
						);
					}
				})}

				<button
					disabled={trapped || shadowTagged || magnetPulled}
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
