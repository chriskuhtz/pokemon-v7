import { useContext, useMemo } from 'react';
import { FaRunning } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';
import { MoveCard } from '../../../components/MoveCard/MoveCard';
import { battleSpriteSize } from '../../../constants/gameData';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getHeldItem } from '../../../functions/getHeldItem';
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

export const canRunOrSwitch = (
	controlled: BattlePokemon,
	battleFieldEffects: BattleFieldEffect[]
): boolean => {
	const runAwayer =
		controlled.ability === 'run-away' ||
		getHeldItem(controlled) === 'smoke-ball';

	if (runAwayer) {
		return true;
	}
	const trapped = isTrapped(controlled);
	const shadowTagged =
		controlled.ability !== 'shadow-tag' &&
		battleFieldEffects.some(
			(b) => b.type === 'shadow-tag' && b.ownerId !== controlled.ownerId
		);
	const arenaTrapped =
		controlled.ability !== 'levitate' &&
		!getTypeNames(controlled).includes('flying') &&
		battleFieldEffects.some(
			(b) => b.type === 'arena-trap' && b.ownerId !== controlled.ownerId
		);
	const magnetPulled =
		getTypeNames(controlled).includes('steel') &&
		battleFieldEffects.some(
			(b) => b.type === 'magnet-pull' && b.ownerId !== controlled.ownerId
		);
	const spiderWebbed = battleFieldEffects.some(
		(b) => b.type === 'spider-web' && b.ownerId !== controlled.ownerId
	);
	const meanLooked = controlled.secondaryAilments.some(
		(b) => b.type === 'mean-looked'
	);
	return !(
		trapped ||
		shadowTagged ||
		arenaTrapped ||
		magnetPulled ||
		spiderWebbed ||
		meanLooked
	);
};
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

	const canSwitch = useMemo(
		() => canRunOrSwitch(controlled, battleFieldEffects),
		[battleFieldEffects, controlled]
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
				{getMovesArray(controlled, { filterOutDisabled: true }).map((m) => (
					<MoveCard
						move={m}
						key={m.name}
						onClick={() => setChosenAction(m.name)}
						boostedBy={
							controlled.ppBoostedMoves.find(
								(boosted) => boosted.name === m.name
							)?.stage
						}
					/>
				))}
				<Card
					disabled={!canSwitch}
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
						disabled={!canSwitch}
						onClick={() =>
							chooseAction({
								userId: controlled.id,
								actionName: 'RUN_AWAY',
								targetId: '',
							})
						}
						content={'Run Away'}
						actionElements={[]}
						icon={<FaRunning height={battleSpriteSize} />}
					/>
				)}
			</div>
		</div>
	);
}
