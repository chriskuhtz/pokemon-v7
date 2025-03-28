import { useContext, useMemo } from 'react';
import { FaRunning } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';
import { MoveCard } from '../../../components/MoveCard/MoveCard';
import { battleSpriteSize } from '../../../constants/gameData';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getMovesArray } from '../../../functions/getMovesArray';
import { getPlayerPokemon } from '../../../functions/getPlayerPokemon';
import { getTypeNames } from '../../../functions/getTypeNames';
import { isTrapped } from '../../../functions/isTrapped';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import {
	isHealingItem,
	isPokeball,
	isPPRestorationItem,
	isRunawayItem,
	isXItem,
	ItemType,
} from '../../../interfaces/Item';
import { Card } from '../../../uiComponents/Card/Card';
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
	const {
		saveFile: { settings },
	} = useContext(SaveFileContext);

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

	const allowedItems: [ItemType, number][] = useMemo(
		() =>
			Object.entries(inventory).filter(([item, amount]) => {
				if (amount <= 0) {
					return false;
				}
				if (isPokeball(item) && catchingAllowed) {
					return true;
				}
				if (settings?.noItemsInBattle) {
					return false;
				}

				return (
					isRunawayItem(item) ||
					((isHealingItem(item) ||
						isPPRestorationItem(item) ||
						isXItem(item)) &&
						getPlayerPokemon(allTargets).some((t) =>
							canBenefitFromItem(t, item)
						))
				);
			}) as [ItemType, number][],
		[allTargets, catchingAllowed, inventory, settings?.noItemsInBattle]
	);

	return (
		<div
			style={{
				padding: '.5rem',
				textWrap: 'nowrap',
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
				<Card
					disabled={trapped || shadowTagged || magnetPulled || arenaTrapped}
					onClick={() => setChosenAction('SWITCH')}
					content={'Switch Pokemon'}
					actionElements={[]}
					icon={<FaArrowsRotate height={battleSpriteSize} />}
				/>

				{allowedItems.map(([item, amount]) => {
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
				})}

				{runningAllowed && (
					<Card
						disabled={trapped || shadowTagged || magnetPulled || arenaTrapped}
						onClick={() =>
							chooseAction({
								userId: controlled.id,
								actionName: 'RUN_AWAY',
								targetId: '',
							})
						}
						content={runButtonMessage()}
						actionElements={[]}
						icon={<FaRunning height={battleSpriteSize} />}
					/>
				)}
			</div>
		</div>
	);
}
