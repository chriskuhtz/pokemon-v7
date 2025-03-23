import { MoveCard } from '../../../components/MoveCard/MoveCard';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getItemUrl } from '../../../functions/getItemUrl';
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
import {
	ActionType,
	BattleFieldEffect,
	ChooseActionPayload,
} from '../BattleField';

export function ActionSelection({
	controlled,
	inventory,
	setChosenAction,
	chooseAction,
	allTargets,
	catchingAllowed,
	runningAllowed,
	battleFieldEffects,
}: {
	controlled: BattlePokemon;
	inventory: Inventory;
	setChosenAction: (x: ActionType) => void;
	chooseAction: (x: ChooseActionPayload) => void;
	allTargets: BattlePokemon[];
	catchingAllowed: boolean;
	runningAllowed: boolean;
	battleFieldEffects: BattleFieldEffect[];
}) {
	const runAwayer = controlled.ability === 'run-away';
	const trapped = !runAwayer && isTrapped(controlled);
	const shadowTagged =
		!runAwayer &&
		controlled.ability !== 'shadow-tag' &&
		battleFieldEffects.some(
			(b) => b.type === 'shadow-tag' && b.ownerId !== controlled.ownerId
		);
	const arenaTrapped =
		!runAwayer &&
		controlled.ability !== 'levitate' &&
		!getTypeNames(controlled).includes('flying') &&
		battleFieldEffects.some(
			(b) => b.type === 'arena-trap' && b.ownerId !== controlled.ownerId
		);
	const magnetPulled =
		!runAwayer &&
		getTypeNames(controlled).includes('steel') &&
		battleFieldEffects.some(
			(b) => b.type === 'shadow-tag' && b.ownerId !== controlled.ownerId
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
		if (arenaTrapped) {
			return 'Arena Trap in Effect';
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
							(isPokeball(item) && catchingAllowed) ||
							((isHealingItem(item) ||
								isPPRestorationItem(item) ||
								isXItem(item)) &&
								getPlayerPokemon(allTargets).some((t) =>
									canBenefitFromItem(t, item)
								)))
					) {
						return (
							<button
								style={{ display: 'flex', alignItems: 'center' }}
								onClick={() => setChosenAction(item)}
								key={item}
							>
								<img src={getItemUrl(item)} />
								{item} ({amount})
							</button>
						);
					}
				})}

				{runningAllowed && (
					<button
						disabled={trapped || shadowTagged || magnetPulled || arenaTrapped}
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
				)}
			</div>
		</div>
	);
}
